import styles from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar({ transparent = false }) {
  const navClass = `${styles.navbarCustom} ${
    transparent ? styles.transparentNavbar : styles.defaultNavbar
  } navbar navbar-expand-md container-fluid`;

  const brandClass = `${
    transparent ? styles.transparentBrand : styles.defaultBrand
  } ${styles.brand} navbar-brand h1 fs-3`;

  const linkClass = `${
    transparent ? styles.transparentLink : styles.defaultLink
  } ${styles.navLink} nav-link fs-6`;

  const iconClass = `${
    transparent ? styles.transparentIcon : styles.defaultIcon
  } fa-solid fa-user fs-5`;

  const menuClass = `${styles.navbarMenu} ${
    transparent ? styles.transparentMenu : styles.defaultMenu
  } collapse navbar-collapse`;

  const toggleClass = `${styles.menuToggle} ${
    transparent ? styles.transparentToggle : styles.defaultToggle
  } navbar-toggler`;

  return (
    <nav className={navClass}>
      <a className={brandClass} href="/">
        Porsche
      </a>

      <button
        className={toggleClass}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={menuClass} id="mainNavbar">
        <div className={styles.primaryLinks}>
          <a className={linkClass} href="/">
            Home
          </a>
          <a className={linkClass} href="/shop">
            Shop
          </a>
          <a className={linkClass} href="/about">
            About
          </a>
        </div>

        <div className={styles.accountArea}>
          <div className={`${styles.accountDropdown} dropdown`}>
            <a
              className={`${styles.accountToggle} nav-link`}
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Open account menu"
            >
              <i className={iconClass}></i>
            </a>

            <ul
              className={`${styles.dropdownMenu} dropdown-menu dropdown-menu-end`}
            >
              <li>
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.mobileAccountLinks}>
            <a className={linkClass} href="/profile">
              Profile
            </a>
            <a className={linkClass} href="/login">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
