import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  id: string;
}

interface Formprops {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const CommentSection = ({ id }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Formprops>();

  const onSubmitHandler = async (formData: Formprops) => {
    setLoading(true);

    await fetch("/api/addComment", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => {
        setLoading(false);

        setSubmitted(true);
      })
      .catch((err) => {
        alert(err.message);

        setSubmitted(false);

        setLoading(false);
      });
  };

  return (
    <div className="my-10 px-5">
      <p className="text-xs text-yellow-500 font-semibold">
        Enjoyed this article!
      </p>

      <h1 className="text-2xl font-bold mb-5">Leave a comment below!</h1>

      {submitted ? (
        <div className="bg-yellow-500 max-w-xl text-white p-5">
          <h1 className="text-3xl font-bold mb-2">
            Thank you for submitting your comment!
          </h1>

          <p>Once it has been approved you can view it below</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col"
        >
          <input {...register("_id")} type="hidden" name="_id" value={id} />

          <div className="flex flex-col space-y-1">
            <label className="text-gray-700">Name</label>

            <input
              className="input"
              {...register("name", { required: true })}
              type="text"
              placeholder="John Appleased"
            />
          </div>

          <div className="flex flex-col space-y-1 my-3">
            <label className="text-gray-700">Email</label>

            <input
              className="input"
              {...register("email", { required: true })}
              type="email"
              placeholder="your@gmail.com"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-700">Comment</label>

            <textarea
              className="input"
              {...register("comment", { required: true })}
              rows={4}
              placeholder="Enter some long form content"
            />
          </div>

          <div className="mt-5 px-5 flex flex-col space-y-1">
            {errors.name && (
              <p className="text-red-500">- The name field is required</p>
            )}

            {errors.email && (
              <p className="text-red-500">- The email field is required</p>
            )}

            {errors.comment && (
              <p className="text-red-500">- The comment is required</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 disabled:cursor-not-allowed hover:bg-yellow-400 flex items-center justify-center mt-8 text-white max-w-xl py-1 px-4"
          >
            {loading ? (
              <div className="w-8 h-8 rounded-full border-t border-l border-white animate-spin" />
            ) : (
              <p>Submit</p>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
