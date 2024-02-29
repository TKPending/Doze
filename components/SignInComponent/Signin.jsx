"use client";
import { useState, useContext, useEffect } from "react";
import { Context } from "../ContextUser";
import { useRouter } from "next/navigation";
import AuthClient from "@/util/clients/authClient";
import ErrorMessage from "../MessageComponent/ErrorMessage";
import SuccessMessage from "../MessageComponent/SuccessMessage";
import { ERROR_MESSAGES } from "@/util/messages";
import { SUCCESS_MESSAGES } from "@/util/messages";
import { validEmailCheck } from "@/util/authFunctions";
import { handleSignInError } from "@/util/handleErrors";

const Signin = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { onUserSignedIn } = useContext(Context);
  const [signinCheck, setSigninCheck] = useState(true);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong.");

  const handleInputValue = (e) => {
    if (e.target.name === "email") {
      setUserData({ ...userData, email: e.target.value.toLowerCase() });
    }
    if (e.target.name === "password") {
      setUserData({ ...userData, password: e.target.value });
    }
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault();

    const emailCheck = validEmailCheck(userData.email);

    if (!emailCheck || userData.password === "") {
      setSigninCheck(false);
      setErrorMessage(ERROR_MESSAGES.SIGNIN.INVALID_DETAILS);
      return;
    }

    try {
      const signInResult = await AuthClient.signInReq(userData);

      if (signInResult.success) {
        setSuccessStatus(true);
        setSigninCheck(true);
      } else {
        handleSignInError(setErrorMessage, signInResult.error);
        setSigninCheck(false);
      }
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.DEVELOPER_DATABASE_ERROR);
      setSigninCheck(false);
    }
  };

  useEffect(() => {
    if (!signinCheck) {
      setTimeout(() => {
        setSigninCheck(true);
        return;
      }, 3500);
    }

    if (successStatus) {
      setTimeout(() => {
        onUserSignedIn();
        router.push("/");
      }, 1500);
    }
  }, [signinCheck, successStatus]);

  return (
    <div className="w-screen h-auto">
      {!signinCheck && <ErrorMessage message={errorMessage} />}
      {successStatus && (
        <SuccessMessage message={SUCCESS_MESSAGES.SIGNIN_SUCCESS} />
      )}

      <form onSubmit={onSignInSubmit}>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold m-5 mt-24">Welcome to Doze</h2>

          {/* Facebook */}
          <button className="btn btn-outline text-[#7899D4] hover:border-[#7899D4] hover:bg-[#7899D4] m-2.5 max-w-xs w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 256 256"
            >
              <path
                fill="#1877F2"
                d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
              />
              <path
                fill="#FFF"
                d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"
              />
            </svg>
            Continue with Facebook{" "}
          </button>

          {/* Google */}
          <button className="btn btn-outline text-[#7899D4] hover:bg-[#7899D4] hover:border-[#7899D4] m-2.5 max-w-xs w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              />
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              />
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              />
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              />
            </svg>
            Sign in with Google{" "}
          </button>

          {/* Github */}
          <button className="btn btn-outline text-[#7899D4] hover:border-[#7899D4] hover:bg-[#7899D4] m-2.5 max-w-xs w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 1024 1024"
              className=" text-black"
            >
              <path
                fill="currentColor"
                d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5C64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9c26.4 39.1 77.9 32.5 104 26c5.7-23.5 17.9-44.5 34.7-60.8c-140.6-25.2-199.2-111-199.2-213c0-49.5 16.3-95 48.3-131.7c-20.4-60.5 1.9-112.3 4.9-120c58.1-5.2 118.5 41.6 123.2 45.3c33-8.9 70.7-13.6 112.9-13.6c42.4 0 80.2 4.9 113.5 13.9c11.3-8.6 67.3-48.8 121.3-43.9c2.9 7.7 24.7 58.3 5.5 118c32.4 36.8 48.9 82.7 48.9 132.3c0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9c177.1-59.7 304.6-227 304.6-424.1c0-247.2-200.4-447.3-447.5-447.3"
              />
            </svg>{" "}
            Continue with GitHub{" "}
          </button>

          <h2 className="m-2.5">or</h2>

          <label for="email" className="">
            Email
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            className="input input-bordered border-[#7899D4] focus:border-[#7899D4] focus:outline-[#7899D4] w-full max-w-xs m-2.5"
            onChange={handleInputValue}
          />
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            placeholder=""
            name="password"
            className="input input-bordered border-[#7899D4] focus:border-[#7899D4] focus:outline-[#7899D4] w-full max-w-xs m-2.5"
            onChange={handleInputValue}
          />
          <div>
            <button className="btn btn-outline border-[#7899D4] hover:border-[#7899D4] bg-[#7899D4] hover:bg-white hover:text-[#7899D4] text-white m-5 w-32 mb-24">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
