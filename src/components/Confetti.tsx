import { motion } from "framer-motion";

const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    color: [
      "hsl(340 80% 60%)", // rose
      "hsl(45 90% 60%)",  // gold
      "hsl(340 60% 75%)", // soft pink
      "hsl(320 70% 50%)", // magenta
      "hsl(35 85% 55%)",  // warm gold
    ][Math.floor(Math.random() * 5)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            width: piece.size,
            height: piece.size * 0.6,
            backgroundColor: piece.color,
          }}
          animate={{
            y: [0, window.innerHeight + 50],
            x: [0, Math.sin(piece.id) * 100, Math.cos(piece.id) * 50],
            rotate: [piece.rotation, piece.rotation + 720],
          }}
          transition={{
            duration: piece.duration,
            repeat: Infinity,
            delay: piece.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
