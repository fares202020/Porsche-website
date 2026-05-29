const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isBlank = (value) => !value || !value.trim();

export const validateEmail = (value) => {
  const nextValue = value.trim();

  if (isBlank(nextValue)) {
    return "Email address is required.";
  }

  if (!EMAIL_PATTERN.test(nextValue)) {
    return "Enter a valid email address.";
  }

  return "";
};

export const validatePasswordRequired = (value) => {
  if (isBlank(value)) {
    return "Password is required.";
  }

  return "";
};

export const validatePasswordLength = (value, minLength = 8) => {
  if (isBlank(value)) {
    return "Password is required.";
  }

  if (value.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  }

  return "";
};

export const validateLogin = ({ email, password }) => ({
  email: validateEmail(email),
  password: validatePasswordRequired(password),
});

export const validateRegister = ({
  fullName,
  email,
  password,
  confirmPassword,
  agreeToTerms,
}) => {
  const errors = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: "",
  };

  if (isBlank(fullName)) {
    errors.fullName = "Full name is required.";
  }

  errors.email = validateEmail(email);
  errors.password = validatePasswordLength(password);

  if (isBlank(confirmPassword)) {
    errors.confirmPassword = "Confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!agreeToTerms) {
    errors.agreeToTerms = "You must agree to the terms before continuing.";
  }

  return errors;
};
