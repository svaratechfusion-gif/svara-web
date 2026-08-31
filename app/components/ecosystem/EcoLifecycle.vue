<script setup lang="ts">
// ECOSYSTEM · Enterprise Intelligence Lifecycle — a horizontal pipeline with
// data packets flowing continuously through the stages; hover reveals
// supporting content. Section copy verbatim from the Content Bible
// (homeSection02); the six stage names are the directed lifecycle, and each
// stage's one-line support is written in the Content Bible's own language
// ("observes, understands, predicts, automates and optimizes").
import { ref } from 'vue'
import { homeSection02 } from '~~/lib/content/home'

const stages = [
  { name: 'Observe', desc: 'Continuously observe operations across cameras, sensors, machines, applications and people.' },
  { name: 'Understand', desc: 'Turn raw enterprise signals into a structured understanding of what is happening.' },
  { name: 'Simulate', desc: 'Model and simulate physical environments to test outcomes before acting.' },
  { name: 'Decide', desc: 'Reason across the enterprise to determine the best course of action.' },
  { name: 'Act', desc: 'Automate workflows and coordinate action across every business function.' },
  { name: 'Learn', desc: 'Optimize continuously as every insight feeds the next decision.' },
]
const hovered = ref<number | null>(null)
</script>

<template>
  <section class="elife">
    <div class="elife__head">
      <p v-reveal class="elife__eyebrow">Enterprise Intelligence Lifecycle</p>
      <h2 v-reveal class="elife__title" data-split>One continuous loop of intelligence</h2>
      <p v-reveal class="elife__sub">{{ homeSection02.paragraphs[1] }}</p>
    </div>

    <div v-reveal class="elife__pipe" @mouseleave="hovered = null">
      <div class="elife__rail" aria-hidden="true">
        <div class="elife__rail-line" />
        <span v-for="i in 5" :key="i" class="elife__packet" :style="{ animationDelay: `${(-i * 1).toFixed(1)}s` }" />
      </div>
      <div class="elife__stages">
        <div
          v-for="(s, i) in stages" :key="s.name"
          class="elife__stage" :class="{ 'is-active': hovered === i }"
          @mouseenter="hovered = i" @focusin="hovered = i" tabindex="0"
        >
          <span class="elife__node"><i /></span>
          <span class="elife__name">{{ s.name }}</span>
          <p class="elife__desc">{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.elife { padding-block: var(--section-y); }
.elife__head { max-width: var(--container-max); margin-inline: auto; padding-inline: var(--container-pad); text-align: center; box-sizing: border-box; }
.elife__eyebrow {
  margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent);
}
.elife__title { margin: 0; font-size: clamp(28px, 3.4vw, 48px); font-weight: var(--weight-bold); letter-spacing: -0.02em; color: #0d1b3e; }
.elife__sub { margin: var(--space-6) auto 0; max-width: 640px; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.elife__pipe { position: relative; max-width: 1200px; margin: var(--space-24) auto 0; padding-inline: var(--container-pad); box-sizing: border-box; }
.elife__rail { position: absolute; left: var(--container-pad); right: var(--container-pad); top: 34px; height: 2px; }
.elife__rail-line { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #d5dcea 8%, #d5dcea 92%, transparent); }
.elife__packet {
  position: absolute; top: 50%; left: 0; width: 8px; height: 8px; border-radius: 50%;
  transform: translate(-50%, -50%); background: var(--color-accent);
  box-shadow: 0 0 8px rgba(47, 127, 230, 0.6);
  animation: elife-flow 5s linear infinite;
}
@keyframes elife-flow { from { left: 0%; } to { left: 100%; } }

.elife__stages { position: relative; display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--space-4); }
.elife__stage {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  padding-top: 8px; cursor: default; outline: none;
}
.elife__node {
  display: grid; place-items: center; width: 54px; height: 54px; border-radius: 50%;
  background: var(--color-bg); border: 1px solid #dbe1ec; box-shadow: var(--shadow-soft);
  transition: border-color var(--motion-medium) var(--ease-smooth), box-shadow var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-smooth);
}
.elife__node i { width: 9px; height: 9px; border-radius: 50%; background: #102A5B; transition: background var(--motion-medium) var(--ease-smooth); }
.elife__name { margin-top: var(--space-4); font-size: var(--type-small); font-weight: var(--weight-semibold); color: #0d1b3e; }
.elife__desc {
  margin: var(--space-3) 0 0; max-width: 22ch; font-size: 12px; line-height: 1.45; color: var(--color-text-secondary);
  opacity: 0; transform: translateY(4px); transition: opacity var(--motion-medium) var(--ease-smooth), transform var(--motion-medium) var(--ease-smooth);
}
.elife__stage.is-active .elife__node { border-color: var(--color-accent); box-shadow: 0 8px 22px rgba(47, 127, 230, 0.16); transform: translateY(-2px); }
.elife__stage.is-active .elife__node i { background: var(--color-accent); }
.elife__stage.is-active .elife__desc { opacity: 1; transform: none; }
.elife__stage:focus-visible .elife__node { outline: 2px solid var(--color-accent); outline-offset: 3px; }

@media (max-width: 820px) {
  .elife__rail { display: none; }
  .elife__stages { grid-template-columns: 1fr 1fr; gap: var(--space-8); }
  .elife__desc { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) { .elife__packet { display: none; } }
</style>
