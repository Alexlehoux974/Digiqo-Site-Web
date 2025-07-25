import React from 'react';

interface IconProps {
  className?: string;
  isActive?: boolean;
  color?: string;
}

export const GeneralIcon: React.FC<IconProps> = ({ className = "", isActive = false, color = "#9CA3AF" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M16 22V20M16 17V10" stroke={isActive ? color : "currentColor"} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="10" r="1.5" fill={isActive ? color : "currentColor"} opacity={isActive ? 1 : 0.8}/>
  </svg>
);

export const ServicesIcon: React.FC<IconProps> = ({ className = "", isActive = false, color = "#9CA3AF" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L22 7.5V14.5L16 18L10 14.5V7.5L16 4Z" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M22 14L28 17.5V24.5L22 28L16 24.5V17.5L22 14Z" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M10 14L16 17.5V24.5L10 28L4 24.5V17.5L10 14Z" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
  </svg>
);

export const ClosingIcon: React.FC<IconProps> = ({ className = "", isActive = false, color = "#9CA3AF" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16L8 12C8 12 10 8 14 8C16 8 17 9 17 9" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 1 : 0.6}/>
    <path d="M20 16L24 12C24 12 22 8 18 8C16 8 15 9 15 9" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 1 : 0.6}/>
    <path d="M8 12V20C8 22 10 24 12 24H20C22 24 24 22 24 20V12" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 1 : 0.6}/>
    <circle cx="16" cy="16" r="3" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.8}/>
  </svg>
);

export const ProcessIcon: React.FC<IconProps> = ({ className = "", isActive = false, color = "#9CA3AF" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="6" height="6" rx="1" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <rect x="13" y="4" width="6" height="6" rx="1" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <rect x="22" y="4" width="6" height="6" rx="1" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <rect x="13" y="22" width="6" height="6" rx="1" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M7 10V14C7 15 8 16 9 16H13M19 16H23C24 16 25 15 25 14V10" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 1 : 0.6}/>
    <path d="M16 16V22" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 1 : 0.6}/>
  </svg>
);

export const PaymentIcon: React.FC<IconProps> = ({ className = "", isActive = false, color = "#9CA3AF" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="24" height="16" rx="2" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M4 14H28" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M20 18H24" stroke={isActive ? color : "currentColor"} strokeWidth="2" strokeLinecap="round" opacity={isActive ? 1 : 0.8}/>
    <path d="M12 20C12 20 13 16 16 16C19 16 20 20 20 20" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 1 : 0.6}/>
    <circle cx="8" cy="11" r="1" fill={isActive ? color : "currentColor"} opacity={isActive ? 1 : 0.8}/>
  </svg>
);

export const ResultsIcon: React.FC<IconProps> = ({ className = "", isActive = false, color = "#9CA3AF" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="20" width="4" height="8" rx="1" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <rect x="14" y="16" width="4" height="12" rx="1" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <rect x="22" y="12" width="4" height="16" rx="1" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M4 10L8 6L14 10L20 4L28 8" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={isActive ? 1 : 0.8}/>
    <path d="M24 8H28V12" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={isActive ? 1 : 0.8}/>
  </svg>
);

export const SupportIcon: React.FC<IconProps> = ({ className = "", isActive = false, color = "#9CA3AF" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 16V14C8 10 12 6 16 6C20 6 24 10 24 14V16" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <rect x="6" y="16" width="4" height="8" rx="2" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <rect x="22" y="16" width="4" height="8" rx="2" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M24 22C24 22 24 26 20 26H16" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 1 : 0.6}/>
    <circle cx="16" cy="26" r="2" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.8}/>
  </svg>
);

export const OthersIcon: React.FC<IconProps> = ({ className = "", isActive = false, color = "#9CA3AF" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="8" r="3" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <circle cx="8" cy="20" r="3" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <circle cx="24" cy="20" r="3" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" opacity={isActive ? 1 : 0.6}/>
    <path d="M16 16V11M16 16L10 18M16 16L22 18" stroke={isActive ? color : "currentColor"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? 1 : 0.6}/>
    <path d="M16 16L16 18" stroke={isActive ? color : "currentColor"} strokeWidth="2" strokeLinecap="round" opacity={isActive ? 1 : 0.8}/>
  </svg>
);