import { groq } from "next-sanity";

export const portfolioQuery = groq`
{
  "about": *[_type == "aboutSection"][0],
  "projects": *[_type == "project"] | order(order asc, _createdAt desc),
  "certifications": *[_type == "certification"] | order(order asc, _createdAt desc),
  "skills": *[_type == "skills"][0],
  "contact": *[_type == "contactInfo"][0],
  "settings": *[_type == "siteSettings"][0]
}
`;

export const aboutQuery = groq`*[_type == "aboutSection"][0]`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc)`;

export const certificationsQuery = groq`*[_type == "certification"] | order(order asc, _createdAt desc)`;

export const siteMetaQuery = groq`
{
  "about": *[_type == "aboutSection"][0]{ firstName, lastName },
  "contact": *[_type == "contactInfo"][0]{ email },
  "settings": *[_type == "siteSettings"][0]{ siteName, footerCopyright, footerTagline }
}
`;
