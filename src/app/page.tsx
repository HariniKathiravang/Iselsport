import { PortfolioPage } from "@/components/portfolio/portfolio-page";
import { sanityFetch } from "@/lib/sanity/client";
import { portfolioQuery } from "@/lib/sanity/queries";
import type { PortfolioData } from "@/lib/sanity/types";

export const revalidate = 60;

export default async function HomePage() {
  const data = await sanityFetch<PortfolioData>({
    query: portfolioQuery,
    tags: ["portfolio"],
  });

  return <PortfolioPage data={data} />;
}
