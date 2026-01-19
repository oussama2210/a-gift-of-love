import { Variants, Transition } from 'framer-motion';

// Container variants with stagger children
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

// Item variants for children in staggered containers
export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
        },
    },
};

// Fade in animation
export const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

// Slide up animation
export const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
        },
    },
};

// Slide from left animation
export const slideFromLeftVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
        },
    },
};

// Slide from right animation
export const slideFromRightVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
        },
    },
};

// 3D rotation animation
export const rotate3DVariants: Variants = {
    hidden: { opacity: 0, rotateY: 90, scale: 0.8 },
    visible: {
        opacity: 1,
        rotateY: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};

// Scale animation
export const scaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 15,
        },
    },
};

// Heart beat animation
export const heartBeatVariants: Variants = {
    animate: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Glow pulse animation
export const glowPulseVariants: Variants = {
    animate: {
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.2, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Float animation for decorative elements
export const floatVariants: Variants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Rotating animation
export const rotateVariants: Variants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

// Carousel transitions
export const carouselVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 500 : -500,
        opacity: 0,
        scale: 0.9,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut' as const,
        },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 500 : -500,
        opacity: 0,
        scale: 0.9,
        transition: {
            duration: 0.4,
        },
    }),
};

// Timeline entry variants
export const timelineVariants = {
    hidden: (position: 'left' | 'right') => ({
        opacity: 0,
        x: position === 'left' ? -100 : 100,
        scale: 0.8,
    }),
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};

// Text gradient animation
export const gradientShiftVariants: Variants = {
    animate: {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
        },
    },
};

// Letter animation for staggered text
export const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateY: 90 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        rotateY: 0,
        transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 100,
        },
    }),
};

// Hover effects
export const hoverScaleEffect = {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 300 },
};

export const hoverGlowEffect = {
    boxShadow: '0 0 30px rgba(255, 107, 157, 0.5)',
    transition: { duration: 0.3 },
};

// Spring transition presets
export const springTransition: Transition = {
    type: 'spring',
    stiffness: 200,
    damping: 20,
};

export const softSpringTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
};

export const bouncySpringTransition: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 10,
};

// Reduced motion variants (simplified animations)
export const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
};
