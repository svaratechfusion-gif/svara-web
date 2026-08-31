<script setup lang="ts">
// FINALE (§29) — the closing statement only.
//
// Calm and minimal: one large SVARA statement and the smallest amount of
// supporting copy. The page's real footer is the shared site Footer, rendered in
// normal flow after the scene (see ProductExperience) — this finale no longer
// carries its own editorial footer.
import { computed } from 'vue'
import type { Beat } from './scene-sequence'
import RevealText from './RevealText.vue'
import RevealItem from './RevealItem.vue'

const props = defineProps<{ beat: Beat }>()
const len = props.beat.end - props.beat.start

// No exit window — this is the last thing on screen and must still be there at
// progress 1.
const win = computed<[number, number]>(() => [props.beat.start + len * 0.05, 1])
</script>

<template>
  <div class="sf">
    <div class="sf__statement">
      <RevealItem :window="win" class="ps-label ps-label--blue" tag="p">SVARA</RevealItem>
      <RevealText text="Own the stack." :window="win" variant="letter" tag="h2" class="sf__h ps-display" :delay="140" />
      <RevealText text="Own the future." :window="win" variant="letter" tag="p" class="sf__h sf__h--lite ps-display" :delay="340" />
      <RevealText
        text="Ten intelligence platforms, one engineered architecture — built, owned and operated end to end."
        :window="win"
        variant="word"
        tag="p"
        class="sf__lead ps-copy"
        :delay="640"
      />
      <RevealItem :window="win" :delay="860" class="sf__actions">
        <NuxtLink to="/contact" class="sf__action sf__action--primary">
          <span>Talk to SVARA</span><span aria-hidden="true">&#8594;</span>
        </NuxtLink>
        <NuxtLink to="/architecture" class="sf__action">
          <span>See the architecture</span><span aria-hidden="true">&#8594;</span>
        </NuxtLink>
      </RevealItem>
    </div>
  </div>
</template>

<style scoped>
/* The finale is a normal block-level section in document flow (rendered after the
   scene spacer, above the site footer) — not pinned inside the fixed stage. It owns
   its own vertical space via `min-height` (a MINIMUM, so it grows naturally and never
   clips its content on smaller screens), keeping the same centred, full-height look
   the CTA had before. */
.sf {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  box-sizing: border-box;
  padding: calc(var(--ps-header-h) + clamp(18px, 3vh, 40px)) clamp(22px, 4vw, 72px) clamp(20px, 3vh, 38px);
  display: grid;
  grid-template-rows: 1fr auto;
  gap: clamp(18px, 3vh, 40px);
}

.sf__statement { align-self: center; max-width: min(640px, 54vw); }
.sf__h { font-size: clamp(38px, 6.4vw, 118px); font-weight: 200; }
.sf__h--lite { color: var(--ps-faint); }
.sf__lead { margin-top: clamp(14px, 2vh, 26px); max-width: 480px; }

.sf__actions { display: flex; flex-wrap: wrap; gap: clamp(16px, 2.4vw, 34px); margin-top: clamp(18px, 2.6vh, 32px); pointer-events: auto; }
.sf__action {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 5px;
  font-size: 13.5px;
  color: var(--ps-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--ps-line);
  transition: color 0.3s ease, border-color 0.3s ease, gap 0.3s ease;
}
.sf__action:hover { color: var(--ps-blue); border-color: var(--ps-blue); gap: 15px; }
.sf__action--primary { color: var(--ps-navy); border-color: var(--ps-navy); }

.sf__footer-rule { margin-bottom: clamp(14px, 2vh, 22px); }
.sf__footer-body {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: clamp(20px, 4vw, 70px);
  pointer-events: auto;
}
.sf__brand {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.24em;
  color: var(--ps-navy);
  text-decoration: none;
}
.sf__cols { display: flex; gap: clamp(26px, 5vw, 88px); }
.sf__col { display: flex; flex-direction: column; gap: 7px; }
.sf__col-h { color: var(--ps-faint); margin-bottom: 3px; }
.sf__col-link-w { display: block; }
.sf__col-link {
  font-size: 12.5px;
  color: var(--ps-muted);
  text-decoration: none;
  transition: color 0.25s ease;
}
.sf__col-link:hover { color: var(--ps-navy); }

@media (max-width: 900px) {
  .sf { padding: calc(var(--ps-header-h) + 14px) 18px 18px; }
  .sf__h { font-size: clamp(32px, 12vw, 62px); }
  .sf__lead { display: none; }
  .sf__footer-body { flex-direction: column; gap: 16px; }
  .sf__cols { flex-wrap: wrap; gap: 18px 30px; }
}
</style>
