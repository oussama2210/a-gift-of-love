import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { useReducedMotion } from '@/hooks/useReducedMotion';
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
    twinkleDuration: number;
    delay: number;
    opacity: number;
}

const StarParticles = ({
    count,
    colors = starColors,
    enabled = true,
}: StarParticlesProps) => {
    const { maxParticles, prefersReducedMotion } = useDeviceCapability();
    const reducedMotion = useReducedMotion();

    // Don't render if disabled or reduced motion preferred
    if (!enabled || reducedMotion || prefersReducedMotion) {
        return null;
    }

    const starCount = count ?? Math.min(20, maxParticles);

    // Generate stars with random properties
    const stars: Star[] = useMemo(() => {
        return Array.from({ length: starCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 2 + Math.random() * 4,
            color: getRandomColor(colors),
            twinkleDuration: 2 + Math.random() * 3,
            delay: Math.random() * 5,
            opacity: 0.3 + Math.random() * 0.5,
        }));
    }, [starCount, colors]);

    return (
        <div className="particles-container" aria-hidden="true">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="star-particle"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        backgroundColor: star.color,
                        boxShadow: `0 0 ${star.size * 2}px ${star.color}, 0 0 ${star.size * 4}px ${star.color}`,
                    }}
                    initial={{
                        opacity: star.opacity * 0.3,
                        scale: 0.5,
                    }}
                    animate={{
                        opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: star.twinkleDuration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

export default StarParticles;
