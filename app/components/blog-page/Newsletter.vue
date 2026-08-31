<script setup lang="ts">
// NEWSLETTER — large typography, clean email subscription area. Copy is
// verbatim from the Content Bible (homeSection07 title + paragraph).
import { ref } from 'vue'
import { newsletterCopy } from '~/utils/blog-page'

const email = ref('')
const submitted = ref(false)
function submit() {
  if (email.value.trim()) submitted.value = true
}
</script>

<template>
  <section class="nl">
    <div class="nl__inner">
      <p class="nl__eyebrow">Newsletter</p>
      <h2 class="nl__title">{{ newsletterCopy.title }}</h2>
      <p class="nl__sub">{{ newsletterCopy.sub }}</p>

      <form v-if="!submitted" class="nl__form" @submit.prevent="submit">
        <input v-model="email" type="email" :placeholder="newsletterCopy.inputPlaceholder" class="nl__input" required >
        <button type="submit" class="nl__btn">{{ newsletterCopy.buttonLabel }}</button>
      </form>
      <p v-else class="nl__done">Thank you — you'll receive the next issue in your inbox.</p>
    </div>
  </section>
</template>

<style scoped>
.nl { background: #F8FBFF; padding: var(--space-32) var(--container-pad); display: flex; justify-content: center; }
.nl__inner { text-align: center; max-width: 720px; }
.nl__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.nl__title { margin: 0; font-size: clamp(36px, 5vw, 72px); font-weight: var(--weight-extrabold); line-height: 1.05; letter-spacing: -0.03em; color: var(--color-ink-strong); }
.nl__sub { margin: var(--space-8) auto 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.nl__form { display: flex; gap: var(--space-3); max-width: 460px; margin: var(--space-10) auto 0; }
.nl__input { flex: 1; height: 56px; padding: 0 var(--space-5); border-radius: var(--radius-pill); border: 1px solid var(--color-border-strong); background: #fff; font-size: 15px; color: var(--color-text); outline: none; transition: border-color var(--motion-medium) var(--ease-smooth); }
.nl__input:focus { border-color: var(--color-accent); }
.nl__btn { height: 56px; padding: 0 var(--space-6); border-radius: var(--radius-pill); border: none; background: var(--color-ink-strong); color: #fff; font-size: 15px; font-weight: var(--weight-semibold); cursor: pointer; transition: background var(--motion-medium) var(--ease-smooth), transform var(--motion-fast) var(--ease-smooth); }
.nl__btn:hover { background: var(--color-accent); transform: translateY(-2px); }

.nl__done { margin: var(--space-10) auto 0; font-size: 17px; font-weight: var(--weight-semibold); color: var(--color-accent); }

@media (max-width: 560px) { .nl__form { flex-direction: column; } }
</style>