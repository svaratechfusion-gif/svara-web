<script setup lang="ts">
/**
 * TEN PRODUCT VISUALS, ONE WEBGL CONTEXT.
 *
 * The carousel's ten cards each get their own live 3D metaphor, painted into a
 * single fixed canvas through the scissored-viewport technique from drei's
 * <View> (see app/utils/views/multiview.ts). One context, one draw loop, and
 * only the two or three cards actually on the strip cost anything per frame.
 *
 * IT ADDS NO MARKUP TO THE CARDS. The component finds the existing
 * `.dxc__figure` boxes and tracks their rects, so the carousel component stays
 * generic and the DOM the crawler sees is unchanged.
 *
 * FALLBACK IS THE DEFAULT, NOT A BRANCH. Every figure keeps its still image in
 * CSS. The image is only dropped once a context is actually live (`is-gl` on
 * the root), so no WebGL, a lost context, or reduced motion all land on the
 * artwork that was already there.
 */
import { ref, watch, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { useTicker } from '~/composables/useTicker'
import type { MultiView } from '~/utils/views/multiview'

const props = defineProps<{ root: HTMLElement | null }>()
/** True once a context is live, false again if it is ever lost — the section
 *  binds this to `is-gl`, which is what decides whether the stills step aside. */
const emit = defineEmits<{ live: [boolean] }>()

const canvas = ref<HTMLCanvasElement | null>(null)
const live = ref(false)
const view = shallowRef<MultiView | null>(null)

/** Only render while the section is on screen — an offscreen strip costs zero. */
let onScreen = false
let elapsed = 0
let observer: IntersectionObserver | null = null
/** Set once a context could not be had, so scrolling past doesn't retry forever. */
let unavailable = false

async function boot(): Promise<void> {
  if (unavailable || view.value || !canvas.value || !props.root) return

  const [{ createMultiView }, { PLATFORM_SCENES }] = await Promise.all([
    import('~/utils/views/multiview'),
    import('~/utils/views/platform-scenes'),
  ])

  // A phone is already running the particle hero's context; halving the pixel
  // ratio here quarters this layer's framebuffer, which is what keeps the two
  // from competing for GPU memory on mobile Safari.
  const multiView = createMultiView(canvas.value, window.innerWidth < 768 ? 1 : 1.5)
  if (!multiView) {
    unavailable = true
    return // no WebGL — the still images stand
  }

  const figures = Array.from(props.root.querySelectorAll<HTMLElement>('.dxc__figure'))
  const clip = props.root.querySelector<HTMLElement>('.dxc__track')
  figures.forEach((figure, i) => {
    const make = PLATFORM_SCENES[i]
    if (make) multiView.add(figure, make(), clip)
  })

  // A driver reset or GPU-memory pressure kills the context and leaves ten
  // empty squares. Hand the section back to its still artwork instead.
  canvas.value.addEventListener('webglcontextlost', onContextLost, { once: true })

  view.value = multiView
  live.value = true
  emit('live', true)
}

function onResize(): void {
  view.value?.resize()
}

function onContextLost(event: Event): void {
  event.preventDefault()
  unavailable = true
  view.value = null
  live.value = false
  emit('live', false)
}

/**
 * Vue assigns a component's own template refs AFTER its children have mounted,
 * so `root` is still null on our onMounted tick — watching is the only way to
 * catch it. Declared at setup level, not inside a hook, so the component scope
 * disposes it.
 */
watch(() => props.root, (root) => {
  if (!root || observer) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(([entry]) => {
    onScreen = !!entry?.isIntersecting
    if (onScreen) void boot()
  }, { rootMargin: '10% 0px' })
  observer.observe(root)
}, { immediate: true })

onMounted(() => window.addEventListener('resize', onResize, { passive: true }))

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', onResize)
  canvas.value?.removeEventListener('webglcontextlost', onContextLost)
  view.value?.dispose()
  view.value = null
})

useTicker((dt) => {
  if (!onScreen || !view.value || document.hidden) return
  // Clamp: a backgrounded tab hands back one enormous delta on return, which
  // would teleport every animation to a random phase.
  elapsed += Math.min(dt, 0.05)
  view.value.render(elapsed, Math.min(dt, 0.05))
})
</script>

<template>
  <canvas ref="canvas" class="dxc__gl" :class="{ 'is-live': live }" aria-hidden="true" />
</template>
