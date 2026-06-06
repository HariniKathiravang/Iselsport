import { BackLink } from "@/components/portfolio/back-link";
import { PageBanner } from "@/components/portfolio/page-banner";
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

      <PageBanner title="Projects" />

      <Section id="projects" bordered={false}>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} showLinks />
          ))}
        </div>
      </Section>

      <BackLink />

      <SiteFooter
        footerCopyright={meta.settings?.footerCopyright}
        footerTagline={meta.settings?.footerTagline}
      />
    </div>
  );
}
