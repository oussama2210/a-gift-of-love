import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { carouselVariants } from '@/lib/animations';

interface Quote {
    id: string;
    text: string;
    author?: string;
}

interface LoveQuotesCarouselProps {
    quotes: Quote[];
    autoPlayInterval?: number;
    language: 'ar' | 'en';
    showControls?: boolean;
}

// Default romantic quotes
const defaultQuotesAr: Quote[] = [
    { id: '1', text: 'أنتِ الشمس التي تضيء حياتي، والقمر الذي يُنير ليلي', author: 'من قلبي' },
    { id: '2', text: 'كل لحظة معك هي هدية من السماء', author: 'حبيبك' },
    { id: '3', text: 'في عينيك أرى كل ما أحتاجه في هذه الحياة', author: 'من أعماق قلبي' },
    { id: '4', text: 'أنتِ نبض قلبي وسبب سعادتي', author: 'إلى الأبد' },
];

const defaultQuotesEn: Quote[] = [
    { id: '1', text: 'You are the sun that lights up my life, and the moon that brightens my night', author: 'From my heart' },
    { id: '2', text: 'Every moment with you is a gift from heaven', author: 'Your love' },
    { id: '3', text: 'In your eyes, I see everything I need in this life', author: 'From deep within' },
    { id: '4', text: 'You are the beat of my heart and the reason for my happiness', author: 'Forever' },
];

const LoveQuotesCarousel = ({
    quotes,
    autoPlayInterval = 6000,
    language,
    showControls = true,
}: LoveQuotesCarouselProps) => {
    const defaultQuotes = language === 'ar' ? defaultQuotesAr : defaultQuotesEn;
    const displayQuotes = quotes?.length > 0 ? quotes : defaultQuotes;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    const reducedMotion = useReducedMotion();

    const goToNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % displayQuotes.length);
    }, [displayQuotes.length]);

    const goToPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + displayQuotes.length) % displayQuotes.length);
    }, [displayQuotes.length]);

    // Auto-play
    useEffect(() => {
        if (isPaused || reducedMotion) return;

        const timer = setInterval(goToNext, autoPlayInterval);
        return () => clearInterval(timer);
    }, [goToNext, autoPlayInterval, isPaused, reducedMotion]);

    const currentQuote = displayQuotes[currentIndex];

    return (
        <motion.div
            className="relative w-full max-w-2xl mx-auto px-4 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Decorative quote marks */}
            <div className="absolute top-0 left-8 text-primary/20">
                <Quote size={48} />
            </div>
            <div className="absolute bottom-0 right-8 text-primary/20 rotate-180">
                <Quote size={48} />
            </div>

            {/* Quote container */}
            <div className="relative min-h-[160px] flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentQuote.id}
                        custom={direction}
                        variants={reducedMotion ? {} : carouselVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute w-full text-center px-8"
                    >
                        {/* Quote text */}
                        <motion.p
                            className="text-lg md:text-xl lg:text-2xl text-foreground/90 font-medium leading-relaxed mb-4"
                            style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
                        >
                            "{currentQuote.text}"
                        </motion.p>

                        {/* Author */}
                        {currentQuote.author && (
                            <motion.p
                                className="text-sm md:text-base text-muted-foreground italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                — {currentQuote.author}
                            </motion.p>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation controls */}
            {showControls && (
                <div className="flex items-center justify-center gap-4 mt-6">
                    {/* Previous button */}
                    <motion.button
                        onClick={goToPrev}
                        className="p-2 rounded-full glass-card hover:bg-primary/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Previous quote"
                    >
                        <ChevronLeft size={20} className="text-primary" />
                    </motion.button>

                    {/* Indicators */}
                    <div className="flex gap-2">
                        {displayQuotes.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-primary/30'
                                    }`}
                                whileHover={{ scale: 1.3 }}
                                aria-label={`Go to quote ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Next button */}
                    <motion.button
                        onClick={goToNext}
                        className="p-2 rounded-full glass-card hover:bg-primary/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Next quote"
                    >
                        <ChevronRight size={20} className="text-primary" />
                    </motion.button>
                </div>
            )}

            {/* Decorative hearts */}
            {!reducedMotion && (
                <>
                    <motion.div
                        className="absolute -left-4 top-1/2 -translate-y-1/2"
                        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <span className="text-2xl">💕</span>
                    </motion.div>
                    <motion.div
                        className="absolute -right-4 top-1/2 -translate-y-1/2"
                        animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                        <span className="text-2xl">💕</span>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default LoveQuotesCarousel;
