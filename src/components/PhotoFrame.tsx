import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import ayatPhoto from "@/assets/ayat-photo.jpg";

interface PhotoFrameProps {
  language: "ar" | "en";
}

const PhotoFrame = ({ language }: PhotoFrameProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-30 blur-2xl"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Frame border */}
      <motion.div
        className="relative p-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
        animate={{
          boxShadow: [
            "0 0 20px hsl(340 80% 60% / 0.4)",
            "0 0 40px hsl(340 80% 60% / 0.6)",
            "0 0 20px hsl(340 80% 60% / 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Inner frame */}
        <div className="relative p-1 rounded-full bg-background">
          {/* Photo */}
          <motion.img
            src={ayatPhoto}
            alt={language === "ar" ? "آيات" : "Ayat"}
            className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      </motion.div>

      {/* Floating hearts around photo */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${20 + Math.sin(i * 1.5) * 40}%`,
            left: `${i % 2 === 0 ? -15 : 100}%`,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Heart
            size={20 + i * 4}
            className="text-primary fill-primary"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PhotoFrame;
