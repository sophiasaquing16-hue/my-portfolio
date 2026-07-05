import React from 'react';
import OrbitingTextBadge from '../components/OrbitingTextBadge';

const Footer: React.FC = () => {
  const scrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        paddingTop: '48px',
        paddingBottom: '32px',
      }}
    >
      <div className="content-container">
        {/* Row 1 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '40px',
          }}
        >
          {/* Brand */}
          <div>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#f4f4f5',
                display: 'block',
                marginBottom: '4px',
              }}
            >
              Sophia
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '0.8125rem',
                color: '#a78bfa',
                opacity: 0.7,
              }}
            >
              Full-Stack Engineer & Creative Technologist
            </span>
          </div>

          {/* Link Columns */}
          <div
            className="footer-links"
            style={{
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap',
            }}
          >
            {/* Navigate */}
            <div>
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#a78bfa',
                  marginBottom: '12px',
                }}
              >
                Navigate
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Work', 'About', 'Process', 'Contact'].map((item) => (
                  <li key={item} style={{ marginBottom: '8px' }}>
                    <button
                      onClick={() => scrollTo(`#${item.toLowerCase()}`)}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        fontSize: '0.875rem',
                        color: '#f4f4f5',
                        opacity: 0.6,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = '1')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = '0.6')
                      }
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#a78bfa',
                  marginBottom: '12px',
                }}
              >
                Social
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['GitHub', 'LinkedIn', 'Twitter/X', 'Dribbble'].map(
                  (item) => (
                    <li key={item} style={{ marginBottom: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          fontSize: '0.875rem',
                          color: '#f4f4f5',
                          opacity: 0.6,
                          cursor: 'default',
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#a78bfa',
                  marginBottom: '12px',
                }}
              >
                Connect
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <a
                    href="mailto:sophiasaquing16@gmail.com"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.875rem',
                      color: '#f4f4f5',
                      opacity: 0.6,
                      textDecoration: 'none',
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = '1')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = '0.6')
                    }
                  >
                    sophiasaquing16@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="/images/saquingsm%20resume.pdf"
                    download
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '0.875rem',
                      color: '#f4f4f5',
                      opacity: 0.6,
                      textDecoration: 'none',
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = '1')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = '0.6')
                    }
                  >
                    Download CV
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Status Badge */}
          <div className="footer-badge">
            <OrbitingTextBadge
              text="OPEN TO WORK \u2022 "
              radius={50}
              duration={15}
              centerSize={40}
              fontSize="0.625rem"
            />
          </div>
        </div>

        {/* Row 2 - Bottom Bar */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '0.75rem',
              color: '#a78bfa',
              opacity: 0.5,
            }}
          >
            2026 Sophia. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '0.75rem',
              color: '#a78bfa',
              opacity: 0.5,
            }}
          >
            Built with React & Three.js
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          footer > div > div:first-child {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-links {
            justify-content: center !important;
            gap: 30px !important;
          }
          .footer-badge {
            margin-top: 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
