"use client";
import axios from 'axios';
import { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SubGoalsClient from "@/util/clients/subGoalsClient";


const EditSubGoal = ({ setIsEditModalVisible, taskClicked, setTaskAdded }) => {
  
  const [tagInput, setTagInput] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [subGoalData, setSubGoalData] = useState({
    title: "",
    dateCreated: "",
    icon: "😁",
    status: "", 
    mainGoal: "",
    mainGoalId: "",
    tags: [],
    description: "",
    id: "",
  });



  const handleSubGoalInput = (e) => {
    if (e.target.name === "title") {
      setSubGoalData({...subGoalData, title: e.target.value})
    }
    if (e.target.name === "status") {  
     setSubGoalData({...subGoalData, status: e.target.value})
    }
    if (e.target.name === "description") {
    setSubGoalData({...subGoalData, description: e.target.value})
    }
    if (e.target.name === "icon") {
        setSubGoalData({...subGoalData, icon: e.target.value})
      }
    };



  const closeModal = () => {
    setIsEditModalVisible(false);
  }

  //close modal when user clicks outside the modal
  const handleOffModalClick = (e) => {
    if (e.target.classList.contains("bg-black")) {
      closeModal();
    }
  };

 

  const saveSubGoal = async () => {
    console.log(subGoalData)
      await SubGoalsClient.editSubGoal(subGoalData);
   }


   const deleteSubGoal =  async (subGoalData) => {
    const mainGoalId = subGoalData.mainGoalId
    const id = subGoalData.id;
    if (!confirm("Do you want to delete this sub goal?")) {
     return
  }
  await SubGoalsClient.deleteSubGoal(mainGoalId, id);
  console.log("Deleted Task")
  setTaskAdded(true);
  console.log("State changed to true")
  closeModal();
}


  const subGoalFormHandler = async (e) => {
    e.preventDefault();
    // Send request to backend to add sub goal to main goal
    saveSubGoal();
    closeModal();
    setTaskAdded(true);
  }

  //setting Emoji 
  const handleEmoji = (e) => {
    handleSubGoalInput({ target: { name: "icon", value: e.native } });
  };

  //toggle Emoji picker
  const toggleEmojiPicker = () => {
    setIsOpen(!isOpen);
  };


  //handle colour change of the tag
  const handleColourChange = (colour) => {
    setSelectedColour(colour);
  };

  //handle tag input change and set tag text
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

 

  //remove tag from tag list
  const handleRemoveTag = (index) => {
const newTags = subGoalData.tags;
    newTags.splice(index, 1);
    setSubGoalData({
      ...subGoalData,
      tags: newTags,
    });
  }

   
    const handleAddTag = (e) => {
      e.preventDefault();
      try {
        if (tagInput !== "" && selectedColour !== "") {
         setSubGoalData({
          ...subGoalData, 
          tags: [...subGoalData.tags, {text:tagInput, colour: selectedColour }]
         })
        setTagInput("");
         setSelectedColour("");
        } else {
          alert("Please enter a tag and select a colour");
        }
      } catch (error) {
        console.log(error);
      }
    };
    

    useEffect(() => {
      if (taskClicked.task !== undefined) {
        console.log(taskClicked.task)
        setSubGoalData({
          title: taskClicked.task.title,
          dateCreated: taskClicked.task.dateCreated || "",
          icon: taskClicked.task.icon,
          status: taskClicked.task.status,
          mainGoalId: taskClicked.task.mainGoalId,
          mainGoal: taskClicked.task.mainGoal, 
          tags: taskClicked.task.tags,
          description: taskClicked.task.description,
          id: taskClicked.task._id
        })
      }
    }, [taskClicked]);

   

 

  return (
    <div
      onClick={handleOffModalClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-gray-100 md:h-3/4 md:w-1/2 w-4/5 h-4/5 p-6 rounded-lg mt-24 outline outline-[#FF9796]">
        <div className="w-full flex justify-end pr-[3%]">
          <p
            onClick={closeModal}
            className="text-[#ff9796] hover:text-white hover:bg-red-400 border border-[#ff9796] rounded-full w-12 h-12 flex items-center justify-center text-2xl"
          >
            x
          </p>
        </div>

        <form
          className="flex flex-col items-center w-full h-full"
          onSubmit={subGoalFormHandler}
        >
          <a 
          onClick={toggleEmojiPicker} 
          className="mb-5 hover:cursor-pointer">
            <span className="text-6xl">{subGoalData.icon}</span>
          </a>
          {isOpen && (
            <Picker
              data={data}
              onEmojiSelect={handleEmoji}
              onClickOutside={toggleEmojiPicker}
              maxFrequentRows={0}
            />
          )}

          <input name="title" id="title"
            type="text"
            className="input input-bordered h-40 w-1/2 mb-5 border-[#FF9796] focus:border-[#FF9796] focus:outline-[#FF9796]" placeholder="Title" 
            onChange={handleSubGoalInput} defaultValue={subGoalData.title}
          ></input>

          <select name="status" className="mb-4 outline-[#ff9796] border rounded-md focus:border-[#ff9796] p-2" 
          onChange={handleSubGoalInput}
          data-testid="status-select"
          value={subGoalData.status}
          >
            <option value="">Select a status</option>
            <option value="To-do">To-do</option>
            <option value="In progress">In progress</option>
            <option value="Complete">Complete</option>
          </select>


          <div className="flex justify-center items-center mb-2.5">
            <input
            id="tags"
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
              name="tagColour"
              value="blue"
              defaultChecked={selectedColour === "blue"}
              onChange={() => handleColourChange("blue")}
              className="radio border-blue-400 checked:bg-blue-400 bg-blue-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="red"
              name="tagColour"
              value="red"
              checked={selectedColour === "red"}
              onChange={() => handleColourChange("red")}
              className="radio border-red-400 checked:bg-red-400 bg-red-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="lime"
              name="tagColour"
              value="lime"
              checked={selectedColour === "lime"}
              onChange={() => handleColourChange("lime")}
              className="radio border-lime-400 checked:bg-lime-400 bg-lime-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="purple"
              name="tagColour"
              value="purple"
              checked={selectedColour === "purple"}
              onChange={() => handleColourChange("purple")}
              className="radio border-purple-400 checked:bg-purple-400 bg-purple-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="yellow"
              name="tagColour"
              value="yellow"
              checked={selectedColour === "yellow"}
              onChange={() => handleColourChange("yellow")}
              className="radio border-yellow-400 checked:bg-yellow-400 bg-yellow-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="orange"
              name="tagColour"
              value="orange"
              checked={selectedColour === "orange"}
              onChange={() => handleColourChange("orange")}
              className="radio border-orange-400 checked:bg-orange-400 bg-orange-400 ml-2 mt-1"
            />

            <input
              type="radio"
              id="pink"
              name="tagColour"
              value="pink"
              checked={selectedColour === "pink"}
              onChange={() => handleColourChange("pink")}
              className="radio border-pink-400 checked:bg-pink-400 bg-pink-400 ml-2 mt-1"
            />
          </div>
          <div className="mt-2.5 mb-2.5">
            {subGoalData.tags.map((tag, index) => (
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

          <textarea name="description"
            className="textarea h-72 input-bordered w-1/2 mb-5 border-[#FF9796] focus:border-[#FF9796] focus:outline-[#FF9796]"
            placeholder="Additional information" 
            onChange={handleSubGoalInput} defaultValue={subGoalData.description}
          ></textarea>
<a onClick={() => deleteSubGoal(subGoalData)} className="hover:cursor-pointer">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-delete"><path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>
</a>

          <div className="w-full h-full flex justify-end items-end pb-[5%] pr-[5%]">
            <button type="submit" className="h-12 text-[#ff9796] hover:text-white hover:bg-[#ff9796] border border-[#ff9796] rounded-md p-2 pl-5 pr-5">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default EditSubGoal; 
