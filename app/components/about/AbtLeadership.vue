<script setup lang="ts">
// ABOUT · Leadership Philosophy — one timeless founder statement, not a
// biography. Focused on purpose, engineering, and enterprise transformation.
// leadershipContent carries only placeholder bios ("[replace before launch]"),
// so this statement is COMPOSED from official SVARA messaging (founder/operator-
// led, engineering integrity, category-defining, outcome-bound). Replace with a
// verbatim founder quote and real attribution before launch.
// [FLAG: founder statement + attribution are placeholders]
const attribution = 'Founder & Chief Executive Officer, SVARA'
</script>

<template>
  <section class="alead">
    <div class="alead__inner">
      <p v-reveal class="alead__eyebrow">Leadership Philosophy</p>
      <blockquote v-reveal class="alead__quote" data-split>
        “We didn’t set out to ship another AI product. We set out to build the intelligence layer that enterprises will run on for decades — engineered end-to-end, owned by the people accountable for it, and measured only by the outcomes it creates.”
      </blockquote>
      <p v-reveal class="alead__attr">— {{ attribution }}</p>
    </div>
  </section>
</template>

<style scoped>
.alead { padding-block: calc(var(--section-y) * 1.1); }
.alead__inner { max-width: 1000px; margin-inline: auto; padding-inline: var(--container-pad); box-sizing: border-box; text-align: center; }
.alead__eyebrow { margin: 0 0 var(--space-10); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.alead__quote {
  margin: 0; max-width: 22ch; margin-inline: auto;
  font-size: clamp(26px, 3.8vw, 50px); font-weight: var(--weight-bold); line-height: 1.16; letter-spacing: -0.02em;
  color: #0d1b3e; text-wrap: balance;
}
.alead__attr { margin: var(--space-10) 0 0; font-family: var(--font-mono); font-size: var(--type-small); letter-spacing: 0.06em; color: var(--color-text-secondary); }
</style>
