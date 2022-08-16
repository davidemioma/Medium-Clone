import {
  Dispatch,
  SetStateAction,
} from "@sanity/types/node_modules/@types/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { XIcon } from "@heroicons/react/solid";
import { signInWithGoogle } from "../firebase";

interface Props {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setOpenModal }: Props) => {
  return (
    <div className="fixed w-full max-w-lg top-48 left-1/2 rounded-lg -translate-x-1/2 z-50 bg-gray-100 shadow-md">
      <div className="w-full p-5">
        <button
          onClick={() => setOpenModal(false)}
          className="absolute flex items-center justify-center top-0 m-5 right-0 w-8 h-8 bg-gray-200 rounded-full font-bold animate-pulse"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <h1 className="text-2xl font-bold text-center mt-10 my-2 capitalize">
          Join Medium
        </h1>

        <button
          onClick={() => signInWithGoogle().then(() => setOpenModal(false))}
          className="border border-gray-400 my-5 w-full max-w-[300px] mx-auto flex justify-center items-center space-x-2 py-1.5 px-4 rounded-full"
        >
          <FcGoogle size={20} />

          <p>Sign in with Google</p>
        </button>

        <p className="text-sm text-center sm:w-9/12 mx-auto">
          Click “Sign Up” to agree to Medium’s{" "}
          <span className="cursor-pointer underline">Terms of Service</span> and
          acknowledge that Medium’s{" "}
          <span className="cursor-pointer underline">Privacy Policy</span>{" "}
          applies to you.
        </p>
      </div>
    </div>
  );
};

export default Login;
