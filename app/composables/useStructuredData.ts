// Structured data injection utility.
// Injects <script type="application/ld+json"> into the page head.
// Uses `useHead` to add the script tag safely in Vue/Nuxt.

export interface StructuredData {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

/**
 * Deterministic, content-derived key.
 *
 * Keying on `@type` alone made two schemas of the same type overwrite each
 * other. Keying on a module-scoped counter was worse: the counter advances
 * independently on the server and again during hydration, so the same schema
 * got two different keys and was emitted TWICE — a duplicate Article/FAQPage/
 * BreadcrumbList on every page whose schemas carry no @id. A module-scoped
 * mutable also leaks across concurrent SSR requests.
 *
 * Hashing the serialised schema gives the same key on both sides for the same
 * content, so identical nodes dedupe and genuinely different ones coexist.
 */
function stableKey(json: string): string {
  let h = 5381;
  for (let i = 0; i < json.length; i++) h = ((h << 5) + h + json.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

export function useStructuredData(data: StructuredData) {
  const json = JSON.stringify(data);
  // An explicit @id is the entity's real identity; otherwise derive from content.
  const id = typeof data["@id"] === "string" ? data["@id"] : stableKey(json);
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: json,
        key: `schema-${data["@type"]}-${id}`,
      },
    ],
  });
}
