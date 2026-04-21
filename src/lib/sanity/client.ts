import "server-only";

import { createClient } from "next-sanity";
import { sanityEnv } from "@/lib/sanity/env";

export const sanityReadClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: sanityEnv.useCdn,
  perspective: "published",
  stega: false,
});

export const sanityWriteClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  perspective: "published",
  stega: false,
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<QueryResponse> {
  return sanityReadClient.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: 60,
      tags,
    },
  });
}
