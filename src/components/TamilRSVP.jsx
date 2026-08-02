import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TamilRSVP = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const inputStyle = {
    width: '100%', padding: '1.2rem 0', background: 'transparent',
    border: 'none', borderBottom: '1px solid rgba(212, 167, 58, 0.4)',
    outline: 'none', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', 
    fontFamily: 'var(--font-sans)', color: 'var(--color-charcoal)',
    transition: 'border-color 0.3s ease'
  };

  const focusProps = { whileFocus: { borderBottomColor: 'var(--color-temple-red)' } };

  return (
    <section style={{ 
      position: 'relative',
      padding: 'clamp(5rem, 10vw, 10rem) clamp(1rem, 5vw, 2rem)', 
      minHeight: '100vh',
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      
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

      {/* Top Gradient Fade to seamlessly end the scroll */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '150px',
          background: 'linear-gradient(to bottom, var(--color-ivory), transparent)',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      />

      <div style={{ 
        backgroundColor: 'rgba(251, 249, 245, 0.85)', // translucent ivory
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(212, 167, 58, 0.2)',
        padding: 'clamp(2rem, 6vw, 4rem)', 
        maxWidth: '650px', 
        width: '100%', 
        position: 'relative',
        zIndex: 10,
        borderRadius: '8px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
      }}>
        
        {/* Decorative corner kolams (simplified as SVG icons for now) */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'var(--color-trad-gold)', fontSize: '1.2rem' }}>❈</div>
        <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--color-trad-gold)', fontSize: '1.2rem' }}>❈</div>
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'var(--color-trad-gold)', fontSize: '1.2rem' }}>❈</div>
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'var(--color-trad-gold)', fontSize: '1.2rem' }}>❈</div>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 6vw, 3rem)', 
            marginBottom: '0.5rem', 
            color: 'var(--color-temple-red)',
            fontFamily: 'var(--font-serif)'
          }}>
            YOUR PRESENCE
          </h2>
          <span style={{ 
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', 
            fontStyle: 'italic', 
            color: 'var(--color-trad-gold)',
            fontFamily: 'var(--font-serif)'
          }}>
            is our greatest gift
          </span>
          
          <div style={{
            margin: '1.5rem auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            color: 'var(--color-trad-gold)'
          }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'currentColor' }} />
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>✧</span>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'currentColor' }} />
          </div>

          <p className="tamil-text" style={{ 
            color: 'var(--color-temple-red)', 
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' 
          }}>
            உங்கள் வருகையே எங்கள் மகிழ்ச்சி
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}
              >
                🌸✨🌸
              </motion.div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', color: 'var(--color-temple-red)', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
                நன்றி | Thank You
              </h3>
              <p style={{ color: 'var(--color-charcoal)', fontSize: '1.1rem' }}>Your response has been beautifully received.</p>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              <div>
                <motion.input type="text" placeholder="Guest Name(s)" required style={inputStyle} {...focusProps} />
              </div>

              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: 'clamp(1rem, 4vw, 2rem)', 
                marginTop: '1rem',
                justifyContent: 'center'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: 'clamp(0.9rem, 3vw, 1rem)', color: 'var(--color-temple-red)', fontWeight: 500 }}>
                  <input type="radio" name="attendance" value="accepts" defaultChecked style={{ accentColor: 'var(--color-temple-red)', width: '1.2rem', height: '1.2rem' }} />
                  Joyfully Accepts
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: 'clamp(0.9rem, 3vw, 1rem)', color: 'var(--color-charcoal)' }}>
                  <input type="radio" name="attendance" value="declines" style={{ accentColor: 'var(--color-temple-red)', width: '1.2rem', height: '1.2rem' }} />
                  Regretfully Declines
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: '2rem', 
                  padding: '1.2rem', 
                  backgroundColor: 'var(--color-temple-red)', 
                  color: 'var(--color-ivory)',
                  border: '1px solid var(--color-temple-red)', 
                  fontSize: '0.9rem', 
                  letterSpacing: '0.15em', 
                  textTransform: 'uppercase', 
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                {status === 'submitting' ? 'SENDING...' : 'SEND RSVP'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TamilRSVP;
