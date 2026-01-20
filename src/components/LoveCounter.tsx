import { useState, useEffect } from 'react';
import { Heart, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoveCounterProps {
  language: 'ar' | 'en';
}

const LoveCounter = ({ language }: LoveCounterProps) => {
  const startDate = new Date('2025-11-01');
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const content = {
    ar: {
      title: 'معاً منذ',
      days: 'يوم',
      hours: 'ساعة',
      minutes: 'دقيقة',
      seconds: 'ثانية',
      since: 'نوفمبر 2025'
    },
    en: {
      title: 'Together Since',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      since: 'November 2025'
    }
  };

  const t = content[language];

  const counterItems = [
    { value: timeTogether.days, label: t.days },
    { value: timeTogether.hours, label: t.hours },
    { value: timeTogether.minutes, label: t.minutes },
    { value: timeTogether.seconds, label: t.seconds }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto my-8"
    >
      <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-primary/30 shadow-2xl">
        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-primary animate-pulse fill-primary" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            {t.title}
          </h3>
          <Heart className="w-6 h-6 text-primary animate-pulse fill-primary" />
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          {counterItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 * index, type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-3 md:p-4 border border-primary/20 shadow-lg">
                <motion.span
                  key={item.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="block text-2xl md:text-4xl font-bold text-primary"
                >
                  {item.value}
                </motion.span>
                <span className="text-xs md:text-sm text-muted-foreground mt-1 block">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Start Date */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{t.since}</span>
          <Clock className="w-4 h-4 ml-2" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoveCounter;
