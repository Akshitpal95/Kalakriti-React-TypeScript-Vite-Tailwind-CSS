import React from 'react';

interface AudioWaveformProps {
  isActive: boolean;
  color?: string;
  barCount?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isActive,
  color = 'bg-gold-500',
  barCount = 18
}) => {
  return (
    <div className="flex items-center justify-center gap-1 h-10 px-4 py-2 bg-[#FAF6EF]/90 backdrop-blur-sm rounded-full border border-gold-300/50 shadow-inner">
      {Array.from({ length: barCount }).map((_, i) => {
        // Vary heights pseudo-randomly
        const baseHeight = ((i % 5) + 2) * 5;
        const activeHeight = Math.min(32, Math.max(8, ((i * 7) % 24) + 8));
        const delay = (i * 0.08).toFixed(2);

        return (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${color} ${
              isActive ? 'animate-pulse' : 'opacity-30'
            }`}
            style={{
              height: isActive ? `${activeHeight}px` : `${baseHeight}px`,
              animationDelay: `${delay}s`,
              animationDuration: '0.9s'
            }}
          />
        );
      })}
    </div>
  );
};
