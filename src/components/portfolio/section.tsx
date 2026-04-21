type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            {eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
