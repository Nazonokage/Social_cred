// DebtList.jsx
import React, { useState } from 'react';

const DebtList = ({ debts, onDelete, onEdit, onDeleteSuccess }) => {
  const [editingRecord, setEditingRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handleEditClick = (record) => {
    setEditingRecord({
      DID: record.DID,
      description: record.Data?.data?.description || '',
      value: record.Data?.data?.value?.toString() || '',
      date: record.Data?.data?.date || '',
      due_date: record.Data?.data?.due_date || '',
      status: record.Data?.data?.status || 'unpaid',
      social_credit_impact: record.Data?.data?.social_credit_impact || 'medium'
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await onEdit(editingRecord);
    setEditingRecord(null);
  };

  const handleDeleteClick = (recordId) => {
    setRecordToDelete(recordId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await onDelete(recordToDelete);
      setShowDeleteModal(false);
      setShowDeleteSuccess(true);
      onDeleteSuccess(); // This will trigger the audio effects
      
      // Hide the success message after the audio finishes (13 seconds)
      setTimeout(() => {
        setShowDeleteSuccess(false);
      }, 13000);
    } catch (error) {
      console.error('Error deleting record:', error);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="debt-list-container">
      <div className="debt-list-header">
        <h2>Records List</h2>
      </div>
      
      {debts.length === 0 ? (
        <div className="no-debts-message">
          No records found
        </div>
      ) : (
        <>
          <table className="debt-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((record) => (
                <tr key={record.DID}>
                  <td>{record.Data?.data?.description}</td>
                  <td>${record.Data?.data?.value?.toLocaleString()}</td>
                  <td>{record.Data?.data?.date}</td>
                  <td>
                    <span className={`status-badge ${record.Data?.data?.status}`}>
                      {record.Data?.data?.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button
                      onClick={() => handleEditClick(record)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(record.DID)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Modal */}
          {editingRecord && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Edit Record</h2>
                <form onSubmit={handleEditSubmit}>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      value={editingRecord.description}
                      onChange={(e) => setEditingRecord({...editingRecord, description: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Amount</label>
                    <input
                      type="number"
                      value={editingRecord.value}
                      onChange={(e) => setEditingRecord({...editingRecord, value: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={editingRecord.status}
                      onChange={(e) => setEditingRecord({...editingRecord, status: e.target.value})}
                      required
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  
                  <div className="modal-actions">
                    <button
                      type="button"
                      onClick={() => setEditingRecord(null)}
                      className="action-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="action-button confirm-button"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="confirmation-modal">
                <h3>Confirm Deletion</h3>
                <img 
                  src="/social_cred/images/panda.jpg" 
                  alt="Confirmation" 
                  className="confirmation-image"
                />
                <p>Are you sure you want to delete this record?</p>
                <div className="confirmation-buttons">
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    className="action-button"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="action-button delete-confirm-button"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Success Modal */}
          {showDeleteSuccess && (
            <div className="modal-overlay">
              <div className="success-modal">
                <h3>Record Successfully Deleted!</h3>
                <img 
                  src="/social_cred/images/social credit red.jpg" 
                  alt="Success" 
                  className="success-image"
                />
                <button
                  onClick={() => setShowDeleteSuccess(false)}
                  className="action-button"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DebtList;