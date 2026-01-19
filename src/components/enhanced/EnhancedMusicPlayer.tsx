import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface EnhancedMusicPlayerProps {
    audioUrl?: string;
    title?: string;
    autoPlay?: boolean;
    showVisualizer?: boolean;
}

const EnhancedMusicPlayer = ({
    audioUrl = 'assets/love.mp3',
    title = 'Romantic Music',
    autoPlay = false,
    showVisualizer = true,
}: EnhancedMusicPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [visualizerData, setVisualizerData] = useState<number[]>(Array(12).fill(0.2));

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyzerRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const reducedMotion = useReducedMotion();

    // Initialize audio and analyzer
    const initAudio = useCallback(async () => {
        if (audioRef.current) return;

        setIsLoading(true);
        try {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.3;

            await new Promise((resolve, reject) => {
                if (audioRef.current) {
                    audioRef.current.oncanplaythrough = resolve;
                    audioRef.current.onerror = reject;
                }
            });

            // Initialize Web Audio API for visualizer
            if (showVisualizer && !reducedMotion) {
                try {
                    audioContextRef.current = new AudioContext();
                    const source = audioContextRef.current.createMediaElementSource(audioRef.current);
                    analyzerRef.current = audioContextRef.current.createAnalyser();
                    analyzerRef.current.fftSize = 32;
                    source.connect(analyzerRef.current);
                    analyzerRef.current.connect(audioContextRef.current.destination);
                } catch (e) {
                    console.warn('Web Audio API not supported for visualizer');
                }
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Audio error:', error);
            setIsLoading(false);
        }
    }, [audioUrl, showVisualizer, reducedMotion]);

    // Visualizer animation loop
    const updateVisualizer = useCallback(() => {
        if (analyzerRef.current && isPlaying) {
            const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
            analyzerRef.current.getByteFrequencyData(dataArray);

            // Normalize data to 0-1 range and take 12 bars
            const normalizedData = Array.from(dataArray.slice(0, 12)).map(
                (value) => Math.max(0.1, value / 255)
            );
            setVisualizerData(normalizedData);

            animationFrameRef.current = requestAnimationFrame(updateVisualizer);
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying && analyzerRef.current) {
            updateVisualizer();
        }
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPlaying, updateVisualizer]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    // Handle autoPlay
    useEffect(() => {
        if (autoPlay && !isPlaying) {
            // Attempt to play automatically
            const playAudio = async () => {
                if (!audioRef.current) {
                    await initAudio();
                }
                if (audioRef.current) {
                    try {
                        if (audioContextRef.current?.state === 'suspended') {
                            await audioContextRef.current.resume();
                        }
                        await audioRef.current.play();
                        setIsPlaying(true);
                    } catch (error) {
                        console.log('Auto-play prevented by browser policy. User interaction required.');
                    }
                }
            };
            playAudio();
        }
    }, [autoPlay, initAudio]); // removed isPlaying dependency to avoid loop if it fails

    const togglePlay = async () => {
        if (!audioRef.current) {
            await initAudio();
        }

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                try {
                    if (audioContextRef.current?.state === 'suspended') {
                        await audioContextRef.current.resume();
                    }
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.error('Playback error:', error);
                }
            }
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        >
            {/* Main player container */}
            <motion.div
                className="relative glass-card rounded-2xl overflow-hidden"
                animate={{
                    width: isExpanded ? 200 : 64,
                    height: isExpanded ? 100 : 64,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
            >
                {/* Glow effect when playing */}
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(255, 107, 157, 0.3)',
                                '0 0 40px rgba(255, 107, 157, 0.5)',
                                '0 0 20px rgba(255, 107, 157, 0.3)',
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}

                {/* Content */}
                <div className="relative z-10 h-full p-3 flex items-center gap-3">
                    {/* Play/Pause button */}
                    <motion.button
                        onClick={togglePlay}
                        className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading}
                    >
                        {/* Button glow */}
                        {isPlaying && !reducedMotion && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-primary/30"
                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}

                        {isLoading ? (
                            <Loader2 size={20} className="text-primary animate-spin" />
                        ) : isPlaying ? (
                            <Pause size={20} className="text-primary" />
                        ) : (
                            <Play size={20} className="text-primary ml-0.5" />
                        )}
                    </motion.button>

                    {/* Expanded content */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col gap-2 flex-1 min-w-0"
                            >
                                {/* Title */}
                                <div className="flex items-center gap-2">
                                    <Music size={14} className="text-muted-foreground flex-shrink-0" />
                                    <span className="text-xs text-foreground truncate">{title}</span>
                                </div>

                                {/* Visualizer */}
                                {showVisualizer && (
                                    <div className="flex items-end gap-0.5 h-6">
                                        {visualizerData.map((value, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-2 rounded-full bg-gradient-to-t from-primary to-accent"
                                                animate={{
                                                    height: isPlaying ? `${value * 24}px` : '4px',
                                                }}
                                                transition={{
                                                    duration: 0.1,
                                                    ease: 'easeOut',
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Volume control */}
                                <motion.button
                                    onClick={toggleMute}
                                    className="absolute top-2 right-2"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isMuted ? (
                                        <VolumeX size={16} className="text-muted-foreground" />
                                    ) : (
                                        <Volume2 size={16} className="text-primary" />
                                    )}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Animated rings when playing (collapsed state) */}
                {isPlaying && !isExpanded && !reducedMotion && (
                    <>
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-primary/40"
                            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                            animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        />
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

export default EnhancedMusicPlayer;
