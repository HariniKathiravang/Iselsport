export function formatSectionTitle(title?: string): string | undefined {
  if (!title) return undefined;
  return title.replace(/[.\s]+$/g, "").trim() || undefined;
}
