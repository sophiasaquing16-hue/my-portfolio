import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

const Navigation: React.FC<NavigationProps> = ({ lenisRef }) => {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const animatedRef = useRef(false);

  const navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Portfolio', target: '#portfolio' },
    { label: 'Contact', target: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide navbar while hero is visible; reveal it once the user scrolls past
  useEffect(() => {
    const hero = document.querySelector('#hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      // trigger when hero is >10% visible (so tiny slivers don't keep it hidden)
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Run GSAP intro only once, the first time the navbar becomes visible
  useEffect(() => {
    if (heroVisible || animatedRef.current) return;
    if (!navRef.current) return;
    animatedRef.current = true;

    const logo = navRef.current.querySelector('.nav-logo');
    const links = navRef.current.querySelectorAll('.nav-link');
    const cta = navRef.current.querySelector('.nav-cta');

    gsap.fromTo(
      logo,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
    gsap.fromTo(
      links,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.08, stagger: 0.05, ease: 'power3.out' }
    );
    gsap.fromTo(
      cta,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.25, ease: 'power3.out' }
    );
  }, [heroVisible]);

  const scrollTo = (target: string) => {
    setMobileOpen(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.4 });
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: '72px',
          backgroundColor: scrolled
            ? 'rgba(6, 4, 13, 0.95)'
            : 'rgba(6, 4, 13, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          transform: heroVisible ? 'translateY(-100%)' : 'translateY(0)',
          opacity: heroVisible ? 0 : 1,
          pointerEvents: heroVisible ? 'none' : 'auto',
          transition: 'transform 0.45s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.35s ease, background-color 0.3s ease',
        }}
      >
        <div
          className="flex items-center justify-between h-full"
          style={{ padding: '0 clamp(1.5rem, 4vw, 3rem)' }}
        >
          {/* Brand */}
          <button
            onClick={() => scrollTo('#hero')}
            className="nav-logo flex items-center gap-2 bg-transparent border-none cursor-pointer"
            style={{ opacity: 0 }}
          >
            <span
              className="font-sans"
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#f4f4f5',
              }}
            >
              Sophia
            </span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#8b5cf6',
                display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
          </button>

          {/* Desktop Nav Links */}
          <div
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.target)}
                className="nav-link bg-transparent border-none cursor-pointer"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.8125rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#a78bfa',
                  transition: 'color 0.3s ease',
                  opacity: 0,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = '#ffffff')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = '#a78bfa')
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('#contact')}
            className="nav-cta gradient-btn hidden md:block"
            style={{
              padding: '10px 24px',
              fontSize: '0.8125rem',
              opacity: 0,
            }}
          >
            Say Hello
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#f4f4f5',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#f4f4f5',
                transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#f4f4f5',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: 'rgba(6, 4, 13, 0.97)',
            backdropFilter: 'blur(30px)',
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="bg-transparent border-none cursor-pointer"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '2rem',
                color: '#ffffff',
                opacity: 0,
                animation: `fadeInUp 0.5s ease forwards ${i * 0.1}s`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="gradient-btn mt-4"
            style={{
              padding: '14px 32px',
              opacity: 0,
              animation: 'fadeInUp 0.5s ease forwards 0.4s',
            }}
          >
            Say Hello
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default React.memo(Navigation);
