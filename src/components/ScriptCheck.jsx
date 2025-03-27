import { useRef, useEffect } from 'react';

const ScriptCheck = ({ showWarning, onReset, duration = 3000 }) => {
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  useEffect(() => {
    if (showWarning) {
      // Reset and play the warning sound each time the warning is shown
      if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reset audio to start
        audioRef.current.volume = 1; // Reset volume to full
        audioRef.current.play().catch(e => console.error('Audio play failed:', e));

        // Start fade out after 3 seconds (fade over 1 second)
        const fadeStartTime = 3000;
        const fadeDuration = 1000;
        let fadeStart = null;

        const fadeAudio = (timestamp) => {
          if (!fadeStart) fadeStart = timestamp;
          const progress = timestamp - fadeStart;
          
          if (progress < fadeDuration) {
            // Calculate new volume (linear fade)
            const newVolume = 1 - (progress / fadeDuration);
            audioRef.current.volume = Math.max(0, newVolume);
            fadeIntervalRef.current = requestAnimationFrame(fadeAudio);
          } else {
            // Fade complete
            audioRef.current.pause();
            audioRef.current.volume = 1; // Reset volume for next time
          }
        };

        // Start fade after fadeStartTime
        setTimeout(() => {
          fadeIntervalRef.current = requestAnimationFrame(fadeAudio);
        }, fadeStartTime);
      }

      // Automatically hide after duration
      const timer = setTimeout(() => {
        onReset();
      }, duration);

      return () => {
        clearTimeout(timer);
        if (fadeIntervalRef.current) {
          cancelAnimationFrame(fadeIntervalRef.current);
        }
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.volume = 1; // Reset volume
        }
      };
    }
  }, [showWarning, onReset, duration]);

  if (!showWarning) return null;

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/social_cred/bgm/minus social credit.mp3" preload="auto" />
      
      {/* Panda Slap Modal */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <img 
          src="/social_cred/images/pandaSlap.jpg" 
          alt="Security Warning"
          style={{
            maxWidth: '80%',
            maxHeight: '80%',
            borderRadius: '12px',
            border: '4px solid rgba(173, 31, 41, 0.9)'
          }}
        />
      </div>
    </>
  );
};

export const useSecurity = () => {
  const securityPatterns = {
    xss: /<script\b[^>]*>([\s\S]*?)<\/script>|javascript:|on\w+\s*=|eval\(|alert\(|document\.|window\./i,
    sqlInjection: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|ALTER|CREATE|TRUNCATE)\b|\b(OR\s+['"\d\w]\s*=\s*['"\d\w])|\b(AND|OR)\s+\d+\s*=\s*\d+|(--|\/\*|\*\/|;|\b(WAITFOR|DELAY)\b))/i,
    commandInjection: /(\b(rm|wget|curl|nc|netcat|ping|nslookup|cmd\.exe)\b|\|\||&&|`|\$\(|\$\{)/i,
    htmlInjection: /<[^>]*>|&[a-z0-9#]+;/i,
    pathTraversal: /\.\.\/|\.\.\\|\/etc\/passwd|\/bin\/sh|\/bin\/bash/i,
    specialChars: /[<>"'`;\\]/,
    rapidInput: /.{20,}/
  };

  const isMaliciousInput = (value) => {
    return Object.values(securityPatterns).some(pattern => pattern.test(value));
  };

  const checkInputSpeed = (event, lastInputTimeRef, threshold = 100) => {
    const now = event.timeStamp;
    const lastTime = lastInputTimeRef.current || 0;
    lastInputTimeRef.current = now;
    return (now - lastTime) < threshold; // Too fast if less than threshold ms
  };

  return { isMaliciousInput, checkInputSpeed };
};

export default ScriptCheck;