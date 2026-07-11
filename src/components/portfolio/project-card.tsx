"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/sanity/types";
import type { Image as SanityImageType } from "sanity";

type Props = {
  project: Project;
  index?: number;
  showLinks?: boolean;
};

function getImageUrls(images: SanityImageType[]) {
  return images
    .map((image) => urlFor(image)?.width(900).height(600).fit("crop").url())
    .filter((url): url is string => Boolean(url));
}

export function ProjectCard({ project, index, showLinks = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const images = useMemo(() => {
    const gallery = project.screenshots?.length
      ? project.screenshots
      : project.image
        ? [project.image]
        : [];
    return getImageUrls(gallery);
  }, [project.image, project.screenshots]);

  useEffect(() => {
    if (!hovered || images.length <= 1) return;

    const interval = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % images.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [hovered, images.length]);

  useEffect(() => {
    if (!hovered) setSlideIndex(0);
  }, [hovered]);

  return (
    <Card
      className="group p-6 md:p-8 border-ink rounded-2xl bg-card hover:shadow-card transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.length > 0 && (
        <div className="mb-4 overflow-hidden rounded-xl border border-border relative h-48">
          {images.map((src, imageIndex) => (
            <Image
              key={src}
              src={src}
              alt={`${project.title} screenshot ${imageIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 ${
                imageIndex === slideIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        {index !== undefined && (
          <span className="text-xs font-mono text-primary">0{index + 1}</span>
        )}
        <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:text-primary group-hover:rotate-12 transition-all ml-auto" />
      </div>
      <h3 className="font-display text-2xl font-semibold mb-2">{project.title}</h3>
      <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-4">
        {project.stack?.join(" · ")}
      </p>
      <p className="text-foreground/75 leading-relaxed">{project.description}</p>
      {showLinks && (project.repoUrl || project.projectUrl) && (
        <div className="flex flex-wrap gap-3 mt-6">
          {project.repoUrl && (
            <Button asChild size="sm" variant="outline" className="rounded-full border-ink">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {project.projectUrl && (
            <Button asChild size="sm" variant="outline" className="rounded-full border-ink">
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
