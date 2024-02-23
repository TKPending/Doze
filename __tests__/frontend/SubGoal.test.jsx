import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubGoal from "../../components/SubGoalComponent/SubGoal";

const subGoals = [
  {
    title: "Broccoli",
    dateCreated: "",
    icon: "🥦",
    status: "Complete",
    mainGoalId: "65d3cd4bb68bf88577ed9131",
    mainGoal: "Testing Goal",
    tags: [
      {
        text: "Food",
        colour: "purple",
        _id: "65d761944a6fea0b1d7e9f9a",
      },
    ],
    description: "test",
    _id: "65d761944a6fea0b1d7e9f99",
  },
  // Add other subGoals as needed
];

//Mock Axios module
jest.mock("axios");

describe(SubGoal, () => {
  it("renders SubGoal component without crashing", () => {
    render(<SubGoal />);
  });

  it("updates value when something is typed into the input field", () => {
    render(<SubGoal />);
    const titleInput = screen.getByPlaceholderText("Title");
    titleInput.value = "Learn French";
    expect(titleInput.value).toBe("Learn French");
  });

  it("updates value when an option is selected on the status dropdown", () => {
    render(<SubGoal />);
    const statusSelect = screen.getByTestId("status-select");
    fireEvent.change(statusSelect, { target: { value: "Complete" } });
    expect(statusSelect.value).toBe("Complete");
  });

  it("Updates value when 'a' is typed into the textarea field", () => {
    render(<SubGoal />);
    const descriptionInput = screen.getByPlaceholderText(
      "Additional information"
    );
    descriptionInput.value = "a";
    expect(descriptionInput.value).toBe("a");
  });

  // NEED TO FIX
  it("Renders the tags in the component after clicking the button for handleAddTag", async () => {
    render(<SubGoal />);
    const tagsInput = screen.getByPlaceholderText("Tags");

    fireEvent.change(tagsInput, { target: { value: "Travel" } });

    const colourRadioButton = screen.getByDisplayValue("blue");
    fireEvent.click(colourRadioButton);

    const addTagButton = screen.getByText("+");
    fireEvent.click(addTagButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const renderedTag = screen.getByText("Travel");
    expect(renderedTag).toBeInTheDocument();
  });

  it("alerts when trying to add a tag with nothing in the input field but a colour radio button is checked", () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<SubGoal />);
    const tagsInput = screen.getByPlaceholderText("Tags");
    fireEvent.change(tagsInput, { target: { value: "" } });

    const colourRadioButton = screen.getByDisplayValue("pink");
    fireEvent.click(colourRadioButton, { target: { value: "pink" } });

    const addTagButton = screen.getByText("+");
    fireEvent.click(addTagButton);

    expect(mockAlert).toHaveBeenCalledWith(
      "Please enter a tag and select a colour"
    );
  });

  it("alerts when trying to add a tag with no colour radio button selected but with text in the input field", () => {
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<SubGoal />);
    const tagsInput = screen.getByPlaceholderText("Tags");
    fireEvent.change(tagsInput, { target: { value: "Travel" } });

    const addTagButton = screen.getByText("+");
    fireEvent.click(addTagButton);

    expect(mockAlert).toHaveBeenCalledWith(
      "Please enter a tag and select a colour"
    );
  });

  // NEED TO FIX
  it("Deletes the tag from the screen when the 'x' button on the tags is clicked", async () => {
    render(<SubGoal />);
    const tagsInput = screen.getByPlaceholderText("Tags");

    fireEvent.change(tagsInput, { target: { value: "Travel" } });

    const colourRadioButton = screen.getByDisplayValue("blue");
    fireEvent.click(colourRadioButton);

    const addTagButton = screen.getByText("+");
    fireEvent.click(addTagButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const renderedTag = screen.queryByText("Travel");

    const deleteButton = screen.getByTestId("remove-tag");
    fireEvent.click(deleteButton);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(renderedTag).not.toBeInTheDocument();
  });

  it("Shows an alert when the 'Save' button is clicked when nothing in title, icon or status.", () => {
    render(<SubGoal setIsModalVisible={s => s} />);
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockAlert).toHaveBeenCalledWith(
      "Please fill in title, status and add an icon"
    );
  });

  //   it("Opens emoji picker when emoji is clicked", async () => {
  //     render(<SubGoal/>);
  //     const emojiSelect = screen.getByTestId("emoji-icon");
  //     fireEvent.click(emojiSelect);
  //     const emojiPicker = (<Picker/>);

  //     expect(emojiPicker).toBeInTheDocument

  //     })
});
