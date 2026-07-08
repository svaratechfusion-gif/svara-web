<template>
  <!--
    Plain CSS gradient — no ClientOnly needed, renders identically on server
    and client. Radial: center stays closer to the PRD's lower opacity bound
    (35%) so the video reads clearly where the eye lands first, edges climb
    toward the upper bound (55%) for text readability at the frame's margins.
    Color is the EXPERIENCE 01 background (#02040A, near-black) — same
    darkening role as before, updated to the current token.
  -->
  <div
    class="absolute inset-0"
    style="background: radial-gradient(circle at center, rgba(2, 4, 10, 0.35) 0%, rgba(2, 4, 10, 0.55) 100%)"
  />
</template>
