import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Section2Ceremony = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const bellLeftRef = useRef(null);
  const bellRightRef = useRef(null);
  const bottomImgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Content fade in as section enters viewport
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%", 
            scrub: 1
          }
        }
      );

      // 2. Pin section and animate (text out, bottom image in)
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // Pinned for 150% of viewport height
          pin: true,
          scrub: 1
        }
      });

      pinTl.to(".hide-on-scroll", { opacity: 0, y: -30, duration: 1, stagger: 0.05 }, 0)
           .fromTo(bottomImgRef.current, { yPercent: 100 }, { yPercent: 0, duration: 1 }, 0);


      // 3. Gentle swinging animation for bells
      gsap.fromTo([bellLeftRef.current, bellRightRef.current], 
        { rotation: -3 },
        {
          rotation: 3,
          transformOrigin: "top center",
          ease: "sine.inOut",
          duration: 2.5,
          yoyo: true,
          repeat: -1
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '8rem 2rem 0 2rem', // Reduced bottom padding since image will cover it
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--color-ivory)'
      }}
    >
      {/* Rotated Background Image Layer - Always fixed behind */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        transform: 'rotate(180deg)',
        zIndex: 0
      }} />

      {/* Top Gradient Fade */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '150px',
          background: 'linear-gradient(to bottom, white, transparent)',
          zIndex: 25,
          pointerEvents: 'none'
        }}
      />

            {/* Bottom Gradient Fade */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50px',
          background: 'linear-gradient(to top, white, transparent)',
          zIndex: 25,
          pointerEvents: 'none'
        }}
      />

      {/* Bell Left */}
      <img 
        ref={bellLeftRef}
        src="/bell.png" 
        alt="Bell Decoration"
        style={{
          position: 'absolute',
          left: '2%',
          top: '0',
          width: 'clamp(100px, 22vw, 150px)',
          pointerEvents: 'none',
          zIndex: 5
        }}
      />

      {/* Bell Right */}
      <div 
        ref={bellRightRef}
        style={{
          position: 'absolute',
          right: '2%',
          top: '0',
          width: 'clamp(100px, 22vw, 150px)',
          pointerEvents: 'none',
          zIndex: 5
        }}
      >
        <img 
          src="/bell.png" 
          alt="Bell Decoration"
          style={{
            width: '100%',
            transform: 'scaleX(-1)'
          }}
        />
      </div>


      {/* Content Container */}
      <div 
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.2rem',
          maxWidth: '800px',
          willChange: 'transform, opacity' // optimization
        }}
      >
        <p style={{
          letterSpacing: '0.25em',
          fontSize: 'clamp(0.8rem, 3vw, 1.1rem)',
          color: 'var(--color-charcoal)',
          textTransform: 'uppercase',
          fontWeight: 500
        }}>
          Join us to celebrate
        </p>

        <h2 style={{
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          color: 'var(--color-temple-red)',
          fontFamily: 'var(--font-serif)',
          lineHeight: '1.1',
          margin: '0.5rem 0 1.5rem 0'
        }}>
          THE WEDDING<br/>CEREMONY
        </h2>

        <p className="hide-on-scroll" style={{
          letterSpacing: '0.2em',
          fontSize: 'clamp(1.1rem, 4.5vw, 1.5rem)',
          color: 'var(--color-charcoal)',
          fontFamily: 'var(--font-serif)'
        }}>
          12 &bull; SEPTEMBER &bull; 2026
        </p>
        
        <p className="hide-on-scroll" style={{
          letterSpacing: '0.15em',
          fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
          color: 'var(--color-charcoal)',
          textTransform: 'uppercase'
        }}>
          09:00 AM ONWARDS
        </p>

        {/* Ornamental Divider */}
        <div className="hide-on-scroll" style={{
          margin: '2.5rem 0',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          color: 'var(--color-trad-gold)'
        }}>
          <div style={{ width: '80px', height: '1px', backgroundColor: 'currentColor' }} />
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>✧</span>
          <div style={{ width: '80px', height: '1px', backgroundColor: 'currentColor' }} />
        </div>

        {/* Venue Info */}
        <div className="hide-on-scroll" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
            color: 'var(--color-temple-red)',
            fontFamily: 'var(--font-serif)',
            fontWeight: '400'
          }}>
            Vivanta Coimbatore
          </h3>
          <p style={{
            letterSpacing: '0.15em',
            fontSize: 'clamp(0.85rem, 3vw, 1.1rem)',
            color: 'var(--color-charcoal)',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            105 Race Course Rd<br/>Coimbatore, Tamil Nadu 641018
          </p>
          
          {/* Location Pin Icon */}
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--color-trad-gold)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      </div>

      {/* Foreground Bottom Image Layer */}
      <div 
        ref={bottomImgRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 20,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pointerEvents: 'none' // Don't block interactions if any
        }}
      >
        <img 
          src="/section2-bottom.png" 
          alt="Bottom Decoration"
          style={{
            width: '100%',
            minWidth: 'max(100%, 800px)', // Forces zoom on narrow mobile screens
            height: 'auto',
            objectFit: 'cover',
            objectPosition: 'bottom center'
          }}
        />
      </div>

    </section>
  );
};

export default Section2Ceremony;
