const HeaderBackground = ({
  setValidHeader,
  handleValueChange,
  setHeaderImage,
  handleEnterOrBlur,
  headerImage,
}) => {
  // Checks if link ends with an image file
  const isImage = (url) => {
    const imageFileType = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];

    const imageType = url.split(".").pop().toLowerCase();

    // True ends with image file : False doesn't end with image file
    return imageFileType.includes(imageType);
  };

  // Handle when the image value changes
  const handleImageChange = (e) => {
    const inputValue = e.target.value;

    // Not an image
    if (!isImage(inputValue)) {
      setValidHeader(false);
      return;
    }

    // Is an image
    setHeaderImage(inputValue);
    setValidHeader(true);
  };

  return (
    <input
      type="text"
      onChange={(e) => handleValueChange(e, setHeaderImage)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleImageChange(e);
          handleEnterOrBlur(e, "background");
        }
      }}
      onBlur={(e) =>
        e.type === "blur" &&
        handleEnterOrBlur(e, "background")
      }
      className={`text-black text-xl w-3/4 border-none bg-transparent focus:border-none outline-none`}
      value={headerImage}
    />
  );
};

export default HeaderBackground;
