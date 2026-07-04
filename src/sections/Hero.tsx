import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SpaceDust from '../lib/SpaceDust';

interface HeroProps {
  lenisRef: React.MutableRefObject<any>;
}

const Hero: React.FC<HeroProps> = ({ lenisRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spaceDustRef = useRef<SpaceDust | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    spaceDustRef.current = new SpaceDust(canvasRef.current);

    return () => {
      if (spaceDustRef.current) {
        spaceDustRef.current.dispose();
        spaceDustRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll('.hero-animate');

    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        delay: 0.5,
        ease: 'expo.out',
      }
    );
  }, []);

  const scrollToWork = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#portfolio', { duration: 1.4 });
    }
  };

  const scrollToContact = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#contact', { duration: 1.4 });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#06040d',
      }}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        role="presentation"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* Bottom gradient mask */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background:
            'linear-gradient(to bottom, rgba(6, 4, 13, 0) 0%, rgba(6, 4, 13, 1) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Foreground Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '0 1.25rem',
        }}
      >
        <div style={{ maxWidth: '900px' }}>
          {/* Label */}
          <p
            className="hero-animate label-text"
            style={{ opacity: 0, marginBottom: '24px' }}
          >
            FULL-STACK ENGINEER & CREATIVE TECHNOLOGIST
          </p>

          {/* Headline */}
          <h1
            className="hero-animate font-display"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              color: '#ffffff',
              textShadow: '0 0 80px rgba(139, 92, 246, 0.15)',
              marginBottom: '24px',
              opacity: 0,
              textWrap: 'balance',
            }}
          >
            Crafting Digital Experiences That Resonate
          </h1>

          {/* Subtitle */}
          <p
            className="hero-animate"
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#f4f4f5',
              opacity: 0,
              maxWidth: '560px',
              margin: '0 auto 40px',
            }}
          >
            I build performant web applications and interactive experiences at
            the intersection of engineering precision and creative vision.
          </p>

          {/* CTA Row */}
          <div
            className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ opacity: 0 }}
          >
            <button
              onClick={scrollToWork}
              className="gradient-btn"
              style={{ padding: '14px 32px', fontSize: '1rem' }}
            >
              View My Work
            </button>
            <button
              onClick={scrollToContact}
              style={{
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#f4f4f5',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = '#f4f4f5';
              }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
