import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { useTranslation } from '../context/LanguageContext';
import Loading from '../components/Loading';
import ScriptCheck, { useSecurity } from '../components/ScriptCheck';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showSecurityWarning, setShowSecurityWarning] = useState(false);
  
  const passwordInputRef = useRef(null);
  const formRef = useRef(null);
  const lastInputTimeRef = useRef(0);

  const navigate = useNavigate();
  const t = useTranslation();
  const { isMaliciousInput, checkInputSpeed } = useSecurity();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check for all types of malicious input
    if (isMaliciousInput(value)) {
      handleSecurityViolation();
      return;
    }

    // Special password validation
    if (name === 'password') {
      // Check for rapid input (likely ctrl+v or fast typing)
      if (checkInputSpeed(e, lastInputTimeRef)) {
        handleSecurityViolation();
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSecurityViolation = () => {
    setShowSecurityWarning(true);
    setFormData({ name: '', email: '', password: '', address: '' });
    setError(t('register.security_error'));
    
    if (formRef.current) {
      formRef.current.querySelectorAll('input').forEach(input => {
        input.value = '';
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axios.post('auth/register', formData);
      setShowLoader(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || t('register.error'));
    }
  };

  const handleLoadingComplete = () => {
    navigate('/login');
  };

  const resetSecurityWarning = () => {
    setShowSecurityWarning(false);
    setError('');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: `url('/social_cred/images/Bg img.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '1rem',
      paddingTop: '5rem'
    }}>
      {/* Security Warning Component */}
      <ScriptCheck 
        showWarning={showSecurityWarning} 
        onReset={resetSecurityWarning} 
      />

      {!showLoader && (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
          border: `4px solid rgba(173, 31, 41, 0.9)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative accent */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'linear-gradient(to right, rgba(173, 31, 41, 0.9), rgba(255, 215, 0, 0.9))'
          }}></div>

          <h2 style={{ 
            color: 'rgba(173, 31, 41, 0.9)',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: '700'
          }}>
            {t('register.title')}
          </h2>
          
          {error && <div style={{ 
            color: 'rgba(173, 31, 41, 0.9)',
            marginBottom: '1rem',
            padding: '0.5rem',
            backgroundColor: 'rgba(173, 31, 41, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '500'
          }}>{error}</div>}

          <form onSubmit={handleSubmit} ref={formRef}>
            {/* Name Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#333',
                fontWeight: '600' 
              }}>
                {t('register.name')}
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid rgba(173, 31, 41, 0.3)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(173, 31, 41, 0.7)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(173, 31, 41, 0.3)'}
              />
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#333',
                fontWeight: '600' 
              }}>
                {t('register.email')}
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid rgba(173, 31, 41, 0.3)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(173, 31, 41, 0.7)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(173, 31, 41, 0.3)'}
              />
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#333',
                fontWeight: '600' 
              }}>
                {t('register.password')}
              </label>
              <input
                ref={passwordInputRef}
                type="password"
                name="password"
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid rgba(173, 31, 41, 0.3)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(173, 31, 41, 0.7)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(173, 31, 41, 0.3)'}
              />
            </div>

            {/* Address Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#333',
                fontWeight: '600' 
              }}>
                {t('register.address')}
              </label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid rgba(173, 31, 41, 0.3)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(173, 31, 41, 0.7)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(173, 31, 41, 0.3)'}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'rgba(173, 31, 41, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '0.5rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 8px rgba(0,0,0,0.15)')}
              onMouseOut={(e) => !isLoading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)')}
            >
              {isLoading ? t('common.loading') : t('register.submit')}
            </button>
          </form>

          <p style={{ 
            textAlign: 'center', 
            marginTop: '1rem',
            color: '#555',
            fontSize: '0.9rem'
          }}>
            {t('register.existingAccount')}{' '}
            <a 
              href="/social_cred/login" 
              style={{ 
                color: 'rgba(173, 31, 41, 0.9)',
                fontWeight: '700',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = 'rgba(255, 215, 0, 0.9)'}
              onMouseOut={(e) => e.target.style.color = 'rgba(173, 31, 41, 0.9)'}
            >
              {t('register.login')}
            </a>
          </p>
        </div>
      )}

      {showLoader && <Loading onComplete={handleLoadingComplete} />}
    </div>
  );
}