import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { Image as SanityImage } from "sanity";

type Props = {
  image: SanityImage;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
};

export function SanityImage({
  image,
  alt,
  width = 1200,
  height = 800,
  className,
  priority,
  fill,
  sizes,
}: Props) {
  const imageBuilder = urlFor(image);
  if (!imageBuilder) return null;

  const imageUrl = imageBuilder.width(width).height(height).fit("crop").url();
  if (!imageUrl) return null;

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        priority={priority}
      />
    );
  }

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

