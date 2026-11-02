import React from 'react';
import { Sparkles } from 'lucide-react';

export type MascotMood = 'welcome' | 'concerned' | 'explaining' | 'excited' | 'proud' | 'celebrating';

interface AnimatedMascotProps {
  mood?: MascotMood;
  speechText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedMascot: React.FC<AnimatedMascotProps> = ({
  mood = 'welcome',
  speechText,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48'
  };

  const getFacialExpressions = () => {
    switch (mood) {
      case 'concerned':
        return {
          eyebrows: 'M 35,42 Q 45,46 55,43 M 65,43 Q 75,46 85,42',
          mouth: 'M 50,78 Q 60,70 70,78',
          glowColor: '#ef4444',
          badgeText: 'Critical Issue',
          badgeColor: 'bg-red-100 text-red-700 border-red-200'
        };
      case 'excited':
      case 'celebrating':
        return {
          eyebrows: 'M 35,40 Q 45,34 55,38 M 65,38 Q 75,34 85,40',
          mouth: 'M 48,70 Q 60,86 72,70 Z',
          glowColor: '#10b981',
          badgeText: 'Eureka!',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        };
      case 'proud':
        return {
          eyebrows: 'M 35,41 Q 45,37 55,40 M 65,40 Q 75,37 85,41',
          mouth: 'M 49,72 Q 60,82 71,72',
          glowColor: '#8b5cf6',
          badgeText: 'Kalakriti AI',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
        };
      case 'explaining':
      default:
        return {
          eyebrows: 'M 35,42 Q 45,38 55,42 M 65,42 Q 75,38 85,42',
          mouth: 'M 50,72 Q 60,80 70,72',
          glowColor: '#a855f7',
          badgeText: 'AI Guide Kabir',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
        };
    }
  };

  const expression = getFacialExpressions();

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {speechText && (
        <div className="relative mb-3 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-purple-200 text-purple-950 text-xs sm:text-sm font-medium animate-bounce-subtle z-10">
          <div className="flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <p className="leading-snug">{speechText}</p>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-purple-200 rotate-45 transform" />
        </div>
      )}

      <div className={`relative ${sizeClasses[size]} transition-all duration-300 hover:scale-105`}>
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse"
          style={{ backgroundColor: expression.glowColor }}
        />

        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xl overflow-visible">
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>
            <linearGradient id="turbanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
            </filter>
          </defs>

          <path
            d="M 25,115 C 25,95 40,88 60,88 C 80,88 95,95 95,115 Z"
            fill="url(#bodyGrad)"
            filter="url(#softShadow)"
          />
          <path d="M 52,88 L 60,98 L 68,88" fill="none" stroke="#f3e8ff" strokeWidth="2" strokeLinecap="round" />
          <line x1="60" y1="98" x2="60" y2="114" stroke="#f3e8ff" strokeWidth="2" strokeDasharray="1,4" />

          <g className={mood === 'celebrating' || mood === 'welcome' ? 'animate-bounce' : ''}>
            <circle cx="24" cy="98" r="7" fill="#fed7aa" stroke="#7e22ce" strokeWidth="1.5" />
            <circle cx="96" cy="98" r="7" fill="#fed7aa" stroke="#7e22ce" strokeWidth="1.5" />
          </g>

          <circle cx="60" cy="60" r="30" fill="url(#faceGrad)" stroke="#7e22ce" strokeWidth="2" />

          <ellipse cx="42" cy="68" rx="5" ry="3" fill="#f87171" opacity="0.4" />
          <ellipse cx="78" cy="68" rx="5" ry="3" fill="#f87171" opacity="0.4" />

          <path
            d="M 30,50 C 25,32 40,20 60,20 C 80,20 95,32 90,50 C 85,38 75,34 60,34 C 45,34 35,38 30,50 Z"
            fill="url(#turbanGrad)"
            stroke="#b45309"
            strokeWidth="1.5"
          />
          <circle cx="60" cy="27" r="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
          <circle cx="60" cy="27" r="2" fill="#ef4444" />

          <path d={expression.eyebrows} fill="none" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />

          <g className="animate-pulse">
            <ellipse cx="46" cy="54" rx="4.5" ry="6" fill="#1e1b4b" />
            <circle cx="48" cy="52" r="2" fill="#ffffff" />
            <ellipse cx="74" cy="54" rx="4.5" ry="6" fill="#1e1b4b" />
            <circle cx="76" cy="52" r="2" fill="#ffffff" />
          </g>

          <circle cx="60" cy="42" r="1.5" fill="#dc2626" />
          <path
            d="M 47,68 Q 54,64 60,67 Q 66,64 73,68"
            fill="none"
            stroke="#451a03"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d={expression.mouth}
            fill={mood === 'excited' || mood === 'celebrating' ? '#dc2626' : 'none'}
            stroke="#451a03"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <circle cx="60" cy="14" r="3" fill="#a855f7" className="animate-ping opacity-75" />
          <circle cx="60" cy="14" r="2.5" fill="#c084fc" />
        </svg>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs whitespace-nowrap ${expression.badgeColor}`}>
            {expression.badgeText}
          </span>
        </div>
      </div>
    </div>
  );
};
