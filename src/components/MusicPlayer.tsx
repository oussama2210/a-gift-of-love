import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Loader2 } from "lucide-react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = useCallback(async () => {
    try {
      // Create audio on first click (to satisfy browser autoplay policies)
      if (!audioRef.current) {
        setIsLoading(true);
        audioRef.current = new Audio(
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        );
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        
        // Wait for audio to be ready
        await new Promise((resolve, reject) => {
          if (audioRef.current) {
            audioRef.current.oncanplaythrough = resolve;
            audioRef.current.onerror = reject;
          }
        });
        setIsLoading(false);
      }

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio error:", error);
      setIsLoading(false);
      // Try alternative audio source
      if (audioRef.current) {
        audioRef.current.src = "https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg";
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          console.error("Fallback audio also failed");
        }
      }
    }
  }, [isPlaying]);

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-card/80 backdrop-blur-md border-2 border-primary/30 shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, borderColor: "hsl(340 80% 60%)" }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
    >
      <motion.div
        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {isLoading ? (
          <Loader2 size={28} className="text-primary animate-spin" />
        ) : isPlaying ? (
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
