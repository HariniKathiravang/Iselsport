import Link from "next/link";
import { ProjectCard } from "@/components/portfolio/project-card";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Section } from "@/components/portfolio/section";
import { sanityFetch } from "@/lib/sanity/client";
import { projectsQuery, siteMetaQuery } from "@/lib/sanity/queries";
import type { AboutSection, ContactInfo, Project, SiteSettings } from "@/lib/sanity/types";

export const revalidate = 60;

type SiteMeta = {
  about: Pick<AboutSection, "firstName" | "lastName"> | null;
  contact: Pick<ContactInfo, "email"> | null;
  settings: Pick<SiteSettings, "siteName" | "footerCopyright" | "footerTagline"> | null;
};

export default async function ProjectsPage() {
  const [projects, meta] = await Promise.all([
    sanityFetch<Project[]>({ query: projectsQuery, tags: ["portfolio"] }),
    sanityFetch<SiteMeta>({ query: siteMetaQuery, tags: ["portfolio"] }),
  ]);

  const firstName = meta.about?.firstName ?? "";
  const lastName = meta.about?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        siteName={meta.settings?.siteName}
        fullName={fullName}
        contactEmail={meta.contact?.email}
      />

      <section className="relative gradient-hero overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-rose-bright/30 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            02 - Selected work
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            Things I&apos;ve built.
          </h1>
        </div>
      </section>

      <Section id="projects" eyebrow="02 - Selected work" title="All projects.">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} showLinks />
          ))}
        </div>
      </Section>

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
