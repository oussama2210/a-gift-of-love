import { motion } from "framer-motion";
import { Heart, Cake } from "lucide-react";
import { translations } from "@/contexts/LanguageContext";

// Enhanced components
import EnhancedPhotoFrame from "@/components/enhanced/EnhancedPhotoFrame";
import EnhancedWishCards from "@/components/enhanced/EnhancedWishCards";

// New components
import LoveQuotesCarousel from "@/components/new/LoveQuotesCarousel";
import MemoryTimeline from "@/components/new/MemoryTimeline";

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
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="relative z-20 flex flex-col items-center justify-start min-h-screen px-6 py-12"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Cake Icon */}
      <motion.div variants={itemVariants} className="mb-6">
        <Cake size={60} className="text-accent" strokeWidth={1.5} />
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-glow gradient-text text-center mb-6"
      >
        {t.happyBirthday}
      </motion.h1>

      {/* Enhanced Photo Frame */}
      <motion.div variants={itemVariants} className="mb-6">
        <EnhancedPhotoFrame
          language={language}
          decorationStyle="hearts"
          glowIntensity="subtle"
        />
      </motion.div>

      {/* Name */}
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-glow-gold gradient-text-gold text-center mb-6"
      >
        {t.name}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl lg:text-2xl font-medium text-foreground/90 text-center mb-8"
      >
        {t.toTheMost}
      </motion.p>

      {/* Love Message */}
      <motion.div
        variants={itemVariants}
        className="max-w-xl mx-auto text-center mb-8"
      >
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {t.message1}
          <br />
          {t.message2}
        </p>
      </motion.div>

      {/* Love Quotes Carousel */}
      <motion.div variants={itemVariants} className="w-full mb-10">
        <LoveQuotesCarousel
          quotes={[]}
          language={language}
          autoPlayInterval={6000}
        />
      </motion.div>

      {/* Heart */}
      <motion.div variants={itemVariants} className="mb-8">
        <Heart
          size={64}
          className="text-primary fill-primary"
          strokeWidth={1}
        />
      </motion.div>

      {/* Love Declaration */}
      <motion.p
        variants={itemVariants}
        className="text-xl md:text-2xl lg:text-3xl font-bold text-glow gradient-text text-center mb-10"
      >
        {t.loveForever} 💕
      </motion.p>

      {/* Enhanced Wish Cards */}
      <motion.div variants={itemVariants} className="mb-12">
        <EnhancedWishCards language={language} layout="grid" />
      </motion.div>

      {/* Memory Timeline */}
      <motion.div variants={itemVariants} className="w-full">
        <MemoryTimeline
          memories={[]}
          language={language}
          layout="alternating"
        />
      </motion.div>

      {/* Footer decoration */}
      <motion.div
        variants={itemVariants}
        className="mt-12 flex items-center gap-4"
      >
        <Heart size={24} className="text-primary fill-primary" />
        <span className="text-muted-foreground text-sm">
          {language === "ar" ? "بكل حبي" : "With all my love"}
        </span>
        <Heart size={24} className="text-primary fill-primary" />
      </motion.div>
    </motion.div>
  );
};

export default BirthdayMessage;
