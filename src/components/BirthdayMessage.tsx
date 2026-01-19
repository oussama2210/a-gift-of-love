import { motion } from "framer-motion";
import { Heart, Cake, Gift, Star } from "lucide-react";
import { translations } from "@/contexts/LanguageContext";
import PhotoFrame from "./PhotoFrame";

interface BirthdayMessageProps {
  language: "ar" | "en";
}

const BirthdayMessage = ({ language }: BirthdayMessageProps) => {
  const t = translations[language];
  const isRTL = language === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const heartVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 2.5,
      },
    },
  };

  const nameLetters = t.name.split("");

  return (
    <motion.div
      className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 py-12"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative icons */}
      <motion.div
        className="absolute top-20 right-10 md:right-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star size={40} className="text-accent fill-accent" />
      </motion.div>
      
      <motion.div
        className="absolute top-32 left-10 md:left-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Gift size={36} className="text-primary" />
      </motion.div>

      {/* Cake Icon */}
      <motion.div
        variants={itemVariants}
        className="mb-4"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Cake size={60} className="text-accent" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow gradient-text text-center mb-4"
      >
        {t.happyBirthday}
      </motion.h1>

      {/* Photo Frame */}
      <motion.div variants={itemVariants} className="mb-4">
        <PhotoFrame language={language} />
      </motion.div>

      {/* Animated Name */}
      <motion.div
        variants={itemVariants}
        className="mb-4"
      >
        <div className="flex justify-center gap-1 md:gap-2">
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-glow-gold gradient-text-gold"
              initial={{ opacity: 0, y: 50, rotateY: 90 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                rotateY: 0,
              }}
              transition={{
                delay: 1.2 + index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.3 },
              }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px hsl(45 90% 60% / 0.6)",
                    "0 0 40px hsl(45 90% 60% / 0.9)",
                    "0 0 20px hsl(45 90% 60% / 0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl lg:text-2xl font-medium text-foreground/90 text-center mb-6"
      >
        {t.toTheMost}
      </motion.p>

      {/* Love Message */}
      <motion.div
        variants={itemVariants}
        className="max-w-xl mx-auto text-center mb-6"
      >
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {t.message1}
          <br />
          {t.message2}
        </p>
      </motion.div>

      {/* Glowing Heart */}
      <motion.div
        variants={heartVariants}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 blur-2xl bg-primary/40 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart
            size={80}
            className="text-primary fill-primary relative z-10"
            strokeWidth={1}
          />
        </motion.div>
      </motion.div>

      {/* Love Declaration */}
      <motion.div
        variants={itemVariants}
        className="mt-6"
      >
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl font-bold text-glow gradient-text"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {t.loveForever} 💕
        </motion.p>
      </motion.div>

      {/* Wishes */}
      <motion.div
        variants={itemVariants}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full px-4"
      >
        {[
          { icon: Heart, text: t.wish1 },
          { icon: Star, text: t.wish2 },
          { icon: Gift, text: t.wish3 },
        ].map((wish, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20"
            whileHover={{ scale: 1.05, borderColor: "hsl(340 80% 60%)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
              <wish.icon size={24} className="text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-foreground">{wish.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BirthdayMessage;
