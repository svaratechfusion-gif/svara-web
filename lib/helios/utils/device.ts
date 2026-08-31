// Helios · utils — device tier detection → particle budget + FPS target.

export type DeviceTier = 'desktop' | 'laptop' | 'tablet' | 'mobile'

export interface TierProfile {
  tier: DeviceTier
  particleCount: number
  targetFps: number
  minFps: number
}

// Spec target for the ambient cloud: ~12,000-20,000 particles. Desktop/
// laptop sit inside that band; tablet/mobile intentionally scale below it — touch
// hardware can't sustain 12k+ instanced draws at 60fps, and the adaptive
// quality ladder (utils/adaptiveQuality.ts) already exists specifically to
// protect frame rate over particle-count fidelity.
const PROFILES: Record<DeviceTier, Omit<TierProfile, 'tier'>> = {
  desktop: { particleCount: 18000, targetFps: 60, minFps: 55 },
  laptop: { particleCount: 13000, targetFps: 60, minFps: 50 },
  tablet: { particleCount: 8000, targetFps: 45, minFps: 40 },
  mobile: { particleCount: 4000, targetFps: 30, minFps: 26 },
}

export function detectTier(): TierProfile {
  if (typeof window === 'undefined') return { tier: 'desktop', ...PROFILES.desktop }
  const touch = navigator.maxTouchPoints > 0
  const w = window.innerWidth
  const cores = navigator.hardwareConcurrency ?? 4

  let tier: DeviceTier
  if (touch && w < 768) tier = 'mobile'
  else if (touch) tier = 'tablet'
  else if (w <= 1680 || cores <= 8) tier = 'laptop'
  else tier = 'desktop'

  return { tier, ...PROFILES[tier] }
}
