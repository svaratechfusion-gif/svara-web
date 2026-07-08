# Release Checklist

**Business:** Nothing ships without verification.
**User:** (transparent — quality is felt)
**Owner:** OpenCode
**Acceptance:** Every item is checked before each sprint closes.

---

## Accessibility

- [ ] All images have `alt` text
- [ ] Keyboard navigation works across all pages
- [ ] Tab order follows visual order
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader test: NVDA / VoiceOver
- [ ] Color contrast passes WCAG AA (4.5:1 text, 3:1 large text)
- [ ] Reduced motion: Lenis lerp = 1, no GSAP tweens, no Three.js animation

## Performance

- [ ] Lighthouse: ≥ 90 on all four metrics
- [ ] Total JS bundle < 500KB (gzipped)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Three.js canvas: < 10k particles on mobile

## SEO

- [ ] Every page has unique `<title>` and `<meta name="description">`
- [ ] `robots.txt` allows crawling
- [ ] Schema.org Organization identity on every page
- [ ] Schema.org WebPage on every page
- [ ] Open Graph tags on every page
- [ ] Twitter Card tags on every page
- [ ] Canonical URLs on every page

## Content

- [ ] No placeholder text
- [ ] No broken links
- [ ] No dead-end pages
- [ ] Spelling and grammar checked
- [ ] All claims sourced

## Technical

- [ ] Build succeeds
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] SSR renders correctly
- [ ] 404 redirects to homepage

## Motion

- [ ] No scroll jank (Lenis + GSAP ticker in sync)
- [ ] Particle field at 60fps on target devices
- [ ] Scene transitions respect scroll position
- [ ] Reduced motion disables all GSAP animations
- [ ] PageLoader on cold load only (not client-side nav)

## Devices

- [ ] Desktop (1920×1080, 1440×900, 1280×800)
- [ ] Tablet (iPad, 1024×768)
- [ ] Mobile (iPhone 14 Pro, Pixel 7)
- [ ] Safari, Chrome, Firefox, Edge (latest two versions)
