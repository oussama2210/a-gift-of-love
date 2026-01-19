import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Gift, LucideIcon } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { translations } from '@/contexts/LanguageContext';
import { containerVariants, itemVariants } from '@/lib/animations';

interface EnhancedWishCardsProps {
    language: 'ar' | 'en';
    layout?: 'grid' | 'horizontal';
}

interface Wish {
    id: string;
    icon: LucideIcon;
    textKey: 'wish1' | 'wish2' | 'wish3';
    color: string;
    glowColor: string;
}

const wishes: Wish[] = [
    {
        id: 'love',
        icon: Heart,
        textKey: 'wish1',
        color: '#ff6b9d',
        glowColor: 'rgba(255, 107, 157, 0.5)',
    },
    {
        id: 'happiness',
        icon: Star,
        textKey: 'wish2',
        color: '#ffd93d',
        glowColor: 'rgba(255, 217, 61, 0.5)',
    },
    {
        id: 'dreams',
        icon: Gift,
        textKey: 'wish3',
        color: '#e056fd',
        glowColor: 'rgba(224, 86, 253, 0.5)',
    },
];

interface CardState {
    isHovered: boolean;
    tiltX: number;
    tiltY: number;
    glowX: number;
    glowY: number;
}

const WishCard = ({
    wish,
    text,
    index,
    reducedMotion,
}: {
    wish: Wish;
    text: string;
    index: number;
    reducedMotion: boolean;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardState, setCardState] = useState<CardState>({
        isHovered: false,
        tiltX: 0,
        tiltY: 0,
        glowX: 50,
        glowY: 50,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reducedMotion || !cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt angles (max 15 degrees)
        const tiltX = ((y - centerY) / centerY) * -10;
        const tiltY = ((x - centerX) / centerX) * 10;

        // Calculate glow position
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        setCardState((prev) => ({
            ...prev,
            tiltX,
            tiltY,
            glowX,
            glowY,
        }));
    };

    const handleMouseEnter = () => {
        setCardState((prev) => ({ ...prev, isHovered: true }));
    };

    const handleMouseLeave = () => {
        setCardState({
            isHovered: false,
            tiltX: 0,
            tiltY: 0,
            glowX: 50,
            glowY: 50,
        });
    };

    const Icon = wish.icon;

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            className="relative group"
            style={{ perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="relative p-6 rounded-2xl glass-card overflow-hidden cursor-pointer"
                style={{
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    rotateX: cardState.tiltX,
                    rotateY: cardState.tiltY,
                    scale: cardState.isHovered ? 1.05 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                }}
            >
                {/* Dynamic glow effect following cursor */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${cardState.glowX}% ${cardState.glowY}%, ${wish.glowColor} 0%, transparent 60%)`,
                    }}
                />

                {/* Border glow on hover */}
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        boxShadow: `inset 0 0 0 1px ${wish.color}40, 0 0 20px ${wish.glowColor}`,
                    }}
                />

                {/* Card content */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                    {/* Icon with animation */}
                    <motion.div
                        className="relative"
                        animate={
                            reducedMotion
                                ? {}
                                : cardState.isHovered
                                    ? {
                                        rotate: [0, -10, 10, 0],
                                        scale: [1, 1.2, 1.2, 1],
                                    }
                                    : {
                                        rotate: [0, 5, -5, 0],
                                    }
                        }
                        transition={{
                            duration: cardState.isHovered ? 0.5 : 3,
                            repeat: cardState.isHovered ? 0 : Infinity,
                            delay: index * 0.3,
                        }}
                    >
                        {/* Icon glow */}
                        <motion.div
                            className="absolute inset-0 blur-lg"
                            style={{ backgroundColor: wish.color }}
                            animate={
                                reducedMotion
                                    ? {}
                                    : {
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [1, 1.3, 1],
                                    }
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <Icon
                            size={32}
                            className="relative z-10"
                            color={wish.color}
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.span
                        className="text-sm md:text-base font-medium text-foreground text-center"
                        animate={
                            reducedMotion
                                ? {}
                                : cardState.isHovered
                                    ? { y: -2 }
                                    : { y: 0 }
                        }
                    >
                        {text}
                    </motion.span>
                </div>

                {/* Shimmer effect on hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={cardState.isHovered ? { x: '200%' } : { x: '-100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    style={{
                        background:
                            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                    }}
                />
            </motion.div>

            {/* Particle burst on hover */}
            {cardState.isHovered && !reducedMotion && (
                <>
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                                backgroundColor: wish.color,
                                left: '50%',
                                top: '50%',
                            }}
                            initial={{ scale: 0, x: 0, y: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                x: Math.cos((i * Math.PI * 2) / 6) * 40,
                                y: Math.sin((i * Math.PI * 2) / 6) * 40,
                                opacity: [1, 0],
                            }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                        />
                    ))}
                </>
            )}
        </motion.div>
    );
};

const EnhancedWishCards = ({
    language,
    layout = 'grid',
}: EnhancedWishCardsProps) => {
    const reducedMotion = useReducedMotion();
    const t = translations[language];

    return (
        <motion.div
            className={`w-full max-w-3xl px-4 ${layout === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-3 gap-4'
                : 'flex flex-wrap justify-center gap-4'
                }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {wishes.map((wish, index) => (
                <WishCard
                    key={wish.id}
                    wish={wish}
                    text={t[wish.textKey]}
                    index={index}
                    reducedMotion={reducedMotion}
                />
            ))}
        </motion.div>
    );
};

export default EnhancedWishCards;
