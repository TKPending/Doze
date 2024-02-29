"use client";
import { useState, useContext } from "react";
import { Context } from "./ContextUser";
import ProfileClient from "@/util/clients/profileClient";

const Profile = () => {
  const { user } = useContext(Context);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [emailData, setEmailData] = useState({
    currentEmail: "",
    newEmail: "",
  });

  const [emailToDelete, setEmailToDelete] = useState({ email: "" });

  const handleEmailValue = (e) => {
    if (e.target.name === "currentEmail") {
      setEmailData({ ...emailData, currentEmail: e.target.value });
    }
    if (e.target.name === "newEmail") {
      setEmailData({ ...emailData, newEmail: e.target.value });
    }
  };
  const handlePasswordValue = (e) => {
    if (e.target.name === "currentPassword") {
      setPasswordData({ ...passwordData, currentPassword: e.target.value });
    }
    if (e.target.name === "newPassword") {
      setPasswordData({ ...passwordData, newPassword: e.target.value });
    }
  };

  const handleEmailToDeleteValue = (e) => {
    if (e.target.name === "emailToDelete") {
      setEmailToDelete({ email: e.target.value });
    }
  };
  const onChangeEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProfileClient.changeEmailReq(emailData);
      setEmailData({ currentEmail: "", newEmail: "" });
      confirm("The email was changed");
    } catch (err) {
      console.log("Problem changing email");
      console.error(err);
    }
  };

  const onChangePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProfileClient.changePasswordReq(passwordData);
      setPasswordData({ currentPassword: "", newPassword: "" });
      confirm("The password was changed");
    } catch (err) {
      console.log("Problem changing email");
      console.error(err);
    }
  };
  const onDeleteAccountSubmit = async (e) => {
    try {
      e.preventDefault();

      if (emailToDelete.email === user.email) {
        let confirmation = prompt(
          "Are you sure you want to delete an account?Y/N"
        );
        if (confirmation.toUpperCase() === "Y") {
          await ProfileClient.deleteAccountReq(user._id);
          setEmailToDelete({ email: "" });
          confirm("Your account was deleted");
          window.location = "/";
        } else {
          return;
        }
      } else {
        alert("Please enter the correct email");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <section className="flex flex-col items-center px-6 lg:px-8 py-10 md:py-24">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          My Profile
        </h1>
        <div className="mx-auto ">
          <div className="flex py-10 items-end gap-5">
            <div className="rounded-full h-20 w-20">
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
            {user && <p className="text-2xl">{user.username}</p>}
          </div>
          <div className="flex flex-col gap-10">
            <form onSubmit={onChangeEmailSubmit}>
              <h2 className="font-bold">Email</h2>
              <div className="flex gap-5 items-center mt-3">
                <label
                  for="currentEmail"
                  className="flex flex-col text-sm text-gray-600"
                >
                  <input
                    placeholder="Current email"
                    value={emailData.currentEmail}
                    id="currentEmail"
                    name="currentEmail"
                    type="email"
                    autoComplete="email"
                    required
                    className="input input-bordered border-[#7899D4] focus:border-[#7899D4] focus:outline-[#7899D4] w-full max-w-xs"
                    onChange={handleEmailValue}
                  />
                </label>
                <label
                  for="newEmail"
                  className="flex flex-col text-sm text-gray-600"
                >
                  <input
                    placeholder="New email"
                    value={emailData.newEmail}
                    id="newEmail"
                    name="newEmail"
                    type="email"
                    autoComplete="email"
                    required
                    className="input input-bordered border-[#7899D4] focus:border-[#7899D4] focus:outline-[#7899D4] w-full max-w-xs"
                    onChange={handleEmailValue}
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-24 h-10"
                >
                  Change
                </button>
              </div>
            </form>

            <form onSubmit={onChangePasswordSubmit}>
              <h2 className="font-bold">Password</h2>
              <div className="flex gap-5 items-center mt-3">
                <label
                  htmlFor="currentPassword"
                  className="flex flex-col text-sm text-gray-600"
                >
                  <input
                    placeholder="Current password"
                    value={passwordData.currentPassword}
                    type="password"
                    required
                    name="currentPassword"
                    className="input input-bordered border-[#7899D4] focus:border-[#7899D4] focus:outline-[#7899D4] w-full max-w-xs"
                    onChange={handlePasswordValue}
                  />
                </label>
                <label
                  htmlFor="newPassword"
                  className="flex flex-col text-sm text-gray-600"
                >
                  <input
                    placeholder="New password"
                    value={passwordData.newPassword}
                    type="password"
                    required
                    name="newPassword"
                    className="input input-bordered border-[#7899D4] focus:border-[#7899D4] focus:outline-[#7899D4] w-full max-w-xs"
                    onChange={handlePasswordValue}
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-24  h-10"
                >
                  Change
                </button>
              </div>
            </form>

            <form onSubmit={onDeleteAccountSubmit}>
              <h2 className="font-bold ">Delete my account</h2>
              <div className="flex gap-5 mt-3">
                <label
                  for="emailToDelete"
                  className="flex flex-col text-sm text-gray-600"
                >
                  <input
                    placeholder="Enter your current email"
                    value={emailToDelete.email}
                    id="emailToDelete"
                    name="emailToDelete"
                    type="email"
                    required
                    className="input input-bordered border-[#7899D4] focus:border-[#7899D4] focus:outline-[#7899D4] w-full max-w-xs"
                    onChange={handleEmailToDeleteValue}
                  />
                </label>

                <button className="font-bold text-red-700 " type="submit">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
