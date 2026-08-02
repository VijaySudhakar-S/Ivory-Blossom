import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroTemple = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const pngRef = useRef(null);
  const bgRef = useRef(null);
  const lotusLeftRef = useRef(null);
  const lotusRightRef = useRef(null);
  const heroTopLeftRef = useRef(null);
  const heroTopRightRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Initial Load Animation
      const introTl = gsap.timeline();
      
      introTl.from(bgRef.current, { opacity: 0, scale: 1.05, duration: 1.5, ease: "power2.out" })
             .from(textRef.current.children, { 
               y: 30, 
               opacity: 0, 
               duration: 1, 
               stagger: 0.15, 
               ease: "power3.out" 
             }, "-=1")
             .from([lotusLeftRef.current, lotusRightRef.current], {
               y: 20,
               opacity: 0,
               duration: 1,
               ease: "power2.out"
             }, "-=0.8")
             .from([heroTopLeftRef.current, heroTopRightRef.current], {
               y: -20,
               opacity: 0,
               duration: 1,
               ease: "power2.out"
             }, "-=1");

      // Scroll Parallax Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%", // Pinned for 150% of viewport height to allow smooth scroll duration
          pin: true,
          scrub: 1, // Smooth scrub
        }
      });

      tl.fromTo(pngRef.current, 
        { yPercent: 100 },
        { yPercent: 0, ease: "none", duration: 1 },
        0
      )
      .to(textRef.current, 
        { scale: 0.9, y: -50, ease: "none", duration: 1 },
        0
      )
      .to(textRef.current,
        { opacity: 0, ease: "none", duration: 0.4 },
        0.6 // Starts fading when scroll progress is at 60%
      )
      // Subtle background scale to enhance depth
      .to(bgRef.current,
        { scale: 1.05, ease: "none", duration: 1 },
        0
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden',
        backgroundColor: 'var(--color-ivory)'
      }}
    >
      
      {/* LAYER 1: Watercolor Background (Back) */}
      <div 
        ref={bgRef}
        style={{
          position: 'absolute', 
          top: 0, left: 0, 
          width: '100%', height: '100%',
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          zIndex: 1
        }}
      />

      {/* LAYER 2: Text Middle Layer */}
      <div 
        ref={textRef}
        style={{
          position: 'relative', 
          zIndex: 10, 
          height: '100%',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          paddingBottom: 'clamp(8rem, 25vh, 12rem)' // Pushes content up to clear the temple arch
        }}
      >
        <p style={{ 
          letterSpacing: '0.2em', 
          fontSize: 'clamp(0.7rem, 3vw, 1rem)', 
          marginBottom: '2rem', 
          fontWeight: 500, 
          textTransform: 'uppercase',
          color: 'var(--color-temple-red)'
        }}>
          Together with their families
        </p>
        
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 12vw, 6rem)', 
          lineHeight: '1', 
          color: 'var(--color-temple-red)', 
        }}>
          AJITH
        </h1>
        
        <span style={{ 
          fontSize: 'clamp(2rem, 8vw, 3.5rem)', 
          fontStyle: 'italic', 
          color: 'var(--color-trad-gold)', 
          margin: '1.5rem 0',
        }}>
          &
        </span>
        
        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 12vw, 6rem)', 
          lineHeight: '1', 
          color: 'var(--color-temple-red)', 
          marginBottom: 'clamp(1rem, 4vh, 3rem)', 
        }}>
          SHALINI
        </h1>
        
        <p style={{ 
          letterSpacing: '0.15em', 
          fontSize: 'clamp(1rem, 4vw, 1.4rem)', 
          marginBottom: '0.8rem', 
          fontFamily: 'var(--font-serif)',
          color: 'var(--color-charcoal)'
        }}>
          12 &bull; 09 &bull; 2026
        </p>
        
        <p style={{ 
          letterSpacing: '0.1em', 
          fontSize: 'clamp(0.7rem, 3vw, 1rem)', 
          textTransform: 'uppercase',
          color: 'var(--color-charcoal)'
        }}>
          Coimbatore, Tamil Nadu
        </p>
      </div>

      {/* LAYER 2.5: Lotus Decorations */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 15, overflow: 'hidden' }}>
        
        {/* Top Left Decoration */}
        <img 
          ref={heroTopLeftRef}
          src="/hero-top.png" 
          alt="Top Decoration"
          style={{ 
            position: 'absolute', 
            top: '0', 
            left: '-1%', 
            width: 'clamp(100px, 25vw, 250px)',
            objectFit: 'contain'
          }}
        />

        {/* Top Right Decoration */}
        <img 
          ref={heroTopRightRef}
          src="/hero-top.png" 
          alt="Top Decoration"
          style={{ 
            position: 'absolute', 
            top: '0', 
            right: '-1%', 
            width: 'clamp(100px, 25vw, 250px)',
            objectFit: 'contain',
            transform: 'scaleX(-1)' // Flipped horizontally
          }}
        />
        <img 
          ref={lotusLeftRef}
          src="/lotus.png" 
          alt="Lotus"
          style={{ 
            position: 'absolute', 
            bottom: '-3%', 
            left: '-4%', 
            width: 'clamp(120px, 30vw, 350px)',
            objectFit: 'contain'
          }}
        />
        <img 
          ref={lotusRightRef}
          src="/lotus.png" 
          alt="Lotus"
          style={{ 
            position: 'absolute', 
            bottom: '-3%', 
            right: '-4%', 
            width: 'clamp(120px, 30vw, 350px)',
            objectFit: 'contain',
            transform: 'scaleX(-1)' // Flipped horizontally
          }}
        />
      </div>

      {/* Foreground Transparent PNG */}
      <div 
        ref={pngRef}
        style={{ 
          position: 'absolute', 
          bottom: 0, left: 0, 
          width: '100%', height: '100%', 
          pointerEvents: 'none', 
          zIndex: 20,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}
      >
        <img 
          src="/hero-couple.png" 
          alt="Wedding Couple"
          style={{ 
            width: '100%', 
            maxHeight: '100%', 
            objectFit: 'contain',
            objectPosition: 'bottom center'
          }}
        />
      </div>

      {/* Bottom Gradient Fade */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100px',
          background: 'linear-gradient(to top, white, transparent)',
          zIndex: 25,
          pointerEvents: 'none'
        }}
      />
      
    </section>
  );
};

export default HeroTemple;
