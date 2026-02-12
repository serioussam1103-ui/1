
import React, { useEffect, useState } from 'react';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; duration: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100 + '%',
        duration: (Math.random() * 4 + 6) + 's', // Slower fall for better aesthetics
        size: (Math.random() * 25 + 10) + 'px',
        delay: (Math.random() * 2) + 's'
      };
      setHearts(prev => [...prev.slice(-30), newHeart]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-particle text-red-300/60"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            fontSize: heart.size
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;
