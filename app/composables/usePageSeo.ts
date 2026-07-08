// Per-page SEO metadata utility. Wraps useSeoMeta with SVARA's defaults
// and adds structured data for the page type.
//
// Every page must call this to ensure consistent metadata.

export interface PageSeoConfig {
  title: string;
  description: string;
  ogImage?: string;
  pageType?: "website" | "article" | "product" | "faq";
}

export function usePageSeo(config: PageSeoConfig) {
  const title = `SVARA TechFusion — ${config.title}`;

  useSeoMeta({
    title,
    description: config.description,
    ogTitle: title,
    ogDescription: config.description,
    ogImage: config.ogImage ?? "/og-image.png",
    ogType: config.pageType ?? "website",
    twitterCard: "summary_large_image",
    twitterTitle: title,
    twitterDescription: config.description,
  });

  return { title, description: config.description };
}
