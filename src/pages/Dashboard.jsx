// Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useTranslation } from '../context/LanguageContext';
import DebtList from '../components/DebtList';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { debts, loadingDebts, deleteDebt, createDebt, updateDebt } = useUser();
  const t = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    description: '',
    value: '',
    date: '',
    due_date: '',
    status: 'unpaid',
    social_credit_impact: 'medium'
  });

  // Audio references
  const bgmRef = useRef(null);
  const successSoundRef = useRef(null);
  const minusSoundRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    bgmRef.current = new Audio('/social_cred/bgm/bgm Red Sun in the Sky.mp3');
    successSoundRef.current = new Audio('/social_cred/bgm/Chinese Gong sfx success.mp3');
    minusSoundRef.current = new Audio('/social_cred/bgm/minus social credit.mp3');
    
    // Set audio preload and volume
    [bgmRef.current, successSoundRef.current, minusSoundRef.current].forEach(audio => {
      audio.preload = 'auto';
      audio.volume = 0.7; // Set to 70% volume
    });

    bgmRef.current.loop = true;
    
    const playBGM = async () => {
      try {
        await bgmRef.current.play();
      } catch (error) {
        console.error('Audio playback failed:', error);
      }
    };
    
    playBGM();

    return () => {
      bgmRef.current.pause();
    };
  }, []);

  const playSuccessEffect = async () => {
    try {
      bgmRef.current.pause();
      await successSoundRef.current.play();
      setTimeout(() => {
        bgmRef.current.currentTime = 0; // Reset BGM to start
        bgmRef.current.play();
      }, 8000); // 8 seconds for success sound
    } catch (error) {
      console.error('Error playing success sound:', error);
    }
  };

  const playDeleteEffect = async () => {
    try {
      bgmRef.current.pause();
      await minusSoundRef.current.play();
      setTimeout(() => {
        bgmRef.current.currentTime = 0; // Reset BGM to start
        bgmRef.current.play();
      }, 13000); // 13 seconds for delete sound
    } catch (error) {
      console.error('Error playing delete sound:', error);
    }
  };

  // Calculate summary values
  const totalDebtAmount = debts.reduce((total, debt) => total + (debt.Data?.data?.value || 0), 0);
  const unpaidDebts = debts.filter(debt => debt.Data?.data?.status === 'unpaid');

  const handleAddRecord = async (e) => {
    e.preventDefault();
    try {
      await createDebt({
        data: {
          ...newRecord,
          value: parseFloat(newRecord.value),
          payment_history: []
        }
      });
      setShowAddModal(false);
      setNewRecord({
        description: '',
        value: '',
        date: '',
        due_date: '',
        status: 'unpaid',
        social_credit_impact: 'medium'
      });
      setShowSuccessModal(true);
      await playSuccessEffect();
      setTimeout(() => setShowSuccessModal(false), 8000); // Hide after 8 seconds
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleUpdateRecord = async (updatedRecord) => {
    try {
      await updateDebt(updatedRecord.DID, {
        data: {
          description: updatedRecord.description,
          value: parseFloat(updatedRecord.value),
          date: updatedRecord.date,
          due_date: updatedRecord.due_date,
          status: updatedRecord.status,
          payment_history: updatedRecord.payment_history || [],
          social_credit_impact: updatedRecord.social_credit_impact
        }
      });
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  if (loadingDebts) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <h2>{t('dashboard.loadingRecords')}</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="header-container">
        <h1 className="header-title">{t('dashboard.title')}</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="action-button"
        >
          {t('dashboard.addRecords')}
        </button>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>{t('dashboard.totalRecords')}</h3>
          <p>{debts.length}</p>
        </div>
        <div className="summary-card">
          <h3>{t('dashboard.totalAmount')}</h3>
          <p>${totalDebtAmount.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>{t('dashboard.unpaidRecords')}</h3>
          <p>{unpaidDebts.length}</p>
        </div>
      </div>

      <DebtList 
        debts={debts} 
        onDelete={deleteDebt} 
        onEdit={handleUpdateRecord}
        onDeleteSuccess={playDeleteEffect}
      />

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">{t('dashboard.addNewRecord')}</h2>
            <form onSubmit={handleAddRecord}>
              <div className="form-group">
                <label className="form-label">{t('dashboard.description')}</label>
                <input
                  type="text"
                  value={newRecord.description}
                  onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('dashboard.amount')}</label>
                <input
                  type="number"
                  value={newRecord.value}
                  onChange={(e) => setNewRecord({...newRecord, value: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('dashboard.date')}</label>
                <input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('dashboard.dueDate')}</label>
                <input
                  type="date"
                  value={newRecord.due_date}
                  onChange={(e) => setNewRecord({...newRecord, due_date: e.target.value})}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('dashboard.status')}</label>
                <select
                  value={newRecord.status}
                  onChange={(e) => setNewRecord({...newRecord, status: e.target.value})}
                  className="form-input"
                  required
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="action-button"
                >
                  {t('dashboard.cancel')}
                </button>
                <button
                  type="submit"
                  className="action-button confirm-button"
                >
                  {t('dashboard.addRecords')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <h3>{t('dashboard.recordAdded')}</h3>
            <img 
              src="/social_cred/images/social credit green.jpg" 
              alt="Success" 
              className="success-image"
            />
            <button
              onClick={() => setShowSuccessModal(false)}
              className="action-button"
            >
              {t('dashboard.continue')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}