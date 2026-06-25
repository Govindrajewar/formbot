const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const isValidEmail = (email) => EMAIL_PATTERN.test(email);

export const isValidPassword = (password) => PASSWORD_PATTERN.test(password);

export const PASSWORD_REQUIREMENT_MESSAGE =
  "Password must be at least 8 characters and include at least one letter and one number";
