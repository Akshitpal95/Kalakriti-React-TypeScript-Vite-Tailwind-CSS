import React from 'react';

/**
 * Centered decorative flourish divider with diamond lotus petals and filigree lines
 * Used above or below titles like 'NOS COUPS DE CŒUR' / 'शाही संग्रह'
 */
export const MandalaFlourish: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-48 h-6", 
  color = "#C9A15A" 
}) => (
  <svg 
    viewBox="0 0 200 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`mx-auto ${className}`}
    aria-hidden="true"
  >
    {/* Left horizontal line fading out */}
    <line x1="10" y1="12" x2="70" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
    <line x1="40" y1="12" x2="80" y2="12" stroke={color} strokeWidth="1.2" />
    <circle cx="85" cy="12" r="1.5" fill={color} />
    
    {/* Center Ornamental Lotus / Mandala Motif */}
    <g transform="translate(100, 12)">
      {/* Central Diamond */}
      <rect x="-3" y="-3" width="6" height="6" transform="rotate(45)" fill={color} />
      
      {/* Side Petals */}
      <path d="M-5 -1 C-9 -4, -13 0, -5 2" stroke={color} strokeWidth="1.2" fill="none" />
      <path d="M5 -1 C9 -4, 13 0, 5 2" stroke={color} strokeWidth="1.2" fill="none" />
      
      {/* Top and Bottom flourishes */}
      <circle cx="0" cy="-7" r="1.5" fill={color} />
      <circle cx="0" cy="7" r="1.5" fill={color} />
      <path d="M0 -3 L0 -6" stroke={color} strokeWidth="1" />
      <path d="M0 3 L0 6" stroke={color} strokeWidth="1" />
    </g>

    {/* Right horizontal line fading out */}
    <circle cx="115" cy="12" r="1.5" fill={color} />
    <line x1="120" y1="12" x2="160" y2="12" stroke={color} strokeWidth="1.2" />
    <line x1="130" y1="12" x2="190" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
  </svg>
);

/**
 * Paisley/Mandala Corner Ornament for cards, banners, and hero containers
 */
export const PaisleyCorner: React.FC<{ 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  color?: string;
}> = ({
  position = 'top-right',
  className = 'w-12 h-12',
  color = '#C9A15A'
}) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute ${rotationClass} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M2 2 L2 35 C2 35, 10 32, 12 25 C14 18, 20 16, 26 18 C32 20, 36 12, 34 6 C32 2, 2 2, 2 2 Z"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.5"
        fill="none"
      />
      <path
        d="M8 8 C8 8, 14 14, 18 10 C22 6, 26 12, 22 18 C18 24, 12 20, 8 20"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
        fill="none"
      />
      <circle cx="16" cy="14" r="1.5" fill={color} fillOpacity="0.6" />
      <circle cx="2" cy="2" r="2" fill={color} />
      <line x1="2" y1="2" x2="48" y2="2" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="2" y1="2" x2="2" y2="48" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="48" cy="2" r="1.5" fill={color} />
      <circle cx="2" cy="48" r="1.5" fill={color} />
    </svg>
  );
};

/**
 * Mughal Arch Silhouette Top Border/Divider
 */
export const MughalArchDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-8",
  color = "#C9A15A"
}) => (
  <div className={`overflow-hidden flex items-center justify-center ${className}`}>
    <svg 
      viewBox="0 0 1200 32" 
      preserveAspectRatio="none" 
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0 32 L0 16 Q100 16, 150 2 C180 -3, 220 -3, 250 2 Q300 16, 400 16 Q500 16, 550 2 C580 -3, 620 -3, 650 2 Q700 16, 800 16 Q900 16, 950 2 C980 -3, 1020 -3, 1050 2 Q1100 16, 1200 16 L1200 32 Z" 
        fill={color}
        fillOpacity="0.12"
      />
      <path 
        d="M0 16 Q100 16, 150 2 C180 -3, 220 -3, 250 2 Q300 16, 400 16 Q500 16, 550 2 C580 -3, 620 -3, 650 2 Q700 16, 800 16 Q900 16, 950 2 C980 -3, 1020 -3, 1050 2 Q1100 16, 1200 16" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeOpacity="0.5"
        fill="none"
      />
    </svg>
  </div>
);

/**
 * Delicate Gold Divider Line with center Diamond
 */
export const GoldLineDivider: React.FC<{ className?: string }> = ({ className = "my-6" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <div className="flex-grow border-t border-gold-400/40"></div>
    <div className="mx-3 flex items-center gap-1">
      <div className="w-1.5 h-1.5 rotate-45 border border-gold-500 bg-gold-400/30"></div>
      <div className="w-2.5 h-2.5 rotate-45 bg-gold-500 shadow-xs"></div>
      <div className="w-1.5 h-1.5 rotate-45 border border-gold-500 bg-gold-400/30"></div>
    </div>
    <div className="flex-grow border-t border-gold-400/40"></div>
  </div>
);

/**
 * Social Media Icon SVGs styled for heritage luxury branding
 */
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

export const TwitterIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
