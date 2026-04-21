import type { Image } from "sanity";

export type Project = {
  _id: string;
  title: string;
  stack: string[];
  description: string;
  image?: Image;
  projectUrl?: string;
  repoUrl?: string;
  order?: number;
};

export type AboutSection = {
  eyebrow?: string;
  title?: string;
  availabilityBadge?: string;
  firstName?: string;
  lastName?: string;
  roleSummary?: string;
  bio?: string;
  education?: {
    degree?: string;
    institution?: string;
    cgpa?: string;
    twelfthGrade?: string;
    tenthGrade?: string;
  };
};

export type SkillsSection = {
  eyebrow?: string;
  title?: string;
  categories?: {
    name: string;
    items: string[];
  }[];
};

export type ContactInfo = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

export type SiteSettings = {
  siteName?: string;
  heroButtonPrimaryLabel?: string;
  heroButtonSecondaryLabel?: string;
  footerCopyright?: string;
  footerTagline?: string;
  certifications?: string[];
  leadership?: {
    role: string;
    period?: string;
    description?: string;
  }[];
  spokenLanguages?: {
    name: string;
    level?: string;
  }[];
};

export type PortfolioData = {
  about: AboutSection | null;
  projects: Project[];
  skills: SkillsSection | null;
  contact: ContactInfo | null;
  settings: SiteSettings | null;
};
