import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      const els = headerRef.current.querySelectorAll('.work-animate');
      gsap.fromTo(
        els,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 82%',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === headerRef.current || st.trigger === cardRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      style={{
        backgroundColor: '#0a0a0a',
        paddingTop: '120px',
        paddingBottom: '120px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={headerRef}
        className="content-container"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '56px' }}
      >
        <p className="work-animate label-text" style={{ marginBottom: '16px' }}>
          PORTFOLIO
        </p>
        <h2
          className="work-animate font-heading"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            color: '#ffffff',
            marginBottom: '16px',
          }}
        >
          My First Project
        </h2>
        <p
          className="work-animate"
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#f4f4f5',
            opacity: 0.7,
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          Simple project card for the first website in this portfolio. Nothing
          fancy here, just one project shown in a much simpler way.
        </p>
      </div>

      <div
        ref={cardRef}
        className="content-container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div
          className="glass-card"
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: '24px',
            borderRadius: '20px',
          }}
        >
          <img
            src="/images/project-meridian.jpg"
            alt="My First Portfolio Website preview"
            style={{
              width: '100%',
              height: 'clamp(220px, 35vw, 320px)',
              objectFit: 'cover',
              borderRadius: '14px',
              marginBottom: '24px',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '12px',
            }}
          >
            <div>
              <p
                className="font-mono-code"
                style={{
                  fontSize: '0.75rem',
                  color: '#8b5cf6',
                  marginBottom: '8px',
                }}
              >
                01 / 2026
              </p>
              <h3
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  color: '#ffffff',
                  lineHeight: 1.3,
                }}
              >
                My First Portfolio Website
              </h3>
            </div>

            <span
              className="font-mono-code"
              style={{
                fontSize: '0.75rem',
                color: '#a78bfa',
                opacity: 0.8,
              }}
            >
              Portfolio / Personal Site / First Project
            </span>
          </div>

          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: '#d4d4d8',
              marginBottom: '20px',
            }}
          >
            This website was made as a starting point while I learn more about
            coding. It introduces me online and gives me one place to show what
            I make as I slowly improve.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {['First website', 'Personal portfolio', '2026', 'Still learning'].map(
              (detail) => (
                <span key={detail} className="glass-pill">
                  {detail}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
