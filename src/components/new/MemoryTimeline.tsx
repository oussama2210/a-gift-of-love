import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Star, Gift, Cake, Calendar, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface Memory {
    id: string;
    date: string;
    title: string;
    description: string;
    icon?: 'heart' | 'star' | 'gift' | 'cake' | 'calendar' | 'sparkles';
}

interface MemoryTimelineProps {
    memories: Memory[];
    language: 'ar' | 'en';
    layout?: 'alternating' | 'single';
}

const iconMap = {
    heart: Heart,
    star: Star,
    gift: Gift,
    cake: Cake,
    calendar: Calendar,
    sparkles: Sparkles,
};

// Default memories
const defaultMemoriesAr: Memory[] = [
    { id: '1', date: 'اليوم الأول', title: 'اللقاء الأول', description: 'اللحظة التي غيرت حياتي إلى الأبد', icon: 'heart' },
    { id: '2', date: 'كل يوم', title: 'مغامراتنا معاً', description: 'كل لحظة معك هي ذكرى جميلة', icon: 'star' },
    { id: '3', date: 'اليوم', title: 'عيد ميلادك', description: 'أجمل يوم في السنة لأنه يومك الخاص', icon: 'cake' },
    { id: '4', date: 'المستقبل', title: 'أحلامنا معاً', description: 'مستقبل مليء بالحب والسعادة', icon: 'sparkles' },
];

const defaultMemoriesEn: Memory[] = [
    { id: '1', date: 'Day One', title: 'First Meeting', description: 'The moment that changed my life forever', icon: 'heart' },
    { id: '2', date: 'Every Day', title: 'Our Adventures', description: 'Every moment with you is a beautiful memory', icon: 'star' },
    { id: '3', date: 'Today', title: 'Your Birthday', description: 'The most beautiful day because it\'s your special day', icon: 'cake' },
    { id: '4', date: 'The Future', title: 'Our Dreams Together', description: 'A future filled with love and happiness', icon: 'sparkles' },
];

const TimelineEntry = ({
    memory,
    index,
    position,
    language,
    reducedMotion,
}: {
    memory: Memory;
    index: number;
    position: 'left' | 'right' | 'center';
    language: 'ar' | 'en';
    reducedMotion: boolean;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const Icon = iconMap[memory.icon || 'heart'];
    const isRTL = language === 'ar';

    // Adjust position for RTL
    const adjustedPosition = isRTL
        ? position === 'left'
            ? 'right'
            : position === 'right'
                ? 'left'
                : position
        : position;

    return (
        <motion.div
            ref={ref}
            className={`relative flex items-center ${position === 'center'
                    ? 'justify-center'
                    : adjustedPosition === 'left'
                        ? 'justify-start'
                        : 'justify-end'
                } w-full`}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: adjustedPosition === 'left' ? -50 : adjustedPosition === 'right' ? 50 : 0 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
        >
            {/* Timeline line connector */}
            {position !== 'center' && (
                <motion.div
                    className={`absolute top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-accent/50 ${adjustedPosition === 'left' ? 'right-1/2 mr-6' : 'left-1/2 ml-6'
                        }`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    style={{ originX: adjustedPosition === 'left' ? 1 : 0 }}
                />
            )}

            {/* Content card */}
            <motion.div
                className={`relative w-full max-w-xs p-4 rounded-xl glass-card ${position === 'center' ? '' : adjustedPosition === 'left' ? 'mr-auto' : 'ml-auto'
                    }`}
                style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                whileHover={reducedMotion ? {} : { scale: 1.02, boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)' }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {/* Icon badge */}
                <motion.div
                    className="absolute -top-3 left-4 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg"
                    animate={reducedMotion ? {} : { rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                    <Icon size={16} className="text-white" />
                </motion.div>

                {/* Date badge */}
                <div className="text-xs text-accent font-medium mb-2 mt-2">{memory.date}</div>

                {/* Title */}
                <h4 className="text-base font-bold text-foreground mb-1">{memory.title}</h4>

                {/* Description */}
                <p className="text-sm text-muted-foreground">{memory.description}</p>

                {/* Decorative corner */}
                <div className="absolute bottom-2 right-2 opacity-20">
                    <Heart size={16} className="text-primary fill-primary" />
                </div>
            </motion.div>

            {/* Center dot on timeline */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.2 + 0.2, type: 'spring' }}
            >
                {/* Pulse effect */}
                {!reducedMotion && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-primary"
                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

const MemoryTimeline = ({
    memories,
    language,
    layout = 'alternating',
}: MemoryTimelineProps) => {
    const defaultMemories = language === 'ar' ? defaultMemoriesAr : defaultMemoriesEn;
    const displayMemories = memories?.length > 0 ? memories : defaultMemories;

    const reducedMotion = useReducedMotion();
    const { screenSize } = useDeviceCapability();

    // Use single column on mobile
    const effectiveLayout = screenSize === 'mobile' ? 'single' : layout;

    return (
        <motion.div
            className="relative w-full max-w-3xl mx-auto py-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Section title */}
            <motion.h3
                className="text-2xl md:text-3xl font-bold text-center gradient-text mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {language === 'ar' ? 'ذكرياتنا الجميلة' : 'Our Beautiful Memories'}
            </motion.h3>

            {/* Timeline container */}
            <div className="relative">
                {/* Central timeline line */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ originY: 0 }}
                />

                {/* Timeline entries */}
                <div className="relative space-y-12">
                    {displayMemories.map((memory, index) => (
                        <TimelineEntry
                            key={memory.id}
                            memory={memory}
                            index={index}
                            position={
                                effectiveLayout === 'single'
                                    ? 'center'
                                    : index % 2 === 0
                                        ? 'left'
                                        : 'right'
                            }
                            language={language}
                            reducedMotion={reducedMotion}
                        />
                    ))}
                </div>

                {/* End decoration */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: displayMemories.length * 0.2 + 0.5, type: 'spring' }}
                >
                    <Heart size={24} className="text-primary fill-primary" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MemoryTimeline;
