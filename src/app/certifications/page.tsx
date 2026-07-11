import { ArrowUpRight, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BackLink } from "@/components/portfolio/back-link";
import { PageBanner } from "@/components/portfolio/page-banner";
import { SanityImage } from "@/components/portfolio/sanity-image";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Section } from "@/components/portfolio/section";
import { sanityFetch } from "@/lib/sanity/client";
import { certificationsQuery, siteMetaQuery } from "@/lib/sanity/queries";
import type { AboutSection, Certification, ContactInfo, SiteSettings } from "@/lib/sanity/types";

export const revalidate = 60;

type SiteMeta = {
  about: Pick<AboutSection, "firstName" | "lastName"> | null;
  contact: Pick<ContactInfo, "email"> | null;
  settings: Pick<SiteSettings, "siteName" | "footerCopyright" | "footerTagline"> | null;
};

export default async function CertificationsPage() {
  const [certifications, meta] = await Promise.all([
    sanityFetch<Certification[]>({ query: certificationsQuery, tags: ["portfolio"] }),
    sanityFetch<SiteMeta>({ query: siteMetaQuery, tags: ["portfolio"] }),
  ]);

  const firstName = meta.about?.firstName ?? "";
  const lastName = meta.about?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="min-h-screen">
      <SiteHeader
        siteName={meta.settings?.siteName}
        fullName={fullName}
      />

      <PageBanner title="Certifications" />

      <Section id="certifications" bordered={false}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((certification) => {
            const content = (
              <Card className="group p-6 border-ink rounded-2xl bg-card hover:shadow-card transition-all duration-300 h-full flex flex-col items-center text-center">
                <div className="mb-4 overflow-hidden rounded-xl border border-border bg-background p-3 w-24 h-24 flex items-center justify-center">
                  <SanityImage
                    image={certification.badge}
                    alt={certification.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">{certification.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{certification.issuer}</p>
                {certification.link && (
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold uppercase tracking-wider">
                    View credential
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
                  </span>
                )}
              </Card>
            );

            if (certification.link) {
              return (
                <a
                  key={certification._id}
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return <div key={certification._id}>{content}</div>;
          })}
        </div>

        {certifications.length === 0 && (
          <Card className="p-8 border-ink rounded-2xl bg-card text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-4" />
            <p className="text-foreground/70">No certifications added yet. Add them in Sanity Studio.</p>
          </Card>
        )}
      </Section>

      <BackLink />

      <SiteFooter
        footerCopyright={meta.settings?.footerCopyright}
        footerTagline={meta.settings?.footerTagline}
      />
    </div>
  );
}
