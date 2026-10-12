import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import * as THREE from 'three';
import './About.css';

/* ==========================================================================
   1. THREE.JS BACKGROUND CANVAS COMPONENT
   ========================================================================== */
function LiveThreeCanvas({ scrollProgress }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Position sphere on right side on larger screens
    const isMobile = window.innerWidth < 1024;
    mainGroup.position.x = isMobile ? 0 : 1.8;

    // 1. Core Sphere Mesh (Beige Wireframe)
    const coreGeometry = new THREE.IcosahedronGeometry(1.3, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf3efe6,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0xd4c3a3,
      emissiveIntensity: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 2. Inner Glowing Mesh
    const innerGeometry = new THREE.IcosahedronGeometry(0.75, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xf3efe6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mainGroup.add(innerMesh);

    // 3. Dynamic Ambient Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const beigeColor = new THREE.Color('#f3efe6');
    const goldColor = new THREE.Color('#d4c3a3');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;

      const col = beigeColor.clone().lerp(goldColor, Math.random());
      colors[i] = col.r;
      colors[i + 1] = col.g;
      colors[i + 2] = col.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // Lights
    const pointLight = new THREE.PointLight(0xf3efe6, 4, 12);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Cursor Movement Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);

      const isMobileNow = window.innerWidth < 1024;
      mainGroup.position.x = isMobileNow ? 0 : 1.8;
    };

    window.addEventListener('resize', handleResize);

    // Render Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreMesh.rotation.y = elapsedTime * 0.18 + targetX * 0.4;
      coreMesh.rotation.x = elapsedTime * 0.12 + targetY * 0.4;

      innerMesh.rotation.y = -elapsedTime * 0.25;
      particles.rotation.y = elapsedTime * 0.03 + targetX * 0.1;

      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.08;

      if (scrollProgress) {
        const s = scrollProgress.get();
        mainGroup.rotation.z = s * Math.PI * 0.4;
        mainGroup.scale.setScalar(1 - s * 0.25);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scrollProgress]);

  return <div className="three-live-bg" ref={containerRef} />;
}

/* ==========================================================================
   2. REUSABLE ANIMATED HEADING HELPER
   ========================================================================== */
function AnimatedHeading({ text, className = "", tag = "h1" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  const Tag = tag;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotate: 2 },
    visible: {
      y: "0%",
      opacity: 1,
      rotate: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag className={`animated-heading-mask ${className}`} ref={ref}>
      <motion.span
        className="animated-heading-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <span key={index} className="word-clip">
            <motion.span className="word-inner" variants={wordVariants}>
              {word}&nbsp;
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ==========================================================================
   3. SECTION 02 HELPER COMPONENTS
   ========================================================================== */
function AnimatedLine({ className = "horizontal-luxe-line" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "left center" }}
    />
  );
}

function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="metric-display-number"
    >
      {value}
    </motion.span>
  );
}

/* ==========================================================================
   4. SECTION 02 (BEIGE BACKGROUND OVERVIEW SECTION)
   ========================================================================== */
function SectionTwo() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section className="about-section-two" ref={sectionRef}>
      <motion.div 
        className="section-two-container"
        style={{ y: sectionY, opacity: sectionOpacity }}
      >
        {/* TOP ROW: EDITORIAL OVERVIEW */}
        <div className="editorial-hero-grid">
          {/* Left Column: Portrait Image */}
          <div className="badge-hero-side">
            <motion.div
              className="editorial-image-frame"
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
            >
              <div className="image-overlay-glow" />
              <img 
                src="/images/image1.webp" 
                alt="Hafsa Iftikhar" 
                className="profile-portrait-img"
              />
              <div className="image-caption-badge">
                <span className="caption-dot"></span>
                <span>HAFSA IFTIKHAR // 2026</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Short Bio Overview */}
          <div className="editorial-profile-side">
            <span className="luxe-maroon-tag">01 / OVERVIEW</span>

            <AnimatedHeading
              text="Web Development & Digital Experiences"
              tag="h3"
              className="profile-statement-title"
            />

            <AnimatedLine className="vertical-accent-divider" />

            <motion.p
              className="profile-narrative-p"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
            I create responsive websites and engaging digital experiences
            using modern frontend technologies and WordPress. With a focus
            on UI/UX design, SEO, and performance, I turn ideas into
            functional, user friendly websites that help businesses
            strengthen their online presence.
            </motion.p>
          </div>
        </div>

        {/* BOTTOM ROW: METRICS STRIP */}
        <div className="editorial-metrics-strip">
          <div className="metric-column">
            <Counter value="2+" />
            <p className="metric-display-caption">Years of Experience</p>
          </div>
          <div className="metric-column center-premium-border">
            <Counter value="10+" />
            <p className="metric-display-caption">Completed Projects</p>
          </div>
          <div className="metric-column">
            <Counter value="3+" />
            <p className="metric-display-caption">Core Specializations</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ==========================================================================
   SECTION 03: DETAILED BACKGROUND & PHILOSOPHY
   ========================================================================== */
function SectionThree() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section className="about-section-three" ref={sectionRef}>
      <motion.div 
        className="section-three-container"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="detail-editorial-grid">
          {/* LEFT SIDE: HEADING */}
          <div className="detail-heading-side">
            <span className="luxe-maroon-tag">02 / PHILOSOPHY & JOURNEY</span>
            
            <AnimatedHeading
              text="CRAFTING DIGITAL ELEGANCE THROUGH CODE & DESIGN."
              tag="h2"
              className="detail-main-heading"
            />

            <AnimatedLine className="vertical-accent-divider detail-divider" />
          </div>

          {/* RIGHT SIDE: 3-PARAGRAPH DETAILED BIO */}
          <div className="detail-narrative-side">
            <motion.p
              className="detail-paragraph"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ alignItems: "flex-start", textAlign: "left" }}
            >
             My journey into technology began with a Computer Science
             degree and a passion for creating meaningful digital
             experiences. I combine technical knowledge with creative
             thinking to build responsive, user friendly websites that
             balance functionality, performance, and visual appeal.
            </motion.p>

            <motion.p
              className="detail-paragraph"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My work spans WordPress development, WooCommerce and Salla
              e-commerce solutions, CMS management, frontend development,
              UI/UX design, and search engine optimization. From creating
              responsive layouts and managing website content to optimizing
              user experiences, I focus on building functional, engaging
              digital platforms that support business growth.
            </motion.p>

            <motion.p
              className="detail-paragraph"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              I believe great websites bring together thoughtful design,
              clean code, and a clear purpose. With every project, I aim
              to learn, refine my skills, and deliver digital solutions
              that help brands establish a stronger online presence.
              My goal is to keep growing as a developer while creating
              polished, accessible, and engaging web experiences.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
/* ==========================================================================
   5. MAIN PAGE EXPORT COMPONENT
   ========================================================================== */
export default function About() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const smoothHeroScale = useSpring(heroScale, { stiffness: 100, damping: 20 });
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 20 });

  return (
    <main>
      {/* ********** SECTION 01: HERO *********************** */}
      <section className="ugc-hero" ref={containerRef}>
        {/* 3D Canvas Layer with Sphere on Right */}
        <LiveThreeCanvas scrollProgress={scrollYProgress} />

        {/* Ambient Radial Glow on Right */}
        <div className="ambient-glow-orb orb-right" />

        {/* Left-Aligned Name & Content */}
        <motion.div 
          className="ugc-hero__left-container"
          style={{ scale: smoothHeroScale, opacity: smoothHeroOpacity }}
        >
          <AnimatedHeading
            text="HAFSA IFTIKHAR"
            tag="h1"
            className="ugc-hero__title-left"
          />

          <motion.p 
            className="hero-subtitle-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Frontend Engineer & UI/UX Specialist
          </motion.p>
        </motion.div>

        {/* Scroll Mouse Indicator */}
        <motion.div 
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="scroll-mouse-icon">
            <motion.div 
              className="scroll-wheel-dot"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </div>
          <span>Scroll</span>
        </motion.div>
      </section>

      {/* ********** SECTION 02: ABOUT / OVERVIEW *********************** */}
      <SectionTwo />

      {/* ********** SECTION 03: DETAILED BIO *********************** */}
      <SectionThree />    
      
      </main>
  );
}