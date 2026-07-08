// Structured data injection utility.
// Injects <script type="application/ld+json"> into the page head.
// Uses `useHead` to add the script tag safely in Vue/Nuxt.

export interface StructuredData {
  "@context": "https://schema.org";
  "@type": string;
  [key: string]: unknown;
}

export function useStructuredData(data: StructuredData) {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(data),
        key: `schema-${data["@type"]}`,
      },
    ],
  });
}
