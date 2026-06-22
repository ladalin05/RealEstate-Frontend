import React from 'react';

interface ShowerIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

interface BedIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Bed: React.FC<BedIconProps> = ({ size = 24, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size }}
      className={`inline-block ${className}`}
      {...props}
    >
      {/* Headboard frame */}
      <path d="M4 11V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5" />
      {/* Pillows */}
      <rect x="6" y="7" width="5" height="3" rx="0.5" />
      <rect x="13" y="7" width="5" height="3" rx="0.5" />
      {/* Mattress Main Base */}
      <path d="M3 11h18v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z" />
      {/* Bed Legs */}
      <path d="M5 17v3M19 17v3" />
    </svg>
  );
};

export const Shower: React.FC<ShowerIconProps> = ({ size = 24, className = '', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: size, height: size }}
      className={`inline-block ${className}`}
      {...props}
    >
      {/* Main plumbing pipe */}
      <path d="M7 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11" />
      {/* Shower head dome */}
      <path d="M5 11a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3H5z" />
      {/* Water droplets / spray pattern */}
      <path d="M7 15v.01M11 15v.01M15 15v.01M9 18v.01M13 18v.01" strokeWidth="2.5" />
    </svg>
  );
};