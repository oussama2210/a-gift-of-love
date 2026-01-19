import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { rosePetalColors, getRandomColor } from '@/lib/colors';

interface RosePetalsProps {
    count?: number;
    colors?: string[];
    enabled?: boolean;
}

interface Petal {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    opacity: number;
    color: string;
    duration: number;
    delay: number;
    swayAmplitude: number;
}

const RosePetalSVG = ({ color }: { color: string }) => (
    <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10 0C10 0 0 8 0 14C0 20 4 24 10 24C16 24 20 20 20 14C20 8 10 0 10 0Z"
            fill={color}
            fillOpacity="0.8"
        />
        <path
            d="M10 2C10 2 3 8 3 13C3 18 6 21 10 21"
            stroke={color}
            strokeOpacity="0.4"
            strokeWidth="0.5"
            fill="none"
        />
    </svg>
);

const RosePetals = ({
    count,
    colors = rosePetalColors,
    enabled = true
}: RosePetalsProps) => {
    const { maxParticles, prefersReducedMotion } = useDeviceCapability();
    const reducedMotion = useReducedMotion();

    // Don't render if disabled or reduced motion preferred
    if (!enabled || reducedMotion || prefersReducedMotion) {
        return null;
    }

    const petalCount = count ?? Math.min(15, maxParticles);

    // Generate petals with random properties
    const petals: Petal[] = useMemo(() => {
        return Array.from({ length: petalCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10 - Math.random() * 20,
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.8,
            opacity: 0.4 + Math.random() * 0.4,
            color: getRandomColor(colors),
            duration: 10 + Math.random() * 8,
            delay: Math.random() * 10,
            swayAmplitude: 30 + Math.random() * 50,
        }));
    }, [petalCount, colors]);

    return (
        <div className="particles-container" aria-hidden="true">
            {petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    className="rose-petal"
                    style={{
                        left: `${petal.x}%`,
                        top: `${petal.y}%`,
                        opacity: petal.opacity,
                    }}
                    initial={{
                        y: '-10vh',
                        x: 0,
                        rotate: petal.rotation,
                        scale: petal.scale,
                    }}
                    animate={{
                        y: '110vh',
                        x: [0, petal.swayAmplitude, -petal.swayAmplitude, 0],
                        rotate: petal.rotation + 360,
                    }}
                    transition={{
                        duration: petal.duration,
                        delay: petal.delay,
                        repeat: Infinity,
                        ease: 'linear',
                        x: {
                            duration: petal.duration / 2,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        },
                    }}
                >
                    <RosePetalSVG color={petal.color} />
                </motion.div>
            ))}
        </div>
    );
};

export default RosePetals;
