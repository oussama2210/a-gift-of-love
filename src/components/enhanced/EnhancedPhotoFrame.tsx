import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ayatPhoto from '@/assets/ayat-photo.jpg';

interface EnhancedPhotoFrameProps {
    language: 'ar' | 'en';
    size?: 'small' | 'medium' | 'large';
    decorationStyle?: 'roses' | 'hearts' | 'mixed';
    glowIntensity?: 'subtle' | 'medium' | 'intense';
}

// Rose decoration SVG
const RoseDecoration = ({ className }: { className?: string }) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <circle cx="16" cy="16" r="8" fill="#ff6b9d" fillOpacity="0.8" />
        <circle cx="16" cy="14" r="4" fill="#ff8fb1" fillOpacity="0.9" />
        <ellipse cx="12" cy="18" rx="3" ry="4" fill="#ff6b9d" fillOpacity="0.7" transform="rotate(-30 12 18)" />
        <ellipse cx="20" cy="18" rx="3" ry="4" fill="#ff6b9d" fillOpacity="0.7" transform="rotate(30 20 18)" />
        <ellipse cx="16" cy="22" rx="3" ry="4" fill="#c44569" fillOpacity="0.6" />
    </svg>
);

// Butterfly decoration SVG
const ButterflyDecoration = ({ className }: { className?: string }) => (
    <svg
        width="28"
        height="24"
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <ellipse cx="8" cy="10" rx="6" ry="8" fill="#ff8fb1" fillOpacity="0.7" />
        <ellipse cx="20" cy="10" rx="6" ry="8" fill="#ff8fb1" fillOpacity="0.7" />
        <ellipse cx="8" cy="16" rx="4" ry="5" fill="#ffa8c5" fillOpacity="0.6" />
        <ellipse cx="20" cy="16" rx="4" ry="5" fill="#ffa8c5" fillOpacity="0.6" />
        <ellipse cx="14" cy="12" rx="2" ry="8" fill="#c44569" fillOpacity="0.8" />
    </svg>
);

const EnhancedPhotoFrame = ({
    language,
    size = 'medium',
    decorationStyle = 'mixed',
    glowIntensity = 'medium',
}: EnhancedPhotoFrameProps) => {
    const reducedMotion = useReducedMotion();

    // Size configurations
    const sizes = {
        small: 'w-32 h-32 md:w-40 md:h-40',
        medium: 'w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60',
        large: 'w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72',
    };

    // Glow configurations
    const glowStyles = {
        subtle: {
            blur: 'blur-xl',
            opacity: 'opacity-20',
            shadowIntensity: 0.3,
        },
        medium: {
            blur: 'blur-2xl',
            opacity: 'opacity-30',
            shadowIntensity: 0.5,
        },
        intense: {
            blur: 'blur-3xl',
            opacity: 'opacity-40',
            shadowIntensity: 0.7,
        },
    };

    const glow = glowStyles[glowIntensity];

    // Decoration positions for corners
    const decorationPositions = [
        { top: '-12px', left: '-12px', rotate: -45 },
        { top: '-12px', right: '-12px', rotate: 45 },
        { bottom: '-12px', left: '-12px', rotate: -135 },
        { bottom: '-12px', right: '-12px', rotate: 135 },
    ];

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.8, duration: 1, type: 'spring', stiffness: 80 }}
            style={{ perspective: '1000px' }}
        >
            {/* Outer glow layer */}
            <motion.div
                className={`absolute -inset-6 rounded-full bg-gradient-to-r from-primary via-accent to-primary ${glow.opacity} ${glow.blur}`}
                animate={
                    reducedMotion
                        ? {}
                        : {
                            opacity: [0.2, 0.4, 0.2],
                            scale: [1, 1.15, 1],
                        }
                }
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Secondary glow layer */}
            <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500/20 via-rose-400/30 to-pink-500/20 blur-xl"
                animate={
                    reducedMotion
                        ? {}
                        : {
                            rotate: [0, 360],
                        }
                }
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Animated border frame */}
            <motion.div
                className="relative p-1 rounded-full"
                style={{
                    background: 'linear-gradient(135deg, #ff6b9d, #ffd93d, #ff6b9d, #c44569)',
                    backgroundSize: '300% 300%',
                }}
                animate={
                    reducedMotion
                        ? {}
                        : {
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            boxShadow: [
                                '0 0 20px rgba(255, 107, 157, 0.4)',
                                '0 0 40px rgba(255, 107, 157, 0.6)',
                                '0 0 20px rgba(255, 107, 157, 0.4)',
                            ],
                        }
                }
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
                {/* Inner decorative border */}
                <div className="p-1 rounded-full bg-gradient-to-br from-rose-900/50 to-pink-900/50">
                    {/* Inner frame */}
                    <div className="relative p-1 rounded-full bg-background">
                        {/* Photo */}
                        <motion.img
                            src={ayatPhoto}
                            alt={language === 'ar' ? 'آيات' : 'Ayat'}
                            className={`${sizes[size]} rounded-full object-cover shadow-inner`}
                            whileHover={reducedMotion ? {} : { scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        />

                        {/* Inner shadow overlay */}
                        <div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Corner decorations */}
            {decorationPositions.map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute z-10"
                    style={{
                        ...pos,
                        transform: `rotate(${pos.rotate}deg)`,
                    }}
                    animate={
                        reducedMotion
                            ? {}
                            : {
                                y: [0, -5, 0],
                                scale: [1, 1.1, 1],
                            }
                    }
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'easeInOut',
                    }}
                >
                    {decorationStyle === 'roses' || (decorationStyle === 'mixed' && i % 2 === 0) ? (
                        <RoseDecoration />
                    ) : (
                        <Heart size={24} className="text-primary fill-primary" />
                    )}
                </motion.div>
            ))}

            {/* Floating butterflies */}
            {decorationStyle === 'mixed' && (
                <>
                    <motion.div
                        className="absolute -top-8 left-1/2 -translate-x-1/2"
                        animate={
                            reducedMotion
                                ? {}
                                : {
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0],
                                }
                        }
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ButterflyDecoration />
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2"
                        animate={
                            reducedMotion
                                ? {}
                                : {
                                    y: [0, 10, 0],
                                    rotate: [0, -5, 5, 0],
                                }
                        }
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                        <ButterflyDecoration />
                    </motion.div>
                </>
            )}

            {/* Sparkle effects */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-white"
                    style={{
                        top: `${20 + Math.sin(i * 1.2) * 40}%`,
                        left: `${10 + (i * 16)}%`,
                    }}
                    animate={
                        reducedMotion
                            ? {}
                            : {
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                            }
                    }
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </motion.div>
    );
};

export default EnhancedPhotoFrame;
