import { useState } from "react";

const TagButtonColours = ({subGoalData, setSubGoalData}) => {
    const [tagInput, setTagInput] = useState("");
    const [selectedColour, setSelectedColour] = useState("");

    const handleAddTag = (e) => {
        e.preventDefault();
        try {
          if (tagInput !== "" && selectedColour !== "") {
            setSubGoalData({
              ...subGoalData,
              tags: [
                ...subGoalData.tags,
                { text: tagInput, colour: selectedColour },
              ],
            });
            setTagInput("");
            setSelectedColour("");
          } else {
            alert("Please enter a tag and select a colour");
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <>
      <div className="flex justify-center items-center mb-2.5">
        <input
          id="tags"
          name="tag"
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
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
          name="tagColour"
          value="blue"
          defaultChecked={selectedColour === "blue"}
          onChange={() => setSelectedColourhandleColourChange("blue")}
          className="radio border-blue-400 checked:bg-blue-400 bg-blue-400 ml-2 mt-1"
        />

        <input
          type="radio"
          id="red"
          name="tagColour"
          value="red"
          checked={selectedColour === "red"}
          onChange={() => setSelectedColour("red")}
          className="radio border-red-400 checked:bg-red-400 bg-red-400 ml-2 mt-1"
        />

        <input
          type="radio"
          id="lime"
          name="tagColour"
          value="lime"
          checked={selectedColour === "lime"}
          onChange={() => setSelectedColour("lime")}
          className="radio border-lime-400 checked:bg-lime-400 bg-lime-400 ml-2 mt-1"
        />

        <input
          type="radio"
          id="purple"
          name="tagColour"
          value="purple"
          checked={selectedColour === "purple"}
          onChange={() => setSelectedColour("purple")}
          className="radio border-purple-400 checked:bg-purple-400 bg-purple-400 ml-2 mt-1"
        />

        <input
          type="radio"
          id="yellow"
          name="tagColour"
          value="yellow"
          checked={selectedColour === "yellow"}
          onChange={() => setSelectedColour("yellow")}
          className="radio border-yellow-400 checked:bg-yellow-400 bg-yellow-400 ml-2 mt-1"
        />

        <input
          type="radio"
          id="orange"
          name="tagColour"
          value="orange"
          checked={selectedColour === "orange"}
          onChange={() => setSelectedColour("orange")}
          className="radio border-orange-400 checked:bg-orange-400 bg-orange-400 ml-2 mt-1"
        />

        <input
          type="radio"
          id="pink"
          name="tagColour"
          value="pink"
          checked={selectedColour === "pink"}
          onChange={() => setSelectedColour("pink")}
          className="radio border-pink-400 checked:bg-pink-400 bg-pink-400 ml-2 mt-1"
        />
      </div>
    </>
  );
};

export default TagButtonColours;
