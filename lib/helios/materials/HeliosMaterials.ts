// Helios · materials — owns materials, uniforms, theme colors, opacity.
// Nothing geometric lives here; geometry systems request materials and
// the per-frame uniform step happens in updateUniforms().

import { Color, ShaderMaterial, NormalBlending } from 'three'
import { HeliosConfig } from '../engine/HeliosConfig'
import { connectionVertexShader, connectionFragmentShader } from '../shaders/connections'
import { particleVertexShader, particleFragmentShader } from '../shaders/particle'
import type { HeliosStore } from '../store/HeliosStore'

export class HeliosMaterials {
  readonly particleMaterial: ShaderMaterial
  readonly connectionMaterial: ShaderMaterial
  readonly palette: Color[]

  constructor() {
    const c = HeliosConfig.colors
    this.palette = [new Color(c.white), new Color(c.softCyan), new Color(c.blue), new Color(c.navy)]

    this.particleMaterial = new ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uOpacity: { value: 0.95 },
      },
      transparent: true,
      blending: NormalBlending,
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

  /** per-state presence targets: [lineOpacity ×, particleOpacity].
   *  Dormant is fully invisible — the cloud stays hidden until the host
   *  starts Orbit or Flow. Flow sits in the page-wide field's 0.08–0.20
   *  range. Orbit sits a touch above that ceiling deliberately: most of
   *  its ring is hidden behind the Hero panel's own blurred glass, so the
   *  visible remainder needs the extra presence just to read as an
   *  intentional accent rather than nothing at all. */
  private static PRESENCE: Record<string, [number, number]> = {
    dormant: [0, 0],
    orbit: [0.3, 0.22],
    flow: [0.5, 0.16],
  }

  /** per-frame uniform step — reads store, writes uniforms. No allocation. */
  updateUniforms(store: HeliosStore) {
    const [lineMul, particleOpacity] =
      HeliosMaterials.PRESENCE[store.state.currentState] ?? [1, 0.95]

    const u = this.connectionMaterial.uniforms.uOpacity!
    u.value += (HeliosConfig.lineOpacity * lineMul - u.value) * 0.08

    const pu = this.particleMaterial.uniforms.uOpacity!
    pu.value += (particleOpacity - pu.value) * 0.06
  }

  dispose() {
    this.particleMaterial.dispose()
    this.connectionMaterial.dispose()
  }
}
