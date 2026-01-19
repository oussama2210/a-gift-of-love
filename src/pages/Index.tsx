import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import Confetti from "@/components/Confetti";
import SparkleEffect from "@/components/SparkleEffect";
import BirthdayMessage from "@/components/BirthdayMessage";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  const [language, setLanguage] = useState<"ar" | "en" | null>(null);

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      style={{ direction: language === "ar" ? "rtl" : "ltr" }}
    >
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-secondary/20 z-0" />
      
      <AnimatePresence mode="wait">
        {language === null ? (
          <LanguageSelector 
            key="language-selector"
            onSelectLanguage={(lang) => setLanguage(lang)} 
          />
        ) : (
          <>
            {/* Animated elements */}
            <FloatingHearts />
            <Confetti />
            <SparkleEffect />
            
            {/* Main content */}
            <BirthdayMessage language={language} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
