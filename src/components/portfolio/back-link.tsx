import Link from "next/link";

export function BackLink() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 border-t border-border">
      <Link href="/" className="text-sm text-primary hover:underline">
        Back to home
      </Link>
    </div>
  );
}
