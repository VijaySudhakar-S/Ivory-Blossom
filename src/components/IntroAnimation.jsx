import React, { useState, useEffect, useRef } from 'react';

const TOTAL_FRAMES = 30;
const FPS = 20; // 20 frames per second for a smooth, slightly extended reveal

const IntroAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const frameImagesRef = useRef([]);
  const reqRef = useRef();
  const lastTimeRef = useRef();

  // On mount, preload images
  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Determine folder based on screen width
    const isMobile = window.innerWidth <= 768;
    const folder = isMobile ? 'mobile' : 'largerscreen';

    // Preload images
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/${folder}/ezgif-frame-${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          frameImagesRef.current = images;
          setIsLoaded(true);
        }
      };
      images.push(img);
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup fallback
    };
  }, []);

  const playAnimation = (time) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;

    if (delta > 1000 / FPS) {
      setCurrentFrame((prev) => {
        // Start fading out 3 frames before the end
        if (prev === TOTAL_FRAMES - 3) {
          setIsFadingOut(true);
          // Unlock scroll as soon as fade starts
          document.body.style.overflow = 'auto';
        }

        if (prev >= TOTAL_FRAMES) {
          setTimeout(() => {
            setIsFinished(true);
          }, 800); // Wait for fade out CSS transition

          return prev; // Stop at last frame
        }
        return prev + 1;
      });
      lastTimeRef.current = time;
    }

    if (!isFadingOut) {
      reqRef.current = requestAnimationFrame(playAnimation);
    }
  };

  useEffect(() => {
    if (isPlaying && !isFadingOut) {
      reqRef.current = requestAnimationFrame(playAnimation);
    }
    return () => cancelAnimationFrame(reqRef.current);
  }, [isPlaying, isFadingOut]);

  const handleClick = () => {
    if (!isLoaded || isPlaying || isFinished) return;
    setIsPlaying(true);
  };

  if (isFinished) return null;

  return (
    <div 
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999, // Ensure it covers everything
        backgroundColor: '#000', // Black background while loading/playing
        cursor: (!isLoaded || isPlaying) ? 'default' : 'pointer',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out'
      }}
    >
      {/* Display the current preloaded frame */}
      {frameImagesRef.current.length > 0 && (
        <img 
          src={frameImagesRef.current[currentFrame - 1].src} 
          alt="Wedding Intro Frame"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Loading overlay if images are not yet ready */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'var(--color-ivory)',
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
};

export default IntroAnimation;
