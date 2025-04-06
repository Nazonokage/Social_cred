import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import api from '../services/api';
import '../styles/profile.css';

export default function Profile() {
  const { user, setUser, logout } = useContext(UserContext);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    address: '',
    credit_score: 0,
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const audioRef = useRef(null);
  const t = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        credit_score: user.credit_score || 0,
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError(t('profile.passwordMismatch'));
      return;
    }
  
    try {
      const updateData = {
        name: formData.name,
        address: formData.address
      };
  
      if (formData.password) {
        updateData.password = formData.password;
      }
  
      const response = await api.put('/auth/profile', updateData);
      
      // Update user context with new data
      setUser(prev => ({
        ...prev,
        ...response.data.user
      }));
      
      setError('');
      setSuccess(true);
      
      if (audioRef.current) {
        audioRef.current.play();
      }
  
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
  
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError(err.response?.data?.error || t('profile.updateError'));
      }
      setSuccess(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="profile-loading-content">
          <h2 style={{ marginBottom: '1rem' }}>{t('common.loading')}</h2>
          <div className="profile-loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <audio 
        ref={audioRef} 
        src="/social_cred/bgm/Chinese Gong sfx success.mp3" 
        preload="auto"
      />
      
      <div className="profile-card">
        <div className="profile-left">
          {success ? (
            <div className="profile-success">
              <img 
                src="/social_cred/images/panda.jpg" 
                alt="Success" 
                className="profile-image"
              />
              <div className="profile-success-text">
                {t('profile.updateSuccess')}
              </div>
            </div>
          ) : (
            <div className="profile-default">
              <img 
                src="/social_cred/images/john xina.jpg" 
                alt="Profile" 
                className="profile-image"
              />
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-credit">
                {t('profile.socialCreditScore')}: {formData.credit_score}
              </p>
            </div>
          )}
        </div>

        <div className="profile-right">
          {error && (
            <div className="profile-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="profile-form-grid">
              <div>
                <label className="profile-label">
                  {t('profile.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="profile-input"
                />
              </div>

              <div>
                <label className="profile-label">
                  {t('profile.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="profile-input profile-input-disabled"
                />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="profile-label">
                {t('profile.address')}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="profile-input"
              />
            </div>

            <div className="profile-password-section">
              <h3 className="profile-password-title">
                {t('profile.changePassword')}
              </h3>
              
              <div className="profile-form-grid">
                <div>
                  <label className="profile-label">
                    {t('profile.newPassword')}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder={t('profile.newPasswordPlaceholder')}
                  />
                </div>
                
                <div>
                  <label className="profile-label">
                    {t('profile.confirmPassword')}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="profile-input"
                    placeholder={t('profile.confirmPasswordPlaceholder')}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="profile-submit-button"
            >
              {t('profile.updateButton')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}