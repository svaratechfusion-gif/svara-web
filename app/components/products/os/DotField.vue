<script setup lang="ts">
// DotField — the NOVAFALL atmospheric WebGL layer, implemented as a REAL custom
// fragment shader (per the design guide's code evidence): a full-screen quad
// running a dot-matrix + value-noise field with a soft depth fade, a slow
// breathing pulse and pointer-reactive drift. DPR-clamped. Additive cyan glow
// over the cinematic background image. Respects reduced-motion (one static frame)
// and degrades to a CSS dot-grid DOM fallback if WebGL is unavailable. Client-only
// (the GL context is created in onMounted; the template SSRs the fallback).
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasEl = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
let teardown: (() => void) | null = null

const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
const FS = `
precision highp float;
uniform float t; uniform vec2 r; uniform vec2 m;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x),f.y);}
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*r)/r.y;
  uv += m*0.05;
  float pulse=0.5+0.5*sin(t*0.5);
  vec2 g=uv*46.0;
  vec2 cell=fract(g)-0.5;
  float d=length(cell);
  float size=mix(0.08,0.17,pulse);
  float dot=smoothstep(size,size*0.35,d);
  float n=noise(g*0.14 + t*0.02);
  float fade=smoothstep(1.2,0.05,length(uv));
  float b=dot*(0.18+0.82*n)*fade*(0.4+0.6*pulse);
  vec3 col=vec3(0.404,0.910,0.976); // #67E8F9
  gl_FragColor=vec4(col*b, b*0.9);
}`

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src); gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { gl.deleteShader(sh); return null }
  return sh
}

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas || typeof window === 'undefined') return
  const gl = (canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true })
    || canvas.getContext('experimental-webgl', { alpha: true })) as WebGLRenderingContext | null
  if (!gl) return // keep the CSS DOM fallback

  const vs = compile(gl, gl.VERTEX_SHADER, VS)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FS)
  if (!vs || !fs) return
  const prog = gl.createProgram()!
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const uT = gl.getUniformLocation(prog, 't')
  const uR = gl.getUniformLocation(prog, 'r')
  const uM = gl.getUniformLocation(prog, 'm')
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
  gl.clearColor(0, 0, 0, 0)

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const host = canvas.parentElement as HTMLElement
  const resize = () => {
    const w = Math.max(1, host.clientWidth), h = Math.max(1, host.clientHeight)
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uR, canvas.width, canvas.height)
  }
  resize()
  window.addEventListener('resize', resize, { passive: true })

  const target = { x: 0, y: 0 }, mouse = { x: 0, y: 0 }
  const onPointer = (e: PointerEvent) => { target.x = e.clientX / window.innerWidth - 0.5; target.y = -(e.clientY / window.innerHeight - 0.5) }
  if (!reduced) window.addEventListener('pointermove', onPointer, { passive: true })

  ready.value = true
  let raf = 0
  const start = performance.now()
  const draw = (now: number) => {
    const t = reduced ? 6 : (now - start) / 1000
    mouse.x += (target.x - mouse.x) * 0.03; mouse.y += (target.y - mouse.y) * 0.03
    gl.uniform1f(uT, t); gl.uniform2f(uM, mouse.x, mouse.y)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    if (!reduced) raf = requestAnimationFrame(draw)
  }
  raf = requestAnimationFrame(draw)

  teardown = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointer)
    gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteBuffer(buf)
  }
})
onBeforeUnmount(() => teardown?.())
</script>

<template>
  <div class="df" aria-hidden="true">
    <canvas ref="canvasEl" class="df__canvas" />
    <div class="df__fallback" :class="{ 'is-hidden': ready }" />
  </div>
</template>

<style scoped>
.df { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.df__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.df__fallback {
  position: absolute; inset: 0;
  background-image: radial-gradient(rgba(103, 232, 249, 0.45) 1.1px, transparent 1.2px);
  background-size: 24px 24px;
  -webkit-mask-image: radial-gradient(120% 90% at 50% 45%, #000 45%, transparent 100%);
  mask-image: radial-gradient(120% 90% at 50% 45%, #000 45%, transparent 100%);
  opacity: 0.45; transition: opacity 0.6s ease;
}
.df__fallback.is-hidden { opacity: 0; }
</style>
