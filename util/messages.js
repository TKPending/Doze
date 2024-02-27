export const ERROR_MESSAGES = {
  DATABASE_ERROR: "There was an issue with the database. Please try again later",
  DEVELOPER_DATABASE_ERROR:  "An unexpected error occurred. Please contact support for assistance.",
  SIGNUP_FRONTEND: {
    STANDARD: "Unable to complete signup. Please ensure all information is entered correctly and try again.",
  },
  SIGNUP_BACKEND: {
    USER_EXISTS: "Account already exists. Check information and try again",
  },
  SIGNIN: {
    USER_NOT_FOUND: "Unable to find user. Check information and try again",
    INVALID_DETAILS: "Please ensure all information is enetered correctly and try again"
  },
  DASHBOARD: {
    MAIN_GOALS: "Unable to find Main Goals. Try again later."
  }, 
  MAIN_GOALS: {
    GOAL_INVALID: "Problem re-fetching main goal. Redirecting to dashboard...",
    DELETE_FAILED: "Problem deleting Goal. Try again later.",
    SAVED_FAILED: "Problem saving goal. Try again later.",
    CREATING_FAILED: "Problem creating a goal. Try again later. Redirecting to dashboard...", 
    DELETE_SUBGOALS: "Problem deleting all Sub-Goals. Try again later."
  }, 
  SUB_GOALS: {
    ALL_GOALS_FAILED: "Problem with Sub Goals. Please try again later.",
    SAVED_FAILED: "Problem saving this Sub Goal. Please try again later."
  }
};

// For console.log/error messages
export const DEVELOPER_ERRORS = {
  ENDPOINT: "DEVELOPER: Problem with the endpoint. Check the endpoint url or check that the server is up and running.",
  ROUTES: "DEVELOPER: Problem with the routes. Check the routes files or anything related to routes and endpoints", 
  MAIN_GOAL_ROUTE: "DEVELOPER: Problem with routes. Redirecting to Dashboard...", 
}

export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: "Account created successfully! Redirecting...",
  SIGNIN_SUCCESS: "Signing in! Redirecting...", 
  SAVED_MAIN_GOAL: "Goal has been saved!",
  CREATED_MAIN_GOAL: "Goal has been created! Redirecting...",
  REMOVE_ALL_SUBGOALS:  "All Sub-Goals have successfully been removed.",
  SAVED_SUBGOAL: "Sub-Goal has been saved!"
}
