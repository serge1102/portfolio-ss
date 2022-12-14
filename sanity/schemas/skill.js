export default {
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of skill",
      type: "string",
    },
    {
      name: "progress",
      title: "Progress",
      type: "number",
      description: "Progress of skill from 0 to 100%",
      validation: (Rule) => Rule.min(0).max(100),
    },
    {
      name: "displayOrder",
      title: "DisplayOrder",
      type: "number",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "square",
      title: "Square",
      type: "boolean"
    }
  ],
  orderings: [
    {
      name: "Skill Order Desc",
      title: "skill Order",
      by: [{ field: "displayOrder", direction: "desc" }],
    },
    {
      name: "Skill Order Asc",
      title: "skill Order",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
};
