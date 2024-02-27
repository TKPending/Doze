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
  }
};

// For console.log/error messages
export const DEVELOPER_ERRORS = {
  ENDPOINT: "Problem with the endpoint. Check the endpoint url or check that the server is up and running."
}

export const SUCCESS_MESSAGES = {
  SIGNUP_SUCCESS: "Account created successfully! Redirecting...",
  SIGNIN_SUCCESS: "Signing in! Redirecting..."
}
