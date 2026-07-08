<script setup lang="ts">
// TODO: replace the default with the final "White Monument" hero video
// asset once supplied. Reusing the already-validated CloudFront URL from
// the prior Next.js build as a placeholder so the component isn't blocked
// on a real asset. videoSrc is a prop (not a hardcoded constant) so every
// page's hero can supply its own clip through the same component.
const props = withDefaults(defineProps<{ videoSrc?: string }>(), {
  videoSrc:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4",
});
</script>

<template>
  <!--
    src bound directly on the tag, no <source> child — Vue's runtime also
    mounts <video> via scripted DOM patching (not static HTML parsing), so a
    <source> added this way never triggers the browser's native "auto-load on
    parse" behavior (confirmed in the prior React build; same underlying
    browser behavior, not React-specific).

    object-cover, not object-contain — deliberate for this build: the PRD
    specs a genuinely fullscreen hero video, and object-contain would
    letterbox/pillarbox whenever the clip's aspect ratio doesn't exactly match
    the viewport. The center-weighted gradient/HUD/text overlay further
    reduces sensitivity to any edge cropping.
  -->
  <video
    :src="props.videoSrc"
    class="absolute inset-0 h-full w-full object-cover object-center"
    autoplay
    muted
    loop
    playsinline
  />
</template>
