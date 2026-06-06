type Props = {
  footerCopyright?: string;
  footerTagline?: string;
};

export function SiteFooter({ footerCopyright, footerTagline }: Props) {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>{footerCopyright}</p>
        <p className="font-mono text-xs">{footerTagline}</p>
      </div>
    </footer>
  );
}
