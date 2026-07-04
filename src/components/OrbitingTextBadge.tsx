import React from 'react';

interface OrbitingTextBadgeProps {
  text?: string;
  radius?: number;
  duration?: number;
  centerSize?: number;
  fontSize?: string;
}

const OrbitingTextBadge: React.FC<OrbitingTextBadgeProps> = ({
  text = 'AVAILABLE FOR PROJECTS \u2022 ',
  radius = 120,
  duration = 20,
  centerSize = 80,
  fontSize = '0.8125rem',
}) => {
  const chars = text.split('');
  const step = 360 / chars.length;

  return (
    <div
      className="orbit-container"
      style={{
        position: 'relative',
        width: radius * 2.5,
        height: radius * 2.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: `spin ${duration}s linear infinite`,
        willChange: 'transform',
      }}
    >
      <div
        className="orbit-center"
        style={{
          width: centerSize,
          height: centerSize,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
          boxShadow: 'inset 0 0 30px rgba(255, 255, 255, 0.15)',
          flexShrink: 0,
        }}
      />
      {chars.map((char, index) => (
        <span
          key={index}
          className="orbit-char"
          style={{
            position: 'absolute',
            transform: `rotate(${index * step}deg) translateY(-${radius}px)`,
            transformOrigin: 'center center',
            fontSize,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#f4f4f5',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default React.memo(OrbitingTextBadge);
