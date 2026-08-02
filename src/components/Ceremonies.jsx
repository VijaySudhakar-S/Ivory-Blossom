import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Ceremonies = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const timelineEvents = [
    {
      id: 'nalangu',
      title: 'Nalangu',
      time: 'Friday, 05:00 PM',
      venue: 'Vivanta Coimbatore, 105 Race Course Rd',
      desc: 'A joyful pre-wedding ritual where turmeric and kumkum are applied to bless the couple, accompanied by traditional singing and laughter.',
    },
    {
      id: 'muhurtham',
      title: 'Muhurtham',
      time: 'Saturday, 06:30 AM',
      venue: 'Vivanta Coimbatore, 105 Race Course Rd',
      desc: 'The most auspicious moment. The groom ties the Thaali around the bride\'s neck to the crescendo of Nadaswaram and Thavil.',
    },
    {
      id: 'reception',
      title: 'Reception',
      time: 'Saturday, 07:00 PM',
      venue: 'Vivanta Coimbatore, 105 Race Course Rd',
      desc: 'An evening of celebration, music, and a grand feast to welcome our guests and family.',
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate each timeline item as it enters the viewport
      const items = gsap.utils.toArray('.timeline-item');
      
      items.forEach((item) => {
        gsap.fromTo(item, 
          { opacity: 0, x: -30, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%", // Triggers when the item's top is 85% down the viewport
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Animate the vertical line height
      const line = document.querySelector('.timeline-line');
      if (line) {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 50%",
              scrub: true
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(5rem, 10vw, 10rem) clamp(1rem, 5vw, 2rem)', overflow: 'hidden' }}>
      
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
        transform: 'rotate(180deg)',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <p style={{
            letterSpacing: '0.25em',
            fontSize: 'clamp(0.8rem, 3vw, 1rem)',
            color: 'var(--color-charcoal)',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            The Rituals
          </p>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
            color: 'var(--color-temple-red)',
            fontFamily: 'var(--font-serif)',
            margin: '0.5rem 0'
          }}>
            TIMELINE
          </h2>
          
          {/* Ornamental Divider */}
          <div style={{
            margin: '1.5rem auto 0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            color: 'var(--color-trad-gold)'
          }}>
            <div style={{ width: '80px', height: '1px', backgroundColor: 'currentColor' }} />
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>✧</span>
            <div style={{ width: '80px', height: '1px', backgroundColor: 'currentColor' }} />
          </div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} style={{ position: 'relative', paddingLeft: 'clamp(2rem, 5vw, 3rem)' }}>
          
          {/* The Vertical Line */}
          <div 
            className="timeline-line"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: 'var(--color-trad-gold)',
              opacity: 0.5
            }}
          />

          {/* Timeline Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4rem, 8vw, 6rem)' }}>
            {timelineEvents.map((event) => (
              <div key={event.id} className="timeline-item" style={{ position: 'relative' }}>
                
                {/* The Timeline Dot */}
                <div style={{
                  position: 'absolute',
                  left: 'calc(-1 * clamp(2rem, 5vw, 3rem) - 7px)', // Align with the line (left padding + line width offset)
                  top: '10px', // slightly offset to align with title
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-ivory)',
                  border: '3px solid var(--color-trad-gold)',
                  boxShadow: '0 0 10px rgba(212, 167, 58, 0.4)'
                }} />

                {/* Event Content */}
                <div>
                  <h3 style={{ 
                    fontSize: 'clamp(2rem, 6vw, 2.5rem)', 
                    color: 'var(--color-trad-gold)', 
                    fontFamily: 'var(--font-serif)',
                    marginBottom: '0.5rem',
                    lineHeight: 1
                  }}>
                    {event.title}
                  </h3>
                  <p style={{ 
                    fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', 
                    fontFamily: 'var(--font-serif)', 
                    color: 'var(--color-temple-red)', 
                    fontStyle: 'italic',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem'
                  }}>
                    {event.time}
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                    color: 'var(--color-charcoal)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '1rem',
                    fontWeight: 500
                  }}>
                    {event.venue}
                  </p>
                  <p style={{ 
                    fontSize: 'clamp(1rem, 3.5vw, 1.15rem)', 
                    lineHeight: '1.9', 
                    color: 'var(--color-charcoal)' 
                  }}>
                    {event.desc}
                  </p>
                </div>
                
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Ceremonies;
