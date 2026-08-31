<script setup lang="ts">
// JOIN OUR TALENT NETWORK — clean application area with resume upload,
// LinkedIn profile, and contact details. Encourages future applications
// even when roles are unavailable. Form fields are factual structure.
import { ref } from 'vue'
import { TALENT_FORM } from '~/utils/careers-page'

const form = ref({ name: '', email: '', linkedin: '', role: '' })
const submitted = ref(false)
const resumeName = ref('')

function onFile(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) resumeName.value = input.files[0].name
}
function submit() {
  if (form.value.name.trim() && form.value.email.trim()) submitted.value = true
}
</script>

<template>
  <section id="talent" class="tn">
    <div class="tn__inner">
      <p class="tn__eyebrow">Talent Network</p>
      <h2 class="tn__title">{{ TALENT_FORM.title }}</h2>
      <p class="tn__sub">{{ TALENT_FORM.sub }}</p>

      <form v-if="!submitted" class="tn__form" @submit.prevent="submit">
        <div class="tn__row">
          <div class="tn__field">
            <label class="tn__label">{{ TALENT_FORM.fields[0]!.label }}</label>
            <input v-model="form.name" :type="TALENT_FORM.fields[0]!.type" :placeholder="TALENT_FORM.fields[0]!.placeholder" class="tn__input" required >
          </div>
          <div class="tn__field">
            <label class="tn__label">{{ TALENT_FORM.fields[1]!.label }}</label>
            <input v-model="form.email" :type="TALENT_FORM.fields[1]!.type" :placeholder="TALENT_FORM.fields[1]!.placeholder" class="tn__input" required >
          </div>
        </div>
        <div class="tn__row">
          <div class="tn__field">
            <label class="tn__label">{{ TALENT_FORM.fields[2]!.label }}</label>
            <input v-model="form.linkedin" :type="TALENT_FORM.fields[2]!.type" :placeholder="TALENT_FORM.fields[2]!.placeholder" class="tn__input" >
          </div>
          <div class="tn__field">
            <label class="tn__label">{{ TALENT_FORM.fields[3]!.label }}</label>
            <select v-model="form.role" class="tn__input tn__select">
              <option value="" disabled>Select a discipline</option>
              <option v-for="opt in TALENT_FORM.fields[3]!.options" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
        </div>
        <div class="tn__resume">
          <label class="tn__resume-label">{{ TALENT_FORM.resumeLabel }}</label>
          <div class="tn__resume-area">
            <input type="file" accept=".pdf,.doc,.docx" class="tn__file" @change="onFile" >
            <span v-if="resumeName" class="tn__file-name">{{ resumeName }}</span>
          </div>
        </div>
        <button type="submit" class="tn__btn">{{ TALENT_FORM.submitLabel }}</button>
      </form>

      <div v-else class="tn__done">
        <p class="tn__done-text">Thank you, {{ form.name.split(' ')[0] }}. You're in the network — we'll reach out when a role matches.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tn { background: #F1F6FE; padding: var(--space-32) var(--container-pad); display: flex; justify-content: center; }
.tn__inner { max-width: 640px; width: 100%; text-align: center; }
.tn__eyebrow { margin: 0 0 var(--space-6); font-family: var(--font-mono); font-size: var(--type-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-accent); }
.tn__title { margin: 0; font-size: clamp(32px, 4vw, 52px); font-weight: var(--weight-extrabold); line-height: 1.1; letter-spacing: -0.02em; color: var(--color-ink-strong); }
.tn__sub { margin: var(--space-5) auto 0; max-width: 52ch; font-size: var(--type-body); line-height: var(--leading-body); color: var(--color-text-secondary); }

.tn__form { margin-top: var(--space-10); display: flex; flex-direction: column; gap: var(--space-5); text-align: left; }
.tn__row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }
.tn__field { display: flex; flex-direction: column; gap: 6px; }
.tn__label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-faint); }
.tn__input { height: 48px; padding: 0 var(--space-4); border-radius: var(--radius-sm); border: 1px solid var(--color-border-strong); background: #fff; font-size: 14px; color: var(--color-text); outline: none; transition: border-color var(--motion-medium) var(--ease-smooth); }
.tn__input:focus { border-color: var(--color-accent); }
.tn__select { cursor: pointer; }

.tn__resume { display: flex; flex-direction: column; gap: 8px; }
.tn__resume-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-faint); }
.tn__resume-area { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3) var(--space-4); border: 1px dashed var(--color-border-strong); border-radius: var(--radius-sm); background: #fff; }
.tn__file { font-size: 13px; }
.tn__file-name { font-size: 13px; color: var(--color-accent); font-weight: var(--weight-semibold); }

.tn__btn { height: 52px; margin-top: var(--space-3); border: none; border-radius: var(--radius-pill); background: var(--color-ink-strong); color: #fff; font-size: 15px; font-weight: var(--weight-semibold); cursor: pointer; transition: all var(--motion-medium) var(--ease-smooth); }
.tn__btn:hover { background: var(--color-accent); transform: translateY(-2px); }

.tn__done { margin-top: var(--space-10); padding: var(--space-8); border-radius: var(--radius-lg); background: #fff; border: 1px solid var(--color-border); }
.tn__done-text { margin: 0; font-size: 18px; font-weight: var(--weight-semibold); color: var(--color-accent); }

@media (max-width: 640px) { .tn__row { grid-template-columns: 1fr; } }
</style>