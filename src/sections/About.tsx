import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const skills = [
  'React',
  'TypeScript/JavaScript',
  'Python',
  'MySQL',
  'Java',
  'HTML/CSS'
];

const stats = [
  { value: '1.5', label: 'Years of\nExperience' },
  { value: '2', label: 'Projects\nDelivered' },
  { value: '15', label: 'Happy\nClients' },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image panel entrance from left
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -60, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      // Content stagger from right
      if (contentRef.current) {
        const els = contentRef.current.querySelectorAll('.about-animate');
        gsap.fromTo(
          els,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Stats count-up feel
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll('.stat-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: '#07050f',
        paddingTop: '120px',
        paddingBottom: '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '45%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-5%',
          width: '50%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="content-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left: Image panel ── */}
        <div ref={imageRef} style={{ position: 'relative' }}>
          {/* Decorative purple border accent */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.35) 0%, rgba(109,40,217,0.10) 100%)',
              transform: 'translate(10px, 10px)',
              zIndex: 0,
            }}
          />

          {/* Image wrapper */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(139, 92, 246, 0.22)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
              aspectRatio: '3/4',
            }}
          >
            <img
              src="/images/saquing.jpeg"
              alt="Profile photo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />

            {/* Subtle gradient overlay at bottom */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(7,5,15,0.7) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Floating stat badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              right: '-20px',
              zIndex: 2,
              background: 'rgba(20, 14, 38, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(139, 92, 246, 0.30)',
              borderRadius: '14px',
              padding: '14px 20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <p
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#a78bfa',
                margin: 0,
                lineHeight: 1,
              }}
            >
              1.5
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                color: 'rgba(244,244,245,0.6)',
                marginTop: '4px',
                marginBottom: 0,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Years of Craft
            </p>
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div ref={contentRef}>
          <p className="about-animate label-text" style={{ marginBottom: '16px' }}>
            ABOUT ME
          </p>

          <h2
            className="about-animate font-heading"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              color: '#ffffff',
              marginBottom: '28px',
              lineHeight: 1.15,
            }}
          >
            Engineer by Training,{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Creator by Nature
            </span>
          </h2>

          <p
            className="about-animate"
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(244, 244, 245, 0.72)',
              marginBottom: '18px',
            }}
          >
            Hi! I'm Sophia Marie E. Saquing, a third-year Computer Science student at Cagayan State 
            University – Carig Campus with a strong interest in web development. I enjoy designing and building 
            responsive, user-friendly websites and web applications while continuously improving 
            my skills in modern web technologies.
          </p>

          <p
            className="about-animate"
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(244, 244, 245, 0.72)',
              marginBottom: '36px',
            }}
          >
            I am passionate about solving problems through clean, efficient code and creating 
            digital solutions that provide a great user experience. My goal is to become a skilled 
            Web Developer who develops innovative, accessible, and impactful web applications.
          </p>

          {/* Stats row */}
          <div
            ref={statsRef}
            className="about-animate"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '36px',
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="stat-card glass-card"
                style={{
                  padding: '18px 16px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#a78bfa',
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem',
                    color: 'rgba(244,244,245,0.5)',
                    marginTop: '6px',
                    marginBottom: 0,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Skill tags */}
          <div
            className="about-animate"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {skills.map((skill) => (
              <span key={skill} className="glass-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile override styles */}
      <style>{`
        @media (max-width: 900px) {
          #about > div:first-of-type + div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 900px) {
          #about .content-container {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
