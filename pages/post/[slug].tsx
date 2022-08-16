import { GetStaticProps } from "next";
import React from "react";
import Head from "next/head";
import { Postsprops } from "../../types";
import { client, urlFor } from "../../utils/sanity";
import { slugQuery, getPostDetailsQuery } from "../../utils/queries";
import PortableText from "react-portable-text";
import Header from "../../components/Header";
import CommentSection from "../../components/CommentSection";

interface Props {
  post: Postsprops;
}

const Post = ({ post }: Props) => {
  return (
    <div>
      <Head>
        <title>Medium Blog - {post.title}</title>

        <link rel="icon" href="/medium.webp" />
      </Head>

      <Header />

      <img
        className="w-full h-40 md:h-60 object-cover"
        loading="lazy"
        src={urlFor(post.mainImage).url()}
        alt=""
      />

      <main className="max-w-3xl mx-auto p-5 pb-10">
        <article className="mt-10">
          <h1 className="text-3xl mb-3">{post.title}</h1>

          <h2 className="tet-xl font-light text-gray-500 mb-2">
            {post.description}
          </h2>

          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full"
              loading="lazy"
              src={urlFor(post.author.image).url()}
              alt=""
            />

            <p className="text-gray-500 font-extralight text-sm">
              Blog post by{" "}
              <span className="text-green-600">{post.author.name}</span> -
              Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-10">
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="text-2xl font-bold my-5" {...props} />
                ),
                h2: (props: any) => (
                  <h2 className="text-xl font-bold my-5" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>

        <CommentSection id={`${post._id}`} />

        <div className="p-5 border max-w-2xl rounded-lg shadow shadow-yellow-500">
          <h1 className="text-2xl font-bold pb-2 border-b">Comments</h1>

          <div className="py-2 flex flex-col space-y-1.5">
            {post.comments.map((item) => (
              <p key={item._id}>
                <span className="text-yellow-500">{item.name}</span>{" "}
                {item.comment}
              </p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths = async () => {
  const posts = await client.fetch(slugQuery);

  const paths = posts.map((post: Postsprops) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await client.fetch(getPostDetailsQuery(params?.slug));

  if (!post) return { notFound: true };

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default Post;
