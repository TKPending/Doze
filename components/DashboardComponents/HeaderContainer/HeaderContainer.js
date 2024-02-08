"use client";

import { Inter } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import HeaderBackground from "./components/HeaderBackground";

const inter = Inter({ subsets: ["latin"] });

const TITLE_DEFAULT = "12 Weeks Goals";
const QUOTE_DEFAULT =
  "In just 12 weeks, you can create a new habit that will last a lifetime.";
const HEADER_DEFAULT =
  `Enter URL has to end in (JPEG, JPG, PNG, BMP, SVG)`;

const HeaderContainer = () => {
  const [title, setTitle] = useState(TITLE_DEFAULT);
  const [quote, setQuote] = useState(QUOTE_DEFAULT);
  const [isHeader, setIsHeader] = useState(false); // Displays text to edit header
  const [headerImage, setHeaderImage] = useState(HEADER_DEFAULT); // Changing of header value
  const [validHeader, setValidHeader] = useState(false); // Valid image 
  const [imageLink, setImageLink] = useState(localStorage.getItem("Header Background"))

  const headerRef = useRef(null);

  // Change value whenever user types
  const handleValueChange = (e, setValue) => {
    setValue(e.target.value);
  };

  // When a user presses enter or clicks off, set value to last value
  const handleEnterOrBlur = (e, setValue, defaultValue) => {
    e.preventDefault();
    const inputValue = e.target.value;

    // If input is enter, default to original text
    setValue(inputValue === "" ? defaultValue : inputValue);

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

  // After user inputs a header image, make change
  useEffect(() => {
    if (validHeader) {
      localStorage.setItem("Header Background", headerImage);
      setImageLink(localStorage.getItem("Header Background"))
    }
  }, [validHeader, imageLink]);

  useEffect(() => {}, [title, quote, headerImage]);

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
      <form className="flex flex-col w-full pl-[5%] mb-2">
        {isHeader && (
          <HeaderBackground
            setValidHeader={setValidHeader}
            handleValueChange={handleValueChange}
            setHeaderImage={setHeaderImage}
            HEADER_DEFAULT={HEADER_DEFAULT}
            handleEnterOrBlur={handleEnterOrBlur}
            headerImage={headerImage}
          />
        )}

        <input
          type="text"
          className={`${inter.className} underline h-16 w-full text-black font-semibold text-4xl border-none bg-transparent focus:border-none outline-none placeholder:text-black placeholder:font-semibold`}
          value={title}
          onChange={(e) => handleValueChange(e, setTitle)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleEnterOrBlur(e, setTitle, TITLE_DEFAULT)
          }
          onBlur={(e) =>
            e.type === "blur" && handleEnterOrBlur(e, setTitle, TITLE_DEFAULT)
          }
        />
        <input
          type="text"
          className={`ml-[2%] ${inter.className} italic h-8 w-full font-bold text-black text-xl border-none bg-transparent focus:border-none outline-none placeholder:text-black placeholder:font-semibold`}
          value={quote}
          onChange={(e) => handleValueChange(e, setQuote)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleEnterOrBlur(e, setQuote, QUOTE_DEFAULT)
          }
          onBlur={(e) =>
            e.type === "blur" && handleEnterOrBlur(e, setQuote, QUOTE_DEFAULT)
          }
        />
      </form>
    </div>
  );
};

export default HeaderContainer;
