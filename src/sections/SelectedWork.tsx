import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  tags: string;
  image: string;
  description: string;
  techStack: string[];
  role: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 'meridian',
    number: '01',
    title: 'Meridian Dashboard',
    tags: 'React / TypeScript / D3.js',
    image: '/images/project-meridian.jpg',
    description:
      'A real-time analytics dashboard for monitoring distributed system health. Features interactive D3.js visualizations, live WebSocket data streams, and customizable alert thresholds.',
    techStack: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js', 'Redis'],
    role: 'Full-Stack Lead',
    year: '2025',
  },
  {
    id: 'aether',
    number: '02',
    title: 'Aether Commerce',
    tags: 'Next.js / Stripe / PostgreSQL',
    image: '/images/project-aether.jpg',
    description:
      'A high-performance e-commerce platform built for scale. Supports multi-tenant storefronts, real-time inventory sync, and AI-powered product recommendations.',
    techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Vercel'],
    role: 'Frontend Architect',
    year: '2025',
  },
  {
    id: 'nebula',
    number: '03',
    title: 'Nebula Maps',
    tags: 'Three.js / WebGL / GeoJSON',
    image: '/images/project-nebula.jpg',
    description:
      'An interactive 3D geospatial visualization tool for exploring planetary terrain data. Renders massive GeoJSON datasets with WebGL-powered performance.',
    techStack: ['Three.js', 'WebGL', 'GeoJSON', 'React', 'Canvas', 'GLSL'],
    role: 'Creative Developer',
    year: '2024',
  },
  {
    id: 'pulse',
    number: '04',
    title: 'Pulse Health',
    tags: 'React Native / Node.js / MQTT',
    image: '/images/project-pulse.jpg',
    description:
      'A cross-platform mobile health monitoring app connecting patients with care teams via real-time vital sign streaming and AI-driven anomaly detection.',
    techStack: ['React Native', 'Node.js', 'MQTT', 'MongoDB', 'TensorFlow Lite', 'AWS'],
    role: 'Mobile Lead',
    year: '2024',
  },
  {
    id: 'kinetic',
    number: '05',
    title: 'Kinetic Studio',
    tags: 'GSAP / Canvas / Vite',
    image: '/images/project-kinetic.jpg',
    description:
      'A motion design tool for creating complex GSAP timelines with a visual node-based editor. Ships with a library of presets and real-time preview.',
    techStack: ['GSAP', 'Canvas', 'Vite', 'React', 'Zustand', 'Radix UI'],
    role: 'Solo Developer',
    year: '2023',
  },
  {
    id: 'orbit',
    number: '06',
    title: 'Orbit Finance',
    tags: 'Vue / WebSocket / Redis',
    image: '/images/project-orbit.jpg',
    description:
      'A real-time portfolio tracking app with interactive charts, paper trading simulation, and automated rebalancing strategies.',
    techStack: ['Vue', 'WebSocket', 'Redis', 'D3.js', 'Express', 'Docker'],
    role: 'Backend Engineer',
    year: '2023',
  },
];

const CARD_W = 260;
const CARD_H = 340;
const CARD_W_MOBILE = 190;
const CARD_H_MOBILE = 250;

const SelectedWork: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  // offset drives the fan rotation — starts centered (offset=0 means fan is symmetric)
  const s = useRef({
    offset: 0,
    baseSpeed: 0.003,
    hoveredIndex: -1,
    isDragging: false,
    dragSpeed: 0,
    lastX: 0,
    rafId: 0,
    dir: 1,
  });

  useEffect(() => {
    const stage = stageRef.current;
    const header = headerRef.current;
    if (!stage || !header) return;

    const container = cardsContainerRef.current;
    const cards = container?.children as HTMLCollectionOf<HTMLElement> | undefined;
    if (!cards) return;

    const state = s.current;
    const N = cards.length;

    const orbit = (w: number, h: number) => {
      const m = w < 768;
      return {
        // pivot is the star center — bottom-center of stage
        cx: w / 2,
        cy: h * 0.88,
        rx: m ? w * 0.38 : Math.min(w * 0.38, 520),
        ry: m ? h * 0.52 : h * 0.72,
        cardW: m ? CARD_W_MOBILE : CARD_W,
        cardH: m ? CARD_H_MOBILE : CARD_H,
      };
    };

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const o = orbit(w, h);

      // Auto-rotate when not dragging
      if (!state.isDragging) {
        state.offset += state.baseSpeed * state.dir;
      }

      for (let i = 0; i < N; i++) {
        const card = cards[i] as HTMLElement;

        // Full-circle even spacing — guarantees equal gaps regardless of offset
        // Start centered in the upper half: first card at -PI/2 (top-center)
        const baseAngle = -Math.PI / 2 + (i / N) * Math.PI * 2;
        const angle = baseAngle + state.offset;

        const x = o.cx + o.rx * Math.cos(angle);
        const y = o.cy + o.ry * Math.sin(angle); // ry is negative so up = negative sin

        // Depth: 1 when at top (sin=-1 since ry<0), 0 when at bottom
        const sinVal = Math.sin(angle); // -1 at top, +1 at bottom
        const depth = (-sinVal + 1) / 2; // remap: top=1, bottom=0
        const scale = 0.65 + 0.35 * depth;
        const zIdx = Math.round(10 + 200 * depth);
        const opacity = 0.3 + 0.7 * depth;

        card.style.transform =
          `translate(${x - o.cardW / 2}px, ${y - o.cardH / 2}px) scale(${scale})`;
        card.style.zIndex = String(zIdx);
        card.style.opacity = String(opacity);
      }
    };

    const loop = () => {
      update();
      s.current.rafId = requestAnimationFrame(loop);
    };
    s.current.rafId = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => update());
    ro.observe(stage);

    const st = ScrollTrigger.create({
      trigger: '#portfolio',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(stage, { y: self.progress * 80 });
      },
    });

    const headerEls = header.querySelectorAll('.work-animate');
    gsap.fromTo(
      headerEls,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: header, start: 'top 80%' },
      }
    );

    return () => {
      cancelAnimationFrame(s.current.rafId);
      ro.disconnect();
      st.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === header) t.kill();
      });
    };
  }, []);

  useEffect(() => {
    if (selectedIdx < 0) return;
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    gsap.set(overlay, { opacity: 0, pointerEvents: 'auto' });
    gsap.set(panel, { scale: 0.85, opacity: 0, y: 30 });

    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    tl.to(
      panel,
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' },
      '-=0.15'
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdx(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIdx]);

  const closeModal = useCallback(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    const tl = gsap.timeline({
      onComplete: () => setSelectedIdx(-1),
    });
    tl.to(panel, { scale: 0.85, opacity: 0, y: 30, duration: 0.3, ease: 'power2.in' });
    tl.to(overlay, { opacity: 0, duration: 0.2 }, '-=0.1');
  }, []);

  const hover = (i: number) => {
    s.current.hoveredIndex = i;
  };
  const unhover = (i: number) => {
    if (s.current.hoveredIndex === i) s.current.hoveredIndex = -1;
  };
  const dragStart = (e: React.MouseEvent, i: number) => {
    s.current.isDragging = true;
    s.current.lastX = e.clientX;
    s.current.dragSpeed = 0;
    s.current.hoveredIndex = i;
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };
  const dragMove = (e: React.MouseEvent) => {
    if (!s.current.isDragging) return;
    const dx = e.clientX - s.current.lastX;
    // directly shift the offset so dragging left/right fans the cards
    s.current.offset += dx * 0.004;
    s.current.lastX = e.clientX;
  };
  const dragEnd = (e: React.MouseEvent, i: number) => {
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const wasClick = dist < 8;

    s.current.isDragging = false;
    s.current.dragSpeed = 0;
    s.current.hoveredIndex = -1;

    if (wasClick) setSelectedIdx(i);
  };

  const selected = selectedIdx >= 0 ? projects[selectedIdx] : null;

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
      <style>{`
        @keyframes star-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div
        ref={headerRef}
        className="content-container"
        style={{ textAlign: 'center', marginBottom: '60px' }}
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
          Each project is a story of constraints, decisions, and craft.
        </p>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        style={{
          width: '100%',
          height: '80vh',
          minHeight: '500px',
          position: 'relative',
          overflow: 'hidden',
          userSelect: 'none',
        }}
        onMouseMove={dragMove}
        onMouseUp={() => {
          s.current.isDragging = false;
          s.current.dragSpeed = 0;
          s.current.hoveredIndex = -1;
        }}
        onMouseLeave={() => {
          s.current.isDragging = false;
          s.current.dragSpeed = 0;
          s.current.hoveredIndex = -1;
        }}
      >
        {/* Orbital ring */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '8%',
            width: 'min(80vw, 700px)',
            height: 'min(150vw, 1100px)',
            transform: 'translateX(-50%)',
            borderRadius: '50%',
            border: '1px solid rgba(251, 191, 36, 0.06)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Star */}
        <div
          ref={starRef}
          onClick={() => {
            s.current.dir *= -1;
          }}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '8%',
            width: '70px',
            height: '70px',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            zIndex: 300,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%)',
              animation: 'star-pulse 4s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          <svg
            viewBox="0 0 100 100"
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.6))',
            }}
          >
            <defs>
              <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="40%" stopColor="#fef3c7" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
            </defs>
            <polygon
              points="50,5 63,38 98,38 70,60 79,95 50,75 21,95 30,60 2,38 37,38"
              fill="url(#starGlow)"
              stroke="rgba(251,191,36,0.3)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Orbital trail */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 'calc(8% + 35px)',
            width: '1px',
            height: 'min(80vh, 600px)',
            transform: 'translateX(-50%)',
            background:
              'linear-gradient(to top, rgba(251,191,36,0.08), transparent)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Cards */}
        <div
          ref={cardsContainerRef}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
          {projects.map((project, i) => (
            <article
              key={project.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width:
                  typeof window !== 'undefined' && window.innerWidth < 768
                    ? `${CARD_W_MOBILE}px`
                    : `${CARD_W}px`,
                height:
                  typeof window !== 'undefined' && window.innerWidth < 768
                    ? `${CARD_H_MOBILE}px`
                    : `${CARD_H}px`,
                borderRadius: '16px',
                overflow: 'hidden',
                willChange: 'transform, opacity',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
                background: '#111',
              }}
              onMouseEnter={() => hover(i)}
              onMouseLeave={() => unhover(i)}
              onMouseDown={(e) => dragStart(e, i)}
              onMouseUp={(e) => dragEnd(e, i)}
            >
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
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(6, 4, 13, 0.95) 0%, rgba(6, 4, 13, 0.3) 50%, transparent 100%)',
                  transition: 'background 0.3s',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px',
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
                    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                    lineHeight: 1.3,
                    color: '#ffffff',
                    marginBottom: '6px',
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
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      {selectedIdx >= 0 && selected && (
        <div
          ref={overlayRef}
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '24px',
          }}
        >
          <div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '80vh',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#0d0d0d',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            {/* Image side */}
            <div
              style={{
                flex: '0 0 45%',
                position: 'relative',
                overflow: 'hidden',
                display: 'none',
              }}
              className="modal-image"
            >
              <img
                src={selected.image}
                alt={selected.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Content side */}
            <div
              style={{
                flex: 1,
                padding: '40px',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#a1a1aa',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  zIndex: 2,
                }}
              >
                ✕
              </button>

              <span
                className="font-mono-code"
                style={{
                  fontSize: '0.75rem',
                  color: '#8b5cf6',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {selected.number} &mdash; {selected.year}
              </span>

              <h2
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  lineHeight: 1.15,
                  color: '#ffffff',
                  marginBottom: '6px',
                }}
              >
                {selected.title}
              </h2>

              <span
                className="font-mono-code"
                style={{
                  fontSize: '0.75rem',
                  color: '#a78bfa',
                  opacity: 0.7,
                  display: 'block',
                  marginBottom: '24px',
                }}
              >
                {selected.role}
              </span>

              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: '#d4d4d8',
                  marginBottom: '28px',
                }}
              >
                {selected.description}
              </p>

              <span
                className="label-text"
                style={{ display: 'block', marginBottom: '14px' }}
              >
                Technology Stack
              </span>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono-code"
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: 'rgba(139, 92, 246, 0.08)',
                      border: '1px solid rgba(139, 92, 246, 0.15)',
                      fontSize: '0.75rem',
                      color: '#c4b5fd',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Style for responsive image on mobile */}
              <style>{`
                @media (min-width: 640px) {
                  .modal-image { display: block !important; }
                }
              `}</style>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;
