export const slugQuery = `*[_type == "post"]{
  slug{
    current
  },
}`;

export const postQuery = `*[_type == "post"]{
  _id,
  title,
  slug,
  author->{
    name,
    image
  },
  mainImage,
  description
}`;

export const getPostDetailsQuery = (slug: any) => {
  return `*[_type == "post" && slug.current == '${slug}'][0]{
  _id,
  _createdAt,
  title,
  slug,
  author->{
    name,
    image
  },
  mainImage,
  description,
  'comments': *[_type == "comment" &&
    post._ref == ^._id &&
    approved == true],
  body,
  }`;
};
