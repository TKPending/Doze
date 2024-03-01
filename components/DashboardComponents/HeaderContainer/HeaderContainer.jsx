import dashboardClient from "@/util/clients/dashboardClient";
import { useState, useEffect, useContext } from "react";
import { Context } from "@/components/ContextUser";
import { handleDashboardHeaderError } from "@/util/handleErrors";
import ErrorMessage from "@/components/MessageComponent/ErrorMessage";

const DEFAULT = "Enter URL has to end in (JPEG, JPG, PNG, BMP, SVG)";

const Test = () => {
  const [header, setHeader] = useState({
    backgroundImage: "",
    title: "",
    quote: "",
  });
  const [storedImage, setStoredImage] = useState("");
  const [errorSection, setErrorSection] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(false);
  const { user } = useContext(Context);

  const defaultText = (name, value) => {
    setHeader((prevHeader) => ({
      ...prevHeader,
      [name]: value,
    }));
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setHeader((prevHeader) => ({
      ...prevHeader,
      [name]: value,
    }));
  };

  const linkIsAnImage = (link) => {
    const imageFileType = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];

    const imageType = link.split(".").pop().toLowerCase();

    return imageFileType.includes(imageType);
  };

  const handleHeaderChange = async (e) => {
    e.preventDefault();

    const section = e.target.name;

    if (section === "backgroundImage") {
      const validBackgroundImage = linkIsAnImage(header.backgroundImage);

      if (!validBackgroundImage) {
        setStoredImage("");
      }

      const background = await dashboardClient.changeDashboardBackground(
        validBackgroundImage,
        header.backgroundImage
      );

      if (!background.success) {
        handleDashboardHeaderError(setErrorMessage, background.error);
        setErrorSection(section);
        return;
      }

      setStoredImage(background.data);
      defaultText(section, background.data);
    } else if (section === "title") {
      const title = await dashboardClient.changeDashboardTitle(header.title);

      if (!title.success) {
        handleDashboardHeaderError(setErrorMessage, title.error);
        setErrorSection(section);
        return;
      }

      defaultText(section, title.data);
    } else if (section === "quote") {
      const quote = await dashboardClient.changeDashboardQuote(header.quote);

      if (!quote.success) {
        handleDashboardHeaderError(setErrorMessage, quote.error);
        console.log(section);
        setErrorSection(section);
        return;
      }

      defaultText(section, quote.data);
    }
  };

  useEffect(() => {
    const fetchHeader = async () => {
      if (!user) {
        return;
      }

      const response = await dashboardClient.getDashboardHeaderData();

      if (!response.success) {
        handleDashboardHeaderError(setErrorMessage, response.error);
        setSectionError(response.title);
        return;
      }

      const { dashboard_background, dashboard_title, dashboard_quote } =
        response.data;

      setHeader({
        backgroundImage: dashboard_background,
        title: dashboard_title,
        quote: dashboard_quote,
      });
      setStoredImage(dashboard_background);
    };

    fetchHeader();
  }, [user]);

  // Text colour dependent on background image
  const contrastColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness >= 128 ? "black" : "white";
  };


  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
        setErrorSection(undefined);
      }, 2500)
    }
  }, [errorMessage, errorSection]);

  return (
    <div
      className="flex items-end w-full h-60 rounded-t-lg hover:cursor-pointer"
      style={{
        backgroundImage: `${storedImage != "" ? `url(${storedImage})` : ""}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    {errorMessage && <ErrorMessage message={errorMessage} />}

      <form className="flex py-4 flex-col justify-center gap-2 w-full h-3/4 pl-[5%] mb-2">
        <input
          type="text"
          className={`w-auto min-w-0 text-black text-xl border-none bg-transparent outline-none mx-2 opacity-0 hover:opacity-100 ${storedImage && storedImage !== DEFAULT ? `text-${contrastColor(storedImage)}` : "text-black"}`}
          value={header.backgroundImage}
          name="backgroundImage"
          onChange={handleOnChange}
          onKeyDown={(e) => e.key === "Enter" && handleHeaderChange(e)}
          onBlur={handleHeaderChange}
        />

        <input
          type="text"
          className={`${errorSection === "title" ? "text-red-500" : ""} px-2 font-semibold w-auto min-w-0 underline h-16 text-2xl md:text-4xl border-none bg-transparent outline-none ${storedImage && storedImage !== DEFAULT ? `text-${contrastColor(storedImage)}` : "text-black"}`}
          value={errorMessage && errorSection == "title" ? errorMessage : header.title}
          name="title"
          onChange={handleOnChange}
          onKeyDown={(e) => e.key === "Enter" && handleHeaderChange(e)}
          onBlur={handleHeaderChange}
        />

        <input
          type="text"
          className={`${errorSection === "quote" ? "text-red-500" : ""} w-auto min-w-0 border-none outline-none italic h-8 ml-[2%] font-semibold text-base md:text-xl bg-transparent ${storedImage && storedImage !== DEFAULT ? `text-${contrastColor(storedImage)}` : "text-black"}`}
          value={errorMessage && errorSection == "quote" ? errorMessage : header.quote}
          name="quote"
          onChange={handleOnChange}
          onKeyDown={(e) => e.key === "Enter" && handleHeaderChange(e)}
          onBlur={handleHeaderChange}
        />
      </form>
    </div>
  );
};

export default Test;
