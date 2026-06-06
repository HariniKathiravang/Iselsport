"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectCard } from "@/components/portfolio/project-card";
import { SanityImage } from "@/components/portfolio/sanity-image";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import type { PortfolioData } from "@/lib/sanity/types";
import { Section } from "@/components/portfolio/section";
import { formatSectionTitle } from "@/lib/format-section-title";
import {
  ArrowUpRight,
  Brain,
  Code2,
  Database,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Users,
  Wrench,
} from "lucide-react";

type Props = {
  data: PortfolioData;
};

export function PortfolioPage({ data }: Props) {
  const [status, setStatus] = useState<string>("");
  const skillIconOrder = [Code2, Database, Brain, Wrench];

  const firstName = data.about?.firstName ?? "";
  const lastName = data.about?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim();
  const hasHeroImage = Boolean(data.about?.profilePhoto);

  const previewProjects = (data.projects ?? []).slice(0, 2);
  const previewCertifications = (data.certifications ?? []).slice(0, 3);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("EmailJS is not configured yet.");
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.get("name"),
          from_email: formData.get("email"),
          message: formData.get("message"),
        },
        { publicKey },
      );
      form.reset();
      setStatus("Message sent successfully.");
    } catch {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        siteName={data.settings?.siteName}
        fullName={fullName}
        contactEmail={data.contact?.email}
      />

      <section
        id="top"
        className={`relative overflow-hidden border-b border-border ${hasHeroImage ? "min-h-[18rem] md:min-h-[22rem]" : ""}`}
      >
        {hasHeroImage && data.about?.profilePhoto ? (
          <div className="absolute inset-0">
            <SanityImage
              image={data.about.profilePhoto}
              alt=""
              width={1920}
              height={640}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/92 via-background/72 to-background/50" />
            <div className="absolute inset-0 z-[1] bg-primary/8" />
          </div>
        ) : (
          <div className="absolute inset-0 gradient-hero" />
        )}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl animate-fade-up">
  <div className="inline-flex flex-col gap-6 bg-white/85 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl">
  </div>
        <div className="inline-flex flex-col gap-5 bg-background/85 backdrop-blur-md border border-border rounded-3xl p-8 shadow-xl">
            <Badge variant="outline" className="mb-5 bg-background/80 border-ink rounded-full px-4 py-1.5 text-xs font-semibold">
              {data.about?.availabilityBadge}
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight mb-5">
  <span className="inline-block bg-white/90 text-black px-4 py-2 rounded-xl">
    {firstName}
    <br />
    <span className="italic text-primary">{lastName}</span>
  </span>
</h1>
<p className="inline-block bg-white/85 text-black px-4 py-3 rounded-xl text-lg md:text-2xl max-w-2xl mb-8 leading-relaxed">
  {data.about?.roleSummary}
</p>
</div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full shadow-soft">
                <Link href="/projects">
                  {data.settings?.heroButtonPrimaryLabel ?? "View my work"}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-ink bg-background/70">
                <a href="#contact">
                  {data.settings?.heroButtonSecondaryLabel ?? "Contact me"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section id="about" title={data.about?.title ?? "About"}>
        <Link href="/about" className="block group">
          <Card className="p-6 md:p-8 border-ink rounded-2xl bg-card hover:shadow-card transition-all duration-300">
            <div className="flex items-start justify-end mb-4">
              <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:rotate-12 transition-all" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-lg leading-relaxed text-foreground/80 line-clamp-4">
                  {data.about?.bio}
                </p>
              </div>
              <div className="p-5 border border-border rounded-2xl bg-rose-soft/30">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-sm">Education</p>
                </div>
                <p className="font-semibold text-sm">{data.about?.education?.degree}</p>
                <p className="text-sm text-muted-foreground">{data.about?.education?.institution}</p>
              </div>
            </div>
          </Card>
        </Link>
      </Section>

      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-5">
          {previewProjects.map((project, index) => (
            <Link key={project._id} href="/projects" className="block">
              <ProjectCard project={project} index={index} />
            </Link>
          ))}
        </div>
        {data.projects.length > 2 && (
          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="rounded-full border-ink">
              <Link href="/projects">
                View all projects
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </Section>

      <Section id="skills" title={data.skills?.title ?? "Skills"}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.skills?.categories?.map((category, index) => {
            const Icon = skillIconOrder[index] ?? Code2;
            return (
              <Card key={category.name} className="p-5 border-ink rounded-2xl bg-card hover:bg-rose-soft/30 transition-colors">
                <Icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-display text-lg font-semibold mb-3">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section id="certifications" title="Certifications">
        <Link href="/certifications" className="block group">
          <Card className="p-6 md:p-8 border-ink rounded-2xl bg-card hover:shadow-card transition-all duration-300">
            <div className="flex items-start justify-end mb-4">
              <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:rotate-12 transition-all" />
            </div>
            {previewCertifications.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {previewCertifications.map((certification) => (
                  <div
                    key={certification._id}
                    className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3"
                  >
                    <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-background p-1">
                      <SanityImage
                        image={certification.badge}
                        alt={certification.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{certification.title}</p>
                      <p className="text-xs text-muted-foreground">{certification.issuer}</p>
                    </div>
                  </div>
                ))}
                {data.certifications.length > 3 && (
                  <p className="text-sm text-muted-foreground self-center">
                    +{data.certifications.length - 3} more
                  </p>
                )}
              </div>
            ) : (
              <p className="text-foreground/70">View credentials and badges</p>
            )}
          </Card>
        </Link>
      </Section>

      <Section id="more" title="Leadership and languages">
        <div className="grid md:grid-cols-2 gap-5">
          <Card className="p-6 md:p-8 border-ink rounded-2xl bg-card">
            <div className="flex items-center gap-2 mb-5">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-semibold">Leadership</h3>
            </div>
            <div className="space-y-4">
              {data.settings?.leadership?.map((item) => (
                <div key={item.role} className="pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex flex-wrap justify-between gap-2 mb-1">
                    <h4 className="font-semibold">{item.role}</h4>
                    <span className="text-xs text-muted-foreground font-mono">{item.period}</span>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 md:p-8 border-ink rounded-2xl bg-rose-soft/30">
            <div className="flex items-center gap-2 mb-5">
              <Languages className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-semibold">Languages</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {data.settings?.spokenLanguages?.map((language) => (
                <div key={language.name} className="bg-background border border-border rounded-xl p-4">
                  <p className="font-display text-base font-semibold">{language.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{language.level}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <section id="contact" className="py-12 md:py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Card className="border-ink rounded-3xl bg-card p-8 md:p-12 text-center shadow-soft">
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 leading-tight">
              {formatSectionTitle(data.contact?.title) ?? "Contact"}
            </h2>
            {data.contact?.subtitle && (
              <p className="text-base md:text-lg text-foreground/75 max-w-xl mx-auto mb-8">
                {data.contact.subtitle}
              </p>
            )}

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 mb-8 text-left">
              <Input name="name" placeholder="Your name" required />
              <Input name="email" type="email" placeholder="Your email" required />
              <Textarea name="message" placeholder="Your message" className="min-h-28" required />
              <Button type="submit" className="w-full rounded-full">
                Send message
              </Button>
              {status && <p className="text-sm text-center text-foreground/70">{status}</p>}
            </form>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button asChild size="lg" className="rounded-full">
                <a href={`mailto:${data.contact?.email ?? ""}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email me
                </a>
              </Button>
              {data.contact?.githubUrl && (
                <Button asChild size="lg" variant="outline" className="rounded-full border-ink bg-background/70">
                  <a href={data.contact.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {data.contact?.linkedinUrl && (
                <Button asChild size="lg" variant="outline" className="rounded-full border-ink bg-background/70">
                  <a href={data.contact.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm border-t border-border pt-8">
              <div className="flex items-center justify-center gap-2 text-foreground/70">
                <MapPin className="h-4 w-4 text-primary" /> {data.contact?.location}
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground/70">
                <Phone className="h-4 w-4 text-primary" /> {data.contact?.phone}
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground/70">
                <Mail className="h-4 w-4 text-primary" /> {data.contact?.email}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <SiteFooter
        footerCopyright={data.settings?.footerCopyright}
        footerTagline={data.settings?.footerTagline}
      />
    </div>
  );
}
