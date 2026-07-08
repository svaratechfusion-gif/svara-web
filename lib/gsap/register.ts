// Central plugin registration — the ONLY place gsap.registerPlugin is ever
// called. Every import specifier below ("gsap", "gsap/<Plugin>") resolves to
// THIS directory's esm/ build via the alias in nuxt.config.ts, not to npm.
//
// Full audit of lib/gsap/esm (GSAP 3.15.0, premium/Club build):
//   Core:      gsap, CSSPlugin (bundled in index), EasePack
//   Scroll:    ScrollTrigger, ScrollToPlugin, ScrollSmoother*, Observer
//   Text:      SplitText, TextPlugin, ScrambleTextPlugin
//   SVG:       MorphSVGPlugin, DrawSVGPlugin, MotionPathPlugin,
//              MotionPathHelper (dev editor), CSSRulePlugin (legacy)
//   Physics:   Physics2DPlugin, PhysicsPropsPlugin, InertiaPlugin
//   Layout:    Flip, Draggable
//   Eases:     CustomEase, CustomBounce, CustomWiggle
//   Canvas:    PixiPlugin (needs PIXI at use-time), EaselPlugin (needs
//              EaselJS at use-time) — registered, inert until their host
//              library is present
//   Tooling:   GSDevTools (dev-only, instantiated on demand — see index.ts)
//
// * ScrollSmoother is registered but must NOT be instantiated: this app's
//   smooth scrolling is Lenis (wired to gsap.ticker in app.vue); running
//   both would double-smooth and fight over scrollTop. See config.ts.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { PixiPlugin } from "gsap/PixiPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { GSDevTools } from "gsap/GSDevTools";

let registered = false;

export function registerAll() {
  if (registered) return;
  registered = true;
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    ScrollSmoother,
    Observer,
    SplitText,
    TextPlugin,
    ScrambleTextPlugin,
    MorphSVGPlugin,
    DrawSVGPlugin,
    MotionPathPlugin,
    Physics2DPlugin,
    PhysicsPropsPlugin,
    InertiaPlugin,
    Flip,
    Draggable,
    CustomEase,
    CustomBounce,
    CustomWiggle,
    PixiPlugin,
    EaselPlugin,
    GSDevTools
  );
}

export {
  gsap,
  ScrollTrigger,
  ScrollToPlugin,
  ScrollSmoother,
  Observer,
  SplitText,
  TextPlugin,
  ScrambleTextPlugin,
  MorphSVGPlugin,
  DrawSVGPlugin,
  MotionPathPlugin,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  InertiaPlugin,
  Flip,
  Draggable,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  PixiPlugin,
  EaselPlugin,
  GSDevTools,
};
