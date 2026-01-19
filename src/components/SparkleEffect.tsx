import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const SparkleEffect = () => {
  const sparkles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 2,
    size: 12 + Math.random() * 16,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={sparkle.size}
            className="text-accent"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SparkleEffect;
