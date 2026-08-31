// Helios Engine — public entry point.
// Hosts import ONLY from here. The public surface is the HeliosEngine API
// (initialize/destroy/flow/setEntityOffset/setSectionTargets/setDensity/
// resize) plus its option + store types. Internals stay internal. This is
// the page-wide ambient particle system — the Hero's own particle-head
// visual was removed; see the vault Decision Log.

export { HeliosEngine } from './engine/HeliosEngine'
export type { HeliosOptions } from './engine/HeliosConfig'
export type { HeliosState, MorphStateName } from './store/HeliosStore'
export type { DeviceTier } from './utils/device'
