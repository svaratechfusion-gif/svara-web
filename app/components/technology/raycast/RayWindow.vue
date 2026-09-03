<script setup lang="ts">
// THE COMMAND WINDOW — the design's headline visual, and now a working one.
//
// "No photography… the product UI is the hero." It was a still: nothing to type into,
// nothing to focus, aria-hidden. A command palette that cannot be commanded is a
// screenshot, so this is the real thing — it searches the stack, the arrow keys move
// the selection, Enter opens the result, Escape clears, and ⌘K focuses it from
// anywhere on the page.
//
// "Open" means what it can honestly mean on one page: it jumps to that layer's card
// and flashes it. Every row is real content — the five layers and the thirty
// technologies, from lib/technology/raycast.
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import RayIcon from './RayIcon.vue'
import { RAY_LAYERS, RAY_TILES, RAY_WINDOW } from '~~/lib/technology/raycast'
import { useRayJump } from '~/composables/useRayJump'

interface Row {
  id: string
  n: string
  name: string
  detail: string
  kind: string
  icon: typeof RAY_LAYERS[number]['icon']
  target: string
}

const ROWS: Row[] = [
  ...RAY_LAYERS.map(l => ({
    id: `opt-l-${l.n}`,
    n: l.n,
    name: l.name,
    detail: `${l.headline[0]} ${l.headline[1]}`.replace(/\.$/, ''),
    kind: 'Layer',
    icon: l.icon,
    target: `ray-layer-${l.n}`,
  })),
  ...RAY_TILES.map((t, i) => ({
    id: `opt-t-${i}`,
    n: t.n,
    name: t.name,
    detail: `${t.category} layer`,
    kind: 'Technology',
    icon: t.icon,
    target: `ray-layer-${t.n}`,
  })),
]

const q = ref('')
const active = ref(0)
const open = ref(false)
const input = ref<HTMLInputElement | null>(null)
const listId = 'ray-window-list'

const results = computed(() => {
  const t = q.value.trim().toLowerCase()
  if (!t) return ROWS.filter(r => r.kind === 'Layer')
  return ROWS.filter(r =>
    r.name.toLowerCase().includes(t) || r.detail.toLowerCase().includes(t),
  ).slice(0, 8)
})

const groupLabel = computed(() => {
  if (!q.value.trim()) return 'Layers'
  const n = results.value.length
  return `${n} result${n === 1 ? '' : 's'}`
})
const { jump } = useRayJump()

function clampActive(): void {
  if (active.value > results.value.length - 1) active.value = Math.max(0, results.value.length - 1)
}

function onInput(): void {
  active.value = 0
  open.value = true
}

function openRow(i: number): void {
  const row = results.value[i]
  if (!row) return
  jump(row.target)
  open.value = false
  input.value?.blur()
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = (active.value + 1) % Math.max(1, results.value.length)
  }
  else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = (active.value - 1 + results.value.length) % Math.max(1, results.value.length)
  }
  else if (e.key === 'Enter') {
    e.preventDefault()
    openRow(active.value)
  }
  else if (e.key === 'Escape') {
    q.value = ''
    active.value = 0
    input.value?.blur()
  }
}

/** ⌘K / Ctrl+K focuses the palette, exactly as the window's own hint promises. */
function onDocKey(e: KeyboardEvent): void {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = true
    nextTick(() => input.value?.focus())
  }
}

onMounted(() => document.addEventListener('keydown', onDocKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onDocKey))
</script>

<template>
  <div class="ray-window" :class="{ 'is-open': open }">
    <!-- window chrome -->
    <div class="ray-window__chrome" aria-hidden="true">
      <span class="ray-window__dot" /><span class="ray-window__dot" /><span class="ray-window__dot" />
      <span class="ray-window__title">{{ RAY_WINDOW.hint }}</span>
    </div>

    <div class="ray-window__bar">
      <svg
        viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
        stroke-width="1.6" stroke-linecap="round" class="ray-window__glyph" aria-hidden="true"
      >
        <circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.4 15.4 4 4" />
      </svg>
      <label class="ray-sr" for="ray-window-q">Search the SVARA stack</label>
      <input
        id="ray-window-q"
        ref="input"
        v-model="q"
        class="ray-window__input"
        type="text"
        role="combobox"
        autocomplete="off"
        :placeholder="RAY_WINDOW.placeholder"
        :aria-expanded="results.length > 0"
        :aria-controls="listId"
        :aria-activedescendant="results[active]?.id"
        @input="onInput"
        @focus="open = true; clampActive()"
        @keydown="onKeydown"
      >
      <span class="ray-window__kbd" aria-hidden="true">⌘K</span>
    </div>

    <p class="ray-window__group">{{ groupLabel }}</p>

    <ul :id="listId" class="ray-window__rows" role="listbox" aria-label="SVARA stack">
      <li
        v-for="(r, i) in results"
        :id="r.id"
        :key="r.id"
        class="ray-window__row"
        :class="{ 'is-active': i === active }"
        role="option"
        :aria-selected="i === active"
        @mousemove="active = i"
        @click="openRow(i)"
      >
        <RayIcon :glyph="r.icon" :size="16" class="ray-window__row-icon" />
        <span class="ray-window__row-name">{{ r.name }}</span>
        <span class="ray-window__row-detail">{{ r.detail }}</span>
        <span class="ray-window__row-kind">{{ r.kind }}</span>
        <span v-if="i === active" class="ray-window__kbd ray-window__kbd--row" aria-hidden="true">↵</span>
      </li>
      <li v-if="!results.length" class="ray-window__empty" role="option" aria-selected="false" aria-disabled="true">
        Nothing in the stack matches “{{ q }}”.
      </li>
    </ul>

    <div class="ray-window__foot">
      <span class="ray-window__foot-l">{{ RAY_WINDOW.footer[0] }}</span>
      <span class="ray-window__foot-r" aria-hidden="true">
        <span class="ray-window__kbd">↑↓</span><span>Navigate</span>
        <span class="ray-window__kbd">↵</span><span>Open</span>
      </span>
    </div>
  </div>
</template>
