import React from 'react';
import { useTranslation } from '../context/LanguageContext';

export default function Home() {
  const t = useTranslation();

  return (
    <div style={{
      display: 'flex',
      height: '120vh',
      backgroundImage: 'url("/social_cred/images/mao-zedong.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      {/* Left side content */}
      <div style={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        backgroundColor: 'rgba(194, 122, 122, 0.54)',
        height: '100%'
      }}>
        <h2 style={{ 
          color: 'var(--chinese-red)',
          fontSize: '3rem',
          marginBottom: '1.5rem',
          fontWeight: 'bold'
        }}>
          {t('home.title')}
        </h2>
        <p style={{ 
          maxWidth: '500px',
          lineHeight: '1.8',
          marginBottom: '2.5rem',
          fontSize: '1.2rem',
          color: 'var(--dark-charcoal)'
        }}>
          {t('home.description')}
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a 
            href="/social_cred/register" 
            style={{
              padding: '0.875rem 1.75rem',
              backgroundColor: 'var(--chinese-red)',
              color: 'white',
              borderRadius: '6px',
              fontWeight: 'bold',
              textDecoration: 'none',
              transition: 'transform 0.2s ease-in-out',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            {t('home.registerBtn')}
          </a>
          <a 
            href="/social_cred/login" 
            style={{
              padding: '0.875rem 1.75rem',
              backgroundColor: 'var(--imperial-yellow)',
              color: 'var(--dark-charcoal)',
              borderRadius: '6px',
              fontWeight: 'bold',
              textDecoration: 'none',
              transition: 'transform 0.2s ease-in-out',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            {t('home.loginBtn')}
          </a>
        </div>
      </div>

      
    </div>
  );
}