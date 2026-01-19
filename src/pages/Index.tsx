import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Effects
import EnhancedBackground from "@/components/effects/EnhancedBackground";
import RosePetals from "@/components/effects/RosePetals";
import StarParticles from "@/components/effects/StarParticles";

// Components
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import SparkleEffect from "@/components/SparkleEffect";
import BirthdayMessage from "@/components/BirthdayMessage";
import LanguageSelector from "@/components/LanguageSelector";

// Enhanced components
import EnhancedMusicPlayer from "@/components/enhanced/EnhancedMusicPlayer";

// New components
import LoadingAnimation from "@/components/new/LoadingAnimation";

const Index = () => {
  const [language, setLanguage] = useState<"ar" | "en" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleLanguageSelect = (lang: "ar" | "en") => {
    setLanguage(lang);
    setShowContent(true);
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

      {/* Enhanced background */}
      <EnhancedBackground variant="romantic" patternType="hearts" animated />

      <AnimatePresence mode="wait">
        {!isLoading && language === null ? (
          <LanguageSelector
            key="language-selector"
            onSelectLanguage={handleLanguageSelect}
          />
        ) : showContent && language !== null && (
          <>
            {/* Particle effects */}
            <RosePetals count={12} />
            <StarParticles count={15} />

            {/* Legacy animated elements */}
            <FloatingHearts />
            <Confetti />
            <SparkleEffect />

            {/* Enhanced Music Player */}
            <EnhancedMusicPlayer
              title={language === "ar" ? "موسيقى رومانسية" : "Romantic Music"}
              showVisualizer
              audioUrl="/love.mp3"
              autoPlay
            />

            {/* Main content */}
            <BirthdayMessage language={language} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
