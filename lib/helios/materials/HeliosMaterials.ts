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

  /** per-frame uniform step — reads store, writes uniforms. No allocation. */
  updateUniforms(store: HeliosStore) {
    // connections thin out slightly while a state transition is in flight
    const inTransition = store.state.progress < 1
    const target = HeliosConfig.lineOpacity * (inTransition ? 0.6 : 1)
    const u = this.connectionMaterial.uniforms.uOpacity
    u.value += (target - u.value) * 0.08
  }

  dispose() {
    this.particleMaterial.dispose()
    this.connectionMaterial.dispose()
  }
}
