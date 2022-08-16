import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { client } from "../utils/sanity";
import { postQuery } from "../utils/queries";
import { Postsprops } from "../types";
import Post from "../components/Post";

interface Props {
  posts: Postsprops[];
}

const Home = ({ posts }: Props) => {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>

        <link rel="icon" href="/medium.webp" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-5">
        <Banner />

        <div className="py-8 px-2 lg:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const posts = await client.fetch(postQuery);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
