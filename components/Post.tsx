import React from "react";
import Link from "next/link";
import { urlFor } from "../utils/sanity";
import { Postsprops } from "../types";

interface Props {
  post: Postsprops;
}

const Post = ({ post }: Props) => {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="border cursor-pointer rounded-lg group overflow-hidden">
        <img
          className="h-60 w-full object-cover group-hover:scale-105 transition transform duration-200 ease-in-out"
          loading="lazy"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />

        <div className="flex justify-between p-5 bg-white">
          <div>
            <p className="font-bold text-lg">{post.title}</p>

            <p className="text-xs">
              {post.description} by {post.author.name}
            </p>
          </div>

          <img
            className="w-12 h-12 rounded-full object-cover"
            loading="lazy"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};

export default Post;
