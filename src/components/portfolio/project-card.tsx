import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SanityImage } from "@/components/portfolio/sanity-image";
import type { Project } from "@/lib/sanity/types";

type Props = {
  project: Project;
  index?: number;
  showLinks?: boolean;
};

export function ProjectCard({ project, index, showLinks = false }: Props) {
  return (
    <Card className="group p-8 border-ink rounded-2xl bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      {project.image && (
        <div className="mb-4 overflow-hidden rounded-xl border border-border">
          <SanityImage
            image={project.image}
            alt={project.title}
            width={900}
            height={600}
            className="h-48 w-full object-cover"
          />
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
