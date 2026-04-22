"use client";

import { FormEvent, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { urlFor } from "@/lib/sanity/image";
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
import Image from "next/image";

type Props = {
  data: PortfolioData;
};

export function PortfolioPage({ data }: Props) {
  const [status, setStatus] = useState<string>("");
  const skillIconOrder = [Code2, Database, Brain, Wrench];

  const firstName = data.about?.firstName ?? "";
  const lastName = data.about?.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim();

  const navItems = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#contact", label: "Contact" },
    ],
    [],
  );

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
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display text-xl font-semibold tracking-tight">
            {data.settings?.siteName ?? fullName ?? "Portfolio"}
            <span className="text-primary">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </a>
            ))}
          </div>
          <Button asChild size="sm" className="rounded-full">
            <a href={`mailto:${data.contact?.email ?? ""}`}>Get in touch</a>
          </Button>
        </nav>
      </header>

      <section id="top" className="relative gradient-hero overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-rose-bright/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36">
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
                <a href="#projects">
                  {data.settings?.heroButtonPrimaryLabel ?? "View my work"}{" "}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
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

      <Section id="about" eyebrow={data.about?.eyebrow} title={data.about?.title}>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
              {data.about?.bio}
            </p>
          </div>
          <Card className="p-6 border-ink rounded-2xl shadow-soft bg-rose-soft/40">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Education</h3>
            </div>
            <p className="font-semibold text-sm">{data.about?.education?.degree}</p>
            <p className="text-sm text-muted-foreground">{data.about?.education?.institution}</p>
            <div className="mt-4 pt-4 border-t border-border space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">CGPA</span><span className="font-semibold">{data.about?.education?.cgpa}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">12th Grade</span><span className="font-semibold">{data.about?.education?.twelfthGrade}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">10th Grade</span><span className="font-semibold">{data.about?.education?.tenthGrade}</span></div>
            </div>
          </Card>
        </div>
      </Section>

      <Section id="projects" eyebrow="02 - Selected work" title="Things I've built.">
        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((project, index) => (
            <Card key={project._id} className="group p-8 border-ink rounded-2xl bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              {(() => {
                if (!project.image) return null;
                const imageBuilder = urlFor(project.image);
                if (!imageBuilder) return null;
                const imageUrl = imageBuilder.width(900).height(600).fit("crop").url();
                if (!imageUrl) return null;

                return (
                <div className="mb-4 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    width={900}
                    height={600}
                    className="h-48 w-full object-cover"
                  />
                </div>
                );
              })()}
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-mono text-primary">0{index + 1}</span>
                <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:rotate-12 transition-all" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-4">
                {project.stack?.join(" · ")}
              </p>
              <p className="text-foreground/75 leading-relaxed">{project.description}</p>
            </Card>
          ))}
        </div>
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

      <Section id="more" eyebrow="04 - Beyond code" title="Certifications & leadership.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 border-ink rounded-2xl bg-card">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {data.settings?.certifications?.map((certification) => (
                <li key={certification} className="flex gap-3 text-foreground/80">
                  <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{certification}</span>
                </li>
              ))}
            </ul>
          </Card>
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
        </div>

        <Card className="mt-6 p-8 border-ink rounded-2xl bg-rose-soft/40">
          <div className="flex items-center gap-3 mb-6">
            <Languages className="h-5 w-5 text-primary" />
            <h3 className="font-display text-xl font-semibold">Languages</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.settings?.spokenLanguages?.map((language) => (
              <div key={language.name} className="bg-background border border-border rounded-xl p-4">
                <p className="font-display text-lg font-semibold">{language.name}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{language.level}</p>
              </div>
            ))}
          </div>
        </Card>
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

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>{data.settings?.footerCopyright}</p>
          <p className="font-mono text-xs">{data.settings?.footerTagline}</p>
        </div>
      </footer>
    </div>
  );
}
