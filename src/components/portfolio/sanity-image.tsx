import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { Image as SanityImage } from "sanity";

type Props = {
  image: SanityImage;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function SanityImage({ image, alt, width, height, className, priority }: Props) {
  const imageBuilder = urlFor(image);
  if (!imageBuilder) return null;

  const imageUrl = imageBuilder.width(width).height(height).fit("crop").url();
  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
