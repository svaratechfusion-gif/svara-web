// Helios Engine — materials. White-environment palette; depth over glow.

import { Color, MeshBasicMaterial, ShaderMaterial, NormalBlending } from 'three'
import { HeliosConfig } from './HeliosConfig'
import { connectionVertexShader, connectionFragmentShader } from './HeliosShaders'

export function paletteColors(): Color[] {
  const c = HeliosConfig.colors
  return [new Color(c.white), new Color(c.softCyan), new Color(c.blue), new Color(c.navy)]
}

/** Particles: unlit instanced spheres, tinted per instance.
 *  White instances get a soft cyan edge from the page itself — no lighting
 *  rig needed, which keeps the whole entity one draw call. */
export function createParticleMaterial(): MeshBasicMaterial {
  return new MeshBasicMaterial({
    // per-instance color comes from InstancedMesh.instanceColor
    color: 0xffffff,
    transparent: true,
    opacity: 0.95,
  })
}

/** Connections: custom shader — stretch-faded, vertex-colored lines. */
export function createConnectionMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    vertexShader: connectionVertexShader,
    fragmentShader: connectionFragmentShader,
    uniforms: {
      uOpacity: { value: HeliosConfig.lineOpacity },
      uMaxStretch: { value: HeliosConfig.maxStretch },
    },
    transparent: true,
    blending: NormalBlending,
    depthWrite: false,
  })
}
