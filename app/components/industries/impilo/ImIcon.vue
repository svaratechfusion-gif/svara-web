<script setup lang="ts">
// LINE-ART ICON — the reference's functional marker: a thin single-colour stroke in
// Lilac Mist inside a 7px-radius container. No fills, no second colour. "Icons are
// thin-stroke, single-color, used as functional markers rather than decoration."
const P: Record<string, string> = {
  sensor: 'M4 12h3M17 12h3M12 4v3M12 17v3M8.5 8.5 6.4 6.4M15.5 8.5l2.1-2.1M8.5 15.5l-2.1 2.1M15.5 15.5l2.1 2.1',
  eye: 'M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z',
  chart: 'M4 19V5M4 19h16M7.5 15.5l3.5-4 3 2.5 4.5-6',
  layers: 'M12 3.5 20.5 8 12 12.5 3.5 8Z M3.5 12 12 16.5 20.5 12 M3.5 16 12 20.5 20.5 16',
  route: 'M5 19c4 0 3-6 7-6s6-6 7-6M5 19h.01M19 7h.01',
  cube: 'M12 3.5 20 8v8l-8 4.5L4 16V8ZM12 12.2 20 8M12 12.2v8.3M12 12.2 4 8',
  bolt: 'M13.2 2.8 4.6 13.4h5.6l-1 7.8 8.6-10.6h-5.6Z',
  shield: 'M12 3.2 20 6.2v5.3c0 4.4-3.2 7.8-8 9.3-4.8-1.5-8-4.9-8-9.3V6.2Z',
  target: 'M12 5.5v13M5.5 12h13',
  cloud: 'M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.4A3.6 3.6 0 0 0 7 18Z',
  cpu: 'M8 8h8v8H8ZM4.5 10v4M19.5 10v4M10 4.5h4M10 19.5h4',
  grid: 'M4 4h7v7H4ZM13 4h7v7h-7ZM4 13h7v7H4ZM13 13h7v7h-7Z',
  pulse: 'M3 12h4l2.5-6 4 12L16 12h5',
  mail: 'M3.5 6.5h17v11h-17ZM3.5 7l8.5 6 8.5-6',
  pin: 'M12 21s6.5-6.1 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 14.9 12 21 12 21Z',
}
defineProps<{ name: keyof typeof P | string, boxed?: boolean }>()
</script>

<template>
  <span class="im-ico" :class="{ 'im-ico--box': boxed }" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path :d="P[name] ?? P.grid" />
      <circle v-if="name === 'eye' || name === 'target'" cx="12" cy="12" :r="name === 'eye' ? 3 : 7" />
    </svg>
  </span>
</template>
