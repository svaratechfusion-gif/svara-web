/** r, g, b in 0..1 — the form the shader's `vec3` uniforms want. */
export type Rgb = [number, number, number]

const HEX_SHORT = /^#([\da-f])([\da-f])([\da-f])$/i
const HEX_LONG = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i

/**
 * Parse a CSS colour string into 0..1 RGB. Handles the two forms a custom
 * property realistically resolves to — a hex literal as authored, or the
 * `rgb()` / `color()` form a browser may hand back — and returns `null` for
 * anything else so callers can fall back rather than render a black field.
 */
export function parseCssColor(input: string): Rgb | null {
  const value = input.trim()
  if (!value) return null

  const long = HEX_LONG.exec(value)
  if (long) {
    return [
      Number.parseInt(long[1]!, 16) / 255,
      Number.parseInt(long[2]!, 16) / 255,
      Number.parseInt(long[3]!, 16) / 255,
    ]
  }

  const short = HEX_SHORT.exec(value)
  if (short) {
    return [
      Number.parseInt(short[1]!.repeat(2), 16) / 255,
      Number.parseInt(short[2]!.repeat(2), 16) / 255,
      Number.parseInt(short[3]!.repeat(2), 16) / 255,
    ]
  }

  // rgb(0 117 72) / rgb(0, 117, 72) / rgba(...) — take the first three numbers.
  const numbers = value.match(/-?\d*\.?\d+/g)
  if (value.startsWith('rgb') && numbers && numbers.length >= 3) {
    return [
      Number(numbers[0]) / 255,
      Number(numbers[1]) / 255,
      Number(numbers[2]) / 255,
    ]
  }

  return null
}

/** Read a custom property off an element and parse it, or fall back. */
export function readCssColor(element: Element, property: string, fallback: Rgb): Rgb {
  const raw = getComputedStyle(element).getPropertyValue(property)
  return parseCssColor(raw) ?? fallback
}
