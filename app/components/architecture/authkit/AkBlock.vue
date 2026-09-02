<script setup lang="ts">
// THE ARCHITECTURE PAGE BODY, in the AuthKit component set.
//
// A rebuild, not a repaint. The earlier pass only recoloured the existing sections, so
// the page kept its old shape; these are the design's own components — eyebrow labels
// flanked by fading hairlines, the frosted icon timeline, glass cards, the floating
// glass plates, and its neutral pill actions.
//
// The copy is SVARA's, carried over verbatim (lib/architecture/authkit.ts).
// The hero and its fixed video above are untouched.
import AkFlow from './AkFlow.vue'
import AkFan from './AkFan.vue'
import AkStack from './AkStack.vue'
import AkWorkspace from './AkWorkspace.vue'
import AkEvent from './AkEvent.vue'
import AkScale from './AkScale.vue'
import AkCta from './AkCta.vue'
</script>

<template>
  <div class="ak">
    <AkFlow />
    <AkFan />
    <AkStack />
    <AkEvent />
    <AkWorkspace />
    <AkScale />
    <AkCta />
  </div>
</template>
