/**
 * DOM helpers for the /ecosystem experience: per-character title splitting, the
 * scroll-driven reveal, and the flying-word choreography. Ported verbatim from
 * the Clarix reference; kept framework-agnostic so the page component stays a
 * thin shell and none of this runs through Vue's reactivity per frame.
 */

/**
 * Split every title's text into per-character spans, preserving <br> and any
 * inner styled spans. Whitespace stays a plain text node so the browser
 * collapses it normally — wrapping spaces in spans produces huge indents.
 */
export function initTitles(root: ParentNode): IntersectionObserver {
  const titleEls = root.querySelectorAll<HTMLElement>('#animated-hero-title, .animated-title')

  titleEls.forEach((titleEl) => {
    const childNodes = Array.from(titleEl.childNodes)
    titleEl.innerHTML = ''

    const processNode = (node: Node, targetParent: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? ''
        if (text.trim() === '') {
          targetParent.appendChild(document.createTextNode(text))
          return
        }
        for (const char of text) {
          if (char === ' ' || char === '\n' || char === '\t') {
            targetParent.appendChild(document.createTextNode(char))
            continue
          }
          const mask = document.createElement('span')
          mask.className = 'char-mask'
          const charSpan = document.createElement('span')
          charSpan.className = 'hero-char'
          charSpan.textContent = char
          mask.appendChild(charSpan)
          targetParent.appendChild(mask)
        }
        return
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return
      const el = node as HTMLElement
      if (el.tagName === 'BR') {
        targetParent.appendChild(el.cloneNode())
        return
      }
      const cloned = el.cloneNode(false)
      Array.from(el.childNodes).forEach((child) => processNode(child, cloned))
      targetParent.appendChild(cloned)
    }

    childNodes.forEach((node) => processNode(node, titleEl))
  })

  // Titles in the normal scroll flow reveal themselves as they come into view.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const chars = entry.target.querySelectorAll('.hero-char:not(.revealed)')
      chars.forEach((char, index) => {
        setTimeout(() => char.classList.add('revealed'), index * 10)
      })
      observer.unobserve(entry.target)
    })
  }, { threshold: 0.3 })

  root.querySelectorAll('.animated-title.flow-title').forEach((el) => observer.observe(el))
  return observer
}

/** Reveal a scroll-driven title's characters. Fires once per selector. */
export function createTextRevealer() {
  const fired = new Set<string>()
  return (root: ParentNode, selector: string) => {
    if (fired.has(selector)) return
    const chars = root.querySelectorAll(`${selector} .hero-char:not(.revealed)`)
    if (chars.length === 0) return
    fired.add(selector)
    chars.forEach((char, index) => {
      setTimeout(() => char.classList.add('revealed'), index * 10)
    })
  }
}

/**
 * Sweep one giant word across the screen in 3D perspective.
 *
 * `stopAtCenter` words halt in the middle and then fly up and out, blurring per
 * character on staggered speeds; the others pass straight through.
 */
export function updateWordAnimation(
  el: HTMLElement | null,
  p: number,
  start: number,
  end: number,
  stopAtCenter = false,
) {
  if (!el) return
  if (p <= start) { el.style.opacity = '0'; return }

  const localP = (p - start) / (end - start)
  if (!stopAtCenter && localP >= 1.0) { el.style.opacity = '0'; return }

  let xOff: number
  let yOff: number
  let rotY: number
  let zOff: number

  if (stopAtCenter && localP > 1.0) {
    const extraP = Math.min(1.0, (localP - 1.0) / 1.25)
    const easeIn = extraP * extraP
    xOff = 0
    yOff = 0 - easeIn * 100
    rotY = 0
    zOff = -800
    el.style.opacity = '1'
    if (el.children.length > 0) {
      const speedMultipliers = [0.8, 1.4, 0.5, 1.7, 0.9, 1.2]
      for (let i = 0; i < el.children.length; i += 1) {
        const child = el.children[i] as HTMLElement
        const speed = speedMultipliers[i % speedMultipliers.length]!
        const extraY = -(easeIn * 60 * speed)
        const blurAmount = easeIn * 24 * speed
        child.style.transform = `translate3d(0, ${extraY}vh, 0)`
        child.style.opacity = '1'
        child.style.filter = blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'none'
      }
    }
  }
  else {
    const sineInOut = (t: number) => 0.5 - Math.cos(t * Math.PI) / 2
    if (stopAtCenter) {
      xOff = 1400 - sineInOut(localP) * 1400
      const yEaseOut = 1 - Math.pow(1 - localP, 3)
      yOff = 80 - yEaseOut * 80
    }
    else {
      xOff = 1400 - sineInOut(localP) * 3100
      const yProgress = Math.min(1.0, localP / 0.55)
      const yEaseOut = 1 - Math.pow(1 - yProgress, 3)
      yOff = 80 - yEaseOut * 80
    }
    rotY = -(xOff / 800) * 60
    zOff = -800

    if (el.children.length > 0) {
      const totalChars = el.children.length
      for (let i = 0; i < totalChars; i += 1) {
        const child = el.children[i] as HTMLElement
        const delay = (i / totalChars) * 0.25
        const flyInDuration = 0.35
        const childP = Math.max(0, Math.min(1.0, (localP - delay) / flyInDuration))
        let childOpacity = Math.min(1.0, childP / 0.5)
        const yEase = 1 - Math.pow(1 - childP, 3)
        let childY = 60 - yEase * 60
        let childBlur = 24 - yEase * 24

        if (!stopAtCenter) {
          const outDelay = (i / totalChars) * 0.15
          const outP = Math.max(0, Math.min(1.0, (localP - (0.50 + outDelay)) / 0.25))
          if (outP > 0) {
            const outEase = outP * outP
            childY -= outEase * 60
            childBlur += outEase * 24
            childOpacity = Math.min(childOpacity, 1.0 - outP)
          }
        }

        child.style.transform = `translate3d(0, ${childY}vh, 0)`
        child.style.opacity = childOpacity.toString()
        child.style.filter = childBlur > 0.1 ? `blur(${childBlur}px)` : 'none'
      }
      el.style.opacity = '1'
    }
    else {
      let opacity = 1.0
      if (localP < 0.1) opacity = localP / 0.1
      else if (!stopAtCenter && localP > 0.8) opacity = 1.0 - (localP - 0.8) / 0.2
      el.style.opacity = opacity.toString()
    }
  }

  el.style.transform = `translate3d(calc(-50% + ${xOff}px), calc(-50% + ${yOff}vh), ${zOff}px) rotateY(${rotY}deg)`
}
