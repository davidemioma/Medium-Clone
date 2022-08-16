import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="bg-yellow-400 flex justify-between items-center py-10 lg:py-0 border-y border-black">
      <div className="space-y-4 px-10">
        <h1 className="text-6xl font-serif max-w-xl">
          <span className="underline decoration-black decoration-4">
            Medium
          </span>{" "}
          is the right place to write, read, and connect
        </h1>

        <p>
          It is easy and free to post your thinking on any topic and connect to
          millions of readers.
        </p>
      </div>

      <img
        className="hidden md:inline h-32 lg:h-full"
        loading="lazy"
        src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
        alt=""
      />
    </div>
  );
};

export default Banner;
