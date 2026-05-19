import type { Metadata } from "next";
import { SEO, SITE_NAME, COLLEGE_SHORT } from "./constants";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent metadata for every page.
 * Usage in page.tsx:
 *   export const metadata = generatePageMetadata({
 *     title: "Faculty",
 *     description: "Meet our experienced faculty members...",
 *     path: "/faculty",
 *   });
 */
export function generatePageMetadata({
  title,
  description,
  path = "",
  ogImage,
  noIndex = false,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME} | ${COLLEGE_SHORT}`;
  const url = `${SEO.siteUrl}${path}`;
  const image = ogImage || SEO.ogImage;

  return {
    title: fullTitle,
    description,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: `${SITE_NAME} - ${COLLEGE_SHORT}`,
      locale: SEO.locale,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
