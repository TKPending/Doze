"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { Context } from "./ContextUser";
import AuthClient from "@/util/clients/authClient";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, onUserSignedOut } = useContext(Context);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const router = useRouter();

  const signOutReq = async (e) => {
    try {
      e.preventDefault();
      await AuthClient.signOutUser();
      onUserSignedOut();
      router.push("/");
    } catch (err) {
      console.log("Problem signin out user");
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-10">
      <nav className="flex items-center px-6 md:px-16 py-6 justify-between bg-center bg-white border-b border-gray-200">
        <Link
          href="/"
          className="flex flex-grow-0 flex-shrink-0 flex-basis-auto"
        >
          <h1 className="text-2xl font-bold duration-200 ease-linear text-black">
            Doze
          </h1>
        </Link>

        {/* Desktop Navigation */}
        {user ? (
          <div className="hidden sm:flex space-x-8 text-lg">
            <Link
              href="/dashboard"
              className="rounded-full border border-indigo-600 bg-indigo-600 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
            >
              Dashboard
            </Link>
            <div className=" flex relative">
              <button
                className="text-4xl "
                onClick={() => setToggleMobileMenu((prev) => !prev)}
              >
                <div className="w-10 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="user"
                  >
                    <path
                      fill="#231f20"
                      d="M7.763 2A6.77 6.77 0 0 0 1 8.763c0 1.807.703 3.505 1.98 4.782a6.718 6.718 0 0 0 4.783 1.981 6.77 6.77 0 0 0 6.763-6.763A6.77 6.77 0 0 0 7.763 2ZM3.675 13.501a5.094 5.094 0 0 1 3.958-1.989c.024.001.047.007.071.007h.023c.022 0 .042-.006.064-.007a5.087 5.087 0 0 1 3.992 2.046 6.226 6.226 0 0 1-4.02 1.468 6.212 6.212 0 0 1-4.088-1.525zm4.032-2.494c-.025 0-.049.004-.074.005a2.243 2.243 0 0 1-2.167-2.255 2.246 2.246 0 0 1 2.262-2.238 2.246 2.246 0 0 1 2.238 2.262c0 1.212-.97 2.197-2.174 2.232-.028-.001-.056-.006-.085-.006Zm4.447 2.215a5.594 5.594 0 0 0-3.116-2.052 2.749 2.749 0 0 0 1.428-2.412A2.747 2.747 0 0 0 7.704 6.02a2.747 2.747 0 0 0-2.738 2.762 2.73 2.73 0 0 0 1.422 2.386 5.602 5.602 0 0 0-3.081 1.995 6.22 6.22 0 0 1-1.806-4.398 6.27 6.27 0 0 1 6.263-6.263 6.27 6.27 0 0 1 6.263 6.263 6.247 6.247 0 0 1-1.873 4.457z"
                    ></path>
                  </svg>
                </div>
              </button>
              {toggleMobileMenu && (
                <div className="absolute right-0 top-full mt-3 w-full  p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2  shadow">
                  <div>
                    <span className="block text-sm text-gray-900 dark:text-gray-400 p-1">
                      {user.username}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 p-1">
                      {user.email}
                    </span>
                    <hr className="my-2 border-gray-300 dark:border-gray-700" />
                  </div>
                  <Link
                    href="/profile"
                    className="hover:bg-slate-100 rounded-full p-2 w-full"
                    onClick={() => setToggleMobileMenu(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/aboutus"
                    className="hover:bg-slate-100 rounded-full p-2 w-full"
                    onClick={() => setToggleMobileMenu(false)}
                  >
                    About us
                  </Link>
                  <Link
                    href="/signout"
                    className="hover:bg-slate-100 rounded-full p-2 w-full"
                    onClick={signOutReq}
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden sm:flex space-x-8 text-lg">
            <Link
              href="/signin"
              className="rounded-full border border-indigo-600 bg-indigo-600 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black hover:border-black text-center text-sm font-inter flex items-center justify-center"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-indigo-600 hover:border-indigo-600 hover:text-white text-center text-sm font-inter flex items-center justify-center"
            >
              Sign up
            </Link>
          </div>
        )}

        {/* Mobile navigation */}
        {user ? (
          <div className="sm:hidden flex relative text-lg">
            <button
              className="text-4xl "
              onClick={() => setToggleMobileMenu((prev) => !prev)}
            >
              &#9776;
            </button>
            {toggleMobileMenu && (
              <div className="absolute right-0 top-full mt-3 w-full  p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 shadow">
                <div>
                  <span className="block text-sm text-gray-900 dark:text-gray-400 p-1">
                    {user.username}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 p-1">
                    {user.email}
                  </span>
                  <hr className="my-2 border-gray-300 dark:border-gray-700" />
                </div>
                <Link
                  href="/dashboard"
                  className="hover:bg-slate-100 rounded-full p-2 w-full"
                  onClick={() => setToggleMobileMenu(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="hover:bg-slate-100 rounded-full p-2 w-full"
                  onClick={() => setToggleMobileMenu(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/aboutus"
                  className="hover:bg-slate-100 rounded-full p-2 w-full"
                  onClick={() => setToggleMobileMenu(false)}
                >
                  About us
                </Link>
                <Link
                  href="/signout"
                  className="hover:bg-slate-100 rounded-full p-2 w-full"
                  onClick={() => setToggleMobileMenu(false)}
                >
                  Sign out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="sm:hidden flex relative text-lg">
            <button
              className="text-3xl"
              onClick={() => setToggleMobileMenu((prev) => !prev)}
            >
              &#9776;
            </button>
            {toggleMobileMenu && (
              <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end shadow">
                <Link
                  href="/signin"
                  className="hover:bg-slate-100 rounded-full p-2 w-full"
                  onClick={() => setToggleMobileMenu(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/signout"
                  className="hover:bg-slate-100 rounded-full p-2 w-full"
                  onClick={() => setToggleMobileMenu(false)}
                >
                  Sign out
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
