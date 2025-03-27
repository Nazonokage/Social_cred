import { useState } from 'react';
import axios from '../services/api';

export default function AddDebt({ onAddDebt }) {
  const [formData, setFormData] = useState({
    value: '',
    description: '',
    status: 'unpaid',
    due_date: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const debtData = {
        date: new Date().toISOString().split('T')[0],
        value: parseFloat(formData.value),
        description: formData.description,
        status: formData.status,
        due_date: formData.due_date,
        payment_history: []
      };

      const { data } = await axios.post('/auth/debts', {
        data: JSON.stringify(debtData)
      });

      onAddDebt(data);
      setFormData({
        value: '',
        description: '',
        status: 'unpaid',
        due_date: ''
      });
    } catch (err) {
      console.error('Failed to add debt:', err);
      setError(err.response?.data?.error || '添加债务失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ 
        color: 'var(--chinese-red)',
        marginBottom: '1rem'
      }}>
        添加新债务
      </h3>
      
      {error && <div style={{ 
        color: 'var(--chinese-red)',
        marginBottom: '1rem',
        padding: '0.5rem',
        backgroundColor: '#ffecec',
        borderRadius: '4px'
      }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>金额</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>描述</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength="255"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>状态</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="unpaid">未支付</option>
            <option value="partial">部分支付</option>
            <option value="paid">已支付</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>到期日</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: submitting ? '#ccc' : 'var(--chinese-red)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: submitting ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? '提交中...' : '添加债务'}
        </button>
      </form>
    </div>
  );
}