// Helios · math — deterministic PRNG (Park–Miller). Same seed → same entity.

export function createPrng(seed = 1337) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export type Prng = ReturnType<typeof createPrng>
