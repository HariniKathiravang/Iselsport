import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityEnv } from "@/lib/sanity/env";

const builder = createImageUrlBuilder({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
});

export function urlFor(source: Image) {
  return builder.image(source);
}
