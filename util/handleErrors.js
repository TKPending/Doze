import { DEVELOPER_ERRORS, ERROR_MESSAGES } from "./messages";
import { useRouter } from "next/navigation";

// AUTHENTICATION
export const handleSignUpError = (setErrorMessage, error) => {
  if (error.includes("Invalid email format")) {
    setErrorMessage(ERROR_MESSAGES.SIGNUP_FRONTEND.STANDARD);
  } else if (error.includes("Invalid username")) {
    setErrorMessage(ERROR_MESSAGES.SIGNUP_FRONTEND.STANDARD);
  } else if (error.includes("Username or email already exists")) {
    setErrorMessage(ERROR_MESSAGES.SIGNUP_BACKEND.USER_EXISTS);
  } else if (error.includes("Network Error")) {
    setErrorMessage(ERROR_MESSAGES.DEVELOPER_DATABASE_ERROR);
  } else {
    setErrorMessage(ERROR_MESSAGES.DATABASE_ERROR);
  }
};

export const handleSignInError = (setErrorMessage, err) => {
  if (err.includes("User not found.")) {
    setErrorMessage(ERROR_MESSAGES.SIGNIN.USER_NOT_FOUND);
  } else if (err.includes("Network Error")) {
    setErrorMessage(ERROR_MESSAGES.DEVELOPER_DATABASE_ERROR);
  } else {
    setErrorMessage(ERROR_MESSAGES.DATABASE_ERROR);
  }
  setSigninCheck(false);
};

// DASHBOARD
export const handleDashboardMainGoalsError = (setErrorMessage, err) => {
  if (err.includes("Network Error")) {
    setErrorMessage(ERROR_MESSAGES.DEVELOPER_DATABASE_ERROR);
  } else if (err.includes("Request failed with status code 404")) {
    setErrorMessage(DEVELOPER_ERRORS.ROUTES);
  } else {
    setErrorMessage(ERROR_MESSAGES.DASHBOARD.MAIN_GOALS);
  }
};

// MAIN GOALS PAGE
export const handleMainGoalsPageError = (setErrorMessage, err) => {
  if (err.includes("Request failed with status code 404")) {
    console.error(
      "Problem: Most likely to do with an endpoint. Check routes, endpoints and data being sent to endpoints."
    );
    setErrorMessage(DEVELOPER_ERRORS.MAIN_GOAL_ROUTE);
  } else if (err.includes("Network Error")) {
    console.error("Problem: Most likely to do with the server not running.");
    setErrorMessage(ERROR_MESSAGES.DEVELOPER_DATABASE_ERROR);
  } else if (err.includes("Problem when re-fetching one main goal")) {
    console.error(
      "Problem: Most likely due to how it is coded or data being sent"
    );
    setErrorMessage(ERROR_MESSAGES.MAIN_GOALS.GOAL_INVALID);
  } else if (err.includes("Failed to delete main goal")) {
    console.error(
      "Problem: Most likely to do with server not running or delete endpoint"
    );
    setErrorMessage(ERROR_MESSAGES.MAIN_GOALS.DELETE_FAILED);
  } else if (err.includes("Request failed with status code 404")) {
    setErrorMessage(ERROR_MESSAGES.MAIN_GOALS.SAVED_FAILED);
  } else if (err.includes("Problem creating a goal")) {
    console.error("Problem: Most likely to do with server endpoints or routes");
    setErrorMessage(ERROR_MESSAGES.MAIN_GOALS.CREATING_FAILED);
  } else setErrorMessage(ERROR_MESSAGES.DEVELOPER_DATABASE_ERROR);
};

// SUB GOALS
export const handleSubGoalError = (setErrorMessage, err) => {
    if (err.includes("Problem deleting all goals")) {
        console.error("Problem: Most likely to do with server endpoints or routes (Check client)")
        setErrorMessage(ERROR_MESSAGES.MAIN_GOALS.DELETE_SUBGOALS);
    } else if (err.includes("Problem getting all main goals")) {
        console.error("Problem: Most likely to 'getAllSubGoals' in SubGoalsClient")
        setErrorMessage(ERROR_MESSAGES.SUB_GOALS.ALL_GOALS_FAILED);
    } else if (err.includes("Problem adding Sub Goal from Main Goal")) {
        setErrorMessage(ERROR_MESSAGES.SUB_GOALS.SAVED_FAILED);
        console.log("HERE")
    } else {
        setErrorMessage(ERROR_MESSAGES.DEVELOPER_DATABASE_ERROR);
    }
};