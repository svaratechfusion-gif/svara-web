<script setup lang="ts">
// Scene 8 — Trust. Four signals a buyer needs to see before they begin a
// conversation: DPIIT recognition, Women-led operation, Research-based
// design, and Industry-standard technology. Each panel is text-first —
// trust is written, not animated.
import { ArrowRight, CheckCircle, FileText, Cpu, ShieldCheck } from "@lucide/vue";

const TRUST = [
  {
    icon: ShieldCheck,
    title: "DPIIT-Recognized",
    body: "Registered with the Department for Promotion of Industry and Internal Trade under the Government of India's Startup India initiative — eligible vendor for government and public-sector procurement.",
    href: "/dpiit",
    link: "View recognition →",
  },
  {
    icon: CheckCircle,
    title: "Women-Led Operation",
    body: "SVARA is women-led — a deliberately underrepresented profile in deep-tech enterprise infrastructure, and an advantage in the perspectives that shape the platform.",
  },
  {
    icon: FileText,
    title: "Research-Backed Design",
    body: "Every capability maps to a peer-reviewed technique or industry standard — sensor fusion, computer vision, predictive maintenance, multi-agent systems. No vapor, no proprietary magic.",
  },
  {
    icon: Cpu,
    title: "Industry-Standard Technology",
    body: "Built on OPC-UA, MQTT, REST, gRPC, and the modern AI/ML stack. Integrates with existing SCADA, MES, ERP, and identity systems — not a rip-and-replace.",
  },
] as const;
</script>

<template>
  <section class="trust" aria-labelledby="trust-title">
    <div class="trust__inner">
      <p class="section__number">08 · Trust</p>
      <h2 id="trust-title" class="section__title">
        Built to be trusted with<br>
        enterprise operations.
      </h2>
      <p class="section__lead">
        Buying an intelligence platform means trusting the vendor with your
        operating data. We earned that trust before we wrote a line of code.
      </p>

      <ul class="trust__grid" role="list">
        <li
          v-for="(pillar, i) in TRUST"
          :key="i"
          class="trust-card"
          data-reveal-item
        >
          <component :is="pillar.icon" :size="24" class="trust-card__icon" aria-hidden="true" />
          <h3 class="trust-card__title">{{ pillar.title }}</h3>
          <p class="trust-card__body">{{ pillar.body }}</p>
          <NuxtLink
            v-if="pillar.href"
            :to="pillar.href"
            class="trust-card__link"
          >
            {{ pillar.link }}
            <ArrowRight :size="12" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.trust {
  min-height: 100svh;
  padding: 8rem 1.5rem;
  display: flex;
  align-items: center;
}
.trust__inner {
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
}
.section__number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
}
.section__title {
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin-bottom: 1.5rem;
}
.section__lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--color-muted-strong);
  max-width: 48rem;
  margin-bottom: 4rem;
}
.trust__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}
@media (min-width: 640px)  { .trust__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .trust__grid { grid-template-columns: repeat(4, 1fr); gap: 1.25rem; } }

.trust-card {
  background: var(--color-card);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-card);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  transition: transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease;
}
.trust-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-sm);
}
.trust-card__icon {
  color: var(--color-accent);
}
.trust-card__title {
  font-size: 1.1875rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-primary);
}
.trust-card__body {
  flex: 1;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--color-muted-strong);
}
.trust-card__link {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-accent);
  text-decoration: none;
}
.trust-card__link:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .trust { padding: 6rem 1.25rem; }
}
</style>