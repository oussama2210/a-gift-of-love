import { motion } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface EnhancedBackgroundProps {
    variant?: 'romantic' | 'elegant' | 'dreamy';
    animated?: boolean;
    patternType?: 'hearts' | 'stars' | 'none';
}

// Heart pattern SVG
const HeartPattern = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.03]">
        <defs>
            <pattern id="hearts" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                    d="M30 15 C25 5, 10 5, 10 17 C10 27, 30 37, 30 37 C30 37, 50 27, 50 17 C50 5, 35 5, 30 15Z"
                    fill="currentColor"
                    className="text-primary"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hearts)" />
    </svg>
);

// Star pattern SVG
const StarPattern = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.04]">
        <defs>
            <pattern id="stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                    d="M40 5 L45 30 L70 35 L45 40 L40 65 L35 40 L10 35 L35 30 Z"
                    fill="currentColor"
                    className="text-accent"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
    </svg>
);

const EnhancedBackground = ({
    variant = 'romantic',
    animated = true,
    patternType = 'hearts',
}: EnhancedBackgroundProps) => {
    const { prefersReducedMotion, tier } = useDeviceCapability();
    const reducedMotion = useReducedMotion();

    const shouldAnimate = animated && !reducedMotion && !prefersReducedMotion && tier !== 'low';

    // Color schemes for different variants
    const colorSchemes = {
        romantic: {
            primary: 'from-rose-900/20 via-pink-900/10 to-purple-900/20',
            secondary: 'from-pink-500/5 to-rose-500/5',
            spotlight: 'bg-gradient-radial from-pink-500/10 via-transparent to-transparent',
        },
        elegant: {
            primary: 'from-purple-950/30 via-rose-950/20 to-amber-950/20',
            secondary: 'from-amber-500/5 to-rose-500/5',
            spotlight: 'bg-gradient-radial from-amber-500/10 via-transparent to-transparent',
        },
        dreamy: {
            primary: 'from-pink-800/20 via-purple-800/15 to-blue-900/20',
            secondary: 'from-purple-500/5 to-pink-500/5',
            spotlight: 'bg-gradient-radial from-purple-500/10 via-transparent to-transparent',
        },
    };

    const scheme = colorSchemes[variant];

    return (
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
            {/* Layer 1: Base gradient */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${scheme.primary}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Layer 2: Secondary gradient with animation */}
            {shouldAnimate ? (
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-tr ${scheme.secondary}`}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-tr ${scheme.secondary} opacity-40`} />
            )}

            {/* Layer 3: Pattern overlay */}
            {patternType === 'hearts' && <HeartPattern />}
            {patternType === 'stars' && <StarPattern />}

            {/* Layer 4: Animated spotlight effects */}
            {shouldAnimate && (
                <>
                    <motion.div
                        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-pink-500/10 via-transparent to-transparent blur-3xl"
                        style={{
                            left: '10%',
                            top: '20%',
                        }}
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-amber-500/8 via-transparent to-transparent blur-3xl"
                        style={{
                            right: '10%',
                            bottom: '20%',
                        }}
                        animate={{
                            x: [0, -80, 0],
                            y: [0, -60, 0],
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 2,
                        }}
                    />
                </>
            )}

            {/* Layer 5: Vignette effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                }}
            />

            {/* Layer 6: Top gradient fade */}
            <div
                className="absolute inset-x-0 top-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, hsl(340 30% 8%) 0%, transparent 100%)',
                }}
            />
        </div>
    );
};

export default EnhancedBackground;
