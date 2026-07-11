// Helios Engine — public entry point.
// Hosts import ONLY from here. The public surface is the HeliosEngine
// API (initialize/destroy/assemble/dissolve/flow/reconstruct/setCursor/
// setScroll/resize) plus its option + store types. Internals stay internal.

export { HeliosEngine } from './engine/HeliosEngine'
export type { HeliosOptions } from './engine/HeliosConfig'
export type { HeliosState, MorphStateName } from './store/HeliosStore'
export type { DeviceTier } from './utils/device'
