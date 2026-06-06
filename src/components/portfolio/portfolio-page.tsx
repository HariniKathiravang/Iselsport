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
import {
  ArrowUpRight,
  Award,
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

      <section id="top" className="relative gradient-hero overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-rose-bright/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="max-w-3xl animate-fade-up">
              <Badge variant="outline" className="mb-6 bg-background/80 border-ink rounded-full px-4 py-1.5 text-xs font-semibold">
                {data.about?.availabilityBadge}
              </Badge>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-foreground mb-6">
                {firstName}
                <br />
                <span className="italic text-primary">{lastName}</span>
              </h1>
              <p className="text-lg md:text-2xl text-foreground/75 max-w-2xl mb-10 leading-relaxed">
                {data.about?.roleSummary}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full shadow-soft">
                  <Link href="/projects">
                    {data.settings?.heroButtonPrimaryLabel ?? "View my work"}{" "}
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
            {data.about?.profilePhoto && (
              <div className="animate-fade-up mx-auto md:mx-0">
                <div className="relative w-56 lg:w-72 aspect-square rounded-3xl overflow-hidden border-2 border-ink shadow-card">
                  <SanityImage
                    image={data.about.profilePhoto}
                    alt={fullName || "Profile photo"}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Section id="about" eyebrow={data.about?.eyebrow} title={data.about?.title}>
        <Link href="/about" className="block group">
          <Card className="p-8 border-ink rounded-2xl bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-semibold">About me</h3>
              </div>
              <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:rotate-12 transition-all" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <p className="text-lg leading-relaxed text-foreground/80 line-clamp-4">
                  {data.about?.bio}
                </p>
              </div>
              <div className="p-6 border border-border rounded-2xl bg-rose-soft/40">
                <p className="font-semibold text-sm">{data.about?.education?.degree}</p>
                <p className="text-sm text-muted-foreground">{data.about?.education?.institution}</p>
              </div>
            </div>
          </Card>
        </Link>
      </Section>

      <Section id="projects" eyebrow="02 - Selected work" title="Things I've built.">
        <div className="grid md:grid-cols-2 gap-6">
          {previewProjects.map((project, index) => (
            <Link key={project._id} href="/projects" className="block">
              <ProjectCard project={project} index={index} />
            </Link>
          ))}
        </div>
        {data.projects.length > 2 && (
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full border-ink">
              <Link href="/projects">
                View all projects <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </Section>

      <Section id="skills" eyebrow={data.skills?.eyebrow} title={data.skills?.title}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.skills?.categories?.map((category, index) => {
            const Icon = skillIconOrder[index] ?? Code2;
            return (
              <Card key={category.name} className="p-6 border-ink rounded-2xl bg-card hover:bg-rose-soft/40 transition-colors">
                <Icon className="h-6 w-6 text-primary mb-4" />
                <h3 className="font-display text-lg font-semibold mb-4">{category.name}</h3>
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

      <Section id="certifications" eyebrow="04 - Beyond code" title="Certifications.">
        <Link href="/certifications" className="block group">
          <Card className="p-8 border-ink rounded-2xl bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-semibold">Certifications</h3>
              </div>
              <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:rotate-12 transition-all" />
            </div>
            {previewCertifications.length > 0 ? (
              <div className="flex flex-wrap gap-4">
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
              <p className="text-foreground/70">View credentials and badges.</p>
            )}
          </Card>
        </Link>
      </Section>

      <Section id="more" eyebrow="05 - Beyond code" title="Leadership & languages.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 border-ink rounded-2xl bg-card">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Leadership</h3>
            </div>
            <div className="space-y-5">
              {data.settings?.leadership?.map((item) => (
                <div key={item.role} className="pb-5 border-b border-border last:border-0 last:pb-0">
                  <div className="flex flex-wrap justify-between gap-2 mb-1">
                    <h4 className="font-semibold">{item.role}</h4>
                    <span className="text-xs text-muted-foreground font-mono">{item.period}</span>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-8 border-ink rounded-2xl bg-rose-soft/40">
            <div className="flex items-center gap-3 mb-6">
              <Languages className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Languages</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.settings?.spokenLanguages?.map((language) => (
                <div key={language.name} className="bg-background border border-border rounded-xl p-4">
                  <p className="font-display text-lg font-semibold">{language.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{language.level}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <section id="contact" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="border-ink rounded-3xl gradient-hero p-10 md:p-16 text-center shadow-card">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
              {data.contact?.eyebrow}
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6 leading-tight">
              {data.contact?.title}
            </h2>
            <p className="text-lg text-foreground/75 max-w-xl mx-auto mb-10">
              {data.contact?.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 mb-8 text-left">
              <Input name="name" placeholder="Your name" required />
              <Input name="email" type="email" placeholder="Your email" required />
              <Textarea name="message" placeholder="Your message" className="min-h-28" required />
              <Button type="submit" className="w-full rounded-full">
                Send message
              </Button>
              {status && <p className="text-sm text-center text-foreground/70">{status}</p>}
            </form>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
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
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
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
