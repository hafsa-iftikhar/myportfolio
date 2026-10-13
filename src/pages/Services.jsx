import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import './Services.css';

const servicesData = [
  {
    id: "01",
    title: "FRONTEND & WEB DEVELOPMENT",
    subtitle: "REACT.JS // JAVASCRIPT // RESPONSIVE DESIGN",
    description:
      "Developing responsive, user-friendly websites and interactive web interfaces using modern frontend technologies. Focused on clean code, intuitive navigation, performance, and seamless user experiences.",
    tags: [
      "React.js",
      "JavaScript",
      "HTML5 / CSS3",
      "Responsive Web Design",
      "REST APIs",
      "Basic Backend Development"
    ],
    previewCode: `<App>
  <ResponsiveLayout />
  <InteractiveComponents />
  <ApiIntegration />
</App>`
  },
  {
    id: "02",
    title: "UI/UX & WEB DESIGN",
    subtitle: "USER EXPERIENCE // INTERFACES // PROTOTYPING",
    description:
      "Designing visually consistent, user-focused interfaces that combine modern aesthetics with intuitive functionality. Translating design concepts into responsive layouts that improve usability and engagement.",
    tags: [
      "UI/UX Design",
      "Figma",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Responsive Interfaces"
    ],
    previewCode: `/* Design System */
:root {
  --charcoal: #141416;
  --maroon: #3b0a11;
  --beige: #f3efe6;
}`
  },
  {
    id: "03",
    title: "E-COMMERCE & CMS DEVELOPMENT",
    subtitle: "WORDPRESS // WOOCOMMERCE // SALLA",
    description:
      "Building and managing e-commerce websites using WordPress, WooCommerce, and Salla. Customizing themes, organizing products and content, improving mobile usability, and implementing SEO best practices.",
    tags: [
      "WordPress",
      "WooCommerce",
      "Salla",
      "Elementor",
      "CMS Management",
      "E-commerce SEO"
    ],
    previewCode: `const store = {
  platform: "WooCommerce",
  responsive: true,
  seoOptimized: true
};`
  },
  {
    id: "04",
    title: "SEO & DIGITAL MARKETING",
    subtitle: "ON-PAGE SEO // ANALYTICS // META ADS",
    description:
      "Improving website visibility through on-page SEO, search performance monitoring, and digital marketing support. Helping businesses strengthen their online presence through optimized content and data-informed strategies.",
    tags: [
      "On-Page SEO",
      "Google Search Console",
      "Meta Ads",
      "Meta Pixel",
      "Content Optimization",
      "Website Performance"
    ],
    previewCode: `const strategy = {
  focus: ["SEO", "Visibility", "Performance"],
  tools: ["Search Console", "Meta Pixel"]
};`
  }
];

const tickerItems = ["FRONTEND ARCHITECTURE", "✦", "UI/UX DESIGN SYSTEMS", "✦", "INTERACTIVE REACT", "✦", "E-COMMERCE SOLUTIONS", "✦"];

export default function Services() {
  const [activeId, setActiveId] = useState("01");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Mouse tilt effect for interactive live hero graphic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    mouseX.set(x);
    mouseY.set(-y);
  };

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <>
      {/******************* SECTION: 01 (HERO WITH BACKGROUND SLIDE-UP ANIMATION) ************************/}
      <section className="services-section-01">
  
  {/* 50/50 DUAL SLIDING BACKGROUND IMAGES */}
  <div className="section-01-split-bg">
    {/* LEFT 50% IMAGE */}
    <motion.div
      className="split-bg-column left-bg-column"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="split-bg-image"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundImage: `url('/images/services2.webp')`
        }}
      />
      <div className="split-bg-overlay" />
    </motion.div>

    {/* RIGHT 50% IMAGE */}
    <motion.div
      className="split-bg-column right-bg-column"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="split-bg-image"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundImage: `url('/images/image2.webp')`
        }}
      />
      <div className="split-bg-overlay" />
    </motion.div>
  </div>

  {/* CENTER OVERLAY TEXT CONTENT (ENTERS FROM RIGHT) */}
  <div className="services-container section-01-content">
    <div className="section-01-text-content">
      <motion.span 
        className="luxe-maroon-tag"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        03 // CAPABILITIES & SERVICES
      </motion.span>
      
      <motion.h1 
        className="services-main-title"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        WEB DEVELOPMENT & DIGITAL <br />
        {/* TYPEWRITER EFFECT ON LAST WORD */}
        <span className="typewriter-word">
          {"SERVICES".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.05,
                delay: 1.3 + index * 0.08,
                ease: "easeIn"
              }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span 
            className="typewriter-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            |
          </motion.span>
        </span>
      </motion.h1>

      <motion.p 
        className="services-header-bio"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 0.95 }}
        transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
      >
        Building high-performance websites and e-commerce platforms with WordPress, Salla, WooCommerce, and modern frontend and backend technologies, with a focus on UI/UX design, SEO, and scalable digital solutions.
        </motion.p>
    </div>
  </div>

</section>

      {/******************* SECTION: 02 (TICKER RIBBON) ************************/}
      <section className="services-section-02">
        <div className="services-ticker-ribbon">
          <motion.div 
            className="ticker-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="ticker-item">{item}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/******************* SECTION: 03 (SERVICES ACCORDION & CTA) ************************/}
      <section className="services-section-03" ref={sectionRef}>
        <div className="services-container">
          
          {/* ACCORDION SERVICES LIST */}
          <div className="services-list-container">
            {servicesData.map((service) => {
              const isOpen = activeId === service.id;

              return (
                <motion.div
                  key={service.id}
                  className={`service-accordion-item ${isOpen ? "is-open" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: parseInt(service.id) * 0.08 }}
                >
                  {/* Accordion Row Bar */}
                  <button
                    className="service-row-button"
                    onClick={() => toggleAccordion(service.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="service-id">{service.id}/</span>
                    <div className="service-title-wrap">
                      <h3 className="service-title-text">{service.title}</h3>
                      <span className="service-subtitle-text">{service.subtitle}</span>
                    </div>
                    <span className="service-toggle-icon">{isOpen ? "−" : "+"}</span>
                  </button>

                  {/* Collapsible Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="service-expand-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="service-expand-grid">
                          <div className="service-expand-inner">
                            <p className="service-description">{service.description}</p>
                            
                            {/* Capability Tags */}
                            <div className="service-tags-wrapper">
                              {service.tags.map((tag, index) => (
                                <span key={index} className="service-tag-pill">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* LIVE CODE TERMINAL PREVIEW */}
                          <div className="service-code-terminal">
                            <div className="terminal-header">
                              <span className="terminal-dot red" />
                              <span className="terminal-dot yellow" />
                              <span className="terminal-dot green" />
                              <span className="terminal-title">capability_preview.jsx</span>
                            </div>
                            <pre className="terminal-body">
                              <code>{service.previewCode}</code>
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* BOTTOM CALL TO ACTION STRIP */}
          <div className="services-cta-strip">
            <div className="cta-content">
              <span className="cta-label">HAVE A PROJECT IN MIND?</span>
              <h3 className="cta-title">LET'S BUILD SOMETHING EXCEPTIONAL.</h3>
            </div>
            <button 
  className="cta-button"
  onClick={() => window.open('https://wa.me/923369387999', '_blank')}
>
  <span>GET IN TOUCH</span>
  <span className="cta-arrow">→</span>
</button>
          </div>

        </div>
      </section>
    </>
  );
}