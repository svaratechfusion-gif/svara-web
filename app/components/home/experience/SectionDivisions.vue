<script setup lang="ts">
// 07 · SIX SPECIALIZED DIVISIONS — one organisation, drawn in the hero's
// Intelligence-Fabric language: six structural modules mounted inside a single
// chassis and wired together by connector rails. Not six detached cards.
interface Division {
  n: string
  name: string
  copy: string
  /** Basename in /public/images/home/divisions. */
  img: string
  /** Describes the render's CONTENT for anyone who cannot see it. */
  imgAlt: string
}
const divisions: Division[] = [
  { n: '01', name: 'Artificial Intelligence', copy: 'Vision, generative and predictive model engineering.',
    img: 'artificial-intelligence',
    imgAlt: 'Three engineering panels — Vision, Generative and Predictive — feeding one intelligence stack. On the left, camera hardware beneath a wall of operational footage from traffic, retail, industrial and clinical settings. In the centre, text, image, video and audio inputs converge on a glowing compute core that returns summaries, layouts and drafted responses. On the right, forecast lines, a 98% confidence dial, a correlation heat map and a network graph. All three rest on one shared base of storage, servers and cloud.',
  },
  { n: '02', name: 'Enterprise Software', copy: 'Business platforms, workflows and integrations.',
    img: 'enterprise-software',
    imgAlt: 'A layered business platform: an upper tier of CRM, Projects, Finance, HR, Service, Procurement and Analytics modules, a middle tier of workflows, automation, a rules engine and an app builder, and a foundation band reading security, governance and compliance. Around it sit dashboards for revenue, orders, customers and profit, a performance chart, a product-mix donut, a task queue and a world map of deployments. A five-step orchestration flow — request, approve, process, notify, complete — runs across the top, and a row of third-party business-system logos connects in below.',
  },
  { n: '03', name: 'Simulation', copy: 'Digital twins and physics-grade scenario modelling.',
    img: 'simulation',
    imgAlt: 'A physical site — power plant, river, bridges and industrial buildings — with its live digital twin rendered beside it as a blue wireframe city of towers, street grids and transmission pylons. Drones, satellites, weather stations, sensors and databases feed it from the left; screens on the right show airflow modelling, structural stress bands, sensor traces and an occupancy heat map. A pipeline beneath reads data ingestion, physics modelling, scenario simulation, analysis and decision insights, branching into five modelled scenarios: demand surge, extreme weather, equipment failure, maintenance plan and evacuation.',
  },
  { n: '04', name: 'Digital Engineering', copy: 'Scalable systems, data pipelines and cloud-native builds.',
    img: 'digital-engineering',
    imgAlt: 'A data platform assembled from stacked cube clusters for ingestion, processing, orchestration and analytics, over a rail of pipeline functions that filter, layer, route, secure and monitor. Sources on the left include databases, documents, IoT sensors, cameras and cloud uploads; outputs on the right feed dashboards, machine-learning graphs and developer tooling. A lower platform carries the runtime — cloud servers, container orchestration, containers, databases and object storage. A footer lists scalable, secure, reliable, automated, observable and cost optimized.',
  },
  { n: '05', name: 'Cloud Infrastructure', copy: 'Edge-to-cloud compute — secure, observable, elastic.',
    img: 'cloud-infrastructure',
    imgAlt: 'An edge-to-cloud estate. On the left, cameras, network gear, a robot arm, a vehicle and a wind-and-solar site each pair with a ruggedised edge node; these feed a central platform of server racks, databases, containers and service-mesh components beneath a cloud raining data, with a world map of distributed regions below it. Five panels on the right cover zero trust and access control, metrics and traces, service mesh and API gateway, auto-scaling and self-healing, and cost visibility. A footer reads edge to cloud, secure by design, fully observable, elastic and resilient, automated, cost efficient.',
  },
  { n: '06', name: 'Digital Transformation', copy: 'Strategy and change turned into measurable outcomes.',
    img: 'digital-transformation',
    imgAlt: 'A lit pathway of seven stages — assess, envision, design, build, integrate, adopt and optimize — each paired with a photograph of teams at work, leading to a central dais where white and gold blocks assemble above a ring of capabilities: cloud, data, AI, automation, integration and security. Six outcome cards to the right chart revenue growth, operational efficiency, customer experience, risk and compliance, agility and innovation, and cost optimization. Below, people stand on a world-map platform marked with the change disciplines: strategic alignment, culture and change, skills and enablement, communication, governance and continuous improvement.',
  },
]
</script>

<template>
  <section class="dv hx-section">
    <div class="hx-container">
      <header class="dv__head">
        <p class="hx-eyebrow"><span class="hx-index">07</span> Divisions</p>
        <h2 class="hx-title">Six disciplines. <span class="lite">One engineered organisation.</span></h2>
        <p class="hx-lead">Every platform is built through specialised technology divisions — deep expertise, mounted on one shared architecture.</p>
      </header>

      <div class="dv__chassis">
        <span class="dv__mount tl" /><span class="dv__mount tr" /><span class="dv__mount bl" /><span class="dv__mount br" />
        <span class="dv__code hx-mono">SVARA · TECHNOLOGY FABRIC / DV-06</span>

        <svg class="dv__rails" viewBox="0 0 100 66" preserveAspectRatio="none" aria-hidden="true">
          <path class="hx-rail hx-rail--faint" d="M33.3 8 V58 M66.6 8 V58 M8 33 H92" />
          <g class="dv__nodes"><circle cx="33.3" cy="33" r="0.9" /><circle cx="66.6" cy="33" r="0.9" /></g>
          <circle class="dv__flow" r="0.7" fill="var(--sig)"><animateMotion dur="5s" repeatCount="indefinite" path="M8 33 H92" /></circle>
          <circle class="dv__flow" r="0.7" fill="var(--sig)"><animateMotion dur="6s" begin="1.5s" repeatCount="indefinite" path="M33.3 58 V8" /></circle>
        </svg>

        <div class="dv__grid">
          <article
            v-for="d in divisions" :key="d.n"
            class="dv__mod"
          >
            <span class="dv__jack" /><span class="hx-pin br" />
            <span class="dv__n hx-mono">{{ d.n }}</span>
            <h3 class="dv__name">{{ d.name }}</h3>
            <p class="dv__copy">{{ d.copy }}</p>

            <!-- The division's render, mounted in the module like a display in a
                 rack. `margin-top: auto` pins it to the floor of the card, so all
                 six line up across the grid however long the copy runs. -->
            <a
              class="dv__art"
              :href="`/images/home/divisions/${d.img}.png`"
              target="_blank"
              rel="noopener"
              :aria-label="`${d.name} — open the full-resolution diagram in a new tab`"
            >
              <picture>
                <source :srcset="`/images/home/divisions/${d.img}.webp`" type="image/webp">
                <img
                  class="dv__art-img"
                  :src="`/images/home/divisions/${d.img}.png`"
                  :alt="d.imgAlt"
                  width="1254"
                  height="1254"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                >
              </picture>
              <span class="dv__art-zoom" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.2" stroke="currentColor" stroke-width="1.3" /><path d="M9.2 9.2 13 13M6 4.2v3.6M4.2 6h3.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg>
                View full size
              </span>
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Centred header. The 60ch cap is gone because the title and lead carry their
   own measures (20ch / 40ch) — keeping both would centre the block inside a
   block and leave the two lines off-axis from each other. */
.dv__head { margin-bottom: clamp(44px, 5vw, 76px); text-align: center; }
.dv__head .hx-title, .dv__head .hx-lead { margin-inline: auto; }

.dv__chassis {
  position: relative; padding: clamp(20px, 3vw, 40px);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.14));
  border: 1px solid rgba(20, 34, 63, 0.16);
  box-shadow: 0 46px 100px -50px rgba(16, 42, 91, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.55);
  clip-path: polygon(0 3%, 3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%);
}
.dv__mount { position: absolute; width: 9px; height: 9px; border-radius: 50%; border: 1px solid rgba(20, 34, 63, 0.3); background: rgba(255, 255, 255, 0.7); }
.dv__mount.tl { top: 14px; left: 14px; } .dv__mount.tr { top: 14px; right: 14px; } .dv__mount.bl { bottom: 14px; left: 14px; } .dv__mount.br { bottom: 14px; right: 14px; }
.dv__code { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); font-size: 9px; letter-spacing: 0.18em; color: var(--ink-muted); }

.dv__rails { position: absolute; inset: clamp(20px, 3vw, 40px); width: auto; height: auto; overflow: visible; }
.dv__nodes { fill: var(--sig-soft); }
.dv__flow { filter: drop-shadow(0 0 1.5px rgba(63, 111, 176, 0.6)); }

.dv__grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(12px, 1.6vw, 22px); }
.dv__mod {
  position: relative; padding: 24px 22px 26px; min-height: 168px;
  display: flex; flex-direction: column;
  background: linear-gradient(158deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.4));
  backdrop-filter: blur(14px);
  border: 1px solid rgba(20, 34, 63, 0.12);
  box-shadow: 0 20px 44px -32px rgba(16, 42, 91, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.68);
  clip-path: polygon(0 13px, 13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%);
  transition: transform var(--motion-medium) var(--ease-out), box-shadow var(--motion-medium) var(--ease-out);
}
.dv__mod:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -30px rgba(16, 42, 91, 0.4); }
.dv__jack { position: absolute; top: -5px; left: 22px; width: 9px; height: 9px; border-radius: 50%; background: #fff; border: 1px solid rgba(20, 34, 63, 0.28); }
.dv__n { font-size: 11px; letter-spacing: 0.18em; color: var(--sig); }
.dv__name { margin: 12px 0 0; font-size: clamp(18px, 1.9vw, 23px); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; color: var(--ink-primary); }
.dv__copy { margin: 12px 0 0; font-size: 13.5px; line-height: 1.5; color: var(--ink-secondary); }

/* the division render. `__art`, not `__card`/`__tile`/`__module` — svara-3d.css
   attaches bevel, hover-lift and a cursor tilt to those suffixes by attribute
   selector, and this already sits inside a card that lifts on hover. */
.dv__art { position: relative; display: block; margin-top: auto; padding-top: 18px; }
.dv__art picture {
  display: block; overflow: hidden; border-radius: 2px;
  /* the frame, not the <img>: an inset box-shadow on a replaced element paints
     BEHIND its content, so the hairline would never have been visible on it */
  box-shadow: inset 0 0 0 1px rgba(20, 34, 63, 0.14), 0 10px 24px -18px rgba(16, 42, 91, 0.5);
}
.dv__art-img {
  /* The WHOLE diagram, uncropped — these are dense 1:1 infographics and a band
     of one is unreadable. The card is sized by the render rather than the other
     way round; the zoom link still opens it at full resolution for fine print. */
  display: block; width: 100%; height: auto;
}
.dv__art-zoom {
  position: absolute; right: 8px; bottom: 8px;
  display: inline-flex; align-items: center; gap: 6px; padding: 5px 9px;
  font-family: var(--font-mono); font-size: 8.5px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #14223f; background: rgba(255, 255, 255, 0.88);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  box-shadow: inset 0 0 0 1px rgba(20, 34, 63, 0.14);
  opacity: 0; transform: translateY(4px);
  transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out);
}
.dv__art:hover .dv__art-zoom, .dv__art:focus-visible .dv__art-zoom { opacity: 1; transform: none; }
.dv__art:focus-visible { outline: 2px solid var(--sig); outline-offset: 3px; }
@media (hover: none) { .dv__art-zoom { opacity: 1; transform: none; } }

@media (max-width: 860px) {
  .dv__grid { grid-template-columns: 1fr; }
  .dv__rails { display: none; }
  .dv__mod { min-height: 0; }
}
@media (prefers-reduced-motion: reduce) { .dv__flow { animation: none; display: none; } }
</style>
