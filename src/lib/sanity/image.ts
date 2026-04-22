import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;
let didWarnMissingConfig = false;

export function urlFor(source: Image) {
  if (!builder) {
    if (!didWarnMissingConfig) {
      didWarnMissingConfig = true;
      console.warn(
        "Sanity image URL builder is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID (and optionally NEXT_PUBLIC_SANITY_DATASET).",
      );
    }
    return null;
  }

  return builder.image(source);
}
