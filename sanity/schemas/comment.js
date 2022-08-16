export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Comments won't show unless its approved",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "comment",
      title: "Comment",
      type: "string",
    },
    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
    },
  ],
};
