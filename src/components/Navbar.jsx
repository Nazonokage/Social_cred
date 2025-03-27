import { Link } from 'react-router-dom';
import { useTranslation, useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const t = useTranslation();
  const { language, switchLanguage } = useLanguage();
  const { user, logout } = useUser();

  const toggleLanguage = () => {
    const newLang = language === 'cn' ? 'en' : 'cn';
    switchLanguage(newLang);
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 5%',
      backgroundColor: 'rgba(173, 31, 41, 0.95)',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Logo and App Name */}
      <Link to="/" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        textDecoration: 'none'
      }}>
        <img 
          src="/social_cred/images/john xina.jpg" 
          alt="Logo" 
          style={{ 
            height: '40px', 
            width: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
        />
        <h1 style={{ 
          color: '#FFDE59',
          fontSize: '1.4rem',
          margin: 0,
          fontWeight: '600',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
        }}>
          {t('home.title')}
        </h1>
      </Link>

      {/* Navigation Links */}
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        alignItems: 'center',
        color: 'white'
      }}>
        {/* Dashboard Link - Only shown when logged in */}
        {user && (
          <Link
            to="/dashboard"
            style={{
              color: 'white',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '0.5rem 1.2rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem'
            }}
            onMouseOver={(e) => e.target.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.target.background = 'rgba(255, 255, 255, 0.1)'}
          >
            {t('dashboard.title')}
          </Link>
        )}

        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1rem',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.target.background = 'rgba(255, 255, 255, 0.2)'}
          onMouseOut={(e) => e.target.background = 'rgba(255, 255, 255, 0.1)'}
        >
          <span style={{ fontSize: '0.9rem' }}>
            {language === 'cn' ? '中文' : 'English'}
          </span>
          <span style={{ 
            fontSize: '0.8rem',
            opacity: 0.8
          }}>
            {language === 'cn' ? '⇄ EN' : '⇄ 中文'}
          </span>
        </button>

        {/* User or Auth Links */}
        {user ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link 
              to="/profile" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '0.5rem 1.2rem',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                fontSize: '0.95rem'
              }}
              onMouseOver={(e) => e.target.background = 'rgba(255, 255, 255, 0.2)'}
              onMouseOut={(e) => e.target.background = 'rgba(255, 255, 255, 0.1)'}
            >
              {user.name}
            </Link>
            <button 
              onClick={logout}
              style={{
                background: 'rgba(255, 0, 0, 0.2)',
                border: 'none',
                borderRadius: '20px',
                padding: '0.5rem 1.2rem',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                fontSize: '0.95rem'
              }}
              onMouseOver={(e) => e.target.background = 'rgba(255, 0, 0, 0.3)'}
              onMouseOut={(e) => e.target.background = 'rgba(255, 0, 0, 0.2)'}
            >
              {t('nav.logout')}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link 
              to="/register" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '0.5rem 0',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.target.style.textDecoration = 'none';
                e.target.querySelector('span').style.width = '100%';
              }}
              onMouseOut={(e) => {
                e.target.querySelector('span').style.width = '0%';
              }}
            >
              {t('register.title')}
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '0%',
                height: '2px',
                backgroundColor: 'white',
                transition: 'width 0.3s ease'
              }}></span>
            </Link>
            <Link 
              to="/login" 
              style={{ 
                color: 'white', 
                textDecoration: 'none',
                padding: '0.5rem 0',
                transition: 'all 0.3s ease',
                fontWeight: '500',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.target.style.textDecoration = 'none';
                e.target.querySelector('span').style.width = '100%';
              }}
              onMouseOut={(e) => {
                e.target.querySelector('span').style.width = '0%';
              }}
            >
              {t('login.title')}
              <span style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '0%',
                height: '2px',
                backgroundColor: 'white',
                transition: 'width 0.3s ease'
              }}></span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}