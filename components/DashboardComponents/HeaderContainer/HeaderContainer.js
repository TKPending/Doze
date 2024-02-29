"use client";

import { useState, useEffect, useRef, useContext } from "react";
import HeaderBackground from "./components/HeaderBackground";
import { Context } from "@/components/ContextUser";
import DashboardClient from "@/util/clients/dashboardClient";
import { handleDashboardHeaderError } from "@/util/handleErrors";
import ErrorMessage from "@/components/MessageComponent/ErrorMessage";

const failMessage = "Failed to update!"


const HeaderContainer = () => {
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [imageLink, setImageLink] = useState(""); // Database Image Link

  const [isHeader, setIsHeader] = useState(false); // Displays text to edit header
  const [headerImage, setHeaderImage] = useState(""); // Changing of header value
  const [validHeader, setValidHeader] = useState(false); // Valid image

  const [sectionError, setSectionError] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);

  const headerRef = useRef(null);

  // Change value whenever user types
  const handleValueChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleHeader = (setValue, response) => {
    if (!response) {
      setValue("Error Returning Value. Try Again");
    }
    setValue(response);
  };

  // When a user presses enter or clicks off, set value to last value
  const handleEnterOrBlur = async (e, section) => {
    const inputValue = e.target.value;

    // If input is enter, default to original text
    if (section == "title") {
      const titleResponse = await DashboardClient.changeDashboardTitle(inputValue);

      if (!titleResponse.success) {
        handleDashboardHeaderError(setErrorMessage, titleResponse.error);
        setSectionError(titleResponse.title);
        return;
      }

      handleHeader(setTitle, titleResponse.data);
    } else if (section == "quote") {
      const quoteResponse = await DashboardClient.changeDashboardQuote(inputValue);

      if (!quoteResponse.success) {
        handleDashboardHeaderError(setErrorMessage, quoteResponse.error);
        setSectionError(quoteResponse.quote);
        return;
      }

      handleHeader(setQuote, quoteResponse.data)
    } else {
      const backgroundResponse = await DashboardClient.changeDashboardBackground(validHeader, inputValue);

      if (!backgroundResponse.success) {
        handleDashboardHeaderError(setErrorMessage, backgroundResponse.error);
        setSectionError(backgroundResponse.background);
        return;
      }

      handleHeader(setImageLink, backgroundResponse.data);
      setHeaderImage(backgroundResponse.data);
    }

    // Close header input
    setIsHeader(false);
  };

  // User clicks off the header
  const handleClickOutside = (e) => {
    if (headerRef.current && !headerRef.current.contains(e.target)) {
      setIsHeader(false);
    }
  };

  // Automatically close header when user clicks off header
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        if (!user) {
          return;
        }
        const response = await DashboardClient.getDashboardHeaderData();

        if (!response.success) {
          handleDashboardHeaderError(setErrorMessage, response.error);
          setSectionError(response.title)
          return;
        }

        setSuccessStatus(true);

        const { dashboard_background, dashboard_title, dashboard_quote } = response.data;

        setTitle(dashboard_title);
        setQuote(dashboard_quote);
        setImageLink(dashboard_background);
        setHeaderImage(dashboard_background)
      } catch (err) {
        console.error("Problem making original API CALL");
        console.error(err);
      }
    };

    fetchHeader();

    if (validHeader) {
      fetchHeader();
    }

  }, [user, imageLink]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
        setSectionError(false)
      }, 2500)
    }

    if (errorMessage) {
      setTimeout(() => {

      }, 2500)
    }
  }, [errorMessage, successStatus, sectionError])
  return (
    <div
      ref={headerRef}
      onClick={() => setIsHeader(true)}
      className={`flex items-end w-full h-60 rounded-t-lg hover:cursor-pointer`}
      style={{
        backgroundImage: `${imageLink != "" ? `url(${imageLink})` : ""}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <form className="flex flex-col w-auto pl-[5%] mb-2 w-full">
        {isHeader && (
          <HeaderBackground
            setValidHeader={setValidHeader}
            setHeaderImage={setHeaderImage}
            handleValueChange={handleValueChange}
            handleEnterOrBlur={handleEnterOrBlur}
            headerImage={headerImage}
            sectionError={sectionError}
            errorMessage={errorMessage}
          />
        )}

        <input
          type="text"
          className={`underline h-16  ${imageLink === "" ? "w-full" : "bg-gray-200 bg-opacity-50"} px-2 rounded-md ${sectionError == "title" ? "text-red-500" : "text-black"} ${sectionError == "title" && "w-auto"} font-semibold text-4xl border-none bg-transparent focus:border-none outline-none placeholder:text-black placeholder:font-semibold`}
          value={errorMessage && sectionError == "title" ? errorMessage : title}
          onChange={(e) => handleValueChange(e, setTitle)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleEnterOrBlur(e, "title")
          }
          onBlur={(e) =>
            e.type === "blur" && handleEnterOrBlur(e, "title")
          }
        />
        <input
          type="text"
          className={`ml-[2%] italic h-8 rounded-md px-2 font-semibold ${sectionError == "quote" ? "text-red-500" : "text-black"} ${sectionError == "quote" && "w-auto"} text-xl border-none bg-transparent focus:border-none outline-none placeholder:text-black placeholder:font-semibold mt-1 ${imageLink === "" ? "w-full" : "bg-gray-200 bg-opacity-50"}`}
          value={errorMessage && sectionError == "quote" ? failMessage : quote}
          onChange={(e) => handleValueChange(e, setQuote)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleEnterOrBlur(e, "quote")
          }
          onBlur={(e) =>
            e.type === "blur" && handleEnterOrBlur(e, "quote")
          }
        />
      </form>
    </div>
  );
};

export default HeaderContainer;
