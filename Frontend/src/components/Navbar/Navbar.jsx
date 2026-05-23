
import styles from "./Navbar.module.css";import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar({ transparent = false }) {
  const navClass = `${styles.navbarCustom} ${
    transparent ? styles.transparentNavbar : styles.defaultNavbar
  } navbar container-fluid`;

  const brandClass = `${
    transparent ? styles.transparentBrand : styles.defaultBrand
  } navbar-brand h1 col fs-3 mx-4`;

  const linkClass = `${
    transparent ? styles.transparentLink : styles.defaultLink
  } nav-link mx-4 fs-6 p-1`;

  const iconClass = `${
    transparent ? styles.transparentIcon : styles.defaultIcon
  } fa-solid fa-user fs-5`;

  return (
    <nav className={navClass}>
      
      <a className={brandClass} href="/">
        Porsche
      </a>

      <div className="col d-flex justify-content-center align-items-center">
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

      <div className="col d-flex justify-content-end align-items-center">
        <div className="dropdown mx-4">
          <a
            className="nav-link"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className={iconClass}></i> 
          </a>

          <ul className="dropdown-menu dropdown-menu-end">
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
      </div>

    </nav>
  );
}