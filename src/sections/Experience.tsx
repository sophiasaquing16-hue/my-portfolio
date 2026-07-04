import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: '2023 — Present',
    role: 'Senior Full-Stack Engineer',
    company: 'Meridian Labs',
    description:
      'Leading the frontend architecture for a real-time analytics platform serving 2M+ users. Built a design system used across 12 product teams and mentored 4 junior engineers.',
    skills: ['React', 'TypeScript', 'GraphQL', 'AWS'],
  },
  {
    period: '2021 — 2023',
    role: 'Creative Technologist',
    company: 'Kinetic Studio',
    description:
      'Crafted immersive web experiences for Fortune 500 clients. Delivered 15+ interactive campaigns with WebGL, GSAP, and custom shaders — winning 3 Awwwards honors.',
    skills: ['Three.js', 'WebGL', 'GSAP', 'Next.js'],
  },
  {
    period: '2019 — 2021',
    role: 'Frontend Engineer',
    company: 'Aether Commerce',
    description:
      'Built and optimized e-commerce storefronts processing $50M+ in annual GMV. Reduced page load times by 40% through code splitting, lazy loading, and CDN optimization.',
    skills: ['Vue.js', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    period: '2017 — 2019',
    role: 'Software Engineer',
    company: 'Nebula Systems',
    description:
      'Developed data visualization dashboards for network monitoring. Collaborated with design and product teams to ship features used by telecom operators worldwide.',
    skills: ['React', 'D3.js', 'Python', 'Docker'],
  },
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header entrance
    if (headerRef.current) {
      const els = headerRef.current.querySelectorAll('.exp-animate');
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
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Timeline items entrance
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll('.exp-item');
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === headerRef.current ||
          st.trigger === itemsRef.current
        ) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        backgroundColor: '#06040d',
        paddingTop: '120px',
        paddingBottom: '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="content-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '80px' }}>
          <p className="exp-animate label-text" style={{ marginBottom: '16px' }}>
            EXPERIENCE
          </p>
          <h2
            className="exp-animate font-heading"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            Where I've Left My Mark
          </h2>
          <p
            className="exp-animate"
            style={{
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#f4f4f5',
              opacity: 0.7,
              maxWidth: '520px',
            }}
          >
            A journey through startups, agencies, and product teams — each role
            shaping how I think about code, design, and people.
          </p>
        </div>

        {/* Timeline */}
        <div ref={itemsRef} style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              bottom: '0',
              width: '1px',
              background:
                'linear-gradient(to bottom, rgba(139, 92, 246, 0.4), rgba(139, 92, 246, 0.1))',
            }}
          />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className="exp-item"
              style={{
                position: 'relative',
                paddingLeft: '48px',
                paddingBottom: index < experiences.length - 1 ? '56px' : '0',
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                  boxShadow: '0 0 12px rgba(139, 92, 246, 0.5)',
                }}
              />

              {/* Card */}
              <div
                className="glass-card"
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    className="font-mono-code"
                    style={{
                      fontSize: '0.75rem',
                      color: '#8b5cf6',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
                    lineHeight: 1.3,
                    color: '#ffffff',
                    marginBottom: '4px',
                  }}
                >
                  {exp.role}
                </h3>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: '#a78bfa',
                    marginBottom: '12px',
                  }}
                >
                  {exp.company}
                </p>

                <p
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    color: '#f4f4f5',
                    opacity: 0.8,
                    marginBottom: '16px',
                  }}
                >
                  {exp.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {exp.skills.map((skill) => (
                    <span key={skill} className="glass-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile line adjustment */}
      <style>{`
        @media (max-width: 767px) {
          #experience .exp-item {
            padding-left: 32px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
