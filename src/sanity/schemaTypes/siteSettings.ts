import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string" }),
    defineField({ name: "heroButtonPrimaryLabel", title: "Hero Primary Button Label", type: "string" }),
    defineField({ name: "heroButtonSecondaryLabel", title: "Hero Secondary Button Label", type: "string" }),
    defineField({ name: "footerCopyright", title: "Footer Copyright", type: "string" }),
    defineField({ name: "footerTagline", title: "Footer Tagline", type: "string" }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "leadership",
      title: "Leadership",
      type: "array",
      of: [
        defineField({
          name: "leadershipItem",
          title: "Leadership Item",
          type: "object",
          fields: [
            defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "period", title: "Period", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "spokenLanguages",
      title: "Spoken Languages",
      type: "array",
      of: [
        defineField({
          name: "spokenLanguage",
          title: "Language",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Language Name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "level", title: "Proficiency", type: "string" }),
          ],
        }),
      ],
    }),
  ],
});
