import { defineField, defineType } from "sanity";

export const contactInfoType = defineType({
  name: "contactInfo",
  title: "Contact Info",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Section Label", type: "string", initialValue: "05 - Let's connect" }),
    defineField({ name: "title", title: "Contact Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subtitle", title: "Contact Subtitle", type: "text" }),
    defineField({ name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
  ],
});
