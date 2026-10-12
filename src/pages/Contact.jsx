import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  // YOUR GMAIL ADDRESS WHERE INQUIRIES WILL BE SENT
  const RECIPIENT_EMAIL = "hafsaiftikhar2003@gmail.com"; 
  const directEmail = "hafsaiftikhar2003@gmail.com";

  const serviceOptions = [
    "Frontend Engineering",
    "E-Commerce Customization",
    "UI/UX & Prototyping",
    "Digital Marketing & SEO"
  ];

  const [selectedService, setSelectedService] = useState("Frontend Engineering");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle copying direct email to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Format the email subject line
    const subject = encodeURIComponent(
      `Portfolio Inquiry: ${selectedService} - ${formData.name}`
    );

    // 2. Format the email body structure
    const bodyContent = 
`Hello,

You have received a new project inquiry from your portfolio website:

• Sender Name: ${formData.name}
• Sender Email: ${formData.email}
• Service Interested In: ${selectedService}

• Project Details & Objectives:
--------------------------------------------------
${formData.message}
--------------------------------------------------`;

    const body = encodeURIComponent(bodyContent);

    // 3. Trigger the browser's native mail client
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;

    // 4. Mark as submitted and clear local input fields
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <section className="contact-page-wrapper">
      <div className="contact-container">
        
        {/* HEADER SECTION */}
        <div className="contact-header">
          <motion.span 
            className="luxe-maroon-tag"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            04 // INQUIRIES & COLLABORATION
          </motion.span>

          <motion.h1 
            className="contact-main-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            LET'S START A <br />
            <span className="serif-italic-title">project</span> TOGETHER
          </motion.h1>
        </div>

        {/* MAIN EDITORIAL GRID */}
        <div className="contact-grid">
          
          {/* LEFT COLUMN: DIRECT DETAILS & AVAILABILITY */}
          <motion.div 
            className="contact-info-col"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="availability-card">
              <span className="pulse-dot" />
              <span className="availability-text"> OPEN TO SELECT PROJECTS & REMOTE COLLABORATIONS </span>
            </div>

            <div className="info-block">
              <span className="info-label">DIRECT EMAIL</span>
              <button className="copy-email-btn" onClick={handleCopyEmail}>
                <span className="email-text">{directEmail}</span>
                <span className="copy-badge">{copied ? "COPIED! " : "CLICK TO COPY"}</span>
              </button>
            </div>

            <div className="info-block">
              <span className="info-label">LOCATION & TIMEZONE</span>
              <p className="info-value">Karachi, Pakistan (PKT // UTC+5)</p>
              <p className="info-subtext">Available for worldwide remote contracts.</p>
            </div>

            <div className="info-block">
              <span className="info-label">SOCIAL CHANNELS</span>
              <div className="social-links-grid">
               <a href="https://github.com/hafsa-iftikhar?tab=repositories" target="_blank" rel="noreferrer" className="social-link">GITHUB ↗</a>
               <a href="https://www.linkedin.com/in/hafsa-iftikhar-3666a224b/" target="_blank" rel="noreferrer" className="social-link">LINKEDIN ↗</a>
               <a href="https://wa.me/923369387999" target="_blank" rel="noreferrer" className="social-link">WHATSAPP ↗</a>
             </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: INTERACTIVE INQUIRY FORM */}
          <motion.div 
            className="contact-form-col"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            {submitted ? (
              <div className="form-success-card">
                <span className="success-icon"></span>
                <h3>EMAIL CLIENT OPENED</h3>
                <p>Your default mail application has been opened with your message pre-filled. Simply click send!</p>
                <button className="reset-btn" onClick={() => setSubmitted(false)}>SEND ANOTHER MESSAGE</button>
              </div>
            ) : (
              <form className="editorial-form" onSubmit={handleSubmit}>
                
                {/* SERVICE SELECTION PILLS */}
                <div className="form-group">
                  <label className="form-label">I'M INTERESTED IN...</label>
                  <div className="service-pills-row">
                    {serviceOptions.map((service, idx) => (
                      <button
                        type="button"
                        key={idx}
                        className={`service-pill ${selectedService === service ? "selected" : ""}`}
                        onClick={() => setSelectedService(service)}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* NAME & EMAIL INPUTS */}
                <div className="form-row-dual">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">YOUR NAME *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="editorial-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">YOUR EMAIL *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="editorial-input"
                    />
                  </div>
                </div>

                {/* MESSAGE INPUT */}
                <div className="form-group">
                  <label className="form-label" htmlFor="message">PROJECT DETAILS *</label>
                  <textarea
                    id="message"
                    required
                    rows="5"
                    placeholder="Tell me about your timeline, scope, and objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="editorial-textarea"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button type="submit" className="contact-submit-btn">
                  <span>OPEN EMAIL & SEND</span>
                  <span className="submit-arrow">→</span>
                </button>

              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}