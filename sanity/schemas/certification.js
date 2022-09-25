export default {
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of certification",
      type: "string",
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
      type: "boolean",
    },
  ],
  orderings: [
    {
      name: "certification Order Desc",
      title: "Certification Order",
      by: [{ field: "displayOrder", direction: "desc" }],
    },
    {
      name: "certification Order Asc",
      title: "Certification Order",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
};
