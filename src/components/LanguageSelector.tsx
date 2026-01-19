import { motion } from "framer-motion";
import { Heart, Globe } from "lucide-react";

interface LanguageSelectorProps {
  onSelectLanguage: (lang: "ar" | "en") => void;
}

const LanguageSelector = ({ onSelectLanguage }: LanguageSelectorProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Heart
              size={30 + Math.random() * 40}
              className="text-primary/20 fill-primary/10"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-10 p-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        {/* Globe Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Globe size={60} className="text-accent" />
        </motion.div>

        {/* Title */}
        <motion.div className="text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-glow gradient-text mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Select Language
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl font-bold text-glow gradient-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            اختر اللغة
          </motion.p>
        </motion.div>

        {/* Language Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          <motion.button
            onClick={() => onSelectLanguage("ar")}
            className="group relative px-12 py-6 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-primary/30 overflow-hidden"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, borderColor: "hsl(340 80% 60%)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative text-2xl md:text-3xl font-bold text-foreground">
              العربية
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => onSelectLanguage("en")}
            className="group relative px-12 py-6 rounded-2xl bg-card/50 backdrop-blur-sm border-2 border-accent/30 overflow-hidden"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            whileHover={{ scale: 1.05, borderColor: "hsl(45 90% 60%)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative text-2xl md:text-3xl font-bold text-foreground">
              English
            </span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Heart decoration */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart size={40} className="text-primary fill-primary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LanguageSelector;
