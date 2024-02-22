// import React, { experimental_useEffectEvent } from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import EditSubGoal from "../../components/SubGoalComponent/EditSubGoal";

// jest.mock('axios');

// describe(EditSubGoal, () => {

//     it("Renders the EditSubGoal component without crashing", () => {
//         render(<EditSubGoal/>);
//     })

//     it("Updates the value when something is typed into the input field", () => {
//         render(<EditSubGoal/>);
//         const titleInput = screen.getByPlaceholderText("Title");
//         fireEvent.change(titleInput, { target: {value: "Testing"}});
//         expect(titleInput.value).toBe("Testing");
//     })

//     it("Updates value when an option is selected on the status dropdown", () => {
//         render(<EditSubGoal/>);
//         const statusSelect = screen.getByTestId("status-select");
//         fireEvent.change(statusSelect, { target: { value: "To-do" } });
//         expect(statusSelect.value).toBe("To-do");
//     })

//     it("Updates value when 'a' is typed into the textarea field", () => {
//         render(<EditSubGoal/>);
//         const descriptionInput = screen.getByPlaceholderText("Additional information");
//         fireEvent.change(descriptionInput, { target: {value: "a"}});
//         expect(descriptionInput.value).toBe("a");
//     })

//     it("Renders the tags in component after clicking the button for handleAddTag", async () => {
//         render(<EditSubGoal/>);
//         const tagsInput = screen.getByPlaceholderText("Tags");
//         fireEvent.change(tagsInput, { target: {value: "Food"}});

//         const colourRadioButton = screen.getByDisplayValue("orange");
//         fireEvent.click((colourRadioButton));

//         const addTagButton = screen.getByText("+");
//         fireEvent.click(addTagButton);

//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         const renderedTag = screen.getByText("Food");
//         expect(renderedTag).toBeInTheDocument();
//     });

//     it("alerts when trying to add a tag with nothing in the input field but a colour radio button is checked", () => {
//         const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
//         render(<EditSubGoal />);
//         const tagsInput = screen.getByPlaceholderText("Tags");
//         fireEvent.change(tagsInput, { target: {value: ""}});

//         const colourRadioButton = screen.getByDisplayValue("pink");
//         fireEvent.click(colourRadioButton, { target: {value: "pink"}});

//         const addTagButton = screen.getByText("+");
//         fireEvent.click(addTagButton);

//         expect(mockAlert).toHaveBeenCalledWith("Please enter a tag and select a colour");
//     })

//     it("alerts when trying to add a tag with no colour radio button selected but with text in the input field", () => {
//         const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
//         render(<EditSubGoal />);
//         const tagsInput = screen.getByPlaceholderText("Tags");
//         fireEvent.change(tagsInput, { target: {value: "Travel"}});

//         const addTagButton = screen.getByText("+");
//         fireEvent.click(addTagButton);

//         expect(mockAlert).toHaveBeenCalledWith("Please enter a tag and select a colour")
//     })

  

//     it("Deletes the tag from the screen when the 'x' button on the tags is clicked", async () => {
//         render(<EditSubGoal />);
//         const tagsInput = screen.getByPlaceholderText("Tags");

//         fireEvent.change(tagsInput, { target: {value: "Travel"}});

//         const colourRadioButton = screen.getByDisplayValue("blue");
//         fireEvent.click((colourRadioButton));

//         const addTagButton = screen.getByText("+");
//         fireEvent.click(addTagButton);

//        await new Promise((resolve) => setTimeout(resolve, 1000));
//        const renderedTag = screen.queryByText("Travel");
      
//        const deleteButton = screen.getByTestId("remove-tag");
//        fireEvent.click(deleteButton);

//        await new Promise((resolve) => setTimeout(resolve, 1000));
//        expect(renderedTag).not.toBeInTheDocument();
//     });

//     it("Shows an alert when the 'Save' button is clicked when nothing in title, icon or status.", () => {
//         render(<EditSubGoal/>);
//         const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
        
//         const saveButton = screen.getByText("Save");
//         fireEvent.click(saveButton);

//         expect(mockAlert).toHaveBeenCalledWith("Please fill in title, status and add an icon");

//     })
// })