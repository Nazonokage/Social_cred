import React, { useEffect, useState } from 'react';

export const BG_IMAGE = "/social_cred/images/Bg img.jpg";
export const LOGIN_VIDEO = "/social_cred/videos/Tom ching cheng hanji (752 X 720 60fps).mp4";
export const GREETING_GIF = "/social_cred/images/greetings.gif";

export default function Loading({ onComplete }) {
  const [showVideo, setShowVideo] = useState(true);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    if (showVideo) {
      const timer = setTimeout(() => {
        setShowVideo(false);
        setShowGreeting(true);
      }, 5000); // 10 seconds for video

      return () => clearTimeout(timer);
    }

    if (showGreeting) {
      const timer = setTimeout(() => {
        setShowGreeting(false);
        onComplete();
      }, 2000); // 2 seconds for greeting

      return () => clearTimeout(timer);
    }
  }, [showVideo, showGreeting, onComplete]);

  return (
    <>
      {showVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <video 
            autoPlay 
            playsInline
            style={{ 
              maxWidth: '90%', 
              maxHeight: '90%',
              borderRadius: '8px'
            }}
          >
            <source src={LOGIN_VIDEO} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {showGreeting && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <img 
            src={GREETING_GIF} 
            alt="Greeting" 
            style={{ 
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '8px'
            }}
          />
        </div>
      )}
    </>
  );
}