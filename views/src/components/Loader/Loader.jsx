import { Html, useProgress } from "@react-three/drei";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <Html center>
      <div className="bg-secondary vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
        <span className={styles.loader}></span>
      </div>
    </Html>
  );
}
