interface EnhancedBackgroundProps {
    variant?: 'romantic' | 'elegant' | 'dreamy';
    animated?: boolean;
    patternType?: 'hearts' | 'stars' | 'none';
}

// Heart pattern SVG
const HeartPattern = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.03]">
        <defs>
            <pattern id="hearts" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                    d="M30 15 C25 5, 10 5, 10 17 C10 27, 30 37, 30 37 C30 37, 50 27, 50 17 C50 5, 35 5, 30 15Z"
                    fill="currentColor"
                    className="text-primary"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hearts)" />
    </svg>
);

// Star pattern SVG
const StarPattern = () => (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.04]">
        <defs>
            <pattern id="stars" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path
                    d="M40 5 L45 30 L70 35 L45 40 L40 65 L35 40 L10 35 L35 30 Z"
                    fill="currentColor"
                    className="text-accent"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
    </svg>
);

const EnhancedBackground = ({
    variant = 'romantic',
    patternType = 'hearts',
}: EnhancedBackgroundProps) => {
    // Color schemes for different variants
    const colorSchemes = {
        romantic: 'from-rose-900/20 via-pink-900/10 to-purple-900/20',
        elegant: 'from-purple-950/30 via-rose-950/20 to-amber-950/20',
        dreamy: 'from-pink-800/20 via-purple-800/15 to-blue-900/20',
    };

    const scheme = colorSchemes[variant];

    return (
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
            {/* Layer 1: Base gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${scheme}`} />

            {/* Layer 2: Secondary gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 to-rose-500/5 opacity-40" />

            {/* Layer 3: Pattern overlay */}
            {patternType === 'hearts' && <HeartPattern />}
            {patternType === 'stars' && <StarPattern />}

            {/* Layer 4: Vignette effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                }}
            />

            {/* Layer 5: Top gradient fade */}
            <div
                className="absolute inset-x-0 top-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, hsl(340 30% 8%) 0%, transparent 100%)',
                }}
            />
        </div>
    );
};

export default EnhancedBackground;
