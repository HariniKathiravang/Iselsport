import { defineField, defineType } from "sanity";

export const aboutSectionType = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Section Label", type: "string", initialValue: "01 - About" }),
    defineField({ name: "title", title: "Section Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "availabilityBadge", title: "Availability Badge", type: "string" }),
    defineField({ name: "firstName", title: "First Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "lastName", title: "Last Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "roleSummary", title: "Hero Summary", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio", title: "About Bio", type: "text", validation: (Rule) => Rule.required() }),
    defineField({
      name: "profilePhoto",
      title: "Profile Photo (Hero)",
      type: "image",
      options: { hotspot: true },
      description: "Displayed in the homepage hero area.",
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image (About Page)",
      type: "image",
      options: { hotspot: true },
      description: "Wide horizontal image for the About page header.",
    }),
    defineField({
      name: "professionalPhoto",
      title: "Professional Photo (About Page)",
      type: "image",
      options: { hotspot: true },
      description: "Square professional photo displayed beside About content.",
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "object",
      fields: [
        defineField({ name: "degree", title: "Degree", type: "string" }),
        defineField({ name: "institution", title: "Institution", type: "string" }),
        defineField({ name: "cgpa", title: "CGPA", type: "string" }),
        defineField({ name: "twelfthGrade", title: "12th Grade", type: "string" }),
        defineField({ name: "tenthGrade", title: "10th Grade", type: "string" }),
      ],
    }),
  ],
});
