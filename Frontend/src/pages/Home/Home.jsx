import { useState } from "react";
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
  },
  {
    name: "718",
    img: cayman,
    title: "Porsche 718",
    desc: "Pure driving experience with mid-engine precision.",
  },
  {
    name: "Cayenne",
    img: cayenee,
    title: "Porsche Cayenne",
    desc: "Luxury SUV with sports DNA.",
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [infoKey, setInfoKey] = useState(0);

  const total = models.length;

  const goTo = (index) => {
    if (animating || index === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setInfoKey((k) => k + 1);
      setAnimating(false);
    }, 400);
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

      {/* ── HERO (unchanged) ── */}
      <section className={styles.hero}>
        <video autoPlay muted loop playsInline className={styles.heroVideo}>
          <source src={pv} type="video/mp4" />
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {"Pure Driving Emotion".split(" ").map((word, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.3}s` }}>
                {word}
              </span>
            ))}
          </h1>
          <p className={styles.heroSub}>Built for performance. Driven by passion.</p>
          <button className={styles.btnDark}>SHOP NOW</button>
        </div>
      </section>

      {/* ── CATEGORIES (unchanged) ── */}
      <section className={styles.categories}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <div key={cat.label} className={styles.categoryCard}>
              <img src={cat.img} alt={cat.label} />
              <div className={styles.overlay}></div>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODELS (redesigned) ── */}
      <section className={styles.models}>
        <p className={styles.modelsEyebrow}>OUR LINEUP</p>
        <h2 className={styles.modelsTitle}>MODELS</h2>

        {/* Carousel stage */}
        <div className={styles.carouselStage}>

          {/* Prev arrow */}
          <button
            className={`${styles.arrowBtn} ${styles.arrowBtnLeft}`}
            onClick={prev}
            aria-label="Previous model"
          >
            ‹
          </button>

          {/* Cars track */}
          <div className={styles.carsTrack}>
            {models.map((m, i) => {
              const pos = getPosition(i);
              return (
                <div
                  key={i}
                  className={`${styles.carSlide} ${styles[pos]}`}
                  onClick={() => pos !== "carCenter" && goTo(i)}
                >
                  <img src={m.img} alt={m.name} className={styles.carImg} />
                </div>
              );
            })}
          </div>

          {/* Next arrow */}
          <button
            className={`${styles.arrowBtn} ${styles.arrowBtnRight}`}
            onClick={next}
            aria-label="Next model"
          >
            ›
          </button>
        </div>

        {/* Model info below */}
        <div className={styles.modelInfo} key={infoKey}>
          <h3 className={styles.modelName}>{models[active].title}</h3>
          <p className={styles.modelDesc}>{models[active].desc}</p>
        </div>

        {/* Dot tabs */}
       <div className={styles.tabs}>
  <span className={styles.activeTab}>
    {models[active].name}
  </span>
</div>
      </section>

    </div>
  );
}
