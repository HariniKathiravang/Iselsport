import { formatSectionTitle } from "@/lib/format-section-title";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
};

export function Section({ id, title, children, className, bordered = true }: SectionProps) {
  const formattedTitle = formatSectionTitle(title);

  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16 px-6",
        bordered && "border-t border-border",
        className,
      )}
    >
      <div className="max-w-6xl mx-auto">
        {formattedTitle && (
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8 md:mb-10">
            {formattedTitle}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
