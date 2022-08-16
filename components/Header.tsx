import React, { useState } from "react";
import Link from "next/link";
import Login from "./Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "@firebase/auth";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  const [user] = useAuthState(auth);

  return (
    <>
      <header className="flex items-center justify-between md:space-x-5 p-5 max-w-7xl mx-auto">
        <div>
          <Link href="/">
            <img
              className="w-44 object-contain cursor-pointer"
              loading="lazy"
              src="https://links.papareact.com/yvf"
              alt=""
            />
          </Link>
        </div>

        <div className="hidden md:inline-flex flex-1 items-center space-x-4">
          <a
            className="cursor-pointer"
            href="https://medium.com/about"
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>

          <a
            href="https://help.medium.com/hc/en-us/articles/216287508-Contact-Medium-Support"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer"
          >
            Contact
          </a>

          <p className="bg-green-600 cursor-pointer text-white px-4 py-1 rounded-full">
            Follow
          </p>
        </div>

        {user ? (
          <div className="flex items-center space-x-4 text-green-600">
            <img
              className="hidden sm:inline w-10 h-10 rounded-full"
              loading="lazy"
              src={`${user.photoURL}`}
              alt=""
            />

            <button onClick={() => signOut(auth)}>Sign Out</button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 text-green-600">
            <button onClick={() => setOpenModal(true)}>Sign In</button>

            <button
              onClick={() => setOpenModal(true)}
              className="hidden sm:inline border border-green-600 rounded-full py-1 px-4"
            >
              Get Started
            </button>
          </div>
        )}
      </header>

      {openModal && <Login setOpenModal={setOpenModal} />}
    </>
  );
};

export default Header;
