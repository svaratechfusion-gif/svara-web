<script setup lang="ts">
// ECOSYSTEM · Hero — rebuilt 1:1 from the reference static video-hero layout.
// The old animated network globe (canvas / SVG diagram / node labels / grid /
// status indicators) is REMOVED entirely. Pure static layout over a fullscreen
// looping background video. Tailwind classes from the reference are translated to
// exact CSS (this project has no Tailwind). Only the copy is SVARA's.
//
// grotesk = Anton · condiment = Condiment · cream #EFF4FF · neon #6FFF00
const paragraph = 'From sensing the physical world to reasoning, prediction, autonomous action and enterprise orchestration, SVARA connects every layer of intelligence into one unified ecosystem.'

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Anton&family=Condiment&display=swap' },
  ],
})
</script>

<template>
  <section class="eh">
    <!-- fullscreen looping background video (absolute, inside the section) -->
    <video class="eh__video" autoplay loop muted playsinline aria-hidden="true">
      <source
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
        type="video/mp4"
      >
    </video>

    <div class="eh__wrap">
      <!-- ROW 1 -->
      <div class="eh__row1">
        <h2 class="eh__heading">ONE<br>ECOSYSTEM.<br>EVERY LAYER<br>OF INTELLIGENCE.<span class="eh__script">SVARA</span></h2>
        <p class="eh__para">{{ paragraph }}</p>
      </div>

      <!-- ROW 2 -->
      <div class="eh__row2">
        <div class="eh__ghost">
          <p class="eh__ghost-p">{{ paragraph }}</p>
          <p class="eh__ghost-p">{{ paragraph }}</p>
        </div>
        <div class="eh__ghost eh__ghost--right">
          <p class="eh__ghost-p">{{ paragraph }}</p>
          <p class="eh__ghost-p">{{ paragraph }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* section: relative overflow-hidden min-h-screen (no background) */
.eh {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

/* video: absolute inset-0 w-full h-full object-cover */
.eh__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* wrapper: relative max-w-[1831px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 z-10 */
.eh__wrap {
  position: relative;
  max-width: 1831px;
  margin-inline: auto;
  padding: 4rem 1rem;
  z-index: 10;
}
@media (min-width: 640px) { .eh__wrap { padding: 5rem 1.5rem; } }
@media (min-width: 768px) { .eh__wrap { padding: 6rem 2rem; } }

/* ROW 1: flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20 */
.eh__row1 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 3rem;
}
@media (min-width: 640px) { .eh__row1 { margin-bottom: 4rem; } }
@media (min-width: 768px) { .eh__row1 { margin-bottom: 5rem; } }
@media (min-width: 1024px) { .eh__row1 { flex-direction: row; gap: 3rem; } }

/* heading: font-grotesk text-[32px] sm:text-[48px] md:text-[60px] font-normal uppercase
   leading-[1.05] sm:leading-[1] md:leading-[1] text-cream relative */
.eh__heading {
  position: relative;
  margin: 0;
  font-family: 'Anton', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 32px;
  line-height: 1.05;
  color: #EFF4FF;
}
@media (min-width: 640px) { .eh__heading { font-size: 48px; line-height: 1; } }
@media (min-width: 768px) { .eh__heading { font-size: 60px; line-height: 1; } }

/* script span: font-condiment text-[36px] sm:text-[52px] md:text-[68px] font-normal normal-case
   text-neon mix-blend-exclusion leading-[0.79] tracking-[0.03em] absolute right-[-8px]
   bottom-[-20px] sm:bottom-[-30px] md:bottom-[-40px] -rotate-1 opacity-90 */
.eh__script {
  position: absolute;
  right: -8px;
  bottom: -20px;
  font-family: 'Condiment', cursive;
  font-weight: 400;
  text-transform: none;
  font-size: 36px;
  line-height: 0.79;
  letter-spacing: 0.03em;
  color: #6FFF00;
  mix-blend-mode: exclusion;
  transform: rotate(-1deg);
  opacity: 0.9;
}
@media (min-width: 640px) { .eh__script { font-size: 52px; bottom: -30px; } }
@media (min-width: 768px) { .eh__script { font-size: 68px; bottom: -40px; } }

/* row1 paragraph: font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase text-cream
   max-w-[266px] leading-relaxed */
.eh__para {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.625;
  text-transform: uppercase;
  color: #EFF4FF;
  max-width: 266px;
}
@media (min-width: 640px) { .eh__para { font-size: 15px; } }
@media (min-width: 768px) { .eh__para { font-size: 16px; } }

/* ROW 2: flex justify-between items-start */
.eh__row2 {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* ghost columns: flex flex-col gap-5 max-w-[335px]  (right one hidden lg:flex) */
.eh__ghost {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 335px;
}
.eh__ghost--right { display: none; }
@media (min-width: 1024px) { .eh__ghost--right { display: flex; } }

/* ghost paragraphs: font-mono text-[14/15/16px] uppercase lg:text-cream text-[#010828]
   opacity-10 leading-relaxed */
.eh__ghost-p {
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.625;
  text-transform: uppercase;
  color: #010828;
  opacity: 0.1;
}
@media (min-width: 640px) { .eh__ghost-p { font-size: 15px; } }
@media (min-width: 768px) { .eh__ghost-p { font-size: 16px; } }
@media (min-width: 1024px) { .eh__ghost-p { color: #EFF4FF; } }
</style>
