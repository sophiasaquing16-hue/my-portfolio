import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  tags: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'meridian',
    number: '01',
    title: 'Meridian Dashboard',
    tags: 'React / TypeScript / D3.js',
    image: '/images/project-meridian.jpg',
  },
  {
    id: 'aether',
    number: '02',
    title: 'Aether Commerce',
    tags: 'Next.js / Stripe / PostgreSQL',
    image: '/images/project-aether.jpg',
  },
  {
    id: 'nebula',
    number: '03',
    title: 'Nebula Maps',
    tags: 'Three.js / WebGL / GeoJSON',
    image: '/images/project-nebula.jpg',
  },
  {
    id: 'pulse',
    number: '04',
    title: 'Pulse Health',
    tags: 'React Native / Node.js / MQTT',
    image: '/images/project-pulse.jpg',
  },
  {
    id: 'kinetic',
    number: '05',
    title: 'Kinetic Studio',
    tags: 'GSAP / Canvas / Vite',
    image: '/images/project-kinetic.jpg',
  },
  {
    id: 'orbit',
    number: '06',
    title: 'Orbit Finance',
    tags: 'Vue / WebSocket / Redis',
    image: '/images/project-orbit.jpg',
  },
];

const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  useEffect(() => {
    if (!stageRef.current || !containerRef.current) return;

    const stage = stageRef.current;
    const container = containerRef.current;
    const cards = container.querySelectorAll<HTMLElement>('.project-card');
    const isMobile = window.innerWidth < 768;
    const cardCount = isMobile ? 4 : projects.length;
    const visibleCards = Array.from(cards).slice(0, cardCount);

    // Position cards
    const positionCards = (w: number, h: number) => {
      const diag = Math.sqrt(w * w + h * h);
      const distanceFactor = diag / 2200;

      visibleCards.forEach((card, index) => {
        const angle = (index / visibleCards.length) * Math.PI * 2;
        const xRadius = (w / 2.5) * distanceFactor;
        const yRadius = (h / 2.5) * distanceFactor;

        card.style.setProperty('--x', `${Math.cos(angle) * xRadius}px`);
        card.style.setProperty('--y', `${Math.sin(angle) * yRadius * 0.5}px`);
        card.style.setProperty('--z', `${Math.random() * 200 - 100}px`);

        const rotY = Math.cos(angle) * 45;
        const rotX = Math.sin(angle) * 15;
        card.style.transform = `translate3d(calc(-50% + var(--x)), calc(-50% + var(--y)), var(--z)) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      });
    };

    // Initial positioning
    const rect = stage.getBoundingClientRect();
    positionCards(rect.width, rect.height);

    // Container rotation timeline
    const durMult = isMobile ? 1.5 : 1;
    const tlRotate = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 14 * durMult, ease: 'sine.inOut' },
    });
    tlRotate.fromTo(container, { rotateY: -40 }, { rotateY: 40 });

    const tlZ = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 21 * durMult, ease: 'sine.inOut' },
    });
    tlZ.fromTo(container, { z: -600 }, { z: 200 });

    timelinesRef.current.push(tlRotate, tlZ);

    // Per-card orbital timelines
    visibleCards.forEach((card, index) => {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
        defaults: {
          duration: (8 + Math.random() * 10) * durMult,
          ease: 'sine.inOut',
        },
      });

      const currentRotY = gsap.getProperty(card, 'rotationY') as number || 0;
      const currentRotZ = gsap.getProperty(card, 'rotationZ') as number || 0;

      tl.fromTo(
        card,
        { rotationY: currentRotY },
        { rotationY: currentRotY + 360 },
        0
      );
      tl.fromTo(
        card,
        { rotationZ: currentRotZ },
        { rotationZ: currentRotZ + 90 },
        0
      );

      timelinesRef.current.push(tl);
    });

    // ResizeObserver
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        positionCards(w, h);
      }
    });
    ro.observe(stage);

    // Scroll parallax
    const st = ScrollTrigger.create({
      trigger: '#work-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(stage, { y: self.progress * 100 });
      },
    });

    // Header entrance animation
    if (headerRef.current) {
      const headerEls = headerRef.current.querySelectorAll('.work-animate');
      gsap.fromTo(
        headerEls,
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
      ro.disconnect();
      st.kill();
      timelinesRef.current.forEach((tl) => tl.kill());
      timelinesRef.current = [];
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
      }}
    >
      {/* Section Header */}
      <div ref={headerRef} className="content-container" style={{ textAlign: 'center', marginBottom: '80px' }}>
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
          A Curated Portfolio
        </h2>
        <p
          className="work-animate"
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#f4f4f5',
            opacity: 0.7,
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          Each project is a story of constraints, decisions, and craft. Here are
          the ones I'm most proud of.
        </p>
      </div>

      {/* Gallery Stage */}
      <div
        id="work"
        ref={stageRef}
        className="stage"
        style={{
          width: '100%',
          height: '80vh',
          minHeight: '500px',
          perspective: window.innerWidth < 768 ? '600px' : '900px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          ref={containerRef}
          className="container"
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          {projects.map((project, index) => {
            if (window.innerWidth < 768 && index >= 4) return null;
            return (
              <article
                key={project.id}
                className="project-card"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: window.innerWidth < 768 ? '260px' : '320px',
                  height: window.innerWidth < 768 ? '360px' : '420px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  transition: 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                  cursor: 'pointer',
                  marginTop: window.innerWidth < 768 ? '-180px' : '-210px',
                  marginLeft: window.innerWidth < 768 ? '-130px' : '-160px',
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = card.style.transform.replace(
                    /translate3d\([^)]+\)/,
                    'translate3d(calc(-50% + var(--x)), calc(-50% + var(--y)), calc(var(--z) + 30px))'
                  );
                  card.style.transform += ' scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  const angle = (index / Math.min(projects.length, window.innerWidth < 768 ? 4 : 6)) * Math.PI * 2;
                  const rotY = Math.cos(angle) * 45;
                  const rotX = Math.sin(angle) * 15;
                  card.style.transform = `translate3d(calc(-50% + var(--x)), calc(-50% + var(--y)), var(--z)) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
                }}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                {/* Overlay Gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(6, 4, 13, 0.95) 0%, rgba(6, 4, 13, 0.3) 50%, transparent 100%)',
                    transition: 'background 0.4s ease',
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '28px',
                    zIndex: 2,
                  }}
                >
                  <span
                    className="font-mono-code"
                    style={{
                      fontSize: '0.75rem',
                      color: '#8b5cf6',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {project.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
                      lineHeight: 1.3,
                      color: '#ffffff',
                      marginBottom: '8px',
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className="font-mono-code"
                    style={{
                      fontSize: '0.6875rem',
                      color: '#a78bfa',
                      opacity: 0.8,
                    }}
                  >
                    {project.tags}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
