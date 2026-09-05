// THE TEN PLATFORMS, AS TEN METAPHORS.
//
// Order matters and is load-bearing: this array is indexed by position against
// `homePlatforms`, exactly as dxPlatforms already maps its still images by
// position. The names differ between the two sources ('Generative & Cognitive
// AI' vs 'Cognitive AI'), so the index is the only key that holds.
//
// One scene per product, each answering "what does this thing actually do":
//
//   01 Vision AI                  a sensor sweeps a field; what it sees lights up
//   02 Drone AI                   a survey pattern flown over terrain
//   03 Edge AI                    compute that reaches in and stops
//   04 Generative & Cognitive AI  noise condensing into a lattice
//   05 Autonomous AI Agents       workers taking branches in a decision graph
//   06 Digital Twin               a model locking on to the real thing
//   07 Unified Business Cloud     six functions joined through one hub
//   08 One AI OS                  a conversational layer over the stack
//   09 Digital Engineering        modules arriving and locking into a structure
//   10 Growth & PR Tech           one signal, spreading

import { cognitiveAI, agentsAI, digitalTwin } from './scenes/cognition'
import { visionAI, droneAI, edgeAI } from './scenes/sensing'
import { businessCloud, aiOS, digitalEngineering, growthTech } from './scenes/systems'
import type { ViewScene } from './three-kit'

export const PLATFORM_SCENES: ReadonlyArray<() => ViewScene> = [
  visionAI,
  droneAI,
  edgeAI,
  cognitiveAI,
  agentsAI,
  digitalTwin,
  businessCloud,
  aiOS,
  digitalEngineering,
  growthTech,
]
