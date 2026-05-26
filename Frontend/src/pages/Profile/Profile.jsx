import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthField from "../../components/Auth/AuthField";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialProfileData = {
  fullName: "",
  email: "you@example.com",
};

const initialProfileErrors = {
  fullName: "",
  email: "",
};

const initialPasswordData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialPasswordErrors = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialProfileTouched = {
  fullName: false,
  email: false,
};

const initialPasswordTouched = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
};

function validateProfileForm(values) {
  const nextErrors = {
    fullName: "",
    email: "",
  };

  if (!values.fullName.trim()) {
    nextErrors.fullName = "Full name is required.";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    nextErrors.email = "Enter a valid email address.";
  }

  return nextErrors;
}

function validatePasswordForm(values) {
  const nextErrors = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  if (!values.currentPassword.trim()) {
    nextErrors.currentPassword = "Please enter your current password.";
  }

  if (!values.newPassword.trim()) {
    nextErrors.newPassword = "Please create a new password.";
  } else if (values.newPassword.length < 8) {
    nextErrors.newPassword = "Password must be at least 8 characters.";
  }

  if (!values.confirmPassword.trim()) {
    nextErrors.confirmPassword = "Please confirm your password.";
  } else if (values.newPassword !== values.confirmPassword) {
    nextErrors.confirmPassword = "Passwords do not match.";
  }

  return nextErrors;
}

function getVisibleError(isSubmitted, touched, field, error) {
  return isSubmitted || touched[field] ? error : "";
}

export default function Profile() {
  const [profileData, setProfileData] = useState(initialProfileData);
  const [profileErrors, setProfileErrors] = useState(initialProfileErrors);
  const [profileTouched, setProfileTouched] = useState(initialProfileTouched);
  const [profileSubmitted, setProfileSubmitted] = useState(false);

  const [passwordData, setPasswordData] = useState(initialPasswordData);
  const [passwordErrors, setPasswordErrors] = useState(initialPasswordErrors);
  const [passwordTouched, setPasswordTouched] = useState(initialPasswordTouched);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const displayName = profileData.fullName.trim() || "Account";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const displayEmail = profileData.email.trim() || "you@example.com";

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    const nextProfileData = {
      ...profileData,
      [name]: value,
    };

    setProfileData(nextProfileData);
    setProfileErrors(validateProfileForm(nextProfileData));
  };

  const handleProfileBlur = (event) => {
    const { name } = event.target;

    setProfileTouched((current) => ({ ...current, [name]: true }));
    setProfileErrors(validateProfileForm(profileData));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateProfileForm(profileData);
    setProfileSubmitted(true);
    setProfileTouched({ fullName: true, email: true });
    setProfileErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    const nextPasswordData = {
      ...passwordData,
      [name]: value,
    };

    setPasswordData(nextPasswordData);
    setPasswordErrors(validatePasswordForm(nextPasswordData));
  };

  const handlePasswordBlur = (event) => {
    const { name } = event.target;

    setPasswordTouched((current) => ({ ...current, [name]: true }));
    setPasswordErrors(validatePasswordForm(passwordData));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validatePasswordForm(passwordData);
    setPasswordSubmitted(true);
    setPasswordTouched({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });
    setPasswordErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setPasswordData(initialPasswordData);
    setPasswordErrors(initialPasswordErrors);
    setPasswordTouched(initialPasswordTouched);
    setPasswordSubmitted(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.content}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div>
              <p className={styles.eyebrow}>Account</p>
              <h1 className={styles.pageTitle}>My Profile</h1>
              <p className={styles.pageSubtitle}>
                Manage your account details in one organized place.
              </p>
            </div>
          </header>

          <div className={styles.layout}>
            <aside className={styles.sidebarCard}>
              <div className={styles.identity}>
                <div className={styles.avatar} aria-hidden="true">
                  {avatarLetter}
                </div>
                <h2 className={styles.identityName}>{displayName}</h2>
                <p className={styles.identityEmail}>{displayEmail}</p>
              </div>

              <nav className={styles.nav} aria-label="Profile sections">
                <NavLink
                  to="/profile"
                  end
                  className={({ isActive }) =>
                    `${styles.navButton} ${isActive ? styles.navButtonActive : styles.navButtonInactive}`
                  }
                >
                  <i className="fas fa-user"></i>
                  Profile Settings
                </NavLink>

                <NavLink
                  to="/orders"
                  end
                  className={({ isActive }) =>
                    `${styles.navButton} ${isActive ? styles.navButtonActive : styles.navButtonInactive}`
                  }
                >
                  <i className="fas fa-shopping-bag"></i>
                  Order History
                </NavLink>

                <Link className={`${styles.navButton} ${styles.logoutLink}`} to="/login">
                  <i className="fas fa-right-from-bracket"></i>
                  Logout
                </Link>
              </nav>
            </aside>

            <section className={styles.mainPane}>
              <div className={styles.panelStack}>
                <section className={styles.sectionCard}>
                  <div className={styles.sectionHeader}>
                    <div>
                      <p className={styles.sectionEyebrow}>Profile details</p>
                      <h2 className={styles.sectionTitle}>Edit Profile</h2>
                      <p className={styles.sectionSubtitle}>
                        Update the name and email connected to your account.
                      </p>
                    </div>
                  </div>

                  <form className={styles.form} onSubmit={handleProfileSubmit} noValidate>
                    <div className={styles.formGrid}>
                      <AuthField
                        id="profile-full-name"
                        label="Full Name"
                        name="fullName"
                        type="text"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        onBlur={handleProfileBlur}
                        placeholder="Enter your full name"
                        iconClass="fa-regular fa-user"
                        error={getVisibleError(profileSubmitted, profileTouched, "fullName", profileErrors.fullName)}
                        helperText="This name will be shown on your account profile."
                        autoComplete="name"
                      />

                      <AuthField
                        id="profile-email"
                        label="Email Address"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        onBlur={handleProfileBlur}
                        placeholder="you@example.com"
                        iconClass="fa-regular fa-envelope"
                        error={getVisibleError(profileSubmitted, profileTouched, "email", profileErrors.email)}
                        helperText="We'll use this email for account communication."
                        autoComplete="email"
                        inputMode="email"
                      />
                    </div>

                    <div className={styles.actionsRow}>
                      <button type="submit" className={styles.primaryButton}>
                        <i className="fas fa-floppy-disk"></i>
                        Save Changes
                      </button>
                    </div>
                  </form>
                </section>

                <section className={styles.sectionCard}>
                  <div className={styles.sectionHeader}>
                    <div>
                      <p className={styles.sectionEyebrow}>Security</p>
                      <h2 className={styles.sectionTitle}>Change Password</h2>
                      <p className={styles.sectionSubtitle}>
                        Choose a strong password and keep your current one confidential.
                      </p>
                    </div>
                  </div>

                  <form className={styles.form} onSubmit={handlePasswordSubmit} noValidate>
                    <div className={styles.formGrid}>
                      <AuthField
                        id="profile-current-password"
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        placeholder="Enter current password"
                        iconClass="fa-solid fa-lock"
                        error={getVisibleError(passwordSubmitted, passwordTouched, "currentPassword", passwordErrors.currentPassword)}
                        helperText="Confirm your current password before updating it."
                        autoComplete="current-password"
                      />

                      <AuthField
                        id="profile-new-password"
                        label="New Password"
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        placeholder="Create a new password"
                        iconClass="fa-solid fa-lock"
                        error={getVisibleError(passwordSubmitted, passwordTouched, "newPassword", passwordErrors.newPassword)}
                        helperText="Use at least 8 characters."
                        autoComplete="new-password"
                        showToggle
                        isPasswordVisible={showNewPassword}
                        onTogglePasswordVisibility={() => setShowNewPassword((current) => !current)}
                      />

                      <AuthField
                        id="profile-confirm-password"
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        placeholder="Confirm the new password"
                        iconClass="fa-solid fa-lock"
                        error={getVisibleError(passwordSubmitted, passwordTouched, "confirmPassword", passwordErrors.confirmPassword)}
                        helperText="This should match the new password exactly."
                        autoComplete="new-password"
                        showToggle
                        isPasswordVisible={showConfirmPassword}
                        onTogglePasswordVisibility={() => setShowConfirmPassword((current) => !current)}
                      />
                    </div>

                    <div className={styles.actionsRow}>
                      <button type="submit" className={styles.primaryButton}>
                        <i className="fas fa-lock"></i>
                        Update Password
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
