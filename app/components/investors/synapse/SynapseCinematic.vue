<script setup lang="ts">
// SECTION 2 — the cinematic statement.
//
// A full-viewport autoplay video with one large paragraph leaning away from the
// viewer in 3D: it starts pitched back and below the eye line, then rises and
// settles as the section crosses the viewport. Scroll progress runs through the
// same overdamped spring the rest of the site uses, so it glides rather than
// tracking the wheel one-to-one.
//
// Driven by a small rAF loop reading scroll directly — a render loop, never the
// scroll position itself, so it does not compete with the site's Lenis.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Spring } from '~~/lib/motion/spring'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4'

const BODY = 'SVARA addresses Intelligence Fragmentation — the state where enterprise intelligence is broken across vendors, departments, systems, time, and expertise. One unified intelligence infrastructure replaces disconnected point tools across manufacturing, energy, logistics and other data-heavy industries.'

const root = ref<HTMLElement | null>(null)
const copy = ref<HTMLElement | null>(null)

// Heavily overdamped, matching the reference's stiffness 15 / damping 32 feel:
// the text should lag the scroll noticeably, like a heavy plane swinging up.
const travel = new Spring(0, { tension: 18, friction: 34 })
let raf = 0
let last = 0

function frame(now: number) {
  raf = requestAnimationFrame(frame)
  const el = root.value
  const text = copy.value
  if (!el || !text) return

  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60
  last = now

  // 0 as the section's top meets the viewport bottom → 1 as its bottom leaves the top.
  const r = el.getBoundingClientRect()
  const span = r.height + window.innerHeight
  const p = Math.max(0, Math.min(1, (window.innerHeight - r.top) / span))

  travel.setTarget(p)
  const t = travel.advance(dt)

  // 60px below → 120px above, and fade in across the middle of the pass.
  const y = 60 - t * 180
  const opacity = Math.max(0, Math.min(1, (t - 0.3) / 0.2))
  text.style.transform = `rotateX(24deg) translateY(${y}px) translateZ(15px)`
  text.style.opacity = String(opacity)
}

onMounted(() => { raf = requestAnimationFrame(frame) })
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <section ref="root" class="syn-cine">
    <video class="syn-cine__video" :src="VIDEO" autoplay muted loop playsinline preload="auto" aria-hidden="true" />
    <div class="syn-cine__fade" aria-hidden="true" />
    <div class="syn-cine__stage">
      <p ref="copy" class="syn-cine__copy">{{ BODY }}</p>
    </div>
  </section>
</template>
