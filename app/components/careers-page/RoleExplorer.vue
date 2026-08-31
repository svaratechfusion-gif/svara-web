<script setup lang="ts">
// INTERACTIVE ROLE EXPLORER — left-side role categories, right panel
// updates dynamically with responsibilities, technologies, growth
// opportunities, and projects. Role categories from the brief; per-role
// metadata is structural (factual role-domain descriptors).
import { ref, computed } from 'vue'
import { ROLE_CATEGORIES, ROLE_DETAILS } from '~/utils/careers-page'

const active = ref(0)
const selected = computed(() => ROLE_CATEGORIES[active.value]!)
const details = computed(() => ROLE_DETAILS[selected.value]!)
</script>

<template>
  <section class="re">
    <div class="re__head">
      <p class="re__eyebrow">Interactive Role Explorer</p>
      <h2 class="re__title">Find your path.</h2>
      <p class="re__sub">Select a discipline to see what you'd build, the technologies you'd work with, and where it leads.</p>
    </div>

    <div class="re__layout">
      <ul class="re__nav" role="list">
        <li v-for="(cat, i) in ROLE_CATEGORIES" :key="cat" class="re__item" :class="{ 'is-on': active === i }">
          <button @click="active = i">
            <span class="re__item-dot" />{{ cat }}
          </button>
        </li>
      </ul>

      <div :key="selected" class="re__panel">
        <div class="re__panel-head">
          <h3 class="re__role-name">{{ selected }}</h3>
        </div>

        <div class="re__section">
          <h4 class="re__label">Responsibilities</h4>
          <ul class="re__list" role="list">
            <li v-for="r in details.responsibilities" :key="r">{{ r }}</li>
          </ul>
        </div>

        <div class="re__section">
          <h4 class="re__label">Technologies</h4>
          <div class="re__chips">
            <span v-for="t in details.technologies" :key="t" class="re__chip">{{ t }}</span>
          </div>
        </div>

        <div class="re__grid2">
          <div class="re__section">
            <h4 class="re__label">Growth Path</h4>
            <ul class="re__list" role="list">
              <li v-for="g in details.growth" :key="g">{{ g }}</li>
            </ul>
          </div>
          <div class="re__section">
            <h4 class="re__label">Sample Projects</h4>
            <ul class="re__list" role="list">
              <li v-for="p in details.projects" :key="p">{{ p }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.re { background: #F1F6FE; padding: var(--space-32) var(--container-pad); }
.re__head { max-width: 760px; margin: 0 auto var(--space-16); text-align: center; }
.re__eyebrow { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.re__title { margin: 0; font-size: clamp(34px, 4.4vw, 56px); font-weight: var(--weight-bold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.re__sub { margin: var(--space-5) 0 0; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.re__layout { display: grid; grid-template-columns: 260px 1fr; gap: var(--space-12); max-width: 1180px; margin: var(--space-16) auto 0; align-items: start; }
.re__nav { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 3px; position: sticky; top: var(--space-8); }
.re__item button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 14px; background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); font-size: 13.5px; font-weight: var(--weight-medium); color: var(--color-text-secondary); text-align: left; cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.re__item button:hover { background: rgba(47, 127, 230, 0.06); color: var(--color-ink-strong); }
.re__item.is-on button { background: var(--color-ink-strong); color: #fff; }
.re__item-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); box-shadow: 0 0 0 3px rgba(47,127,230,0.16); flex-shrink: 0; }
.re__item.is-on .re__item-dot { background: #fff; }

.re__panel { background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-10); box-shadow: 0 4px 14px rgba(16, 42, 91, 0.05), 0 30px 80px rgba(16, 42, 91, 0.08); animation: re-fade 0.4s var(--ease-out); }
@keyframes re-fade { from { opacity: 0; transform: translateY(12px); } }
.re__panel-head { margin-bottom: var(--space-8); padding-bottom: var(--space-6); border-bottom: 2px solid var(--color-ink-strong); }
.re__role-name { margin: 0; font-size: clamp(24px, 2.6vw, 34px); font-weight: var(--weight-extrabold); letter-spacing: -0.02em; color: var(--color-ink-strong); }
.re__section { margin-top: var(--space-6); }
.re__label { margin: 0 0 var(--space-4); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-faint); }
.re__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.re__list li { font-size: 14px; line-height: 1.55; color: var(--color-text-secondary); padding-left: 18px; position: relative; }
.re__list li::before { content: "▸"; position: absolute; left: 0; color: var(--color-accent); }
.re__chips { display: flex; flex-wrap: wrap; gap: 6px; }
.re__chip { padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-accent-bg); border: 1px solid rgba(47, 127, 230, 0.25); font-size: 12px; font-weight: var(--weight-medium); color: var(--color-accent); }
.re__grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); margin-top: var(--space-6); }
@media (max-width: 860px) { .re__layout { grid-template-columns: 1fr; } .re__nav { position: static; flex-direction: row; flex-wrap: wrap; } .re__item { flex: 1 1 45%; } .re__grid2 { grid-template-columns: 1fr; } }
</style>