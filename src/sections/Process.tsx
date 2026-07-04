import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    const textPaths = svgRef.current.querySelectorAll('textPath');
    const animations: gsap.core.Tween[] = [];

    textPaths.forEach((tp) => {
      const tween = gsap.fromTo(
        tp,
        { attr: { startOffset: '-130%' } },
        {
          attr: { startOffset: '0%' },
          ease: 'none',
          scrollTrigger: {
            trigger: '#process-section',
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
      animations.push(tween);
    });

    // Header entrance
    if (headerRef.current) {
      const els = headerRef.current.querySelectorAll('.process-animate');
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

    return () => {
      animations.forEach((a) => a.kill());
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const viewBox = isMobile ? '0 0 800 300' : '0 0 1200 400';
  const fontSize = isMobile ? '42' : '64';
  const paths = isMobile
    ? [
        { id: 'path1', d: 'M 50 75 Q 400 45 750 75', text: 'Discover.' },
        { id: 'path2', d: 'M 50 130 Q 400 100 750 130', text: 'Design.' },
        { id: 'path3', d: 'M 50 185 Q 400 155 750 185', text: 'Develop.' },
        { id: 'path4', d: 'M 50 240 Q 400 210 750 240', text: 'Deploy.' },
      ]
    : [
        { id: 'path1', d: 'M 100 100 Q 600 50 1100 100', text: 'Discover.' },
        { id: 'path2', d: 'M 100 170 Q 600 120 1100 170', text: 'Design.' },
        { id: 'path3', d: 'M 100 240 Q 600 190 1100 240', text: 'Develop.' },
        { id: 'path4', d: 'M 100 310 Q 600 260 1100 310', text: 'Deploy.' },
      ];

  return (
    <section
      id="process-section"
      ref={sectionRef}
      style={{
        backgroundColor: '#06040d',
        paddingTop: '160px',
        paddingBottom: '160px',
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
            'radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative horizontal line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          pointerEvents: 'none',
        }}
      />

      <div className="content-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '80px' }}>
          <p className="process-animate label-text" style={{ marginBottom: '16px' }}>
            HOW I WORK
          </p>
          <h2
            className="process-animate font-heading"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
              color: '#ffffff',
              maxWidth: '640px',
            }}
          >
            A Methodical Approach to Creative Problems
          </h2>
        </div>

        {/* SVG Path Reveal */}
        <svg
          ref={svgRef}
          className="process-svg"
          viewBox={viewBox}
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'block',
          }}
        >
          <defs>
            {paths.map((p) => (
              <path key={p.id} id={p.id} d={p.d} fill="none" stroke="none" />
            ))}
          </defs>
          {paths.map((p) => (
            <text
              key={p.id}
              fontFamily="'Playfair Display', serif"
              fontSize={fontSize}
              fill="#ffffff"
            >
              <textPath href={`#${p.id}`} startOffset="-130%">
                {p.text}
              </textPath>
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
};

export default Process;
