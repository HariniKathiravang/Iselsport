const requiredServerEnv = ["SANITY_PROJECT_ID"] as const;

for (const key of requiredServerEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const sanityEnv = {
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET ?? "production",
  apiVersion: process.env.SANITY_API_VERSION ?? "2026-04-01",
  studioBasePath: "/studio",
  useCdn: true,
};

if (sanityEnv.dataset !== "production") {
  throw new Error('SANITY_DATASET must be "production" for this portfolio setup.');
}
