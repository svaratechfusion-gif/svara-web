<script setup lang="ts">
// One element, one spring, one entrance. Holds at its "out" state until
// `enabled` flips (the preloader's lift signal), waits out `delay`, then runs a
// scalar 0 → 1 spring and publishes it as the CSS custom property `--p`. The
// variant styles below lerp opacity / translate / blur / scale off that number,
// so the whole entrance is one property write per frame and the travel scales
// with the frame's grid unit (`--u`) for free.
import { ref, watch } from 'vue'
import { REVEAL_SPRING, Spring, type SpringConfig } from '~~/lib/motion/spring'
import { useTicker } from '~/composables/useTicker'

type Variant = 'drop' | 'lift' | 'scale-y' | 'scale-x'

const props = withDefaults(defineProps<{
  as?: string
  variant?: Variant
  /** ms after the reveal signal. */
  delay?: number
  enabled?: boolean
  /** Land instantly, no motion — the reduced-motion path. */
  instant?: boolean
  config?: SpringConfig
}>(), {
  as: 'div',
  variant: 'lift',
  delay: 0,
  enabled: false,
  instant: false,
  config: () => REVEAL_SPRING,
})

const el = ref<HTMLElement | null>(null)
const settled = ref(false)

let spring: Spring | null = null

function write(value: number) {
  el.value?.style.setProperty('--p', String(value))
}

watch(() => [props.enabled, props.instant] as const, ([enabled, instant]) => {
  if (instant) {
    spring = null
    settled.value = true
    write(1)
    return
  }
  if (!enabled || spring) return
  spring = new Spring(0, props.config, props.delay)
  spring.setTarget(1)
}, { immediate: true })

useTicker((dt) => {
  if (!spring) return
  write(spring.advance(dt))
  if (!spring.isSettled) return
  // Settled: drop the spring and let the class clear the transform and the
  // blur, so a finished element stops carrying a compositing layer.
  spring = null
  settled.value = true
})
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="dv-spring"
    :class="[`dv-spring--${variant}`, { 'is-settled': settled }]"
    style="--p: 0"
  >
    <slot />
  </component>
</template>

<style>
/* Unscoped on purpose: `--p` is written to the element itself and the variants
   are a closed set owned by this component, so the `dv-spring` prefix is the
   namespace. `--u` is the hero frame's grid unit (see divisions-halftone.css);
   the fallback keeps the travel sane if one of these is ever used outside it. */
.dv-spring {
  will-change: transform, opacity;
}

.dv-spring--drop,
.dv-spring--lift {
  opacity: var(--p);
}

/* Headers and pills that arrive from above. */
.dv-spring--drop {
  transform: translate3d(0, calc((1 - var(--p)) * -0.75 * var(--dv-u, 1rem)), 0);
}

/* Cards and pills that rise into place. */
.dv-spring--lift {
  transform: translate3d(0, calc((1 - var(--p)) * 1 * var(--dv-u, 1rem)), 0);
}

/* The copy's spine, drawn downward — it reads as the rule arriving, not fading. */
.dv-spring--scale-y {
  transform: scaleY(var(--p));
  transform-origin: top;
}

/* The headline's accent bar, swept from the left. */
.dv-spring--scale-x {
  opacity: var(--p);
  transform: scaleX(var(--p));
  transform-origin: left;
}

.dv-spring.is-settled {
  opacity: 1;
  transform: none;
  will-change: auto;
}
</style>
