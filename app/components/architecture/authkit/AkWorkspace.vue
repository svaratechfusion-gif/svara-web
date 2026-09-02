<script setup lang="ts">
// THE WORKSPACE — the reference's other signature composition.
//
// "A mock browser-window frame with the card centred, surrounded by floating UI
// inspector panels (colour swatches, radius sliders, icon picker, text field, page
// background field) positioned at the corners of the canvas like a design-tool
// workspace."
//
// Here the centred window is the architecture console and the corner panels are the
// things you actually tune on this architecture: where it deploys, how far it scales,
// what runs through every layer, and what it connects to.
import AkHead from './AkHead.vue'
import { AK_ENVIRONMENTS, AK_CONNECT, AK_SCALE, AK_CROSS, AK_FLOW } from '~~/lib/architecture/authkit'
</script>

<template>
  <section class="ak-section ak-workspace">
    <div class="ak-wrap">
      <AkHead
        :eyebrow="AK_ENVIRONMENTS.eyebrow"
        :headline="AK_ENVIRONMENTS.headline"
        :body="AK_ENVIRONMENTS.body"
      />

      <div class="ak-ws">
        <!-- the centred mock window -->
        <div class="ak-ws__window">
          <div class="ak-ws__chrome">
            <span /><span /><span />
            <span class="ak-ws__url">svara · architecture</span>
          </div>
          <div class="ak-ws__body">
            <p class="ak-ws__eyebrow">Pipeline</p>
            <ol class="ak-ws__pipe">
              <li v-for="s in AK_FLOW" :key="s.n">
                <span class="ak-ws__pipe-n">{{ s.n }}</span>
                <span>{{ s.name }}</span>
              </li>
            </ol>
          </div>
        </div>

        <!-- floating inspector panels at the corners -->
        <aside class="ak-ws__panel ak-ws__panel--tl">
          <span class="ak-ws__panel-l">Deployment</span>
          <ul class="ak-tags">
            <li v-for="t in AK_ENVIRONMENTS.targets.slice(0, 4)" :key="t" class="ak-tag">{{ t }}</li>
          </ul>
        </aside>

        <aside class="ak-ws__panel ak-ws__panel--tr">
          <span class="ak-ws__panel-l">Runs through every layer</span>
          <ul class="ak-ws__toggles">
            <li v-for="c in AK_CROSS" :key="c"><i /><span>{{ c }}</span></li>
          </ul>
        </aside>

        <aside class="ak-ws__panel ak-ws__panel--bl">
          <span class="ak-ws__panel-l">Scale</span>
          <ol class="ak-ws__scale">
            <li v-for="s in AK_SCALE.stages" :key="s.n">
              <span class="ak-ws__scale-dots"><i v-for="d in Math.min(s.dots, 9)" :key="d" /></span>
              <span class="ak-ws__scale-l">{{ s.label }}</span>
            </li>
          </ol>
        </aside>

        <aside class="ak-ws__panel ak-ws__panel--br">
          <span class="ak-ws__panel-l">Connects to</span>
          <ul class="ak-tags">
            <li v-for="e in AK_CONNECT.enterprise" :key="e" class="ak-tag">{{ e }}</li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>
