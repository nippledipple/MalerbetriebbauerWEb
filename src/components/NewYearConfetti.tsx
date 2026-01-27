import React, { useEffect, useState } from 'react';

interface Confetti {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

const NewYearConfetti: React.FC = () => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = ['#ffd700', '#fff', '#ffed4e', '#f0c419', '#d4af37', '#ff6b6b', '#4ecdc4', '#95e1d3'];
    const pieces: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
    }));

    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animation: `float-up ${piece.duration}s linear infinite`,
            animationDelay: `${piece.delay}s`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default NewYearConfetti;
