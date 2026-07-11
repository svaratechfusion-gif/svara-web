// Helios · math — anatomical regions of the entity.
// Pure classification + per-region tuning used by sampling (entity) and
// topology (connections). The bust is divided: HEAD / FACE (head-front,
// topology-only variation — never features) / NECK / CHEST / SHOULDERS.

export type Region = 'head' | 'neck' | 'chest' | 'shoulders'

export interface RegionParams {
  /** share of the total particle budget (reference: head 1400, neck 450 @5000) */
  quota: number
  /** sampling density multiplier inside the region's acceptance test */
  density: number
  /** shell thickness multiplier — >1 = soft boundary, <1 = crisp/low-random */
  shell: number
  /** neighbor-count bias for topology (multiplies k) */
  connectionBias: number
  /** max connection distance multiplier (spread) */
  spread: number
  /** line weight boost (visual thickness on white) */
  lineWeight: number
  /** particle size multiplier */
  size: number
}

/** Reference spec @5000 particles: head 1400 · neck 450 · remainder split. */
export const REGION_PARAMS: Record<Region, RegionParams> = {
  head: { quota: 0.28, density: 1.8, shell: 1.4, connectionBias: 0.6, spread: 1.0, lineWeight: 0.85, size: 0.9 },
  neck: { quota: 0.09, density: 1.4, shell: 0.9, connectionBias: 1.0, spread: 0.9, lineWeight: 1.35, size: 1.05 },
  chest: { quota: 0.35, density: 1.2, shell: 1.0, connectionBias: 1.0, spread: 1.0, lineWeight: 1.25, size: 1.1 },
  shoulders: { quota: 0.28, density: 1.0, shell: 0.6, connectionBias: 1.0, spread: 1.3, lineWeight: 1.0, size: 1.0 },
}

/** classify a point on/near the bust into its region (y-bands + x reach) */
export function classifyRegion(x: number, y: number): Region {
  if (y > 1.02) return 'head'
  if (y > 0.86) return 'neck'
  if (Math.abs(x) > 0.42 && y > 0.5) return 'shoulders'
  return 'chest'
}

/** FACE = front hemisphere of the head. No eyes/nose/mouth — the only
 *  difference is a slightly higher connection bias (denser topology). */
export function isFace(x: number, y: number, z: number): boolean {
  return y > 1.02 && z > 0.12
}

export const FACE_CONNECTION_BIAS = 0.8

export const REGION_INDEX: Region[] = ['head', 'neck', 'chest', 'shoulders']
