import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MainGoal from "../../components/MainGoalComponents/MainGoal";
import mainGoalsClient from "@/util/clients/mainGoalsClient";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

jest.mock("@/util/clients/mainGoalsClient");

describe("MainGoal", () => {
  it("renders MainGoal component without crashing", () => {
    render(<MainGoal />);
  });
  describe("tags", () => {
    it("Should render no tags by default", () => {
      render(<MainGoal />);
      const tags = screen.queryAllByTestId("tag");
      expect(tags.length).toBe(0);
    });
    it("Should render tags if they are passed", () => {
      render(
        <MainGoal
          initialMainGoalData={{
            title: "Main Goal Title",
            description: "",
            status: "to-do",
            startDate: new Date().toLocaleDateString("en-CA"),
            tags: [
              { text: "cats", colour: "purple" },
              { text: "dogs", colour: "blue" },
            ],
            icon: "😁",
          }}
        />
      );

      const tags = screen.queryAllByTestId("tag");

      expect(tags.length).toBe(2);
      expect(tags[0].textContent).toBe("cats");
      expect(tags[1].textContent).toBe("dogs");
    });
  });

  describe("start date", () => {
    it("Should render current date by default", () => {
      render(<MainGoal />);
      const startDate = screen.queryAllByTestId("startDate");
      startDate.value = "2024-02-22";
      expect(startDate.value).toBe("2024-02-22");
    });
  });

  describe("title", () => {
    it("Should change the value of the title when passed  value to the element", () => {
      render(<MainGoal />);
      const title = screen.queryAllByTestId("title");
      title.value = "First Goal";
      expect(title.value).toBe("First Goal");
    });
  });

  describe("description", () => {
    it("Should change the value of the description when passed value to the element", () => {
      render(<MainGoal />);
      const description = screen.queryAllByTestId("description");
      description.value = "Test";
      expect(description.value).toBe("Test");
    });
  });

  describe("MainGoal component with onSave function", () => {
    it("Should render Delete button if _id exists", () => {
      const mockMainGoalDataWithId = {
        _id: "123abc",
        userId: "1",
        title: "Sample Title",
        description: "Sample Description",
        status: "to-do",
        startDate: "2024-02-22",
        maxDate: "Wed May 22 2024 00:00:00 GMT+0100 (British Summer Time)",
        tags: [],
        icon: "😁",
        subGoals: [],
      };
      render(
        <MainGoal
          initialMainGoalData={mockMainGoalDataWithId}
          onSave={jest.fn()}
        />
      );
      const deleteButton = screen.queryByTestId("delete");
      expect(deleteButton).toBeInTheDocument();
    });

    it("Should not render Delete button if _id doesn't exist", () => {
      const mockMainGoalDataWithId = {
        title: "Main Goal Title",
        description: "",
        status: "to-do",
        startDate: new Date().toLocaleDateString("en-CA"),
        tags: [],
        icon: "😁",
      };

      render(
        <MainGoal
          initialMainGoalData={mockMainGoalDataWithId}
          onSave={jest.fn()}
        />
      );
      const deleteButton = screen.queryByTestId("delete");
      expect(deleteButton).not.toBeInTheDocument();
    });
  });

  it("Should delete the main goal if Delete button is clicked", async () => {
    const mockMainGoalDataWithId = {
      _id: "123abc",
      userId: "1",
      title: "Sample Title",
      description: "Sample Description",
      status: "to-do",
      startDate: "2024-02-22",
      maxDate: "Wed May 22 2024 00:00:00 GMT+0100 (British Summer Time)",
      tags: [],
      icon: "😁",
      subGoals: [],
    };

    render(<MainGoal initialMainGoalData={mockMainGoalDataWithId} />);
    const deleteButton = screen.queryByTestId("delete");
    fireEvent.click(deleteButton);

    expect(mainGoalsClient.deleteOneMainGoalReq).toHaveBeenCalledWith(
      mockMainGoalDataWithId._id
    );
  });
});
