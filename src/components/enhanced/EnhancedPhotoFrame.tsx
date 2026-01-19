import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import ayatPhoto from '@/assets/ayat-photo.jpg';

interface EnhancedPhotoFrameProps {
    language: 'ar' | 'en';
    size?: 'small' | 'medium' | 'large';
    decorationStyle?: 'roses' | 'hearts' | 'mixed';
    glowIntensity?: 'subtle' | 'medium' | 'intense';
}

const EnhancedPhotoFrame = ({
    language,
    size = 'medium',
    decorationStyle = 'hearts',
    glowIntensity = 'subtle',
}: EnhancedPhotoFrameProps) => {
    // Size configurations
    const sizes = {
        small: 'w-32 h-32 md:w-40 md:h-40',
        medium: 'w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60',
        large: 'w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72',
    };

    // Glow configurations
    const glowStyles = {
        subtle: 'shadow-[0_0_30px_rgba(255,107,157,0.3)]',
        medium: 'shadow-[0_0_40px_rgba(255,107,157,0.4)]',
        intense: 'shadow-[0_0_60px_rgba(255,107,157,0.5)]',
    };

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
            {/* Static glow layer */}
            <div
                className={`absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl`}
            />

            {/* Gradient border frame */}
            <div
                className={`relative p-1 rounded-full ${glowStyles[glowIntensity]}`}
                style={{
                    background: 'linear-gradient(135deg, #ff6b9d, #ffd93d, #ff6b9d)',
                }}
            >
                {/* Inner decorative border */}
                <div className="p-1 rounded-full bg-gradient-to-br from-rose-900/50 to-pink-900/50">
                    {/* Inner frame */}
                    <div className="relative p-1 rounded-full bg-background">
                        {/* Photo */}
                        <img
                            src={ayatPhoto}
                            alt={language === 'ar' ? 'آيات' : 'Ayat'}
                            className={`${sizes[size]} rounded-full object-cover`}
                        />

                        {/* Inner shadow overlay */}
                        <div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                                boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3)',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Corner decorations - static hearts */}
            <div className="absolute -top-2 -left-2 z-10">
                <Heart size={20} className="text-primary fill-primary" />
            </div>
            <div className="absolute -top-2 -right-2 z-10">
                <Heart size={20} className="text-primary fill-primary" />
            </div>
            <div className="absolute -bottom-2 -left-2 z-10">
                <Heart size={20} className="text-primary fill-primary" />
            </div>
            <div className="absolute -bottom-2 -right-2 z-10">
                <Heart size={20} className="text-primary fill-primary" />
            </div>
        </motion.div>
    );
};

export default EnhancedPhotoFrame;
