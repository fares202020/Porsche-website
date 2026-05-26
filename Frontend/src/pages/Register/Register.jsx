import { useState } from "react";
import { Link } from "react-router-dom";
import AuthField from "../../components/Auth/AuthField";
import AuthShell from "../../components/Auth/AuthShell";
import authStyles from "../../components/Auth/AuthShell.module.css";
import { validateRegister } from "../../components/Auth/authValidation";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

const initialTouched = {
  fullName: false,
  email: false,
  password: false,
  confirmPassword: false,
  agreeToTerms: false,
};

export default function Register() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState(validateRegister(initialValues));
  const [touched, setTouched] = useState(initialTouched);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isVisible = (field) => submitted || touched[field];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValues = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormData(nextValues);
    setErrors(validateRegister(nextValues));
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((current) => ({ ...current, [name]: true }));
    setErrors(validateRegister(formData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateRegister(formData);
    setSubmitted(true);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true,
    });
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }
  };

  return (
    <AuthShell title="Register">
      <form className={authStyles.form} onSubmit={handleSubmit} noValidate>
        <div className={authStyles.fieldGroup}>
          <AuthField
            id="register-full-name"
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            iconClass="fa-regular fa-user"
            error={isVisible("fullName") ? errors.fullName : ""}
            autoComplete="name"
          />

          <AuthField
            id="register-email"
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
            id="register-password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Create a password"
            iconClass="fa-solid fa-lock"
            error={isVisible("password") ? errors.password : ""}
            autoComplete="new-password"
            showToggle
            isPasswordVisible={showPassword}
            onTogglePasswordVisibility={() => setShowPassword((current) => !current)}
          />

          <AuthField
            id="register-confirm-password"
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm your password"
            iconClass="fa-solid fa-lock"
            error={isVisible("confirmPassword") ? errors.confirmPassword : ""}
            autoComplete="new-password"
            showToggle
            isPasswordVisible={showConfirmPassword}
            onTogglePasswordVisibility={() =>
              setShowConfirmPassword((current) => !current)
            }
          />
        </div>

        <div>
          <div className={authStyles.checkboxRow}>
            <input
              id="termsCheck"
              name="agreeToTerms"
              type="checkbox"
              className={`form-check-input ${authStyles.checkboxInput}`}
              checked={formData.agreeToTerms}
              onChange={handleChange}
              aria-invalid={Boolean(isVisible("agreeToTerms") && errors.agreeToTerms)}
              aria-describedby={
                isVisible("agreeToTerms") && errors.agreeToTerms ? "termsCheck-error" : undefined
              }
            />
            <label className={authStyles.checkboxLabel} htmlFor="termsCheck">
              I agree to the{" "}
              <Link to="/terms-of-service" className={authStyles.policyLink}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className={authStyles.policyLink}>
                Privacy Policy
              </Link>
            </label>
          </div>

          {isVisible("agreeToTerms") && errors.agreeToTerms ? (
            <p className={authStyles.checkboxError} id="termsCheck-error" role="alert">
              {errors.agreeToTerms}
            </p>
          ) : null}
        </div>

        <button type="submit" className={authStyles.submitButton}>
          Create Account
        </button>

        <p className={authStyles.footerText}>
          Already have an account?{" "}
          <Link to="/login" className={authStyles.footerLink}>
            Sign In
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
