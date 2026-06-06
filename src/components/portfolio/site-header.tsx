"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

type Props = {
  siteName?: string;
  fullName?: string;
  contactEmail?: string;
};

export function SiteHeader({ siteName, fullName, contactEmail }: Props) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          {siteName ?? fullName ?? "Portfolio"}
          <span className="text-primary">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
        <Button asChild size="sm" className="rounded-full">
          <a href={`mailto:${contactEmail ?? ""}`}>Get in touch</a>
        </Button>
      </nav>
    </header>
  );
}
