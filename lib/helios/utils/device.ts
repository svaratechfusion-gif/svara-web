// Helios · utils — device tier detection → particle budget + FPS target.

export type DeviceTier = 'desktop' | 'laptop' | 'tablet' | 'mobile'

export interface TierProfile {
  tier: DeviceTier
  particleCount: number
  targetFps: number
  minFps: number
}

const PROFILES: Record<DeviceTier, Omit<TierProfile, 'tier'>> = {
  desktop: { particleCount: 14000, targetFps: 60, minFps: 55 },
  laptop: { particleCount: 9000, targetFps: 60, minFps: 50 },
  tablet: { particleCount: 6000, targetFps: 45, minFps: 40 },
  mobile: { particleCount: 3000, targetFps: 30, minFps: 26 },
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
