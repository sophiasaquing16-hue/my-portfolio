import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'Three.js',
  'GraphQL',
  'PostgreSQL',
  'AWS',
  'Figma',
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Left column entrance
    if (leftRef.current) {
      const els = leftRef.current.querySelectorAll('.about-animate');
      gsap.fromTo(
        els,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Right column entrance
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current || st.trigger === leftRef.current || st.trigger === rightRef.current) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: '#0a0a0a',
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      <div
        className="content-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left Column */}
        <div ref={leftRef}>
          <p className="about-animate label-text" style={{ marginBottom: '16px' }}>
            ABOUT ME
          </p>
          <h2
            className="about-animate font-heading"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
              color: '#ffffff',
              marginBottom: '32px',
            }}
          >
            Engineer by Training, Creator by Nature
          </h2>
          <p
            className="about-animate"
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#f4f4f5',
              opacity: 0.8,
              marginBottom: '20px',
            }}
          >
            With over 8 years of experience building for the web, I've developed
            a deep appreciation for the craft of software — clean architecture,
            thoughtful UX, and pixel-perfect execution.
          </p>
          <p
            className="about-animate"
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#f4f4f5',
              opacity: 0.8,
              marginBottom: '32px',
            }}
          >
            I specialize in React ecosystems, real-time systems, and interactive
            data visualization. My work lives at the boundary between what users
            see and what makes it possible.
          </p>

          {/* Skill Tags */}
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

        {/* Right Column */}
        <div
          ref={rightRef}
          className="glass-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            aspectRatio: '1/1',
            overflow: 'hidden',
            padding: '0',
          }}
        >
          <img
            src="/images/profile.jpg"
            alt="Profile"
            className="about-animate"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const parent = (e.currentTarget as HTMLImageElement).parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)';
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                const placeholder = document.createElement('div');
                placeholder.style.cssText = 'width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);display:flex;align-items:center;justify-content:center;color:white;font-size:3rem;font-weight:700;font-family:Playfair Display,serif';
                placeholder.innerHTML = '&#9992;';
                parent.appendChild(placeholder);
              }
            }}
          />
        </div>
      </div>

      {/* Mobile override styles */}
      <style>{`
        @media (max-width: 767px) {
          #about > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
