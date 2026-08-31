<script setup lang="ts">
// PRODUCTS · FLOATING BOTTOM NAV — the reference's fixed bottom pill, rebuilt: a
// SVARA mark + an "Explore Products" primary button. Fixed, bottom-centered.
function scrollTo(sel: string): void {
  if (typeof document === 'undefined') return
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="vbn">
    <div class="vbn__pill">
      <span class="vbn__mark px-serif">SVARA</span>
      <button type="button" class="px-btn px-btn--primary vbn__btn" @click="scrollTo('#os-products')">Explore Products</button>
    </div>
  </div>
</template>

<style scoped>
.vbn { position: fixed; z-index: 50; left: 50%; bottom: 24px; transform: translateX(-50%); pointer-events: none; }
.vbn__pill {
  pointer-events: auto;
  display: inline-flex; align-items: center; gap: 14px;
  padding: 8px 8px 8px 22px; border-radius: 999px; background: #fff;
  box-shadow:
    0 1px 2px 0 rgba(16, 33, 74, 0.1),
    0 4px 4px 0 rgba(16, 33, 74, 0.08),
    0 12px 24px -6px rgba(16, 33, 74, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}
.vbn__mark { font-size: 22px; font-weight: 400; letter-spacing: 0.02em; color: var(--px-navy); }
.vbn__btn { padding: 10px 22px; font-size: 14px; }
@media (max-width: 480px) { .vbn__mark { display: none; } .vbn__pill { padding-left: 8px; } }
</style>
