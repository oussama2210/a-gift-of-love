import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LoadingAnimationProps {
    onComplete: () => void;
    minimumDuration?: number;
}

const LoadingAnimation = ({
    onComplete,
    minimumDuration = 2500,
}: LoadingAnimationProps) => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState<'loading' | 'revealing' | 'complete'>('loading');

    const reducedMotion = useReducedMotion();

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 15;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return newProgress;
            });
        }, 100);

        // Minimum duration timer
        const timer = setTimeout(() => {
            setProgress(100);
            clearInterval(interval);
        }, minimumDuration - 500);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [minimumDuration]);

    useEffect(() => {
        if (progress >= 100 && stage === 'loading') {
            setStage('revealing');
            setTimeout(() => {
                setStage('complete');
                onComplete();
            }, 800);
        }
    }, [progress, stage, onComplete]);

    // Skip animation if reduced motion
    useEffect(() => {
        if (reducedMotion) {
            setTimeout(() => {
                setStage('complete');
                onComplete();
            }, 500);
        }
    }, [reducedMotion, onComplete]);

    if (stage === 'complete') return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />

                {/* Floating particles */}
                {!reducedMotion && (
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    backgroundColor: i % 2 === 0 ? '#ff6b9d' : '#ffd93d',
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.2, 0.8, 0.2],
                                    scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Main content */}
                <div className="relative z-10 flex flex-col items-center gap-8">
                    {/* Heart animation */}
                    <motion.div className="relative">
                        {/* Glow layers */}
                        <motion.div
                            className="absolute inset-0 blur-3xl"
                            style={{ backgroundColor: 'rgba(255, 107, 157, 0.3)' }}
                            animate={
                                reducedMotion
                                    ? {}
                                    : {
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                    }
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Outer ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-4 border-primary/30"
                            style={{ width: 120, height: 120, margin: -20 }}
                            animate={
                                reducedMotion
                                    ? {}
                                    : {
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 0.2, 0.5],
                                        rotate: 360,
                                    }
                            }
                            transition={{
                                scale: { duration: 2, repeat: Infinity },
                                opacity: { duration: 2, repeat: Infinity },
                                rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                            }}
                        />

                        {/* Heart icon */}
                        <motion.div
                            animate={
                                reducedMotion
                                    ? {}
                                    : stage === 'loading'
                                        ? {
                                            scale: [1, 1.15, 1],
                                        }
                                        : {
                                            scale: [1, 1.5],
                                            opacity: [1, 0],
                                        }
                            }
                            transition={
                                stage === 'loading'
                                    ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                                    : { duration: 0.6 }
                            }
                        >
                            <Heart
                                size={80}
                                className="text-primary"
                                fill="url(#heartGradient)"
                                strokeWidth={1}
                            />
                            {/* Gradient definition */}
                            <svg width="0" height="0">
                                <defs>
                                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ff6b9d" />
                                        <stop offset="50%" stopColor="#ffd93d" />
                                        <stop offset="100%" stopColor="#ff6b9d" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>

                        {/* Particle burst on reveal */}
                        {stage === 'revealing' && !reducedMotion && (
                            <>
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 rounded-full bg-primary"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                        }}
                                        initial={{ scale: 0, x: 0, y: 0 }}
                                        animate={{
                                            scale: [0, 1, 0],
                                            x: Math.cos((i * Math.PI * 2) / 12) * 100,
                                            y: Math.sin((i * Math.PI * 2) / 12) * 100,
                                            opacity: [1, 0],
                                        }}
                                        transition={{ duration: 0.8, delay: i * 0.03 }}
                                    />
                                ))}
                            </>
                        )}
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-48">
                        <motion.div
                            className="h-1 rounded-full bg-muted overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.div>

                        {/* Loading text */}
                        <motion.p
                            className="text-sm text-muted-foreground text-center mt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {stage === 'loading' ? (
                                <motion.span
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    Preparing something special...
                                </motion.span>
                            ) : (
                                '💕'
                            )}
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoadingAnimation;
