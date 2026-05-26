import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // Add this import
import { AnimatePresence, motion, useInView } from "framer-motion";
import styles from "./Home.module.css";
import pv from "../../assets/icons/Porsche 911 GT3 RS.mp4";
import cayenee from "../../assets/icons/filters_format(avif) (4).png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";    

import suv from "../../assets/icons/suv car.jpg";
import sport from "../../assets/icons/sport car.webp";
import electric from "../../assets/icons/electric car.jpg";
import sedan from "../../assets/icons/sedan car.jpg";

import taycanImg from "../../assets/images/Taycan_TurboS.avif";
import macanImg from "../../assets/images/Macan_Electric.avif";
import sceneMotorsport from "../../assets/images/scene1.jpg";
import sceneExperience from "../../assets/images/scene3.jpg";
import sceneFinder from "../../assets/images/scene7.jpg";

import img911Carrera from "../../assets/images/911_Carrera.avif";
import imgGT3RS from "../../assets/images/GT3_RS.avif";
import imgCayenneSUV from "../../assets/icons/CD4764533C824EF4AFD953F2CA0537A9_4DF7E0D5F2F8424F8BA2FB06447A4EB4_CY24J5BIX0010-cayenne-side.png";
import imgTaycanBase from "../../assets/images/Taycan.avif";
import imgMacanGTS from "../../assets/images/Macan_GTS.avif";

const categories = [
  { label: "SUV", img: suv, path: "/shop/SUV" },
  { label: "Sports", img: sport, path: "/shop/Sports" },
  { label: "Electric", img: electric, path: "/shop/Electric" },
  { label: "Sedan", img: sedan, path: "/shop/Sedan" },
];

const gallerySlides = [
  {
    title: "911",
    slogan: "You can't hide who you are",
    logoText: "911",
    submodels: [
      { name: "911 Carrera", img: img911Carrera, exploreLink: "/shop", brochureLink: "#" },
      { name: "911 GT3 RS", img: imgGT3RS, exploreLink: "/shop", brochureLink: "#" }
    ]
  },
  {
    title: "Cayenne",
    slogan: "Dare to live more",
    logoText: "Cayenne",
    submodels: [
      { name: "Cayenne Coupe", img: cayenee, exploreLink: "/shop", brochureLink: "#" },
      { name: "Cayenne SUV", img: imgCayenneSUV, exploreLink: "/shop", brochureLink: "#" }
    ]
  },
  {
    title: "Taycan",
    slogan: "Soul, electrified",
    logoText: "Taycan",
    submodels: [
      { name: "Taycan Turbo S", img: taycanImg, exploreLink: "/shop", brochureLink: "#" },
      { name: "Taycan", img: imgTaycanBase, exploreLink: "/shop", brochureLink: "#" }
    ]
  },
  {
    title: "Macan",
    slogan: "Keep your essence",
    logoText: "Macan",
    submodels: [
      { name: "Macan Electric", img: macanImg, exploreLink: "/shop", brochureLink: "#" },
      { name: "Macan GTS", img: imgMacanGTS, exploreLink: "/shop", brochureLink: "#" }
    ]
  }
];

const MotionSection = motion.section;
const MotionDiv = motion.div;

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [subTabs, setSubTabs] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });
  const galleryRef = useRef(null);
  const wheelLockRef = useRef(false);
  const wheelTimeoutRef = useRef(null);
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.35 });

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);

  const goToSlide = (step, options = {}) => {
    const { wrap = true } = options;
    setSlideDirection(step > 0 ? 1 : -1);
    setCurrentSlide((index) => {
      const nextIndex = wrap
        ? (index + step + gallerySlides.length) % gallerySlides.length
        : Math.min(gallerySlides.length - 1, Math.max(0, index + step));

      return nextIndex;
    });
  };

  const prev = () => goToSlide(-1);
  const next = () => goToSlide(1);

  const setSubTab = (slideIndex, tabIndex) => {
    const currentTabIndex = subTabs[slideIndex];

    if (currentTabIndex === tabIndex) {
      return;
    }

    setSubTabs((prevTabs) => ({
      ...prevTabs,
      [slideIndex]: tabIndex,
    }));
  };

  const lockWheel = () => {
    wheelLockRef.current = true;

    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current);
    }

    wheelTimeoutRef.current = setTimeout(() => {
      wheelLockRef.current = false;
    }, 850);
  };

  const handleGalleryWheel = (event) => {
    if (!isGalleryInView || Math.abs(event.deltaY) < 28 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    const isAtFirstSlide = currentSlide === 0 && direction < 0;
    const isAtLastSlide = currentSlide === gallerySlides.length - 1 && direction > 0;

    if (isAtFirstSlide || isAtLastSlide) {
      return;
    }

    event.preventDefault();

    if (wheelLockRef.current) {
      return;
    }

    lockWheel();
    goToSlide(direction, { wrap: false });
  };

  const galleryRevealVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.12,
      },
    },
  };

  const galleryItemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const slidePageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      x: "0%",
      transition: {
        duration: 0.48,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      transition: {
        duration: 0.48,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const renderGallerySlide = (slideIndex) => {
    const displayedSlide = gallerySlides[slideIndex];
    const displayedModel = displayedSlide.submodels[subTabs[slideIndex]];
    const previousIndex = (slideIndex - 1 + gallerySlides.length) % gallerySlides.length;
    const nextIndex = (slideIndex + 1) % gallerySlides.length;
    const previousModel = gallerySlides[previousIndex].submodels[subTabs[previousIndex]];
    const nextModel = gallerySlides[nextIndex].submodels[subTabs[nextIndex]];

    return (
      <MotionDiv
        key={`${slideIndex}-${subTabs[slideIndex]}`}
        className={styles.gallerySlideActive}
        variants={slidePageVariants}
        custom={slideDirection}
        initial="enter"
        animate="center"
        exit="exit"
      >
        <div className={styles.slideStage}>
          <div className={styles.slideTexts}>
            <div className={styles.slideLogoContainer}>
              <h2 className={styles.slideTitle}>{displayedSlide.title}</h2>
            </div>
            <p className={styles.slideSlogan}>{displayedSlide.slogan}</p>
          </div>

          <div className={styles.slideArtwork}>
            <div className={`${styles.sidePreview} ${styles.sidePreviewLeft}`}>
              <img
                alt={previousModel.name}
                src={previousModel.img}
                className={styles.sidePreviewImage}
              />
            </div>

            <div className={styles.slideImageContainer}>
              <img
                alt={displayedModel.name}
                src={displayedModel.img}
                className={styles.slideImage}
              />
            </div>

            <div className={`${styles.sidePreview} ${styles.sidePreviewRight}`}>
              <img
                alt={nextModel.name}
                src={nextModel.img}
                className={styles.sidePreviewImage}
              />
            </div>
          </div>

          <div className={styles.slideChildrenContainer}>
            <div className={styles.tabListWrapper}>
              <ul className={styles.tabList}>
                {displayedSlide.submodels.map((sub, idx) => (
                  <li
                    key={idx}
                    onClick={() => setSubTab(slideIndex, idx)}
                    className={`${styles.tabItem} ${subTabs[slideIndex] === idx ? styles.tabSelected : ""}`}
                  >
                    {sub.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.slideActionButtons}>
              <a
                aria-label={`Explore the model ${displayedModel.name}`}
                className={styles.btnExploreSpecial}
                href={displayedModel.exploreLink}
              >
                <span>Explore the model</span>
                <svg aria-hidden="true" className={styles.btnArrowIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4133 6L15.5553 6.92298L19.6739 11.3473H2V12.6527H19.6739L15.5541 17.077L16.4145 18L22 12L16.4145 6H16.4133Z" fill="currentColor"></path>
                </svg>
              </a>
              <a
                className={styles.btnBrochure}
                href={displayedModel.brochureLink}
              >
                <span>Download brochure</span>
                <svg aria-hidden="true" className={styles.btnArrowIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 19V22H4V19H5V21H19V19H20ZM17.853 12.854L17.146 12.147L12.5 16.793V3H11.5V16.793L6.854 12.147L6.147 12.853L12 18.707L17.854 12.853L17.853 12.854Z" fill="currentColor"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </MotionDiv>
    );
  };

  return (
    <>
    <Navbar transparent={true} />
    <div className={styles.home}>
      {/* HERO */}
      <section className={styles.hero}>
       <video
    className={styles.heroVideo}
    autoPlay
    muted
    loop
    playsInline
  >
    <source src={pv} type="video/mp4" />
  </video>
        <div className={styles.heroContent}>

          <h1 className={styles.heroTitle}>
            {"Pure Driving Emotion".split(" ").map((word, i) => (
              <span
                key={i}
                className={styles.word}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className={styles.heroSub}>
            Built for performance. Driven by passion.
          </p>
          <a href='/shop'>
            <button className={styles.btnDark}>Shop Now</button>
          </a>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.categories}>
        <h2>Shop by Category</h2>

        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <Link 
              key={cat.label} 
              to={cat.path} 
              className={styles.categoryCard}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={cat.img} alt={cat.label} />
              <div className={styles.overlay}></div>

              <div className={styles.categoryInfo}>
                <span>{cat.label}</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MODELS */}
      {/* FAMILIES GALLERY CAROUSEL */}
      <MotionSection
        ref={galleryRef}
        className={styles.familiesGallery}
        initial="hidden"
        animate={isGalleryInView ? "visible" : "hidden"}
        variants={galleryRevealVariants}
        onWheel={handleGalleryWheel}
      >
        <div className={styles.galleryInner}>
          
          {/* Controls */}
          <MotionDiv className={styles.galleryControls} variants={galleryItemVariants}>
            <button onClick={prev} className={styles.controlBtn} aria-label="Previous">
              <svg aria-hidden="true" className={styles.arrowIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.646 22.354L5.29297 12L15.647 1.646L16.353 2.353L6.70697 12L16.353 21.646L15.646 22.354Z" fill="currentColor"></path>
              </svg>
              <svg className={styles.hexagonBg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.464 58.271">
                <path pathLength="1" d="M50.464 43.992L25.732 58.271 1 43.992V15.434L25.732 1.155l24.732 14.279z" className={styles.hexagon}></path>
              </svg>
            </button>
            <button onClick={next} className={styles.controlBtn} aria-label="Next">
              <svg aria-hidden="true" className={styles.arrowIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.35397 22.354L7.64697 21.647L17.293 12L7.64697 2.35397L8.35297 1.64697L18.707 12L8.35297 22.354H8.35397Z" fill="currentColor"></path>
              </svg>
              <svg className={styles.hexagonBg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.464 58.271">
                <path pathLength="1" d="M50.464 43.992L25.732 58.271 1 43.992V15.434L25.732 1.155l24.732 14.279z" className={styles.hexagon}></path>
              </svg>
            </button>
          </MotionDiv>

          {/* Active Slide Wrapper */}
          <div className={styles.galleryStageViewport}>
            <AnimatePresence initial={false} mode="sync">
              {renderGallerySlide(currentSlide)}
            </AnimatePresence>
          </div>

        </div>
      </MotionSection>

      {/* E-PERFORMANCE (TAYCAN) */}
      <section className={styles.eperformance}>
        <div className={styles.eperformanceContent}>
          <span className={styles.subTitleLight}>PORSCHE E-PERFORMANCE</span>
          <h2 className={styles.sectionTitleLight}>Electrified Soul.</h2>
          <p className={styles.sectionTextLight}>
            The new Taycan Turbo S. Striking proportions, timeless design, and a perfect blend of performance and everyday usability.
          </p>
          <div className={styles.specsGrid}>
            <div className={styles.specItem}>
              <span className={styles.specVal}>761 hp</span>
              <span className={styles.specLabel}>Overboost Power</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specVal}>2.8 s</span>
              <span className={styles.specLabel}>0-100 km/h with Launch Control</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specVal}>412 km</span>
              <span className={styles.specLabel}>Range (WLTP)</span>
            </div>
          </div>
          <a href="/shop" className={styles.btnOutlineLight}>
            Explore Taycan Models
          </a>
        </div>
        <div className={styles.eperformanceImageContainer}>
          <img src={taycanImg} alt="Porsche Taycan Turbo S" className={styles.eperformanceImage} />
        </div>
      </section>

      {/* MACAN ELECTRIC */}
      <section className={styles.macanSection}>
        <div className={styles.macanImageContainer}>
          <img src={macanImg} alt="Porsche Macan Electric" className={styles.macanImage} />
        </div>
        <div className={styles.macanContent}>
          <span className={styles.subTitleDark}>THE NEW MACAN ELECTRIC</span>
          <h2 className={styles.sectionTitleDark}>Keep your essence.</h2>
          <p className={styles.sectionTextDark}>
            All-electric performance in a compact SUV package. Combining Porsche driving dynamics with the utility of an SUV and next-generation connectivity.
          </p>
          <div className={styles.specsGridDark}>
            <div className={styles.specItemDark}>
              <span className={styles.specValDark}>639 hp</span>
              <span className={styles.specLabelDark}>Max Power</span>
            </div>
            <div className={styles.specItemDark}>
              <span className={styles.specValDark}>3.3 s</span>
              <span className={styles.specLabelDark}>0-100 km/h</span>
            </div>
            <div className={styles.specItemDark}>
              <span className={styles.specValDark}>21 min</span>
              <span className={styles.specLabelDark}>10% to 80% Charging</span>
            </div>
          </div>
          <a href="/shop" className={styles.btnOutlineDark}>
            Discover Macan Electric
          </a>
        </div>
      </section>

      {/* STORY & LIFESTYLE GRID */}
      <section className={styles.storiesSection}>
        <h2 className={styles.storiesTitle}>The Porsche Experience</h2>
        <p className={styles.storiesSubtitle}>Go beyond the driver's seat and discover our world.</p>
        <div className={styles.storiesGrid}>
          
          <div className={styles.storyCard}>
            <img src={sceneMotorsport} alt="Motorsport Heritage" className={styles.storyCardImg} />
            <div className={styles.storyCardOverlay}></div>
            <div className={styles.storyCardContent}>
              <span className={styles.storyCategory}>HERITAGE</span>
              <h3 className={styles.storyTitleText}>Motorsport Legacy</h3>
              <p className={styles.storyDesc}>Explore over seven decades of racing success and engineering innovation.</p>
              <a href="/about" className={styles.storyLink}>Learn More &rarr;</a>
            </div>
          </div>

          <div className={styles.storyCard}>
            <img src={sceneExperience} alt="Porsche Experience" className={styles.storyCardImg} />
            <div className={styles.storyCardOverlay}></div>
            <div className={styles.storyCardContent}>
              <span className={styles.storyCategory}>COMMUNITY</span>
              <h3 className={styles.storyTitleText}>Porsche Experience Centers</h3>
              <p className={styles.storyDesc}>Test your skills and push our sports cars to the limit on dedicated tracks.</p>
              <a href="/about" className={styles.storyLink}>Book Track Day &rarr;</a>
            </div>
          </div>

          <div className={styles.storyCard}>
            <img src={sceneFinder} alt="Porsche Finder" className={styles.storyCardImg} />
            <div className={styles.storyCardOverlay}></div>
            <div className={styles.storyCardContent}>
              <span className={styles.storyCategory}>SERVICES</span>
              <h3 className={styles.storyTitleText}>Porsche Finder</h3>
              <p className={styles.storyDesc}>Search our official database for available new and pre-owned Porsche inventory.</p>
              <a href="/shop" className={styles.storyLink}>Search Inventory &rarr;</a>
            </div>
          </div>

        </div>
      </section>

      <Footer/>
    </div>
    </>
  );
}
