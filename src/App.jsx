import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = ["Home", "About", "Experience", "Skills", "Projects", "Contact"];

const EXPERIENCES = [
  {
    company: "SCL Life Sciences Ltd",
    role: "Executive – IT",
    period: "Jan 2025 – Present",
    location: "Hyderabad, India",
    color: "#00f5d4",
    icon: "🧬",
    points: [
      "Manage and support enterprise IT infrastructure including Azure cloud, virtualization, and network architecture.",
      "Administer and integrate digital laboratory systems such as ERP, HPLC, GC, UV, IR, Polarimeter, and Metrohm.",
      "Oversee cybersecurity, data governance, and compliance for critical systems.",
      "Lead IT service management activities including ServiceNow, SCCM, Active Directory, firewalls, antivirus, and asset management.",
      "Coordinate with vendors and internal stakeholders to ensure high system availability and performance.",
    ],
  },
  {
    company: "Bargach Finance Pvt. Ltd",
    role: "Senior Executive – IT",
    period: "Mar 2024 – Dec 2024",
    location: "India",
    color: "#f72585",
    icon: "💹",
    points: [
      "Enabled data-driven decision-making by strengthening analytics and reporting capabilities.",
      "Designed and maintained Power BI dashboards for operational and management insights.",
      "Managed IT operations including ERP systems, network security, SCCM, AD, and ServiceNow.",
      "Led vendor coordination and supported IT teams to ensure SLA compliance and system reliability.",
    ],
  },
  {
    company: "Aforeserve Ltd (IDFC First Bank Project)",
    role: "Technical Support Engineer – IT",
    period: "Jun 2023 – Mar 2024",
    location: "India",
    color: "#7209b7",
    icon: "🏦",
    points: [
      "Provided L2/L3 technical support for networking, desktops, and enterprise applications.",
      "Configured and troubleshot TCP/IP, VLANs, VPNs, firewalls, and Wi-Fi networks.",
      "Managed Active Directory, Group Policy, user access, patching, and security policies.",
      "Supported Azure cloud infrastructure and virtualization environments.",
    ],
  },
  {
    company: "TeamLease Pvt. Ltd",
    role: "Senior Technical Support Engineer",
    period: "Sep 2020 – May 2023",
    location: "India",
    color: "#4cc9f0",
    icon: "📡",
    points: [
      "Supported large-scale telecom networks (2G, 3G, 4G LTE) ensuring uptime and performance.",
      "Managed IP networking, routers, switches, and MPLS-based environments.",
      "Implemented and monitored network security solutions including firewalls, IDS/IPS, and VPNs.",
      "Supported VoIP systems (SIP) and performed network performance optimization.",
    ],
  },
  {
    company: "SCOM Technology Ltd",
    role: "Network Engineer",
    period: "Dec 2018 – Sep 2020",
    location: "India",
    color: "#fb8500",
    icon: "🌐",
    points: [
      "Configured and maintained Cisco ISR/ASR routers for enterprise and ISP environments.",
      "Implemented routing protocols including BGP, OSPF, EIGRP, and RIP.",
      "Monitored networks using tools such as SolarWinds and Cisco Prime.",
      "Automated network configurations using Ansible and scripting tools.",
      "Designed QoS policies to prioritize critical voice and video traffic.",
    ],
  },
];

const PROJECTS = [
  {
    title: "Fraud & Anomaly Detection",
    year: "2025",
    description:
      "Developed advanced ML models to detect fraudulent transactions in real-time. Achieved a 30% reduction in false positives through optimized ensemble methods and real-time monitoring pipelines.",
    tags: ["Python", "Random Forest", "Isolation Forest", "ML Pipelines", "Real-time Monitoring"],
    color: "#f72585",
    icon: "🔍",
    metric: "30% ↓ False Positives",
  },
  {
    title: "Customer Churn Prediction",
    year: "2024",
    description:
      "Built robust ML models to predict customer attrition, enabling proactive retention strategies. Evaluated models using Accuracy and ROC-AUC metrics with comprehensive feature engineering.",
    tags: ["Python", "Pandas", "Scikit-learn", "Logistic Regression", "Random Forest", "Gradient Boosting"],
    color: "#7209b7",
    icon: "📉",
    metric: "ROC-AUC Optimized",
  },
  {
    title: "Sales Forecasting",
    year: "2024",
    description:
      "Forecasted sales trends using historical time series data. Implemented multiple forecasting algorithms and evaluated performance using RMSE and MAPE metrics.",
    tags: ["ARIMA", "SARIMA", "Exponential Smoothing", "Pandas", "NumPy", "Time Series"],
    color: "#4cc9f0",
    icon: "📈",
    metric: "RMSE Optimized",
  },
  {
    title: "Job Portal System",
    year: "MCA Project",
    description:
      "Full-stack job portal with resume upload, job search, recruiter dashboard, and automated email notifications. Built with modern React frontend and Node.js backend.",
    tags: ["React.js", "Node.js", "PostgreSQL", "Email Notifications", "Full Stack"],
    color: "#00f5d4",
    icon: "💼",
    metric: "Full Stack App",
  },
  {
    title: "Remote Desktop Access System",
    year: "BCA Project",
    description:
      "Built a remote desktop access system enabling secure remote connections using Python with RDP and SSH protocols. Implemented encryption and session management.",
    tags: ["Python", "RDP", "SSH", "Networking", "Security"],
    color: "#fb8500",
    icon: "🖥️",
    metric: "Secure Remote Access",
  },
  {
    title: "Network Configuration Automation",
    year: "BCA Project",
    description:
      "Automated network device configuration using Python and Bash scripts integrated with Cisco Packet Tracer for testing and validation of network setups.",
    tags: ["Python", "Bash", "Cisco Packet Tracer", "Automation", "Networking"],
    color: "#06d6a0",
    icon: "⚙️",
    metric: "Automated Configs",
  },
];

const SKILLS_DATA = [
  {
    category: "IT Infrastructure & Support",
    icon: "🏗️",
    color: "#00f5d4",
    skills: ["IT Service Management (ITSM)", "Incident Management", "Problem Management", "Change Management", "Asset Management", "Vendor Management", "User & Access Management"],
  },
  {
    category: "Networking",
    icon: "🌐",
    color: "#4cc9f0",
    skills: ["TCP/IP", "VLAN", "VPN", "Wi-Fi Troubleshooting", "Cisco Routers & Switches", "BGP / OSPF / EIGRP", "MPLS", "SolarWinds", "Cisco Prime"],
  },
  {
    category: "Cloud & Virtualization",
    icon: "☁️",
    color: "#7209b7",
    skills: ["Microsoft Azure", "Virtualization", "Cloud Infrastructure Management", "Azure AD", "Cloud Governance"],
  },
  {
    category: "Systems & Tools",
    icon: "🛠️",
    color: "#f72585",
    skills: ["Active Directory", "SCCM", "ServiceNow", "Office 365", "Group Policy (GPO)", "Ansible"],
  },
  {
    category: "Security",
    icon: "🔐",
    color: "#fb8500",
    skills: ["Firewalls", "Antivirus", "IDS/IPS", "Endpoint Security", "Access Control", "Compliance", "Data Governance"],
  },
  {
    category: "Data & Analytics",
    icon: "📊",
    color: "#06d6a0",
    skills: ["Power BI", "SQL", "PostgreSQL", "Python", "Pandas", "NumPy", "Scikit-learn", "Data Cleaning", "Basic Statistics"],
  },
  {
    category: "Development",
    icon: "💻",
    color: "#4361ee",
    skills: ["React.js", "Node.js", "Python", "Bash Scripting", "PostgreSQL", "Time Series Analysis", "ML Pipelines"],
  },
  {
    category: "Laboratory Systems",
    icon: "🔬",
    color: "#560bad",
    skills: ["HPLC", "GC", "ERP Systems", "Metrohm Systems", "UV/IR Instruments", "Polarimeter", "Digital Lab Integration"],
  },
];

const TECH_ORBS = [
  { label: "Azure", icon: "☁️", angle: 0 },
  { label: "Python", icon: "🐍", angle: 45 },
  { label: "Cisco", icon: "🌐", angle: 90 },
  { label: "Linux", icon: "🐧", angle: 135 },
  { label: "SQL", icon: "🗄️", angle: 180 },
  { label: "Power BI", icon: "📊", angle: 225 },
  { label: "React", icon: "⚛️", angle: 270 },
  { label: "Security", icon: "🔐", angle: 315 },
];

function FloatingParticles() {
  return (
    <div className="particles-container" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 10}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}

function TechOrbit() {
  return (
    <div className="tech-orbit-wrapper" aria-label="Tech stack orbit">
      <div className="orbit-ring orbit-ring-1">
        {TECH_ORBS.map((orb, i) => (
          <div
            key={orb.label}
            className="orbit-item"
            style={{ "--orbit-delay": `${i * -3}s`, "--item-index": i }}
            title={orb.label}
          >
            <div className="orbit-bubble">
              <span className="orbit-icon">{orb.icon}</span>
              <span className="orbit-label">{orb.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="orbit-ring orbit-ring-2">
        {["ServiceNow", "Ansible", "Node.js", "SCCM"].map((item, i) => (
          <div
            key={item}
            className="orbit-item orbit-item-sm"
            style={{ "--orbit-delay": `${i * -4}s`, "--item-index": i }}
            title={item}
          >
            <div className="orbit-bubble orbit-bubble-sm">
              <span className="orbit-label-sm">{item}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="orbit-core">
        <div className="orbit-core-inner">
          <span className="orbit-core-text">TECH</span>
          <span className="orbit-core-sub">STACK</span>
        </div>
      </div>
    </div>
  );
}

function Navbar({ active, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-brand">
        <span className="brand-mp">MP</span>
        <span className="brand-dot">.</span>
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className={`nav-link ${active === link.toLowerCase() ? "nav-active" : ""}`}
              onClick={() => { onNav(link.toLowerCase()); setMenuOpen(false); }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <FloatingParticles />
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-dot" />
            Available for Opportunities
          </div>
          <h1 className="hero-name">
            <span className="name-first">Murlidhar</span>
            <br />
            <span className="name-last">Prajapati</span>
          </h1>
          <div className="hero-title-wrap">
            <span className="hero-title-line" />
            <p className="hero-title">Technical Support Engineer</p>
          </div>
          <p className="hero-subtitle">
            IT Infrastructure &amp; Cloud Professional with <strong>6+ years</strong> of experience across
            networking, cloud computing, cybersecurity, and enterprise systems.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">6+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">5</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">30+</span>
              <span className="stat-label">Tech Skills</span>
            </div>
          </div>
          <div className="hero-cta-row">
            <a href="#contact" className="btn-primary">
              <span>Contact Me</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="/resume.pdf" download className="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="profile-pic-wrapper">
            <div className="profile-glow" />
            <div className="profile-ring ring-1" />
            <div className="profile-ring ring-2" />
            <div className="profile-img-frame">
              <img
                src="/profile.jpg"
                alt="Murlidhar Prajapati"
                className="profile-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="profile-fallback" style={{ display: "none" }}>
                <span>MP</span>
              </div>
            </div>
            <div className="profile-badge-float badge-azure">
              <span>☁️ Azure</span>
            </div>
            <div className="profile-badge-float badge-cisco">
              <span>🌐 Cisco</span>
            </div>
            <div className="profile-badge-float badge-python">
              <span>🐍 Python</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">
          <div className="scroll-dot" />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section section-pad">
      <div className="section-container">
        <div className="section-tag">About Me</div>
        <h2 className="section-title">Who I Am</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm a <strong>Results-driven Technical Support Engineer</strong> based in Hyderabad, India,
              with over 6 years of hands-on experience spanning IT infrastructure, enterprise networking,
              cloud computing, cybersecurity, and data analytics.
            </p>
            <p>
              My career has taken me through diverse sectors — from <strong>life sciences</strong> and
              <strong> finance</strong> to <strong>banking</strong> and <strong>telecom</strong> — where I've
              consistently delivered reliable, secure, and scalable IT solutions.
            </p>
            <p>
              I hold a <strong>Master of Computer Applications (MCA)</strong> from Amrita Vishwa
              Vidyapeetham (CGPA 7.6) and am passionate about continuous learning, emerging technologies,
              and contributing to organizational growth through intelligent IT strategy.
            </p>
            <div className="about-info-grid">
              <div className="info-item"><span className="info-label">📍 Location</span><span>Hyderabad, India</span></div>
              <div className="info-item"><span className="info-label">🎂 DOB</span><span>06 May 1998</span></div>
              <div className="info-item"><span className="info-label">🗣️ Languages</span><span>Hindi, English</span></div>
              <div className="info-item"><span className="info-label">🎓 Education</span><span>MCA – IT (CGPA 7.6)</span></div>
              <div className="info-item"><span className="info-label">📧 Email</span><span>prajapatimurlidhar483@gmail.com</span></div>
              <div className="info-item"><span className="info-label">💼 Status</span><span>Open to Opportunities</span></div>
            </div>
          </div>
          <div className="about-orbit-col">
            <TechOrbit />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [activeExp, setActiveExp] = useState(0);
  return (
    <section id="experience" className="experience-section section-pad">
      <div className="section-container">
        <div className="section-tag">Work History</div>
        <h2 className="section-title">Professional Experience</h2>
        <div className="exp-layout">
          <div className="exp-timeline">
            {EXPERIENCES.map((exp, i) => (
              <button
                key={i}
                className={`exp-timeline-item ${activeExp === i ? "exp-active" : ""}`}
                onClick={() => setActiveExp(i)}
                style={{ "--exp-color": exp.color }}
              >
                <div className="exp-timeline-dot" />
                <div className="exp-timeline-info">
                  <span className="exp-timeline-icon">{exp.icon}</span>
                  <div>
                    <div className="exp-timeline-company">{exp.company}</div>
                    <div className="exp-timeline-period">{exp.period}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="exp-detail-panel">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className={`exp-detail ${activeExp === i ? "exp-detail-visible" : "exp-detail-hidden"}`}
                style={{ "--exp-color": exp.color }}
              >
                <div className="exp-detail-header">
                  <div className="exp-detail-icon">{exp.icon}</div>
                  <div>
                    <h3 className="exp-detail-role">{exp.role}</h3>
                    <div className="exp-detail-company">{exp.company}</div>
                    <div className="exp-detail-meta">
                      <span>📅 {exp.period}</span>
                      <span>📍 {exp.location}</span>
                    </div>
                  </div>
                </div>
                <ul className="exp-points">
                  {exp.points.map((pt, j) => (
                    <li key={j} className="exp-point" style={{ animationDelay: `${j * 0.08}s` }}>
                      <span className="exp-point-dot" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="skills-section section-pad">
      <div className="section-container">
        <div className="section-tag">Expertise</div>
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {SKILLS_DATA.map((cat, i) => (
            <div
              key={i}
              className="skill-card"
              style={{ "--skill-color": cat.color, "--card-delay": `${i * 0.07}s` }}
            >
              <div className="skill-card-header">
                <span className="skill-card-icon">{cat.icon}</span>
                <h3 className="skill-card-title">{cat.category}</h3>
              </div>
              <div className="skill-tags">
                {cat.skills.map((sk, j) => (
                  <span key={j} className="skill-tag">{sk}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="skills-3d-section">
          <h3 className="skills-3d-title">Core Technology Stack</h3>
          <div className="tech-cube-grid">
            {[
              { name: "Microsoft Azure", icon: "☁️", desc: "Cloud Infrastructure" },
              { name: "Cisco Networks", icon: "🌐", desc: "Enterprise Routing" },
              { name: "Python", icon: "🐍", desc: "Automation & ML" },
              { name: "ServiceNow", icon: "🎫", desc: "ITSM Platform" },
              { name: "Active Directory", icon: "🏛️", desc: "Identity Management" },
              { name: "Power BI", icon: "📊", desc: "Data Analytics" },
              { name: "SCCM", icon: "🖥️", desc: "Systems Management" },
              { name: "SQL / PostgreSQL", icon: "🗄️", desc: "Database Management" },
            ].map((tech, i) => (
              <div key={i} className="tech-cube" style={{ "--cube-delay": `${i * 0.1}s` }}>
                <div className="tech-cube-face tech-cube-front">
                  <span className="tech-cube-icon">{tech.icon}</span>
                  <span className="tech-cube-name">{tech.name}</span>
                </div>
                <div className="tech-cube-face tech-cube-back">
                  <span className="tech-cube-desc">{tech.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" className="projects-section section-pad">
      <div className="section-container">
        <div className="section-tag">Portfolio</div>
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((proj, i) => (
            <div
              key={i}
              className={`project-card ${hovered === i ? "project-card-hovered" : ""}`}
              style={{ "--proj-color": proj.color, "--proj-delay": `${i * 0.1}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="project-card-glow" />
              <div className="project-card-top">
                <span className="project-icon">{proj.icon}</span>
                <span className="project-year">{proj.year}</span>
              </div>
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.description}</p>
              <div className="project-metric">
                <span className="metric-badge">{proj.metric}</span>
              </div>
              <div className="project-tags">
                {proj.tags.map((tag, j) => (
                  <span key={j} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="section-container">
        <div className="section-tag">Get In Touch</div>
        <h2 className="section-title">Contact Me</h2>
        <p className="contact-intro">
          I'm actively looking for new opportunities. Whether you have a question,
          a project, or just want to connect — my inbox is always open!
        </p>
        <div className="contact-cards-grid">
          <a href="tel:+917999740851" className="contact-card" style={{ "--cc-color": "#00f5d4" }}>
            <div className="contact-card-icon">📱</div>
            <div className="contact-card-body">
              <div className="contact-card-label">Phone</div>
              <div className="contact-card-value">+91 79997 40851</div>
              <div className="contact-card-value">+91 98759 97518</div>
            </div>
          </a>
          <a href="mailto:prajapatimurlidhar483@gmail.com" className="contact-card" style={{ "--cc-color": "#f72585" }}>
            <div className="contact-card-icon">✉️</div>
            <div className="contact-card-body">
              <div className="contact-card-label">Gmail</div>
              <div className="contact-card-value">prajapatimurlidhar483@gmail.com</div>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/murlidhar-prajapati-911474270"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            style={{ "--cc-color": "#4cc9f0" }}
          >
            <div className="contact-card-icon">🔗</div>
            <div className="contact-card-body">
              <div className="contact-card-label">LinkedIn</div>
              <div className="contact-card-value">murlidhar-prajapati-911474270</div>
            </div>
          </a>
          <div className="contact-card" style={{ "--cc-color": "#fb8500" }}>
            <div className="contact-card-icon">📍</div>
            <div className="contact-card-body">
              <div className="contact-card-label">Location</div>
              <div className="contact-card-value">Hyderabad, India</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-mp">MP</span><span className="brand-dot">.</span>
        </div>
        <p className="footer-text">
          Designed & Built by <strong>Murlidhar Prajapati</strong> · Hyderabad, India
        </p>
        <div className="footer-links">
          <a href="mailto:prajapatimurlidhar483@gmail.com" className="footer-link">Email</a>
          <a href="https://www.linkedin.com/in/murlidhar-prajapati-911474270" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="tel:+917999740851" className="footer-link">Phone</a>
        </div>
        <p className="footer-copy">© 2025 Murlidhar Prajapati. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.toLowerCase())).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar active={activeSection} onNav={setActiveSection} />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}