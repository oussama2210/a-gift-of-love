import { useState, useEffect } from 'react';

export interface DeviceCapability {
  tier: 'high' | 'medium' | 'low';
  supportsBackdropFilter: boolean;
  supportsWebGL: boolean;
  prefersReducedMotion: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  pixelRatio: number;
  maxParticles: number;
  animationComplexity: 'full' | 'reduced' | 'minimal';
}

const detectDeviceCapability = (): DeviceCapability => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check backdrop-filter support
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)');

  // Check WebGL support
  let supportsWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    supportsWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    supportsWebGL = false;
  }

  // Detect screen size
  const width = window.innerWidth;
  let screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (width < 768) {
    screenSize = 'mobile';
  } else if (width < 1024) {
    screenSize = 'tablet';
  }

  // Get pixel ratio
  const pixelRatio = window.devicePixelRatio || 1;

  // Determine performance tier based on various factors
  let tier: 'high' | 'medium' | 'low' = 'high';
  
  // Use navigator.hardwareConcurrency as a proxy for device capability
  const cores = navigator.hardwareConcurrency || 2;
  
  if (cores <= 2 || screenSize === 'mobile') {
    tier = 'low';
  } else if (cores <= 4 || screenSize === 'tablet') {
    tier = 'medium';
  }

  // If reduced motion is preferred, use minimal animations
  if (prefersReducedMotion) {
    tier = 'low';
  }

  // Calculate max particles based on tier
  const maxParticles = tier === 'high' ? 50 : tier === 'medium' ? 25 : 10;

  // Determine animation complexity
  const animationComplexity: 'full' | 'reduced' | 'minimal' = 
    prefersReducedMotion ? 'minimal' : 
    tier === 'high' ? 'full' : 
    tier === 'medium' ? 'reduced' : 'minimal';

  return {
    tier,
    supportsBackdropFilter,
    supportsWebGL,
    prefersReducedMotion,
    screenSize,
    pixelRatio,
    maxParticles,
    animationComplexity,
  };
};

export const useDeviceCapability = (): DeviceCapability => {
  const [capability, setCapability] = useState<DeviceCapability>(() => {
    if (typeof window === 'undefined') {
      return {
        tier: 'medium',
        supportsBackdropFilter: true,
        supportsWebGL: true,
        prefersReducedMotion: false,
        screenSize: 'desktop',
        pixelRatio: 1,
        maxParticles: 25,
        animationComplexity: 'reduced',
      };
    }
    return detectDeviceCapability();
  });

  useEffect(() => {
    const handleResize = () => {
      setCapability(detectDeviceCapability());
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      setCapability(detectDeviceCapability());
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return capability;
};

export default useDeviceCapability;
