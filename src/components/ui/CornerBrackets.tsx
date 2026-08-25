import React from 'react';

interface CornerBracketsProps {
  active?: boolean;
  size?: number;
  className?: string;
}

export const CornerBrackets: React.FC<CornerBracketsProps> = ({
  active = false,
  size = 10,
  className = '',
}) => {
  const strokeColor = active ? '#00E5FF' : 'rgba(255, 255, 255, 0.2)';
  const glowStyle = active ? { filter: 'drop-shadow(0 0 4px #00E5FF)' } : {};

  return (
    <div className={`absolute inset-0 pointer-events-none z-10 transition-all duration-300 ${className}`}>
      {/* Top Left */}
      <svg
        className="absolute top-0 left-0"
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        style={glowStyle}
      >
        <path d="M1 11V1H11" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="square" />
      </svg>

      {/* Top Right */}
      <svg
        className="absolute top-0 right-0"
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        style={glowStyle}
      >
        <path d="M11 11V1H1" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="square" />
      </svg>

      {/* Bottom Left */}
      <svg
        className="absolute bottom-0 left-0"
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        style={glowStyle}
      >
        <path d="M1 1V11H11" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="square" />
      </svg>

      {/* Bottom Right */}
      <svg
        className="absolute bottom-0 right-0"
        width={size}
        height={size}
        viewBox="0 0 12 12"
        fill="none"
        style={glowStyle}
      >
        <path d="M11 1V11H1" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    </div>
  );
};
