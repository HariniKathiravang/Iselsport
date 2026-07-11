import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", title: "Order", type: "number" }),
    defineField({
      name: "stack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({ name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "image", title: "Project Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "screenshots",
      title: "Screenshots",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional screenshots shown in a hover slideshow on project cards.",
    }),
    defineField({ name: "projectUrl", title: "Live Project URL", type: "url" }),
    defineField({ name: "repoUrl", title: "Repository URL", type: "url" }),
  ],
});
