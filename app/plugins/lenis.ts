// Installs the vendored Lenis Vue plugin's APP-LEVEL provides — the three
// injection keys (LenisSymbol / AddCallbackSymbol / RemoveCallbackSymbol)
// that `useLenis()` looks up via `inject()`.
//
// Without this, app.vue's `useLenis()` call (which sits at the <App> ROOT,
// i.e. the PARENT of <VueLenis root>) runs outside the provider's subtree and
// floods the console with:
//   [Vue warn]: injection "Symbol(LenisContext)" not found. at <App>
// plus the package's own "No lenis instance found" warning two ticks later.
// The scroll bridge still functioned via the global-store fallback, but the
// warnings were noise on every navigation and masked real issues.
//
// This mirrors exactly what the vendored package's own Nuxt runtime does
// (lib/lenis/packages/vue/nuxt/runtime/lenis.ts → `vueApp.use(vuePlugin)`)
// — but WITHOUT re-adding the `lenis/nuxt` MODULE, which bakes the
// <VueLenis> component registration to an absolute npm path and bypasses the
// vendored alias (the documented reason the module was removed in
// nuxt.config.ts). Here, `vuePlugin` imports through the `"lenis/vue"` alias
// → vendored code, and app.vue still imports <VueLenis>/<useLenis> directly.
//
// Not `.client`: app.vue's setup runs during SSR, and `inject` there needs
// the provides to already exist. vueLenisPlugin only installs `provide()`
// calls with `shallowRef(undefined)` defaults — no window access — so it is
// SSR-safe.
import vuePlugin from "lenis/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuePlugin);
});
