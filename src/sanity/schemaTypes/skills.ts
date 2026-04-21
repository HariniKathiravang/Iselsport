import { defineField, defineType } from "sanity";

export const skillsType = defineType({
  name: "skills",
  title: "Skills",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Section Label", type: "string", initialValue: "03 - Toolkit" }),
    defineField({ name: "title", title: "Section Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "categories",
      title: "Skill Categories",
      type: "array",
      of: [
        defineField({
          name: "category",
          title: "Category",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Category Name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "items",
              title: "Skills",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
