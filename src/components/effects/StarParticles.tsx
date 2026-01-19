import { useMemo } from 'react';
import { starColors, getRandomColor } from '@/lib/colors';

interface StarParticlesProps {
    count?: number;
    colors?: string[];
    enabled?: boolean;
}

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    animationDelay: string;
    opacity: number;
}

const StarParticles = ({
    count = 15,
    colors = starColors,
    enabled = true,
}: StarParticlesProps) => {
    // Don't render if disabled
    if (!enabled) {
        return null;
    }

    // Generate stars with random properties - using CSS animations instead of Framer Motion
    const stars: Star[] = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 3,
            color: getRandomColor(colors),
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.4,
        }));
    }, [count, colors]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-1" aria-hidden="true">
            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        backgroundColor: star.color,
                        boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
                        opacity: star.opacity,
                        animation: `twinkle 3s ease-in-out infinite`,
                        animationDelay: star.animationDelay,
                    }}
                />
            ))}
        </div>
    );
};

export default StarParticles;
