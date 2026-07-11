// Helios · materials — owns materials, uniforms, theme colors, opacity.
// Nothing geometric lives here; geometry systems request materials and
// the per-frame uniform step happens in updateUniforms().

import { Color, MeshBasicMaterial, ShaderMaterial, NormalBlending } from 'three'
import { HeliosConfig } from '../engine/HeliosConfig'
import { connectionVertexShader, connectionFragmentShader } from '../shaders/connections'
import type { HeliosStore } from '../store/HeliosStore'

export class HeliosMaterials {
  readonly particleMaterial: MeshBasicMaterial
  readonly connectionMaterial: ShaderMaterial
  readonly palette: Color[]

  constructor() {
    const c = HeliosConfig.colors
    this.palette = [new Color(c.white), new Color(c.softCyan), new Color(c.blue), new Color(c.navy)]

    this.particleMaterial = new MeshBasicMaterial({
      color: 0xffffff, // per-instance color multiplies this
      transparent: true,
      opacity: 0.95,
    })

    this.connectionMaterial = new ShaderMaterial({
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

  /** per-state presence targets: [lineOpacity ×, particleOpacity] */
  private static PRESENCE: Record<string, [number, number]> = {
    dormant: [0, 0.3],       // asleep: no connections, dim particles
    assemble: [0.6, 0.8],
    idle: [1, 0.95],
    interact: [1, 0.95],
    dissolve: [0.5, 0.85],
    flow: [0.35, 0.9],
    reassemble: [0.6, 0.9],
  }

  /** per-frame uniform step — reads store, writes uniforms. No allocation. */
  updateUniforms(store: HeliosStore) {
    const [lineMul, particleOpacity] =
      HeliosMaterials.PRESENCE[store.state.currentState] ?? [1, 0.95]

    const u = this.connectionMaterial.uniforms.uOpacity
    u.value += (HeliosConfig.lineOpacity * lineMul - u.value) * 0.08

    const pm = this.particleMaterial
    pm.opacity += (particleOpacity - pm.opacity) * 0.06
  }

  dispose() {
    this.particleMaterial.dispose()
    this.connectionMaterial.dispose()
  }
}
