<script setup lang="ts">
const pageRevealed = usePageReveal();
const worldReady = useWorldReady();

const showOverlay = ref(true);
const showLoading = ref(false);
const overlayLeaving = ref(false);

onMounted(() => {
  if (worldReady.value) {
    reveal();
    return;
  }

  const loadingTimer = setTimeout(() => {
    if (!worldReady.value) showLoading.value = true;
  }, 2000);

  const unsubReady = watch(worldReady, (ready) => {
    if (!ready) return;
    clearTimeout(loadingTimer);
    reveal();
    unsubReady();
  });
});

function reveal() {
  if (showLoading.value) {
    overlayLeaving.value = true;
    setTimeout(() => {
      showOverlay.value = false;
      pageRevealed.value = true;
    }, 400);
  } else {
    showOverlay.value = false;
    pageRevealed.value = true;
  }
}
</script>

<template>
  <div
    v-if="showOverlay"
    aria-hidden="true"
    class="page-loader"
    :class="{ 'page-loader--leaving': overlayLeaving }"
  >
    <Transition name="loader-text">
      <span v-if="showLoading" class="page-loader__text">Loading...</span>
    </Transition>
  </div>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafc;
  pointer-events: auto;
  transition: opacity 400ms ease-out;
}

.page-loader--leaving {
  opacity: 0;
  pointer-events: none;
}

.page-loader__text {
  font-family: "Geist Sans", "Inter", sans-serif;
  font-size: 14px;
  color: var(--color-muted);
  animation: pulse-loader 1s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .page-loader__text {
    animation: none;
  }
}

.loader-text-enter-active {
  transition: opacity 300ms ease-out;
}

.loader-text-leave-active {
  transition: opacity 200ms ease-in;
}

.loader-text-enter-from,
.loader-text-leave-to {
  opacity: 0;
}

@keyframes pulse-loader {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}
</style>
