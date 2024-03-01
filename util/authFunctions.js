export const validEmailCheck = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email || email === "")) {
    return false;
  }

  return true;
};

export const validPasswordCheck = (password) => {
  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    !/\s/.test(password || password === "")
  ) {
    return true;
  }

  return false;
};

export const validUsernameCheck = (username) => {
  const spaceRegex = /\s/;
  const numericRegex = /^\d+$/;
  if (
    username.length < 3 ||
    spaceRegex.test(username) ||
    numericRegex.test(username) ||
    username === ""
  ) {
    return false;
  }

  return true;
};
