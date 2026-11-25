'use client';

import { useEffect, useState } from 'react';
import { EVENT_START_ISO } from '@/lib/event';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const targetDate = new Date(EVENT_START_ISO).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration errors by not rendering the numbers until the client loads
  if (!timeLeft) {
    return (
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">Counting Down</p>
        <div className="flex justify-center gap-4 text-slate-300">
          <span className="opacity-50">Loading...</span>
        </div>
      </div>
    );
  }

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
  ];

  return (
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">Counting Down</p>
      <div className="flex justify-center gap-4 sm:gap-8">
        {timeBlocks.map((block) => (
          <div 
            key={block.label} 
            className="flex flex-col items-center justify-center bg-white text-slate-900 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-xl"
          >
            <span className="text-4xl sm:text-5xl font-serif">
              {block.value}
            </span>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-500 mt-2">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}