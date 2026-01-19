import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a royalty-free romantic piano music
    audioRef.current = new Audio(
      "https://cdn.pixabay.com/audio/2024/11/04/audio_a8425684e4.mp3"
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-card/80 backdrop-blur-md border-2 border-primary/30 shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, borderColor: "hsl(340 80% 60%)" }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {isPlaying ? (
          <Volume2 size={28} className="text-primary" />
        ) : (
          <VolumeX size={28} className="text-muted-foreground" />
        )}
      </motion.div>
      
      {/* Animated rings when playing */}
      {isPlaying && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ scale: [1, 2], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}
    </motion.button>
  );
};

export default MusicPlayer;
