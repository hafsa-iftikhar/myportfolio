import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import './Hero.css';

const rolesData = [
  {
  title: "Frontend Developer",
  image: "/images/image1.webp",
},
{
  title: "UI/UX Designer",
  image: "/images/image2.webp",
},
{
  title: "Web & eCommerce Specialist",
  image: "/images/image3.webp",
},
];

const navLinks = [
  { index: "01/", title: "About Me", path: "/about" },
  { index: "02/", title: "Portfolio", path: "/portfolio" },
  { index: "03/", title: "Services & Skills", path: "/services" },
  { index: "04/", title: "Get In Touch", path: "/contact" },
];

// Kinetic Letter Reveal Component
const MotionWord = ({ text, delayOffset = 0, className = "" }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.035,
        delayChildren: delayOffset,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      y: "110%", 
      rotateX: -60,
      opacity: 0 
    },
    visible: { 
      y: "0%", 
      rotateX: 0,
      opacity: 1,
      transition: { 
        duration: 0.95, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <motion.span 
      className={`kinetic-word-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="kinetic-word">
          {word.split("").map((char, cIdx) => (
            <span key={cIdx} className="char-mask">
              <motion.span variants={letterVariants} className="char-inner">
                {char}
              </motion.span>
            </span>
          ))}
          {wIdx < words.length - 1 && <span className="char-space">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
};

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = rolesData[roleIdx];

  // Typewriter Effect Logic
  useEffect(() => {
    const targetText = currentRole.title;
    const typingSpeed = isDeleting ? 40 : 90;
    const pauseTime = 1600;

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(targetText.substring(0, displayText.length + 1));
        if (displayText === targetText) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(targetText.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % rolesData.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIdx, currentRole]);

  return (
    <div className="landing-wrapper">
      
      {/* SECTION 1: Intro Banner with Fullscreen Background Image */}
      <section className="typewriter-hero-wrapper">
        
        {/* Fullscreen Background Image Layer */}
        <AnimatePresence mode="wait">
          {currentRole.image && (
            <motion.div
              key={currentRole.image}
              className="fullscreen-role-bg"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src={currentRole.image} alt={currentRole.title} />
              <div className="full-bg-maroon-overlay" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="typewriter-hero-content">
          
          {/* Large Typewriter Heading */}
          <h1 className="typewriter-title">
            <span>{displayText}</span>
            <span className="typewriter-cursor">|</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="typewriter-subtitle">
            Building responsive websites, intuitive user interfaces,
            and engaging digital experiences optimized for performance and SEO.
          </p>

        </div>
      </section>
      
      {/* SECTION 2: Kinetic Hero Split Panel */}
      <section className="hero-section">
        <div className="hero-container">
          
          {/* Left Panel */}
          <motion.div 
            className="hero-art-panel"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="panel-badge">
              <motion.span 
                className="badge-dot" 
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              /> 
              HAFSA STUDIO // ©2026
            </div>

            {/* Kinetic Animated Heading */}
            <h1 className="hero-main-title">
              <MotionWord text="DIGITAL" delayOffset={0.1} className="title-block" />
              
              <MotionWord text=" Designer" delayOffset={0.35} className="serif-italic-text" />
              <br />
              <MotionWord text="& DEVELOPER" delayOffset={0.6} className="outline-brand-text" />
            </h1>

            <div className="panel-footer-note">
              <motion.span 
                className="architectural-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left center" }}
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
              Designing intuitive interfaces and developing responsive, performance-focused web experiences.
              </motion.p>
            </div>
          </motion.div>

          {/* Right Panel */}
          {/* Right Panel */}
      <motion.div 
        className="hero-nav-panel"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-header">
          <span className="nav-title-label">EXPLORE INDEX</span>
          <motion.span 
            className="deco-star"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            
          </motion.span>
        </div>

        <div className="editorial-links-container">
          {navLinks.map((link, idx) => {
            const targetId = link.title.toLowerCase().split(' ')[0]; // matches id="about", id="portfolio", etc.

            return (
              <motion.button 
                type="button"
                key={link.index} 
                className="editorial-link-row"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + (idx * 0.08), ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                onClick={() => {
                  const element = document.getElementById(targetId);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else if (link.path) {
                    window.location.href = link.path;
                  }
                }}
              >
                <motion.div 
                  className="link-hover-fill"
                  variants={{ hover: { scaleY: 1 } }}
                  initial={{ scaleY: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="link-index">{link.index}</span>
                <motion.span 
                  className="link-title"
                  variants={{ hover: { x: 12, fontStyle: "italic" } }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  {link.title}
                </motion.span>
                <motion.span 
                  className="link-arrow"
                  variants={{ hover: { opacity: 1, x: 0 } }}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  →
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

        </div>
      </section>
    </div>
  );
}