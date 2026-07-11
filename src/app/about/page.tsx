import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BackLink } from "@/components/portfolio/back-link";
import { PageBanner } from "@/components/portfolio/page-banner";
import { SanityImage } from "@/components/portfolio/sanity-image";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { sanityFetch } from "@/lib/sanity/client";
import { aboutQuery, siteMetaQuery } from "@/lib/sanity/queries";
import type { AboutSection, ContactInfo, SiteSettings } from "@/lib/sanity/types";

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

  return (
    <div className="min-h-screen">
      <SiteHeader
        siteName={meta.settings?.siteName}
        fullName={fullName}
      />

      <PageBanner title={about?.title ?? "About"} image={about?.bannerImage} />

      <section id="about-content" className="py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
                {about?.bio}
              </p>
            </div>
            <div className="space-y-5">
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
              <Card className="p-6 border-ink rounded-2xl bg-rose-soft/30">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold">Education</h3>
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

      <BackLink />

      <SiteFooter
        footerCopyright={meta.settings?.footerCopyright}
        footerTagline={meta.settings?.footerTagline}
      />
    </div>
  );
}
