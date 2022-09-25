import { groq } from "next-sanity";

export const queryExperience = groq`
    *[_type == "experience"] {
      ...,
      technologies[]-> 
    }
`;

export const queryPageInfo = groq`
    *[_type == "pageInfo"][0]
`;

export const queryProjects = groq`
    *[_type == "project"] {
      ...,
      technologies[]-> 
    }
`;

export const querySkills = groq`
    *[_type == "skill"] | order(displayOrder asc)
`;

export const querySocials = groq`
    *[_type == "social"]
`;

export const queryCertifications = groq`
    *[_type == "certification"] | order(displayOrder asc)
`;