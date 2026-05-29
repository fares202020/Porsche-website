import { useState } from "react";
import { Link } from "react-router-dom";
import AuthField from "../../components/Auth/AuthField";
import AuthShell from "../../components/Auth/AuthShell";
import authStyles from "../../components/Auth/AuthShell.module.css";
import { validateLogin } from "../../components/Auth/authValidation";

const initialValues = {
  email: "",
  password: "",
};

const initialTouched = {
  email: false,
  password: false,
};

export default function Login() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState(validateLogin(initialValues));
  const [touched, setTouched] = useState(initialTouched);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isVisible = (field) => submitted || touched[field];

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = {
      ...formData,
      [name]: value,
    };

    setFormData(nextValues);
    setErrors(validateLogin(nextValues));
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((current) => ({ ...current, [name]: true }));
    setErrors(validateLogin(formData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateLogin(formData);
    setSubmitted(true);
    setTouched({ email: true, password: true });
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }
  };

  return (
    <AuthShell title="Login">
      <form className={authStyles.form} onSubmit={handleSubmit} noValidate>
        <div className={authStyles.fieldGroup}>
          <AuthField
            id="login-email"
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            iconClass="fa-regular fa-envelope"
            error={isVisible("email") ? errors.email : ""}
            autoComplete="email"
            inputMode="email"
          />

          <AuthField
            id="login-password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            iconClass="fa-solid fa-lock"
            error={isVisible("password") ? errors.password : ""}
            autoComplete="current-password"
            showToggle
            isPasswordVisible={showPassword}
            onTogglePasswordVisibility={() => setShowPassword((current) => !current)}
          />
        </div>

        <button type="submit" className={authStyles.submitButton}>
          Sign In
        </button>

        <p className={authStyles.footerText}>
          Don&apos;t have an account?{" "}
          <Link to="/register" className={authStyles.footerLink}>
            Create one
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
