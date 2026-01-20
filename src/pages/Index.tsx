import { useState } from "react";
import { motion } from "framer-motion";

// Effects
import EnhancedBackground from "@/components/effects/EnhancedBackground";
import StarParticles from "@/components/effects/StarParticles";

// Components
import BirthdayMessage from "@/components/BirthdayMessage";
import LanguageSelector from "@/components/LanguageSelector";
import LoveCounter from "@/components/LoveCounter";

// Enhanced components
import EnhancedMusicPlayer from "@/components/enhanced/EnhancedMusicPlayer";

// New components
import LoadingAnimation from "@/components/new/LoadingAnimation";

const Index = () => {
  const [language, setLanguage] = useState<"ar" | "en" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleLanguageSelect = (lang: "ar" | "en") => {
    setLanguage(lang);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
    >
      {/* Loading animation */}
      {isLoading && (
        <LoadingAnimation onComplete={handleLoadingComplete} />
      )}

      {/* Enhanced background - always visible */}
      <EnhancedBackground variant="romantic" patternType="hearts" animated={false} />

      {/* Language selector */}
      {!isLoading && language === null && (
        <LanguageSelector
          key="language-selector"
          onSelectLanguage={handleLanguageSelect}
        />
      )}

      {/* Main content after language selection */}
      {language !== null && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Reduced particle effects - only stars */}
          <StarParticles count={10} />

          {/* Enhanced Music Player */}
          <EnhancedMusicPlayer
            title={language === "ar" ? "موسيقى رومانسية" : "Romantic Music"}
            showVisualizer={false}
            audioUrl="/love.mp3"
            autoPlay
          />

          {/* Love Counter */}
          <LoveCounter language={language} />

          {/* Main content */}
          <BirthdayMessage language={language} />
        </motion.div>
      )}
    </div>
  );
};

export default Index;
