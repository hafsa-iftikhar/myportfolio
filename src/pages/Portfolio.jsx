import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Portfolio.css';

// --- INTERACTIVE UI SCREEN SLIDER HELPER FOR UI/UX PROJECTS ---
function UIScreenSlider({ screens }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % screens.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + screens.length) % screens.length);
  };

  return (
    <div className="ui-screen-slider">
      <img 
        src={screens[activeSlide]} 
        alt={`UI Screen ${activeSlide + 1}`} 
        className="website-screen-img"
      />
      
      {/* OVERLAY NAVIGATION CONTROLS */}
      {screens.length > 1 && (
        <>
          <button type="button" className="slider-arrow prev" onClick={prevSlide}>‹</button>
          <button type="button" className="slider-arrow next" onClick={nextSlide}>›</button>

          {/* DOT INDICATORS */}
          <div className="slider-dots">
            {screens.map((_, idx) => (
              <span
                key={idx}
                className={`slider-dot ${activeSlide === idx ? "active" : ""}`}
                onClick={() => setActiveSlide(idx)}
              />
            ))}
          </div>
        </>
      )}

      <div className="ui-type-badge">
        <span>UI/UX PROTOTYPE ({activeSlide + 1}/{screens.length})</span>
      </div>
    </div>
  );
}

// Portfolio Data with Video Previews & Interactive UI Screen Collections

const portfolioProjects = [
  // =========================================================
  // 01 — CORPORATE WEB DEVELOPMENT
  // =========================================================
  {
    id: 1,
    title: "IC Textile",
    category: "Web Development",
    categoryTag: "Textile Manufacturing",
    client: "IC Textile",
    year: "2026",
    domain: "ictextile.com",
    liveUrl: "https://ictextile.com",
    description:
      "A corporate textile manufacturing website showcasing fabric production, manufacturing capabilities, product information, and business inquiry options through a professional, responsive interface.",
    mediaType: "video",
    videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791880496/icecream.mp4",
    tags: [
      "React.js",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Responsive Design",
      "SEO"
    ],
    caseStudy: {
      challenge:
        "Presenting textile manufacturing services, fabric types, and production capabilities in a professional format for potential business customers.",
      solution:
        "Organized company information, manufacturing processes, and service content into a structured website with responsive layouts and clear inquiry options.",
      architecture: [
        "React.js",
        "JavaScript",
        "HTML5",
        "CSS3",
        "On-Page SEO"
      ],
      highlights: [
        "Fabric and manufacturing service presentation",
        "Responsive website layouts",
        "Structured business information",
        "Customer inquiry functionality"
      ]
    }
  },

  // =========================================================
  // 02 — ACADEMIC PUBLISHING WEBSITE
  // =========================================================
  {
    id: 2,
    title: "Publication Verse",
    category: "Web Development",
    categoryTag: "Research & Publishing",
    client: "Publication Verse",
    year: "2026",
    domain: "publicationverse.com",
    liveUrl: "https://publicationverse.com",
    description:
      "A digital publishing website designed to organize academic research and publication-related content through a structured interface, responsive layouts, and search-friendly content presentation.",
    mediaType: "video",
    videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791883068/publicationverse2.mp4",
    tags: [
      "React.js",
      "JavaScript",
      "CSS3",
      "Responsive Design",
      "Technical SEO"
    ],
    caseStudy: {
      challenge:
        "Organizing research and publication information so visitors can navigate academic content and discover relevant resources.",
      solution:
        "Focused on content organization, intuitive navigation, responsive page layouts, and search engine optimization practices.",
      architecture: [
        "React.js",
        "JavaScript",
        "CSS3",
        "Content Structure",
        "SEO Best Practices"
      ],
      highlights: [
        "Organized publication content",
        "Structured navigation",
        "Responsive interface",
        "Search-friendly page structure"
      ]
    }
  },

  // =========================================================
  // 03 — PACKAGING COMPANY WEBSITE
  // =========================================================
  {
    id: 3,
    title: "Moving Packages",
    category: "Web Development",
    categoryTag: "Packaging Solutions",
    client: "Moving Packages Inc.",
    year: "2026",
    domain: "movingpackages.com",
    liveUrl: "https://movingpackages.com",
    description:
      "A corporate website for a packaging business, presenting packaging solutions, product information, and company services through a modern visual layout and responsive user experience.",
    mediaType: "video",
    videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791880809/movingpackages.mp4",
    tags: [
      "React.js",
      "JavaScript",
      "CSS3",
      "UI/UX Design",
      "Responsive Design",
      "SEO"
    ],
    caseStudy: {
      challenge:
        "Presenting packaging products and business services in a visually engaging format while keeping information accessible across devices.",
      solution:
        "Focused on clear service sections, organized content, responsive styling, and visual elements that support product discovery.",
      architecture: [
        "React.js",
        "JavaScript",
        "CSS3",
        "Responsive Web Design",
        "On-Page SEO"
      ],
      highlights: [
        "Packaging service presentation",
        "Product-focused layouts",
        "Responsive page design",
        "Clear content hierarchy"
      ]
    }
  },

  // =========================================================
  // 04 — SOFTWARE COMPANY WEBSITE
  // =========================================================
  {
    id: 4,
    title: "VectorScape",
    category: "Web Development",
    categoryTag: "Software & Digital Solutions",
    client: "VectorScape",
    year: "2026",
    domain: "vectorscape.io",
    liveUrl: "https://vectorscape.io",
    description:
      "A professional website showcasing software services, technical capabilities, and digital solutions through structured content, modern styling, and responsive web design.",
    mediaType: "video",
    videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791883215/vectorscape2.mp4",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "SEO"
    ],
    caseStudy: {
      challenge:
        "Presenting software services and technical capabilities in a consistent, accessible, and professional digital experience.",
      solution:
        "Focused on semantic page structure, responsive layouts, organized service content, and consistent interface styling.",
      architecture: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Responsive Web Design",
        "On-Page SEO"
      ],
      highlights: [
        "Structured service sections",
        "Responsive layouts",
        "Consistent visual styling",
        "Search-friendly content"
      ]
    }
  },

  // =========================================================
  // 05 — SALLA E-COMMERCE STORE
  // =========================================================
  {
    id: 5,
    title: "Knove Online Store",
    category: "E-Commerce",
    categoryTag: "WordPress & Elementor",
    client: "Knove",
    year: "2026",
    domain: "https://knove.store/",
    liveUrl: "https://knove.store/",
    description:
      "A custom e-commerce storefront built with WordPress and Elementor, focused on immersive product presentation, layout customization, shopping navigation, and a consistent visual identity for apparel retail.",
    mediaType: "video",
    videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791880815/knove.mp4",
    tags: [
      "WordPress",
      "Elementor",
      "WooCommerce",
      "E-Commerce",
      "CSS",
      "UI/UX",
      "SEO"
    ],
    caseStudy: {
      challenge:
        "Creating a cohesive, brand-tailored online storefront using Elementor that presents apparel clearly and provides customers with a smooth, responsive shopping experience.",
      solution:
        "Designed custom Elementor page layouts, refined WooCommerce product grids, and optimized visual styling for a seamless e-commerce journey.",
      architecture: [
        "WordPress CMS",
        "Elementor Page Builder",
        "WooCommerce Store",
        "Custom CSS & Styling",
        "Responsive Mobile Design"
      ],
      highlights: [
        "Custom Elementor template design",
        "Product-focused visual layouts",
        "Streamlined shopping navigation",
        "Mobile-friendly storefront presentation"
      ]
    }
  },

  // =========================================================
  // 06 — JEWELLERY E-COMMERCE WEBSITE
  // =========================================================
  {
    id: 6,
    title: "Rani Pehnava Fine Jewelry",
    category: "E-Commerce",
    categoryTag: "WordPress, Astra & WooCommerce",
    client: "Rani Pehnava",
    year: "2026",
    domain: "raniphennava.com",
    liveUrl: "https://ranipehnava.com/",
    description:
      "A luxury fine jewelry e-commerce website built on WordPress using the Astra theme and WooCommerce, featuring refined product catalogs, secure payment gateway integration, and an elegant editorial shopping experience.",
    mediaType: "video",
    videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791881199/raniphennava.mp4",
    tags: [
      "WordPress",
      "Astra Theme",
      "WooCommerce",
      "Payment Gateways",
      "CSS",
      "UI/UX Design",
      "SEO"
    ],
    caseStudy: {
      challenge:
        "Building a high-end, secure jewelry shopping platform with the Astra theme that handles luxury product catalogs, customized checkout flows, and multiple payment methods.",
      solution:
        "Leveraged the Astra theme and WooCommerce with customized CSS styling to elevate the brand's aesthetic, streamline the cart and checkout process, and integrate secure payment solutions.",
      architecture: [
        "WordPress",
        "Astra Theme",
        "WooCommerce",
        "Secure Payment Gateway Integration",
        "Custom CSS & UI Enhancements"
      ],
      highlights: [
        "Astra theme optimization",
        "Integrated secure payment methods",
        "Customized cart and checkout styling",
        "Refined luxury product presentation"
      ]
    }
  },

  // =========================================================
  // 07 — SALLA BAKERY STORE
  // =========================================================
  {
    id: 7,
    title: "Sondos Bakery Store",
    category: "E-Commerce",
    categoryTag: "Salla E-Commerce (KSA)",
    client: "Sondos Bakery",
    year: "2026",
    domain: "bakery.salla.sa",
    liveUrl: "https://salla.sa",
    description:
      "A specialized bakery e-commerce storefront built on the Salla platform for a client in Saudi Arabia, featuring localized payment integrations, Arabic-English bilingual support, and appetizing product presentation.",
    mediaType: "video",
    videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791881985/sondos.mp4",
    tags: [
      "Salla",
      "E-Commerce",
      "KSA Market",
      "Store Customization",
      "Payment Gateways",
      "Bilingual SEO",
      "UI/UX"
    ],
    caseStudy: {
      challenge:
        "Developing a high-converting bakery storefront tailored for the Saudi Arabian market, integrating local payment methods, and organizing an extensive catalog of baked goods with rich visual appeal.",
      solution:
        "Configured the Salla platform with localized theme styling, structured category hierarchies, bilingual metadata for regional shoppers, and seamless Saudi payment gateways.",
      architecture: [
        "Salla E-Commerce Platform",
        "KSA Payment Gateway Integration",
        "Storefront Customization & CSS",
        "Bilingual Product Organization",
        "Regional SEO Best Practices"
      ],
      highlights: [
        "Tailored for the Saudi Arabian market",
        "Local payment method integration",
        "Appetizing product catalog layout",
        "Bilingual shopping navigation"
      ]
    }
  },

  // =========================================================
  // 08 — PACKAGING INTERACTION CONCEPT
  // =========================================================
  
{
  // =========================================================
  // 08 — APPLE WATCH UI/UX PROTOTYPE
  // =========================================================
  id: 8,
  title: "Apple Watch - UI/UX Prototype",
  category: "UI/UX Design",
  categoryTag: "Interactive Figma Prototype",
  client: "Concept Design",
  year: "2026",
  domain: "movingpackages.com/3d-hero",
  liveUrl: "https://www.figma.com/proto/j87DPDmiRev2tg8QKvqhAv/Apple-Watch?node-id=8-495&p=f&viewport=32%2C210%2C0.13&t=5MaWq1zULMPJ2aGG-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A105&page-id=0%3A1",
  description:
    "An interactive Apple Watch interface concept designed in Figma, exploring screen layouts, intuitive navigation, clickable interactions, and a streamlined smartwatch user experience.",
  mediaType: "video",
  videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791881935/watches.mp4",
  tags: [
    "Figma",
    "UI/UX Design",
    "Interactive Prototyping",
    "Wireframing",
    "User Flows",
    "Interface Design"
  ],
  caseStudy: {
    challenge:
      "Designing a compact smartwatch interface that presents information clearly and makes interactions simple on a small screen.",
    solution:
      "Created a visual interface concept in Figma with connected prototype screens to demonstrate navigation, interactions, and the overall user journey.",
    architecture: [
      "Figma UI Design",
      "Interactive Prototyping",
      "Screen Layouts",
      "User Flow Design"
    ],
    highlights: [
      "Clickable prototype interactions",
      "Smartwatch interface concepts",
      "Screen-to-screen navigation",
      "Compact interface design"
    ]
  }
},

{
  // =========================================================
  // 09 — DR PEPPER BRANDING & DIGITAL DESIGN
  // =========================================================
  id: 9,
  title: "Dr Pepper - Branding & UI Design",
  category: "Branding & UI/UX",
  categoryTag: "Brand Identity & Digital Design",
  client: "Concept Design",
  year: "2026",
  domain: "aetheria.design",
  liveUrl: "https://www.figma.com/proto/StWWjtUfnNv3X2hnKLaVy2/Dr-Papper-design?node-id=6-2&p=f&viewport=43%2C386%2C0.11&t=EVrIklj3vKe6AEc0-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=6%3A2&page-id=0%3A1",
  description:
    "A creative Dr Pepper brand design concept exploring bold visual identity, promotional graphics, typography, and digital layouts inspired by the brand's distinctive personality.",
  mediaType: "video",
  videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791880498/can.mp4",
  tags: [
    "Branding",
    "Figma",
    "Visual Design",
    "Typography",
    "Digital Marketing",
    "UI Design"
  ],
  caseStudy: {
    challenge:
      "Creating a cohesive visual direction that captures the brand's bold personality across digital promotional materials.",
    solution:
      "Explored brand-inspired typography, color combinations, product-focused compositions, and digital design layouts.",
    architecture: [
      "Figma",
      "Brand-Inspired Visual Design",
      "Typography",
      "Digital Layout Design"
    ],
    highlights: [
      "Beverage branding concept",
      "Product-focused visual composition",
      "Promotional design exploration",
      "Consistent visual direction"
    ]
  }
},

{
  // =========================================================
  // 10 — ICE CREAM BRANDING & DIGITAL DESIGN
  // =========================================================
  id: 10,
  title: "Ice Cream - Branding & Digital Experience",
  category: "Branding & UI/UX",
  categoryTag: "Product Branding & Visual Design",
  client: "Concept Design",
  year: "2026",
  domain: "vortexmotion.io",
  liveUrl: "https://www.figma.com/proto/ZMbJ0QyHCUMowhOWyXFzjN/Ice-Cream?node-id=2011-3&p=f&viewport=727%2C222%2C0.18&t=NAaTd6YOrMFo5qqV-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2011%3A3&page-id=0%3A1",
  description:
    "An ice cream branding concept combining product-focused visuals, creative typography, color direction, and engaging digital layouts to create an appealing dessert brand experience.",
  mediaType: "video",
  videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791880496/icecream.mp4",
  tags: [
    "Branding",
    "Figma",
    "UI/UX Design",
    "Visual Storytelling",
    "Product Presentation",
    "Digital Design"
  ],
  caseStudy: {
    challenge:
      "Developing an appealing visual identity that communicates the product's personality and creates a consistent brand experience.",
    solution:
      "Explored product imagery, typography, color palettes, and digital compositions to create a cohesive branding direction.",
    architecture: [
      "Figma",
      "Visual Identity Concepts",
      "Typography",
      "Digital Composition"
    ],
    highlights: [
      "Ice cream branding concept",
      "Product-focused visual design",
      "Creative color direction",
      "Digital promotional layouts"
    ]
  }
},

  // =========================================================
  // 11 — INTERACTIVE PRODUCT DESIGN CONCEPT
  // =========================================================

{
  id: 11,
  title: "LMS Portal - Interactive Figma Prototype",
  category: "UI/UX Design",
  categoryTag: "Learning Portal UI/UX",
  client: "Portfolio Concept",
  year: "2026",
  domain: "kinetix3d.com",
  liveUrl: "file:///C:/Users/92336/OneDrive/Desktop/figma%20designs/asis_student_information_system.html",
  description:
    "An interactive Learning Management System (LMS) portal prototype designed in Figma. The interface concept focuses on organizing learning content, presenting course information, and creating a simple, user-friendly experience for students navigating a digital learning platform.",
  mediaType: "video",
  videoUrl: "https://res.cloudinary.com/yqgsavod/video/upload/v1791881164/portalfigma.mp4",
  tags: [
    "Figma",
    "UI/UX Design",
    "LMS Portal",
    "Interactive Prototyping",
    "Dashboard Design",
    "User Flow Design"
  ],
  caseStudy: {
    challenge:
      "Exploring how a learning portal can present educational content and navigation in a clear, organized, and accessible way.",
    solution:
      "Designed connected Figma screens with organized portal layouts and clickable interactions to demonstrate the learning platform's intended user journey.",
    architecture: [
      "Figma",
      "Dashboard UI Design",
      "Interactive Prototyping",
      "User Flow Design"
    ],
    highlights: [
      "Learning portal interface concept",
      "Dashboard-focused layout",
      "Clickable screen navigation",
      "Student-centered user experience"
    ]
  }
}
];

const categories = ["All", "Web Development", "Interactive 3D", "E-Commerce"];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const filteredProjects = activeFilter === "All"
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeFilter);

  return (
    <div className="portfolio-page-wrapper">
      
      {/******************* SECTION 01: HERO WITH BG & ANIMATED HEADING ************************/}
      <section className="portfolio-hero-section">
        
        {/* Full-bleed Editorial Video / Ambient Background */}
        <div className="portfolio-hero-bg">
          <motion.div
            className="hero-image-wrapper"
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/images/bg.webp"
              alt="Portfolio Editorial Background"
              className="hero-ambient-img"
            />
          </motion.div>
          <div className="hero-bg-overlay" />
        </div>

        {/* HERO CONTENT AREA */}
        <div className="portfolio-container hero-content-container">
          <div className="hero-text-block">
            
            <motion.span 
              className="luxe-maroon-tag"
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              04 // SELECTED WORK & CASE STUDIES
            </motion.span>

            <motion.h1 
              className="portfolio-hero-title"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              SELECTED WORK & DIGITAL SOLUTIONS
            </motion.h1>

            <motion.p
              className="portfolio-hero-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              A curated collection of web development projects, interactive UI/UX designs, and eCommerce solutions, showcasing my approach to building responsive, user focused, and SEO-friendly digital experiences.
            </motion.p>

          </div>
        </div>
      </section>

      {/******************* SECTION 02: PROJECTS GRID WITH VIDEO/UI PREVIEWS ************************/}
      <section className="portfolio-grid-section">
        <div className="portfolio-container">
          
          {/* FILTER PILLS */}
          <div className="portfolio-filter-bar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* BROWSER FRAME PROJECT GRID */}
          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="editorial-project-card"
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* SAFARI / MAC BROWSER MOCKUP CONTAINER */}
                  <div className="browser-mockup-frame">
                    {/* BROWSER HEADER BAR */}
                    <div className="browser-top-bar">
                      <div className="browser-dots">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <div className="browser-url-pill">
                        <span className="lock-icon">🔒</span>
                        <span className="url-text">{project.domain}</span>
                      </div>
                      <span className="browser-year-tag">{project.year}</span>
                    </div>

                    {/* DYNAMIC MEDIA VIEWPORT: VIDEO OR UI SCREEN SLIDER */}
                    <div className="browser-video-viewport">
                      {project.mediaType === "ui-gallery" ? (
                        <UIScreenSlider screens={project.uiScreens} />
                      ) : (
                        <video
                          controls
                          playsInline
                          poster={project.posterUrl}
                          className="website-screen-video"
                        >
                          <source src={project.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>

                  {/* PROJECT METADATA & DESCRIPTION */}
                  <div className="project-card-details">
                    <div className="project-meta-row">
                      <span className="project-cat-tag">{project.categoryTag}</span>
                      <span className="project-client">{project.client}</span>
                    </div>

                    <h3 className="project-display-title">{project.title}</h3>
                    <p className="project-editorial-desc">{project.description}</p>

                    {/* TECH STACK TAGS */}
                    <div className="project-tech-pills">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="tech-pill">{tag}</span>
                      ))}
                    </div>

                    {/* TWO ACTION OPTIONS */}
                    <div className="project-actions-row">
                      {/* OPTION 1: EXPLORE LIVE SITE */}
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-primary-action"
                      >
                        EXPLORE SITE <span>↗</span>
                      </a>

                      {/* OPTION 2: OPEN CASE STUDY MODAL */}
                      <button 
                        className="btn-secondary-action"
                        onClick={() => setSelectedCaseStudy(project)}
                      >
                        CASE STUDY <span>+</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CASE STUDY MODAL / DRAWER */}
          <AnimatePresence>
            {selectedCaseStudy && (
              <motion.div 
                className="case-study-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCaseStudy(null)}
              >
                <motion.div 
                  className="case-study-modal"
                  initial={{ scale: 0.9, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, y: 30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="modal-close-btn"
                    onClick={() => setSelectedCaseStudy(null)}
                  >
                    ✕
                  </button>

                  <div className="modal-header">
                    <span className="modal-tag">{selectedCaseStudy.categoryTag} // {selectedCaseStudy.year}</span>
                    <h2 className="modal-title">{selectedCaseStudy.title}</h2>
                    <p className="modal-client">Client: {selectedCaseStudy.client}</p>
                  </div>

                  <div className="modal-body">
                    <div className="modal-section">
                      <h4>THE CHALLENGE</h4>
                      <p>{selectedCaseStudy.caseStudy.challenge}</p>
                    </div>

                    <div className="modal-section">
                      <h4>THE SOLUTION & APPROACH</h4>
                      <p>{selectedCaseStudy.caseStudy.solution}</p>
                    </div>

                    <div className="modal-section">
                      <h4>KEY HIGHLIGHTS</h4>
                      <ul>
                        {selectedCaseStudy.caseStudy.highlights.map((item, idx) => (
                          <li key={idx}>✦ {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="modal-section">
                      <h4>ARCHITECTURE & TECH STACK</h4>
                      <div className="modal-tech-pills">
                        {selectedCaseStudy.caseStudy.architecture.map((tech, idx) => (
                          <span key={idx} className="tech-pill">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <a 
                      href={selectedCaseStudy.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary-action"
                    >
                      VISIT LIVE WEBSITE ↗
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </div>
  );
}