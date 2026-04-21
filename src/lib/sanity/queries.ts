import { groq } from "next-sanity";

export const portfolioQuery = groq`
{
  "about": *[_type == "aboutSection"][0],
  "projects": *[_type == "project"] | order(order asc, _createdAt desc),
  "skills": *[_type == "skills"][0],
  "contact": *[_type == "contactInfo"][0],
  "settings": *[_type == "siteSettings"][0]
}
`;
