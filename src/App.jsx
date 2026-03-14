import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = ["Home", "About", "Experience", "Skills", "Projects", "Education", "Contact"];

/* ─── RELIABLE ICON URLS via cdn.simpleicons.org ─── */
const ICON = {
  azure:       "https://cdn.simpleicons.org/microsoftazure/0078D4",
  vmware:      "https://cdn.simpleicons.org/vmware/607078",
  servicenow:  "https://cdn.simpleicons.org/servicenow/81B5A1",
  microsoft:   "https://cdn.simpleicons.org/microsoft/737373",
  cisco:       "https://cdn.simpleicons.org/cisco/1BA0D7",
  paloalto:    "https://cdn.simpleicons.org/paloaltosoftware/FA582D",
  solarwinds:  "https://cdn.simpleicons.org/solarwinds/F4730E",
  crowdstrike: "https://cdn.simpleicons.org/crowdstrike/E8003D",
  snort:       "https://cdn.simpleicons.org/snort/CC0000",
  powerbi:     "https://cdn.simpleicons.org/powerbi/F2C811",
  python:      "https://cdn.simpleicons.org/python/3776AB",
  postgresql:  "https://cdn.simpleicons.org/postgresql/4169E1",
  pandas:      "https://cdn.simpleicons.org/pandas/150458",
  sklearn:     "https://cdn.simpleicons.org/scikitlearn/F7931E",
  react:       "https://cdn.simpleicons.org/react/61DAFB",
  nodejs:      "https://cdn.simpleicons.org/nodedotjs/339933",
  ansible:     "https://cdn.simpleicons.org/ansible/EE0000",
  bash:        "https://cdn.simpleicons.org/gnubash/4EAA25",
  office365:   "https://cdn.simpleicons.org/microsoftoffice/D83B01",
  sap:         "https://cdn.simpleicons.org/sap/0FAAFF",
  linux:       "https://cdn.simpleicons.org/linux/FCC624",
  docker:      "https://cdn.simpleicons.org/docker/2496ED",
  grafana:     "https://cdn.simpleicons.org/grafana/F46800",
};

const EXPERIENCES = [
  {
    company: "SCL Life Sciences Ltd",
    role: "Executive – IT",
    period: "Jan 2025 – Present",
    location: "Hyderabad, India",
    type: "Full-time",
    color: "#00d4ff",
    highlights: [
      "Manage and support enterprise IT infrastructure including Azure cloud, virtualization, and network architecture.",
      "Administer and integrate digital laboratory systems: ERP, HPLC, GC, UV, IR, Polarimeter, and Metrohm.",
      "Oversee cybersecurity, data governance, and compliance for critical pharmaceutical systems.",
      "Lead IT service management activities including ServiceNow, SCCM, Active Directory, firewalls, and asset management.",
      "Coordinate with vendors and internal stakeholders to ensure high system availability and performance.",
    ],
  },
  {
    company: "Bargach Finance Pvt. Ltd",
    role: "Senior Executive – IT",
    period: "Mar 2024 – Dec 2024",
    location: "Hyderabad, India",
    type: "Full-time",
    color: "#a855f7",
    highlights: [
      "Enabled data-driven decision-making by strengthening analytics and reporting capabilities.",
      "Designed and maintained Power BI dashboards for operational and management insights.",
      "Managed IT operations including ERP systems, network security, SCCM, AD, and ServiceNow.",
      "Led vendor coordination and supported IT teams to ensure SLA compliance and system reliability.",
    ],
  },
  {
    company: "Aforeserve Ltd (IDFC First Bank)",
    role: "Technical Support Engineer – IT",
    period: "Jun 2023 – Mar 2024",
    location: "Hyderabad, India",
    type: "Contract",
    color: "#10b981",
    highlights: [
      "Provided L2/L3 technical support for networking, desktops, and enterprise applications.",
      "Configured and troubleshot TCP/IP, VLANs, VPNs, firewalls, and Wi-Fi networks.",
      "Managed Active Directory, Group Policy, user access, patching, and security policies.",
      "Supported Azure cloud infrastructure and virtualization environments for banking operations.",
    ],
  },
  {
    company: "TeamLease Pvt. Ltd",
    role: "Senior Technical Support Engineer",
    period: "Sep 2020 – May 2023",
    location: "India",
    type: "Full-time",
    color: "#f59e0b",
    highlights: [
      "Supported large-scale telecom networks (2G, 3G, 4G LTE) ensuring uptime and peak performance.",
      "Managed IP networking, routers, switches, and MPLS-based environments.",
      "Implemented and monitored network security solutions including firewalls, IDS/IPS, and VPNs.",
      "Supported VoIP systems (SIP) and performed comprehensive network performance optimization.",
    ],
  },
  {
    company: "SCOM Technology Ltd",
    role: "Network Engineer",
    period: "Dec 2018 – Sep 2020",
    location: "India",
    type: "Full-time",
    color: "#f43f5e",
    highlights: [
      "Configured and maintained Cisco ISR/ASR routers for enterprise and ISP environments.",
      "Implemented routing protocols including BGP, OSPF, EIGRP, and RIP.",
      "Monitored networks using tools such as SolarWinds and Cisco Prime.",
      "Automated network configurations using Ansible and scripting tools.",
      "Designed QoS policies to prioritize critical voice and video traffic.",
    ],
  },
];

const SKILLS_DATA = [
  {
    category: "Cloud & Infrastructure",
    emoji: "☁️",
    color: "#0078d4",
    bg: "rgba(0,120,212,0.10)",
    border: "rgba(0,120,212,0.22)",
    skills: [
      { name: "Microsoft Azure",  icon: ICON.azure },
      { name: "VMware / Hyper-V", icon: ICON.vmware },
      { name: "ServiceNow",       icon: ICON.servicenow },
      { name: "SCCM / Intune",    icon: ICON.microsoft },
      { name: "Active Directory", icon: ICON.microsoft },
    ],
  },
  {
    category: "Networking",
    emoji: "🌐",
    color: "#1ba0d7",
    bg: "rgba(27,160,215,0.10)",
    border: "rgba(27,160,215,0.22)",
    skills: [
      { name: "Cisco Routers/Switches", icon: ICON.cisco },
      { name: "TCP/IP & VLANs",         icon: ICON.cisco },
      { name: "VPN & Firewalls",         icon: ICON.paloalto },
      { name: "SolarWinds",              icon: ICON.solarwinds },
      { name: "BGP / OSPF / EIGRP",      icon: ICON.cisco },
    ],
  },
  {
    category: "Cybersecurity",
    emoji: "🔐",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.22)",
    skills: [
      { name: "IDS / IPS (Snort)",   icon: ICON.snort },
      { name: "Endpoint Security",   icon: ICON.crowdstrike },
      { name: "Group Policy (GPO)",  icon: ICON.microsoft },
      { name: "Palo Alto NGFW",      icon: ICON.paloalto },
      { name: "Compliance",          icon: ICON.microsoft },
    ],
  },
  {
    category: "Data & Analytics",
    emoji: "📊",
    color: "#f2c811",
    bg: "rgba(242,200,17,0.08)",
    border: "rgba(242,200,17,0.22)",
    skills: [
      { name: "Power BI",       icon: ICON.powerbi },
      { name: "Python",         icon: ICON.python },
      { name: "PostgreSQL",     icon: ICON.postgresql },
      { name: "Pandas / NumPy", icon: ICON.pandas },
      { name: "Scikit-learn",   icon: ICON.sklearn },
    ],
  },
  {
    category: "Development",
    emoji: "💻",
    color: "#61dafb",
    bg: "rgba(97,218,251,0.08)",
    border: "rgba(97,218,251,0.22)",
    skills: [
      { name: "React.js",     icon: ICON.react },
      { name: "Node.js",      icon: ICON.nodejs },
      { name: "Ansible",      icon: ICON.ansible },
      { name: "Bash / Shell", icon: ICON.bash },
      { name: "Docker",       icon: ICON.docker },
    ],
  },
  {
    category: "ITSM & Office",
    emoji: "🛠️",
    color: "#f97316",
    bg: "rgba(249,115,22,0.10)",
    border: "rgba(249,115,22,0.22)",
    skills: [
      { name: "Microsoft 365",   icon: ICON.office365 },
      { name: "ServiceNow ITSM", icon: ICON.servicenow },
      { name: "SAP ERP",         icon: ICON.sap },
      { name: "Linux Admin",     icon: ICON.linux },
      { name: "Grafana",         icon: ICON.grafana },
    ],
  },
];

const PROJECTS = [
  {
    title: "Customer Churn Prediction",
    desc: "End-to-end ML pipeline predicting customer attrition for business retention. Ensemble methods significantly improved accuracy.",
    tags: ["Python", "Scikit-learn", "Pandas", "Random Forest", "Gradient Boosting"],
    metric: "ROC-AUC Optimised",
    color: "#a855f7",
    icon: "📉",
  },
  {
    title: "Sales Forecasting (Time Series)",
    desc: "Time series models forecasting future sales trends from historical data. Evaluated with RMSE and MAPE for production reliability.",
    tags: ["ARIMA", "SARIMA", "Exponential Smoothing", "Pandas", "NumPy"],
    metric: "RMSE & MAPE Evaluated",
    color: "#10b981",
    icon: "📈",
  },
  {
    title: "Fraud & Anomaly Detection",
    desc: "Real-time ML pipeline detecting fraudulent financial transactions. Achieved a 30% reduction in false positives via Isolation Forest tuning.",
    tags: ["Python", "Random Forest", "Isolation Forest", "Real-time Pipelines"],
    metric: "30% Fewer False Positives",
    color: "#ef4444",
    icon: "🔐",
  },
  {
    title: "Job Portal System",
    desc: "Full-stack job portal with recruiter dashboard, resume upload, semantic job search, and automated email notifications. MCA capstone.",
    tags: ["React.js", "Node.js", "PostgreSQL", "Email API"],
    metric: "Full-Stack Application",
    color: "#00d4ff",
    icon: "💼",
  },
  {
    title: "Remote Desktop Access System",
    desc: "Secure remote desktop access using Python, RDP, and SSH for enterprise remote management with low-latency, high-security access.",
    tags: ["Python", "RDP", "SSH", "Network Security"],
    metric: "BCA Academic Project",
    color: "#f59e0b",
    icon: "🖥️",
  },
  {
    title: "Network Config Automation",
    desc: "Automated Cisco network device configurations via Python and Bash, eliminating manual setup time and configuration drift.",
    tags: ["Python", "Bash", "Cisco Packet Tracer", "Ansible"],
    metric: "Manual Config Eliminated",
    color: "#1ba0d7",
    icon: "⚙️",
  },
];

const STATS = [
  { value: "6+",  label: "Years Experience" },
  { value: "5",   label: "Companies Served" },
  { value: "30%", label: "False Positive Cut" },
  { value: "L3",  label: "Support Expertise" },
];

const FLOAT_BADGES = [
  { name: "Azure",    x: 7,  y: 14, d: 0   },
  { name: "Python",   x: 84, y: 9,  d: 1.2 },
  { name: "Cisco",    x: 76, y: 64, d: 2.4 },
  { name: "React",    x: 10, y: 68, d: 0.8 },
  { name: "SQL",      x: 50, y: 5,  d: 1.8 },
  { name: "Power BI", x: 90, y: 38, d: 3.0 },
  { name: "ITSM",     x: 4,  y: 44, d: 2.0 },
  { name: "Docker",   x: 62, y: 80, d: 0.5 },
];

/* ─── HOOKS ─── */
function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, className = "" }) {
  const [ref, vis] = useVisible();
  return (
    <div ref={ref} className={`reveal ${vis ? "revealed" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Typewriter({ texts }) {
  const [out, setOut]   = useState("");
  const [tIdx, setTIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const cur   = texts[tIdx];
    const speed = del ? 38 : 75;
    const t = setTimeout(() => {
      if (!del) {
        if (cIdx < cur.length) { setOut(cur.slice(0, cIdx + 1)); setCIdx(c => c + 1); }
        else setTimeout(() => setDel(true), 1800);
      } else {
        if (cIdx > 0) { setOut(cur.slice(0, cIdx - 1)); setCIdx(c => c - 1); }
        else { setDel(false); setTIdx(i => (i + 1) % texts.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [cIdx, del, tIdx, texts]);

  return <span className="tw">{out}<span className="tw-cur">|</span></span>;
}

/* ─── NAVBAR ─── */
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setOpen(false);
  };

  return (
    <nav className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <button className="nav__logo" onClick={() => go("Home")}>
        <span className="nav__monogram">MP</span>
        <div className="nav__pulse" />
      </button>

      <button className={`nav__burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="menu">
        <span /><span /><span />
      </button>

      <ul className={`nav__list ${open ? "open" : ""}`}>
        {NAV_LINKS.map(l => (
          <li key={l}>
            <button className={`nav__link ${active === l ? "active" : ""}`} onClick={() => go(l)}>
              {l}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__grid-bg" />
      <div className="hero__orb orb-a" />
      <div className="hero__orb orb-b" />
      <div className="hero__orb orb-c" />

      {FLOAT_BADGES.map(b => (
        <div key={b.name} className="hero__float" style={{ left: `${b.x}%`, top: `${b.y}%`, animationDelay: `${b.d}s` }}>
          {b.name}
        </div>
      ))}

      <div className="hero__content">
        {/* Avatar */}
        <div className="hero__avatar-wrap">
          <span className="avatar__ring r1" />
          <span className="avatar__ring r2" />
          <span className="avatar__ring r3" />
          <img
            src="/profile.jpg"
            alt="Murlidhar Prajapati"
            className="avatar__img"
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
          <div className="avatar__fallback">MP</div>
          <span className="avatar__online" title="Available" />
        </div>

        {/* Copy */}
        <div className="hero__copy">
          <p className="hero__eyebrow">👋 Hello, I'm</p>
          <h1 className="hero__name">
            Murlidhar
            <br />
            <span className="hero__name-grad">Prajapati</span>
          </h1>
          <p className="hero__role">
            <Typewriter texts={[
              "Technical Support Engineer",
              "IT Infrastructure Specialist",
              "Cloud & Azure Professional",
              "Network Engineer",
              "ML & Data Enthusiast",
            ]} />
          </p>
          <p className="hero__bio">
            Results-driven IT professional with <strong>6+ years</strong> of experience spanning cloud infrastructure,
            enterprise networking, cybersecurity, and data analytics — delivering reliable, secure, and scalable solutions.
          </p>

          <div className="hero__ctas">
            <a href="/resume.pdf" download className="cta cta--primary">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
            <button className="cta cta--ghost" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Contact Me
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="hero__chips">
            <span className="chip"><span className="chip-dot cyan" />Hyderabad, India</span>
            <span className="chip"><span className="chip-dot green" />Open to Opportunities</span>
            <span className="chip"><span className="chip-dot purple" />MCA Graduate</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="hero__stats">
        {STATS.map((s, i) => (
          <div key={s.label} className="hstat">
            <span className="hstat__val">{s.value}</span>
            <span className="hstat__lbl">{s.label}</span>
            {i < STATS.length - 1 && <div className="hstat__sep" />}
          </div>
        ))}
      </div>

      <div className="hero__scroll-hint">
        <span>Scroll down</span>
        <div className="scroll-chevron" />
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  const expertise = [
    { icon: "☁️", title: "Cloud & Azure",         desc: "Designing and managing Azure infrastructure including VMs, networking, storage, and cloud-native services." },
    { icon: "🌐", title: "Network Engineering",    desc: "Expert in Cisco routing/switching, BGP, OSPF, VLANs, MPLS, and large-scale enterprise network design." },
    { icon: "🔐", title: "Cybersecurity",          desc: "Deploying IDS/IPS, NGFW, endpoint security, access control, and regulatory compliance frameworks." },
    { icon: "📊", title: "Data & Analytics",       desc: "Building Power BI dashboards, ML pipelines, and time series forecasts with Python and statistical tools." },
    { icon: "🛠️", title: "IT Service Management",  desc: "Driving ITSM via ServiceNow, SCCM, Active Directory and full incident/problem/change management." },
    { icon: "🧪", title: "Pharma Lab Systems",     desc: "Integrating HPLC, GC, IR, ERP and Metrohm digital laboratory systems in GxP-compliant environments." },
  ];

  return (
    <section id="about" className="sec sec--alt">
      <Reveal>
        <div className="sec__head">
          <span className="tag">Who I Am</span>
          <h2 className="sec__title">About <em>Me</em></h2>
          <div className="sec__line" />
        </div>

        <div className="about-grid">
          <div>
            <div className="card card--body">
              <div className="card__bigicon">🎯</div>
              <h3 className="card__h3">Career Objective</h3>
              <p className="card__p">
                Results-driven Technical Support Engineer with 6+ years of hands-on experience across IT
                infrastructure, networking, cloud computing, and enterprise systems. Adept at troubleshooting
                complex technical issues, managing hybrid cloud and on-prem environments, and delivering
                customer-centric IT support at scale.
              </p>
              <p className="card__p" style={{ marginTop: 12 }}>
                Passionate about continuous learning, emerging technologies, and contributing to organisational
                growth through reliable, secure, and high-availability IT solutions.
              </p>
            </div>

            <div className="info-grid">
              {[
                { l: "📍 Location",     v: "Hyderabad, India" },
                { l: "📅 Born",         v: "06 May 1998" },
                { l: "🌐 Languages",    v: "Hindi, English" },
                { l: "🎓 Education",    v: "MCA – Amrita University" },
                { l: "🏳️ Nationality",  v: "Indian" },
                { l: "💼 Status",       v: "Open to Opportunities" },
              ].map(({ l, v }) => (
                <div key={l} className="info-cell">
                  <span className="info-cell__lbl">{l}</span>
                  <span className="info-cell__val">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="expertise-stack">
            {expertise.map(e => (
              <div key={e.title} className="exp-row">
                <div className="exp-row__icon">{e.icon}</div>
                <div>
                  <h4 className="exp-row__title">{e.title}</h4>
                  <p  className="exp-row__desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── EXPERIENCE ─── */
function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="sec">
      <Reveal>
        <div className="sec__head">
          <span className="tag">Career Journey</span>
          <h2 className="sec__title">Professional <em>Experience</em></h2>
          <div className="sec__line" />
        </div>

        <div className="exp-layout">
          <aside className="exp-sidebar">
            {EXPERIENCES.map((e, i) => (
              <button
                key={i}
                className={`exp-tab ${active === i ? "exp-tab--on" : ""}`}
                style={{ "--tc": e.color }}
                onClick={() => setActive(i)}
              >
                <div className="exp-tab__bar" />
                <span className="exp-tab__name">{e.company}</span>
                <span className="exp-tab__period">{e.period}</span>
              </button>
            ))}
          </aside>

          <div className="exp-panels">
            {EXPERIENCES.map((e, i) => (
              <div key={i} className={`exp-panel ${active === i ? "exp-panel--on" : ""}`}>
                <div className="exp-panel__top">
                  <div>
                    <h3 className="exp-panel__role" style={{ color: e.color }}>{e.role}</h3>
                    <p className="exp-panel__co">@ {e.company}</p>
                  </div>
                  <div className="exp-panel__pills">
                    <span className="pill">{e.period}</span>
                    <span className="pill">{e.type}</span>
                    <span className="pill">📍 {e.location}</span>
                  </div>
                </div>
                <ul className="exp-panel__list">
                  {e.highlights.map((h, j) => (
                    <li key={j}>
                      <span className="exp-panel__dot" style={{ background: e.color }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="tl">
          <div className="tl__bar" />
          {EXPERIENCES.map((e, i) => (
            <button key={i} className="tl__node" onClick={() => setActive(i)}>
              <div className={`tl__dot ${active === i ? "tl__dot--on" : ""}`} style={{ "--dc": e.color }} />
              <span className="tl__yr">{e.period.split(" – ")[0]}</span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── SKILLS ─── */
function Skills() {
  const bars = [
    { skill: "IT Infrastructure & Support",  pct: 95, color: "#00d4ff" },
    { skill: "Network Engineering (Cisco)",   pct: 90, color: "#1ba0d7" },
    { skill: "Microsoft Azure / Cloud",       pct: 85, color: "#0078d4" },
    { skill: "Cybersecurity & Compliance",    pct: 82, color: "#ef4444" },
    { skill: "Power BI & Data Analytics",     pct: 78, color: "#f2c811" },
    { skill: "Python & Machine Learning",     pct: 72, color: "#a855f7" },
    { skill: "ServiceNow / ITSM",             pct: 88, color: "#10b981" },
  ];

  return (
    <section id="skills" className="sec sec--alt">
      <Reveal>
        <div className="sec__head">
          <span className="tag">Technical Arsenal</span>
          <h2 className="sec__title">Skills & <em>Technologies</em></h2>
          <div className="sec__line" />
        </div>

        <div className="skills-grid">
          {SKILLS_DATA.map(cat => (
            <div key={cat.category} className="skill-card" style={{ "--cc": cat.color, "--cbg": cat.bg, "--cborder": cat.border }}>
              <div className="skill-card__head">
                <div className="skill-card__icon-wrap">
                  <span className="skill-card__emoji">{cat.emoji}</span>
                </div>
                <h3 className="skill-card__title">{cat.category}</h3>
              </div>
              <div className="skill-card__pills">
                {cat.skills.map(s => (
                  <div key={s.name} className="sk-pill">
                    <img
                      src={s.icon}
                      alt={s.name}
                      className="sk-pill__icon"
                      onError={e => { e.target.style.display = "none"; }}
                    />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="prof-box">
          <h3 className="prof-box__title">Core Proficiency Overview</h3>
          <div className="prof-bars">
            {bars.map(b => (
              <div key={b.skill} className="pbar">
                <div className="pbar__label">
                  <span>{b.skill}</span>
                  <span className="pbar__pct">{b.pct}%</span>
                </div>
                <div className="pbar__track">
                  <div className="pbar__fill" style={{ width: `${b.pct}%`, background: `linear-gradient(90deg,${b.color}88,${b.color})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── PROJECTS ─── */
function Projects() {
  return (
    <section id="projects" className="sec">
      <Reveal>
        <div className="sec__head">
          <span className="tag">What I've Built</span>
          <h2 className="sec__title">Featured <em>Projects</em></h2>
          <div className="sec__line" />
        </div>

        <div className="proj-grid">
          {PROJECTS.map(p => (
            <div key={p.title} className="proj-card" style={{ "--pc": p.color }}>
              <div className="proj-card__top">
                <span className="proj-icon">{p.icon}</span>
                <span className="proj-metric">{p.metric}</span>
              </div>
              <h3 className="proj-card__title">{p.title}</h3>
              <p className="proj-card__desc">{p.desc}</p>
              <div className="proj-card__tags">
                {p.tags.map(t => <span key={t} className="ptag">{t}</span>)}
              </div>
              <div className="proj-card__glow" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── EDUCATION ─── */
function Education() {
  return (
    <section id="education" className="sec sec--alt">
      <Reveal>
        <div className="sec__head">
          <span className="tag">Academic Background</span>
          <h2 className="sec__title">Education & <em>Expertise</em></h2>
          <div className="sec__line" />
        </div>

        <div className="edu-cards">
          <div className="edu-card">
            <div className="edu-card__badge" style={{ background: "linear-gradient(135deg,#00d4ff,#0077aa)" }}>MCA</div>
            <div className="edu-card__body">
              <span className="edu-degree-label">Master of Computer Applications</span>
              <h3 className="edu-uni">Amrita Vishwa Vidyapeetham</h3>
              <p className="edu-loc">Coimbatore, India</p>
              <div className="edu-pills">
                <span className="pill">Aug 2021 – Dec 2024</span>
                <span className="pill pill--hi">CGPA: 7.6 / 10</span>
              </div>
              <p className="edu-proj-row"><span className="edu-proj-label">Capstone: </span>Job Portal System</p>
              <div className="edu-tags">
                {["React.js","Node.js","PostgreSQL","Email Notifications","Recruiter Dashboard"].map(t =>
                  <span key={t} className="ptag">{t}</span>
                )}
              </div>
            </div>
          </div>

          <div className="edu-card">
            <div className="edu-card__badge" style={{ background: "linear-gradient(135deg,#a855f7,#6d28d9)" }}>BCA</div>
            <div className="edu-card__body">
              <span className="edu-degree-label">Bachelor of Computer Applications</span>
              <h3 className="edu-uni">Rajeev Gandhi College</h3>
              <p className="edu-loc">Bhopal, India</p>
              <div className="edu-pills">
                <span className="pill">Aug 2016 – Oct 2020</span>
              </div>
              <div className="edu-list">
                {[
                  "Remote Desktop Access System — Python, RDP, SSH",
                  "Network Config Automation — Python, Bash, Cisco Packet Tracer",
                  "VPN Setup — OpenVPN, Linux, Python",
                ].map(x => (
                  <div key={x} className="edu-list__item">
                    <span className="edu-list__dot" />
                    {x}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="focus-box">
          <h3 className="focus-box__title">Areas of Expertise & Focus</h3>
          <div className="focus-grid">
            {[
              { icon: "☁️", title: "Microsoft Azure",     sub: "Cloud Infrastructure & Services" },
              { icon: "🔐", title: "Cybersecurity",        sub: "IDS/IPS, Firewalls, Compliance" },
              { icon: "🌐", title: "Cisco Networking",     sub: "CCNA-Level Routing & Switching" },
              { icon: "📊", title: "Power BI",             sub: "Business Intelligence & Analytics" },
              { icon: "🤖", title: "Machine Learning",     sub: "Python, Scikit-learn, ML Pipelines" },
              { icon: "🛠️", title: "ITSM / ServiceNow",   sub: "Incident & Change Management" },
            ].map(f => (
              <div key={f.title} className="focus-card">
                <span className="focus-card__icon">{f.icon}</span>
                <div>
                  <div className="focus-card__title">{f.title}</div>
                  <div className="focus-card__sub">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  const items = [
    {
      label: "Primary Phone", value: "+91 79997 40851",
      href: "tel:+917999740851", color: "#10b981",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    },
    {
      label: "Secondary Phone", value: "+91 98759 97518",
      href: "tel:+919875997518", color: "#10b981",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    },
    {
      label: "Email Address", value: "prajapatimurlidhar483@gmail.com",
      href: "mailto:prajapatimurlidhar483@gmail.com", color: "#f59e0b",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
    },
    {
      label: "LinkedIn", value: "murlidhar-prajapati-911474270",
      href: "https://www.linkedin.com/in/murlidhar-prajapati-911474270", color: "#0a66c2",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    },
  ];

  return (
    <section id="contact" className="sec">
      <Reveal>
        <div className="sec__head">
          <span className="tag">Get In Touch</span>
          <h2 className="sec__title">Contact <em>Me</em></h2>
          <div className="sec__line" />
        </div>

        <div className="contact-wrap">
          <p className="contact-intro">
            Open to new opportunities, collaborations, and conversations. Whether you have a project in mind,
            a role to discuss, or simply want to connect — reach out directly.
          </p>

          <div className="contact-grid">
            {items.map(c => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer" className="contact-card" style={{ "--ccc": c.color }}>
                <div className="contact-card__icon" style={{ background: `${c.color}18`, color: c.color }}>
                  {c.icon}
                </div>
                <div className="contact-card__body">
                  <span className="contact-card__lbl">{c.label}</span>
                  <span className="contact-card__val">{c.value}</span>
                </div>
                <span className="contact-card__arrow">→</span>
              </a>
            ))}
          </div>

          <div className="contact-loc">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Based in Hyderabad, India · Available for Remote & On-site Roles
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">MP</span>
          <p>Murlidhar Prajapati · Technical Support Engineer</p>
        </div>
        <div className="footer__links">
          {NAV_LINKS.map(l => (
            <button key={l} className="footer__link"
              onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}>
              {l}
            </button>
          ))}
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} Murlidhar Prajapati — Hyderabad, India</p>
      </div>
    </footer>
  );
}

/* ─── ROOT ─── */
export default function App() {
  const [activeNav, setActiveNav] = useState("Home");

  useEffect(() => {
    const fn = () => {
      const ids = [...NAV_LINKS].reverse();
      for (const id of ids) {
        const el = document.getElementById(id.toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveNav(id); break; }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="app">
      <Navbar active={activeNav} setActive={setActiveNav} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}