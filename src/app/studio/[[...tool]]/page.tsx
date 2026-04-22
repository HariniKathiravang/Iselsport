"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  const projectId = (config as unknown as { projectId?: string }).projectId;
  if (!projectId) {
    return (
      <div style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Sanity Studio is not configured</h1>
        <p style={{ marginBottom: 12 }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (and optionally <code>NEXT_PUBLIC_SANITY_DATASET</code>) in Vercel and redeploy.
        </p>
        <p style={{ marginBottom: 0 }}>
          Also ensure your Sanity project CORS allows this origin (Sanity Manage → API → CORS origins).
        </p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}
