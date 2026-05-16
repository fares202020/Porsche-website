// Home.jsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

import pv from "../../assets/icons/Porsche 911 GT3 RS.mp4";

import img911 from "../../assets/icons/911@2x.png";
import cayenee from "../../assets/icons/filters_format(avif) (4).png";
import cayman from "../../assets/icons/718 caymans.png";

import suv from "../../assets/icons/suv car.jpg";
import sport from "../../assets/icons/sport car.webp";
import electric from "../../assets/icons/electric car.jpg";
import sedan from "../../assets/icons/sedan car.jpg";

const categories = [
  { label: "SUV", img: suv },
  { label: "Sports", img: sport },
  { label: "Electric", img: electric },
  { label: "Sedan", img: sedan },
];

const models = [
  {
    name: "911",
    img: img911,
    title: "Porsche 911",
    desc: "Timeless sports car with iconic design and performance.",
    explorePath: "/models/911",
    discoverPath: "/discover/911",
  },
  {
    name: "718",
    img: cayman,
    title: "Porsche 718",
    desc: "Pure driving experience with mid-engine precision.",
    explorePath: "/models/718",
    discoverPath: "/discover/718",
  },
  {
    name: "Cayenne",
    img: cayenee,
    title: "Porsche Cayenne",
    desc: "Luxury SUV with sports DNA.",
    explorePath: "/models/cayenne",
    discoverPath: "/discover/cayenne",
  },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  
  const optionsRef = useRef(options);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        ...optionsRef.current,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); 

  return [ref, inView];
}

export default function Home() {
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [infoKey, setInfoKey] = useState(0);

  const [catRef, catInView] = useInView();
  const [modRef, modInView] = useInView();

  const total = models.length;

  const goTo = (index) => {
    if (animating || index === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setInfoKey((k) => k + 1);
      setAnimating(false);
    }, 650);
  };

  const next = () => goTo((active + 1) % total);
  const prev = () => goTo((active - 1 + total) % total);

  const getPosition = (index) => {
    if (index === active) return "carCenter";
    if (index === (active - 1 + total) % total) return "carLeft";
    if (index === (active + 1) % total) return "carRight";
    return "carHidden";
  };

  return (
    <div className={styles.home}>
      {/* HERO */}
      <section className={styles.hero}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        >
          <source src={pv} type="video/mp4" />
        </video>

        {/* FIX: fallback background so hero is never blank if video fails */}
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {"Pure Driving Emotion".split(" ").map((word, i) => (
              <span
                key={i}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className={styles.heroSub}>
            Built for performance. Driven by passion.
          </p>

          <button className={styles.btnDark}>SHOP NOW</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        ref={catRef}
        className={`${styles.categories} ${catInView ? styles.sectionVisible : ""}`}
      >
        <h2 className={styles.sectionHeading}>Shop by Category</h2>

        <div className={styles.categoryGrid}>
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className={`${styles.categoryCard} ${catInView ? styles.cardVisible : ""}`}
              style={{ "--card-delay": `${0.2 + i * 0.15}s` }}
            >
              <img src={cat.img} alt={cat.label} />
              <div className={styles.overlay} />
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MODELS */}
      <section
        ref={modRef}
        className={`${styles.models} ${modInView ? styles.sectionVisible : ""}`}
      >
        <p
          className={`${styles.modelsEyebrow} ${modInView ? styles.eyebrowVisible : ""}`}
        >
          OUR LINEUP
        </p>

        <h2
          className={`${styles.modelsTitle} ${modInView ? styles.titleVisible : ""}`}
        >
          MODELS
        </h2>

        {/* CAROUSEL */}
        <div className={styles.carouselStage}>
          <button
            className={`${styles.arrowBtn} ${styles.arrowBtnLeft}`}
            onClick={prev}
          >
            ‹
          </button>

          <div className={styles.carsTrack}>
            {models.map((m, i) => {
              const pos = getPosition(i);
              return (
                <div
                  key={i}
                  onClick={() => pos !== "carCenter" && goTo(i)}
                  className={`${styles.carSlide} ${styles[pos]} ${
                    modInView ? styles.carVisible : ""
                  }`}
                  style={{ "--car-delay": `${0.5 + i * 0.2}s` }}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className={styles.carImg}
                  />
                </div>
              );
            })}
          </div>

          <button
            className={`${styles.arrowBtn} ${styles.arrowBtnRight}`}
            onClick={next}
          >
            ›
          </button>
        </div>

        {/* INFO */}
        <div key={infoKey} className={styles.modelInfo}>
          <h3 className={styles.modelName}>{models[active].title}</h3>
          <p className={styles.modelDesc}>{models[active].desc}</p>
        </div>

        {/* TAB */}
        <div className={styles.tabs}>
          <span className={styles.activeTab}>{models[active].name}</span>
        </div>

        {/* BUTTONS */}
        <div
          className={`${styles.modelCtas} ${modInView ? styles.ctasVisible : ""}`}
        >
          <button
            className={styles.ctaPrimary}
            onClick={() => navigate(models[active].explorePath)}
          >
            EXPLORE THE MODEL
          </button>

          <button
            className={styles.ctaOutline}
            onClick={() => navigate(models[active].discoverPath)}
          >
            DISCOVER MORE
          </button>
        </div>
      </section>
    </div>
  );
}
