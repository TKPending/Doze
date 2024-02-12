"use client";
import { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const SubGoal = ({ setIsModalVisible }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsModalVisible(false);

  const handleOffModalClick = (e) => {
    if (e.target.classList.contains("bg-black")) {
      closeModal();
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
  };
  const handleEmoji = (e) => {
    setEmoji(e.native);
  };
  const toggleEmojiPicker = () => {
    setIsOpen(!isOpen);
  };

  const emojiPicture = () => {
    if (emoji !== "") {
      console.log(emoji);
      return emoji;
    } else {
      return "😁";
    }
  };

  const handleColourChange = (colour) => {
    setSelectedColour(colour);
    console.log(colour);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    try {
      console.log(tagInput, selectedColour);
      if (tagInput !== "" && selectedColour !== "") {
        setTags([...tags, { text: tagInput, colour: selectedColour }]);
        setTagInput("");
        setSelectedColour("");
      } else {
        alert("Please enter a tag and select a colour");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div
      onClick={handleOffModalClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-gray-100 md:h-3/4 md:w-1/2 w-4/5 h-4/5 p-6 rounded-lg mt-24 outline outline-[#FF9796]">
        <div className="w-full flex justify-end pr-[3%]">
          <p onClick={closeModal} className="text-[#ff9796] hover:text-white hover:bg-red-400 border border-[#ff9796] rounded-full w-12 h-12 flex items-center justify-center text-2xl">x</p>
        </div>

        <form
          className="flex flex-col items-center w-full h-full"
          onSubmit={formHandler}
        >
          <button onClick={toggleEmojiPicker} className="mb-5">
            <span className="text-6xl">{emojiPicture()}</span>
          </button>
          {isOpen && (
            <Picker
              data={data}
              onEmojiSelect={handleEmoji}
              onClickOutside={toggleEmojiPicker}
              maxFrequentRows={0}
            />
          )}

          <input
            type="text"
            className="input input-bordered h-40 w-1/2 mb-5 border-[#FF9796] focus:border-[#FF9796] focus:outline-[#FF9796]"
            defaultValue="Title"
          ></input>

          <select className="mb-4 outline-[#ff9796] border rounded-md focus:border-[#ff9796] p-2">
            <option>To-do</option>
            <option>In progress</option>
            <option>Complete</option>
          </select>

          <select className="mb-4 outline-[#ff9796] border rounded-md focus:border-[#ff9796] p-2">
            <option>Buy A House</option>
            <option>Visit France</option>
            <option>Gain 5kg</option>
          </select>

          <div className="flex justify-center items-center mb-2.5">
            <input
              name="tag"
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              className="input focus:border-[#FF9796] focus:outline-[#FF9796] w-64 border-[#FF9796]"
              placeholder="Tags"
            ></input>

            <button
              className="bg-[#FF9796] text-white rounded-md w-12 hover:bg-red-500 transition duration-200 p-2.5 ml-4"
              onClick={handleAddTag}
            >
              +
            </button>
          </div>

          <div className="mb-5">
            <input
              type="radio"
              id="blue"
              name="colour"
              value="blue"
              defaultChecked={selectedColour === "blue"}
              onChange={() => handleColourChange("blue")}
              className="radio border-blue-400 checked:bg-blue-400 bg-blue-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="red"
              name="colour"
              value="red"
              checked={selectedColour === "red"}
              onChange={() => handleColourChange("red")}
              className="radio border-red-400 checked:bg-red-400 bg-red-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="lime"
              name="colour"
              value="lime"
              checked={selectedColour === "lime"}
              onChange={() => handleColourChange("lime")}
              className="radio border-lime-400 checked:bg-lime-400 bg-lime-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="purple"
              name="colour"
              value="purple"
              checked={selectedColour === "purple"}
              onChange={() => handleColourChange("purple")}
              className="radio border-purple-400 checked:bg-purple-400 bg-purple-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="yellow"
              name="colour"
              value="yellow"
              checked={selectedColour === "yellow"}
              onChange={() => handleColourChange("yellow")}
              className="radio border-yellow-400 checked:bg-yellow-400 bg-yellow-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="orange"
              name="colour"
              value="orange"
              checked={selectedColour === "orange"}
              onChange={() => handleColourChange("orange")}
              className="radio border-orange-400 checked:bg-orange-400 bg-orange-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="pink"
              name="colour"
              value="pink"
              checked={selectedColour === "pink"}
              onChange={() => handleColourChange("pink")}
              className="radio border-pink-400 checked:bg-pink-400 bg-pink-400 ml-2 mt-1"
            />
          </div>
          <div className="mt-2.5 mb-2.5">
            {tags.map((tag, index) => (
              <span key={index}>
                <div className={`badge bg-${tag.colour}-400 gap-2 p-4`}>
                  {tag.text}
                  <a
                    onClick={() => handleRemoveTag(index)}
                    className="inline-block cursor-pointer w-2.5"
                  >
                    x
                  </a>
                </div>
              </span>
            ))}
          </div>

          <textarea
            className="textarea h-72 input-bordered w-1/2 mb-5 border-[#FF9796] focus:border-[#FF9796] focus:outline-[#FF9796]"
            placeholder="Additional information"
          ></textarea>

          <div className="w-full h-full flex justify-end items-end pb-[5%] pr-[5%]">
            <button className="h-12 text-[#ff9796] hover:text-white hover:bg-[#ff9796] border border-[#ff9796] rounded-md p-2 pl-5 pr-5">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubGoal;
