"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Github,
  ImageIcon,
  Layout,
  Linkedin,
  Mail,
  PenLine,
  Type,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SanityImage } from "@/components/portfolio/sanity-image";
import type { AboutSection, ContactInfo, SiteSettings } from "@/lib/sanity/types";

type Props = {
  about: AboutSection | null;
  settings: SiteSettings | null;
  contact: ContactInfo | null;
  firstName: string;
  lastName: string;
};

function BentoTile({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`absolute rounded-2xl border border-ink bg-card shadow-soft flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}

export function HeroSection({ about, settings, contact, firstName, lastName }: Props) {
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <section id="top" className="border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="max-w-xl">
            {about?.availabilityBadge && (
              <Badge
                variant="outline"
                className="mb-5 bg-card border-ink rounded-full px-4 py-1.5 text-xs font-semibold inline-flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-primary" />
                {about.availabilityBadge}
              </Badge>
            )}

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] tracking-tight text-foreground mb-4">
              {firstName}
              <br />
              <span className="italic text-primary">{lastName}</span>
            </h1>

            <p className="text-base md:text-lg text-foreground/80 mb-3 leading-relaxed">
              {about?.roleSummary}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button asChild size="lg" className="rounded-full shadow-soft">
                <Link href="/projects">
                  {settings?.heroButtonPrimaryLabel ?? "View my work"}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-ink bg-card shadow-soft">
                <a href="#contact">
                  {settings?.heroButtonSecondaryLabel ?? "Contact me"}
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-3">
              {contact?.githubUrl && (
                <a
                  href={contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-ink bg-card shadow-soft flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {contact?.linkedinUrl && (
                <a
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-ink bg-card shadow-soft flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="h-10 w-10 rounded-full border border-ink bg-card shadow-soft flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md aspect-square md:max-w-none md:aspect-auto md:h-[28rem]">
            {about?.profilePhoto && (
              <BentoTile className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 md:w-56 md:h-56 z-10 overflow-hidden p-0">
                <SanityImage
                  image={about.profilePhoto}
                  alt={fullName || "Profile photo"}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
                <span className="absolute -top-2 -left-2 h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary z-20" />
              </BentoTile>
            )}

            <BentoTile className="left-[4%] top-[8%] w-24 h-24 md:w-28 md:h-28 flex-col gap-2 p-3">
              <span className="text-[10px] font-semibold tracking-widest text-foreground/60">UI DESIGN</span>
              <span className="h-0.5 w-8 bg-primary rounded-full" />
            </BentoTile>

            <BentoTile className="right-[6%] top-[6%] w-20 h-20 md:w-24 md:h-24">
              <PenLine className="h-6 w-6 text-primary" />
            </BentoTile>

            <BentoTile className="right-[2%] top-[38%] w-24 h-24 md:w-28 md:h-28">
              <Type className="h-7 w-7 text-foreground/50" />
            </BentoTile>

            <BentoTile className="left-[2%] top-[42%] w-16 h-16 md:w-20 md:h-20">
              <div className="flex -space-x-1">
                <span className="h-5 w-5 rounded-full bg-muted border border-border" />
                <span className="h-5 w-5 rounded-full bg-primary/30 border border-border" />
                <span className="h-5 w-5 rounded-full bg-primary border border-border" />
              </div>
            </BentoTile>

            <BentoTile className="left-[10%] bottom-[10%] w-28 h-20 md:w-32 md:h-24 p-3">
              <div className="w-full h-full rounded-lg border border-border bg-muted/40 p-2 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-primary/40" />
                <div className="h-1 w-3/4 rounded bg-border" />
                <div className="h-1 w-1/2 rounded bg-border" />
              </div>
            </BentoTile>

            <BentoTile className="left-1/2 -translate-x-1/2 bottom-[4%] w-20 h-20 md:w-24 md:h-24">
              <Code2 className="h-6 w-6 text-primary" />
            </BentoTile>

            <BentoTile className="right-[8%] bottom-[12%] w-24 h-24 md:w-28 md:h-28">
              <ImageIcon className="h-6 w-6 text-primary" />
            </BentoTile>

            <BentoTile className="right-[22%] top-[18%] w-14 h-14 md:w-16 md:h-16 hidden sm:flex">
              <Layout className="h-5 w-5 text-foreground/40" />
            </BentoTile>

            <span className="absolute right-[2%] bottom-[2%] h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/80 rotate-45 z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
