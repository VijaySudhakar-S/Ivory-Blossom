import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const OurStory = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Cinematic image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.05 },
        { 
          clipPath: "inset(0 0% 0 0)", 
          scale: 1, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          }
        }
      );

      // Text stagger reveal (linked to scroll)
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center 40%",
            scrub: 1
          }
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
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1rem, 5vw, 2rem)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Image Layer */}
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
        zIndex: 0
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: 'clamp(2rem, 6vw, 4rem)', 
        alignItems: 'center'
      }}>
        {/* LEFT: Image */}
        <div style={{ position: 'relative', height: 'clamp(350px, 50vh, 700px)', overflow: 'hidden', borderRadius: '4px' }}>
          <img 
            ref={imageRef}
            src="/couple_tamil_1785663457191.png" 
            alt="Ajith and Shalini"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Subtle gold ornamental frame */}
          <div style={{ 
            position: 'absolute', 
            top: '15px', left: '15px', right: '15px', bottom: '15px', 
            border: '1px solid rgba(212, 167, 58, 0.4)', 
            pointerEvents: 'none' 
          }} />
        </div>

        {/* RIGHT: Text */}
        <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '0 1rem' }}>
          
          <p style={{
            letterSpacing: '0.25em',
            fontSize: 'clamp(0.8rem, 3vw, 1rem)',
            color: 'var(--color-charcoal)',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            How we met
          </p>

          <h2 style={{ 
            fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
            lineHeight: '1.1', 
            color: 'var(--color-temple-red)',
            fontFamily: 'var(--font-serif)',
            margin: '0.5rem 0'
          }}>
            OUR STORY
          </h2>
          
          <h3 className="tamil-text" style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', 
            color: 'var(--color-trad-gold)', 
            marginBottom: '1rem' 
          }}>
            எங்கள் காதல் கதை
          </h3>
          
          {/* Ornamental Divider */}
          <div style={{
            margin: '1.5rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: 'var(--color-trad-gold)'
          }}>
            <div style={{ width: '60px', height: '1px', backgroundColor: 'currentColor' }} />
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>✧</span>
            <div style={{ width: '60px', height: '1px', backgroundColor: 'currentColor' }} />
          </div>

          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.15rem)', 
            lineHeight: '1.9', 
            color: 'var(--color-charcoal)' 
          }}>
            With the blessings of our families, we invite you to celebrate the beginning of our next chapter. What began as a serendipitous meeting in the city has grown into a lifetime of shared dreams and traditions.
          </p>
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.15rem)', 
            lineHeight: '1.9', 
            color: 'var(--color-charcoal)' 
          }}>
            We cannot wait to honor our heritage and share our joy with you in Coimbatore, surrounded by the vibrant culture, music, and love of our people.
          </p>
          
          <p className="tamil-text" style={{ 
            fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', 
            color: 'var(--color-temple-red)', 
            marginTop: '2rem' 
          }}>
            அன்புடன் அழைக்கிறோம்
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
