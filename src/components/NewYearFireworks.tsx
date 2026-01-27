import React, { useEffect, useState } from 'react';

const NewYearFireworks: React.FC = () => {
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFirework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 20 + Math.random() * 30,
        color: ['#ffd700', '#fff', '#ffed4e', '#f0c419', '#d4af37', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 7)]
      };

      setFireworks(prev => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
      }, 1500);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {fireworks.map(fw => (
        <div
          key={fw.id}
          className="absolute"
          style={{
            left: `${fw.x}%`,
            top: `${fw.y}%`,
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: fw.color,
                animation: `firework 1.5s ease-out forwards`,
                transform: `rotate(${i * 30}deg) translateX(0)`,
                animationDelay: '0s',
                boxShadow: `0 0 8px ${fw.color}`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NewYearFireworks;
