import React from 'react';

// Technical registration crosshair ⨁
export const Crosshair: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 14,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={`inline-block ${className}`}
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="1" x2="12" y2="23" />
    <line x1="1" y1="12" x2="23" y2="12" />
  </svg>
);

// High-precision corner target marks
export const CornerMarks: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none absolute inset-0 select-none ${className}`}>
    <span className="absolute -top-2 -left-2 font-mono text-[10px] text-fg-muted font-light leading-none">+</span>
    <span className="absolute -top-2 -right-2 font-mono text-[10px] text-fg-muted font-light leading-none">+</span>
    <span className="absolute -bottom-2 -left-2 font-mono text-[10px] text-fg-muted font-light leading-none">+</span>
    <span className="absolute -bottom-2 -right-2 font-mono text-[10px] text-fg-muted font-light leading-none">+</span>
  </div>
);

// Barcode strip inspired by Reference 2 ("Y2K Reboot 2.0")
export const Barcode: React.FC<{ className?: string; code?: string; showCode?: boolean }> = ({
  className = '',
  code = 'ALGO-2026.065-SPEC',
  showCode = true,
}) => (
  <div className={`inline-flex flex-col items-center select-none ${className}`}>
    <svg width="110" height="24" viewBox="0 0 110 24" fill="currentColor">
      {/* Precision bar stripes */}
      <rect x="0" y="0" width="3" height="24" />
      <rect x="5" y="0" width="1" height="24" />
      <rect x="8" y="0" width="4" height="24" />
      <rect x="14" y="0" width="2" height="24" />
      <rect x="18" y="0" width="1" height="24" />
      <rect x="21" y="0" width="5" height="24" />
      <rect x="28" y="0" width="2" height="24" />
      <rect x="32" y="0" width="3" height="24" />
      <rect x="37" y="0" width="1" height="24" />
      <rect x="40" y="0" width="4" height="24" />
      <rect x="46" y="0" width="2" height="24" />
      <rect x="50" y="0" width="1" height="24" />
      <rect x="53" y="0" width="6" height="24" />
      <rect x="61" y="0" width="2" height="24" />
      <rect x="65" y="0" width="3" height="24" />
      <rect x="70" y="0" width="1" height="24" />
      <rect x="73" y="0" width="4" height="24" />
      <rect x="79" y="0" width="2" height="24" />
      <rect x="83" y="0" width="1" height="24" />
      <rect x="86" y="0" width="5" height="24" />
      <rect x="93" y="0" width="3" height="24" />
      <rect x="98" y="0" width="1" height="24" />
      <rect x="101" y="0" width="4" height="24" />
      <rect x="107" y="0" width="3" height="24" />
    </svg>
    {showCode && (
      <span className="font-mono text-[8px] tracking-[0.2em] text-fg-muted mt-0.5 uppercase">
        {code}
      </span>
    )}
  </div>
);

// Abstract techno circuit glyph inspired directly by Reference 1 ("Synthopsis" red block)
export const CircuitGlyph: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 160 50"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Node 1: Loop & branch */}
    <path d="M 10 25 H 25 C 32 25, 32 12, 45 12 H 55 C 65 12, 65 38, 75 38 H 90" />
    <circle cx="25" cy="25" r="3" fill="currentColor" />
    <circle cx="55" cy="12" r="3.5" fill="none" strokeWidth="2" />
    
    {/* Node 2: Rectangular bus path */}
    <path d="M 85 20 H 105 V 35 H 125 V 15 H 145" />
    <circle cx="105" cy="35" r="3" fill="currentColor" />
    <rect x="120" y="30" width="8" height="8" fill="none" strokeWidth="2" />
    
    {/* Terminal connector pins */}
    <line x1="145" y1="15" x2="155" y2="15" />
    <line x1="135" y1="42" x2="135" y2="48" />
    <line x1="142" y1="42" x2="142" y2="48" />
  </svg>
);

// 3D Wireframe Globe inspired by Reference 2 ("Y2K Reboot 2.0")
export const WireframeGlobe: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 120,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    className={className}
  >
    {/* Outer circle perimeter */}
    <circle cx="50" cy="50" r="46" strokeWidth="1.5" />
    
    {/* Longitude ellipses */}
    <ellipse cx="50" cy="50" rx="36" ry="46" />
    <ellipse cx="50" cy="50" rx="20" ry="46" />
    <line x1="50" y1="4" x2="50" y2="96" />
    
    {/* Latitude parallels */}
    <ellipse cx="50" cy="50" rx="46" ry="16" />
    <ellipse cx="50" cy="32" rx="42" ry="12" strokeDasharray="3 3" />
    <ellipse cx="50" cy="68" rx="42" ry="12" strokeDasharray="3 3" />
    <line x1="4" y1="50" x2="96" y2="50" />
    
    {/* Orbital ring */}
    <ellipse
      cx="50"
      cy="50"
      rx="48"
      ry="12"
      transform="rotate(-22 50 50)"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-signal-pink opacity-80"
    />
  </svg>
);

// Y2K 4-pointed Sparkle Starburst
export const Starburst: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 16,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`inline-block ${className}`}
  >
    <path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" />
  </svg>
);

// Pixel Dither Matrix Block (like in Reference 1)
export const PixelBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`grid grid-cols-4 gap-0.5 w-6 h-6 ${className}`}>
    <div className="bg-current opacity-90" />
    <div className="bg-transparent" />
    <div className="bg-current opacity-70" />
    <div className="bg-current opacity-90" />
    <div className="bg-transparent" />
    <div className="bg-current opacity-80" />
    <div className="bg-transparent" />
    <div className="bg-current opacity-50" />
    <div className="bg-current opacity-90" />
    <div className="bg-transparent" />
    <div className="bg-current opacity-90" />
    <div className="bg-transparent" />
    <div className="bg-transparent" />
    <div className="bg-current opacity-60" />
    <div className="bg-transparent" />
    <div className="bg-current opacity-90" />
  </div>
);
