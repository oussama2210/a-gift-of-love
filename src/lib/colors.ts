// Enhanced Color Palette for Romantic Theme

export interface ColorPalette {
  name: string;
  primary: {
    base: string;
    light: string;
    dark: string;
    gradient: string[];
  };
  secondary: {
    base: string;
    light: string;
    dark: string;
    gradient: string[];
  };
  accent: {
    base: string;
    light: string;
    dark: string;
    gradient: string[];
  };
  glow: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Romantic color scheme
export const romanticPalette: ColorPalette = {
  name: 'romantic',
  primary: {
    base: 'hsl(340, 80%, 60%)',
    light: 'hsl(340, 80%, 75%)',
    dark: 'hsl(340, 80%, 45%)',
    gradient: ['#ff6b9d', '#c44569', '#ff6b9d'],
  },
  secondary: {
    base: 'hsl(320, 70%, 50%)',
    light: 'hsl(320, 70%, 65%)',
    dark: 'hsl(320, 70%, 35%)',
    gradient: ['#e056fd', '#9b59b6', '#e056fd'],
  },
  accent: {
    base: 'hsl(45, 90%, 65%)',
    light: 'hsl(45, 90%, 80%)',
    dark: 'hsl(45, 90%, 50%)',
    gradient: ['#ffd93d', '#f9ca24', '#ffd93d'],
  },
  glow: {
    primary: 'rgba(255, 107, 157, 0.6)',
    secondary: 'rgba(224, 86, 253, 0.5)',
    accent: 'rgba(255, 217, 61, 0.6)',
  },
};

// Elegant color scheme
export const elegantPalette: ColorPalette = {
  name: 'elegant',
  primary: {
    base: 'hsl(340, 60%, 35%)',
    light: 'hsl(340, 60%, 50%)',
    dark: 'hsl(340, 60%, 25%)',
    gradient: ['#8e2157', '#6a1b3d', '#8e2157'],
  },
  secondary: {
    base: 'hsl(45, 70%, 45%)',
    light: 'hsl(45, 70%, 60%)',
    dark: 'hsl(45, 70%, 35%)',
    gradient: ['#d4af37', '#c5a028', '#d4af37'],
  },
  accent: {
    base: 'hsl(340, 30%, 92%)',
    light: 'hsl(340, 30%, 97%)',
    dark: 'hsl(340, 30%, 85%)',
    gradient: ['#f5e6e8', '#ede0e2', '#f5e6e8'],
  },
  glow: {
    primary: 'rgba(142, 33, 87, 0.5)',
    secondary: 'rgba(212, 175, 55, 0.5)',
    accent: 'rgba(245, 230, 232, 0.4)',
  },
};

// Dreamy color scheme
export const dreamyPalette: ColorPalette = {
  name: 'dreamy',
  primary: {
    base: 'hsl(320, 85%, 75%)',
    light: 'hsl(320, 85%, 85%)',
    dark: 'hsl(320, 85%, 60%)',
    gradient: ['#ff9ff3', '#feca57', '#ff9ff3'],
  },
  secondary: {
    base: 'hsl(210, 100%, 65%)',
    light: 'hsl(210, 100%, 80%)',
    dark: 'hsl(210, 100%, 50%)',
    gradient: ['#54a0ff', '#48dbfb', '#54a0ff'],
  },
  accent: {
    base: 'hsl(45, 95%, 75%)',
    light: 'hsl(45, 95%, 85%)',
    dark: 'hsl(45, 95%, 60%)',
    gradient: ['#ffeaa7', '#fdcb6e', '#ffeaa7'],
  },
  glow: {
    primary: 'rgba(255, 159, 243, 0.6)',
    secondary: 'rgba(84, 160, 255, 0.5)',
    accent: 'rgba(255, 234, 167, 0.6)',
  },
};

// Rose petal colors
export const rosePetalColors = [
  '#ff6b9d',
  '#ff8fb1',
  '#ffa8c5',
  '#c44569',
  '#e056fd',
  '#f8b4d9',
];

// Star particle colors
export const starColors = [
  '#ffd93d',
  '#ffffff',
  '#ffeaa7',
  '#fdcb6e',
  '#f9e79f',
];

// Light particle colors
export const lightParticleColors = [
  '#ff6b9d',
  '#ffd93d',
  '#ffffff',
  '#ff8fb1',
  '#e056fd',
];

// Gradient definitions
export const gradients = {
  romantic: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #ff6b9d 100%)',
  golden: 'linear-gradient(135deg, #ffd93d 0%, #f9ca24 50%, #ffd93d 100%)',
  sunset: 'linear-gradient(135deg, #ff6b9d 0%, #ffd93d 100%)',
  night: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  glow: 'radial-gradient(circle, rgba(255,107,157,0.3) 0%, transparent 70%)',
  softPink: 'linear-gradient(180deg, rgba(255,107,157,0.1) 0%, transparent 100%)',
};

// Helper function to create CSS gradient string
export const createGradient = (
  colors: string[],
  direction: number = 135
): string => {
  const stops = colors.map((color, index) => {
    const position = (index / (colors.length - 1)) * 100;
    return `${color} ${position}%`;
  });
  return `linear-gradient(${direction}deg, ${stops.join(', ')})`;
};

// Helper function to get random color from array
export const getRandomColor = (colors: string[]): string => {
  return colors[Math.floor(Math.random() * colors.length)];
};

// Helper to convert HSL to CSS string
export const hslToString = (h: number, s: number, l: number, a: number = 1): string => {
  return a === 1
    ? `hsl(${h}, ${s}%, ${l}%)`
    : `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

// Get glow box shadow
export const getGlowShadow = (color: string, intensity: 'subtle' | 'medium' | 'intense' = 'medium'): string => {
  const sizes = {
    subtle: [10, 20],
    medium: [20, 40],
    intense: [30, 60],
  };
  const [small, large] = sizes[intensity];
  return `0 0 ${small}px ${color}, 0 0 ${large}px ${color}`;
};
