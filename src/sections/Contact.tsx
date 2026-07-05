import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const els = contentRef.current.querySelectorAll('.contact-animate');
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
          trigger: contentRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: '#06040d',
        paddingTop: '160px',
        paddingBottom: '160px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={contentRef}
        className="content-container"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '720px',
          margin: '0 auto',
        }}
      >
        <p className="contact-animate label-text" style={{ marginBottom: '20px' }}>
          JUST GETTING STARTED
        </p>
        <h2
          className="contact-animate font-heading"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            color: '#ffffff',
            marginBottom: '20px',
          }}
        >
          Feel free to say hello
        </h2>
        <p
          className="contact-animate"
          style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#f4f4f5',
            opacity: 0.8,
            maxWidth: '480px',
            margin: '0 auto 40px',
          }}
        >
          I am new to coding and still learning the basics, so I am mainly open
          to kind feedback, encouragement, and genuine connections as I learn.
        </p>
        <div className="contact-animate">
          <a
            href="mailto:sophiasaquing16@gmail.com"
            className="gradient-btn inline-block"
            style={{
              padding: '16px 40px',
              fontSize: '1.125rem',
              textDecoration: 'none',
            }}
          >
            Send an Email
          </a>
        </div>
        <div className="contact-animate" style={{ marginTop: '24px' }}>
          <a
            href="mailto:sophiasaquing16@gmail.com"
            className="font-mono-code"
            style={{
              fontSize: '0.875rem',
              color: '#a78bfa',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#a78bfa';
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            sophiasaquing16@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
