import Image from "next/image";
import type { Image as SanityImageType } from "sanity";
import { formatSectionTitle } from "@/lib/format-section-title";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  image?: SanityImageType;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  children?: React.ReactNode;
};

export function PageBanner({
  title,
  image,
  imageWidth = 1920,
  imageHeight = 480,
  className,
  children,
}: Props) {
  const imageBuilder = image ? urlFor(image) : null;
  const imageUrl = imageBuilder?.width(imageWidth).height(imageHeight).fit("crop").url();
  const formattedTitle = formatSectionTitle(title);

  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-border",
        imageUrl ? "min-h-[10rem] md:min-h-[13rem] lg:min-h-[16rem]" : "bg-background",
        className,
      )}
    >
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center z-0"
            priority
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/10 via-background/72 to-background/55" />
          <div className="absolute inset-0 z-[1] bg-primary/8" />
        </>
      )}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-14">
        {formattedTitle && (
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {formattedTitle}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
}
