import Image from "next/image";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SanityImage } from "@/components/portfolio/sanity-image";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { sanityFetch } from "@/lib/sanity/client";
import { aboutQuery, siteMetaQuery } from "@/lib/sanity/queries";
import type { AboutSection, ContactInfo, SiteSettings } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

type SiteMeta = {
  about: Pick<AboutSection, "firstName" | "lastName"> | null;
  contact: Pick<ContactInfo, "email"> | null;
  settings: Pick<SiteSettings, "siteName" | "footerCopyright" | "footerTagline"> | null;
};

export default async function AboutPage() {
  const [about, meta] = await Promise.all([
    sanityFetch<AboutSection | null>({ query: aboutQuery, tags: ["portfolio"] }),
    sanityFetch<SiteMeta>({ query: siteMetaQuery, tags: ["portfolio"] }),
  ]);

  const firstName = about?.firstName ?? meta.about?.firstName ?? "";
  const lastName = about?.lastName ?? meta.about?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  const bannerBuilder = about?.bannerImage ? urlFor(about.bannerImage) : null;
  const bannerUrl = bannerBuilder?.width(1920).height(480).fit("crop").url();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        siteName={meta.settings?.siteName}
        fullName={fullName}
        contactEmail={meta.contact?.email}
      />

      <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
        {bannerUrl ? (
          <>
            <Image src={bannerUrl} alt="" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
            <div className="absolute inset-0 bg-primary/10" />
          </>
        ) : (
          <div className="absolute inset-0 gradient-hero" />
        )}
        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-8 md:pb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            {about?.eyebrow ?? "01 - About"}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            {about?.title ?? "About me."}
          </h1>
        </div>
      </div>

      <section id="about-content" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
              {about?.bio}
            </p>
          </div>
          <div className="space-y-6">
            {about?.professionalPhoto && (
              <div className="overflow-hidden rounded-2xl border border-ink shadow-soft">
                <SanityImage
                  image={about.professionalPhoto}
                  alt={fullName || "Professional photo"}
                  width={600}
                  height={600}
                  className="w-full aspect-square object-cover"
                />
              </div>
            )}
            <Card className="p-6 border-ink rounded-2xl shadow-soft bg-rose-soft/40">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-semibold">Education</h3>
              </div>
              <p className="font-semibold text-sm">{about?.education?.degree}</p>
              <p className="text-sm text-muted-foreground">{about?.education?.institution}</p>
              <div className="mt-4 pt-4 border-t border-border space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CGPA</span>
                  <span className="font-semibold">{about?.education?.cgpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">12th Grade</span>
                  <span className="font-semibold">{about?.education?.twelfthGrade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">10th Grade</span>
                  <span className="font-semibold">{about?.education?.tenthGrade}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <Link href="/" className="text-sm text-primary hover:underline">
          ← Back to home
        </Link>
      </div>

      <SiteFooter
        footerCopyright={meta.settings?.footerCopyright}
        footerTagline={meta.settings?.footerTagline}
      />
    </div>
  );
}
