<script setup lang="ts">
const NAV_ITEMS = [
  { label: "Platform", href: "/platform" },
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "Industries", href: "/industries" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Company", href: "/company" },
];

const route = useRoute();
const isScrolled = ref(false);
const isNavVisible = ref(false);
const isMobileMenuOpen = ref(false);
const isHomepage = computed(() => route.path === "/");

// On the homepage the nav stays hidden until the visitor scrolls past
// Acts 1-4 (SVARA branding threshold). On every other page it's visible
// from page load.
function handleScroll() {
  const scrollY = window.scrollY;
  isScrolled.value = scrollY > 40;
  if (isHomepage.value) {
    isNavVisible.value = scrollY > window.innerHeight * 0.48;
  } else {
    isNavVisible.value = true;
  }
}

const headerStyle = computed(() => {
  const visible = isNavVisible.value;
  const chrome = isScrolled.value
    ? "background: rgba(255, 255, 255, 0.82); backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); box-shadow: var(--shadow-sm); border-bottom: 1px solid var(--color-divider);"
    : "background: transparent; border-bottom: 1px solid transparent;";

  return `${chrome} opacity: ${visible ? 1 : 0}; transform: translateY(${visible ? "0" : "-14px"}); pointer-events: ${visible ? "auto" : "none"};`;
});

function toggleMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMenu() {
  isMobileMenuOpen.value = false;
}

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(
  () => route.path,
  () => {
    nextTick(handleScroll);
    closeMenu();
  }
);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-30 flex h-[60px] items-center justify-between px-8 transition-[background-color,backdrop-filter,border-color,box-shadow,opacity,transform] duration-500 md:h-[72px]"
    :style="headerStyle"
  >
    <NuxtLink
      to="/"
      class="font-bold transition-[font-size] duration-300"
      :class="isScrolled ? 'text-base' : 'text-lg'"
      style="color: var(--color-primary)"
    >
      SVARA
    </NuxtLink>
    <nav
      class="hidden font-medium transition-[gap] duration-300 md:flex"
      :class="isScrolled ? 'gap-6 text-sm' : 'gap-8 text-sm'"
      style="color: var(--color-primary)"
    >
      <NuxtLink
        v-for="item in NAV_ITEMS"
        :key="item.href"
        :to="item.href"
        class="opacity-70 transition-opacity hover:opacity-100"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
    <button
      type="button"
      class="text-sm font-medium md:hidden"
      style="color: var(--color-primary)"
      :aria-expanded="isMobileMenuOpen"
      aria-controls="mobile-nav-panel"
      :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
      @click="toggleMenu"
    >
      {{ isMobileMenuOpen ? "Close" : "Menu" }}
    </button>
  </header>

  <Teleport to="body">
    <Transition name="mobile-nav">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-nav-panel"
        class="fixed inset-0 top-[60px] z-40 bg-white md:hidden"
        style="color: var(--color-primary)"
      >
        <nav
          class="flex flex-col gap-1 px-8 py-6 text-lg font-medium"
          style="color: var(--color-primary)"
        >
          <NuxtLink
            v-for="item in NAV_ITEMS"
            :key="item.href"
            :to="item.href"
            class="border-b py-3 opacity-80 transition-opacity hover:opacity-100"
            style="border-color: var(--color-divider)"
            @click="closeMenu"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 200ms ease-out;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
}
</style>