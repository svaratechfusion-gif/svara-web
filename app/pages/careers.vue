<script setup lang="ts">
// CAREERS — rebuilt on the Harness/Gitness reference: a midnight mission deck.
//
// WHAT CARRIES OVER. The page's ideas were already right and are kept intact —
// culture shown as a build LOOP rather than stock photography, disciplines
// grounded in SVARA's real product stack, an honest "no open roles" state that
// invents no vacancies, and principles that describe how the company builds
// rather than claims about perks or headcount. Only the design language changed.
//
// AND THE VIDEO. The Mainframe clip stays exactly where it was: fixed, full
// viewport, behind everything. It is the hero's visual now (the reference splits
// its hero 50/50 with the picture bleeding off the right edge) and it is never
// scrimmed — the hero copy sits on a dark Carbon Plate instead, so the footage
// stays whole while the theme stays dark. See styles/careers-harness.css.
//
// The reference is emphatic that the page never breaks into a light section, so
// every band below the hero is the same void canvas.
import { companyContent } from '~~/lib/content/company'
import HnsBand from '~/components/careers/harness/HnsBand.vue'
import HnsHero from '~/components/careers/harness/HnsHero.vue'
import HnsLoop from '~/components/careers/harness/HnsLoop.vue'
import HnsWhy from '~/components/careers/harness/HnsWhy.vue'
import HnsDisciplines from '~/components/careers/harness/HnsDisciplines.vue'
import HnsRoles from '~/components/careers/harness/HnsRoles.vue'
import HnsPrinciples from '~/components/careers/harness/HnsPrinciples.vue'
import HnsCta from '~/components/careers/harness/HnsCta.vue'

/** the retained "Mainframe" hero clip — unchanged URL */
const HERO_VIDEO
  = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'

useSeoMeta({
  title: 'Careers | SVARA — Build the Intelligence Layer for Enterprise',
  description: companyContent.architecture.components[0]!.description,
})
</script>

<template>
  <div class="hns">
    <HnsHero :video="HERO_VIDEO" />

    <HnsBand><HnsLoop /></HnsBand>
    <HnsBand><HnsWhy /></HnsBand>
    <HnsBand><HnsDisciplines /></HnsBand>
    <HnsBand><HnsRoles /></HnsBand>
    <HnsBand><HnsPrinciples /></HnsBand>
    <HnsBand><HnsCta /></HnsBand>
  </div>
</template>
