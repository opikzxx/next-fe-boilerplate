import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/helpers";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/creator", "/admin", "/api"],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
