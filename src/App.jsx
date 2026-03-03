import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

/* ─────────────────────────────────────────────
   DATA LAYER
───────────────────────────────────────────── */

const NAV_LINKS = ["About", "Services", "Skills", "Experience", "Projects", "Education", "Certifications", "Contact"];

const PERSONAL = {
  name: "Murlidhar Prajapati",
  title: "Technical Support Engineer",
  subtitle: "IT Infrastructure & Cloud Professional",
  tagline: "Building resilient enterprise IT systems, one solution at a time.",
  summary: `Results-driven Technical Support Engineer with 6+ years of comprehensive experience spanning IT infrastructure, enterprise networking, Microsoft Azure cloud, and mission-critical systems support. I have successfully managed complex, multi-site environments across diverse sectors including life sciences, banking, telecom, and finance — delivering reliable, secure, and scalable IT solutions that power organizational growth.`,
  summary2: `My expertise spans the full spectrum of enterprise IT: from configuring Cisco routers and hardening network security, to administering Azure cloud workloads and integrating specialized laboratory systems. I bring a methodical, customer-first mindset to every challenge, ensuring maximum uptime, seamless operations, and continuous improvement through emerging technologies.`,
  location: "Hyderabad, India",
  email: "prajapatimurlidhar483@gmail.com",
  phone1: "+91 79997 40851",
  phone2: "+91 98759 97518",
  linkedin: "https://www.linkedin.com/in/murlidhar-prajapati-911474270",
  linkedinHandle: "murlidhar-prajapati-911474270",
  dob: "06 May 1998",
  gender: "Male",
  nationality: "Indian",
  languages: ["Hindi", "English"],
};

const STATS = [
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "", label: "Companies Served" },
  { value: 30, suffix: "+", label: "Technologies Mastered" },
  { value: 30, suffix: "%", label: "Fraud False-Positive Reduction" },
  { value: 99, suffix: "%", label: "System Uptime Maintained" },
  { value: 4, suffix: "", label: "Industry Sectors" },
];

const SERVICES = [
  {
    icon: "🏗️",
    title: "IT Infrastructure Management",
    desc: "End-to-end design, deployment, and maintenance of enterprise IT infrastructure — from on-premise server rooms to hybrid cloud architectures. Expert in ensuring high availability, disaster recovery planning, and seamless day-to-day operations.",
    highlights: ["Azure Cloud Architecture", "Virtualization & Hypervisors", "Server Administration", "Disaster Recovery"],
  },
  {
    icon: "🌐",
    title: "Network Engineering",
    desc: "Deep expertise in configuring, optimizing, and securing enterprise-grade networks. From Cisco ISR/ASR routers to MPLS WAN fabrics, VLANs, and BGP/OSPF routing protocols — I design networks that perform under pressure.",
    highlights: ["Cisco Routers & Switches", "BGP / OSPF / EIGRP", "VPN & MPLS", "Wi-Fi & VLAN Design"],
  },
  {
    icon: "🔒",
    title: "Cybersecurity & Compliance",
    desc: "Proactive security posture management including firewall hardening, IDS/IPS deployment, endpoint protection, and regulatory compliance. Ensuring organizational data integrity and safeguarding against evolving cyber threats.",
    highlights: ["Firewall Hardening", "IDS/IPS Monitoring", "Access Control & GPO", "Data Governance"],
  },
  {
    icon: "☁️",
    title: "Microsoft Azure Cloud",
    desc: "Hands-on Azure cloud administration covering resource provisioning, Azure Active Directory, virtual machine management, and cloud infrastructure optimization for enterprise workloads.",
    highlights: ["Azure Resource Management", "Azure Active Directory", "VM & VNet Configuration", "Cloud Cost Optimization"],
  },
  {
    icon: "📊",
    title: "Data Analytics & Reporting",
    desc: "Transforming raw operational data into actionable executive insights through Power BI dashboards, SQL-driven analytics, and custom reporting pipelines that drive smarter business decisions.",
    highlights: ["Power BI Dashboards", "SQL & PostgreSQL", "KPI Reporting", "Data Wrangling"],
  },
  {
    icon: "🤖",
    title: "Machine Learning Solutions",
    desc: "Applied ML engineering for real-world business problems — from customer churn prediction and sales forecasting to real-time fraud detection systems with measurable performance improvements.",
    highlights: ["Scikit-learn Pipelines", "Time Series Forecasting", "Anomaly Detection", "Model Evaluation"],
  },
];

const SKILL_CATEGORIES = [
  {
    cat: "IT Infrastructure & Support",
    icon: "⚙️",
    color: "#00d2ff",
    desc: "Full lifecycle IT service management from incident resolution to vendor coordination.",
    skills: [
      { name: "ITSM / ServiceNow", level: 95 },
      { name: "Incident & Problem Management", level: 92 },
      { name: "Change & Asset Management", level: 88 },
      { name: "User & Access Management", level: 90 },
      { name: "Vendor Coordination", level: 85 },
      { name: "SLA Management", level: 87 },
    ],
  },
  {
    cat: "Networking",
    icon: "🌐",
    color: "#3b82f6",
    desc: "Enterprise and ISP-grade network design, configuration, and performance optimization.",
    skills: [
      { name: "TCP/IP & Subnetting", level: 96 },
      { name: "Cisco Routers & Switches", level: 93 },
      { name: "BGP / OSPF / EIGRP", level: 88 },
      { name: "VLAN & MPLS", level: 90 },
      { name: "VPN Configuration", level: 91 },
      { name: "Wi-Fi & Network Monitoring", level: 86 },
    ],
  },
  {
    cat: "Cloud & Virtualization",
    icon: "☁️",
    color: "#06b6d4",
    desc: "Microsoft Azure administration and virtualization for enterprise workloads.",
    skills: [
      { name: "Microsoft Azure", level: 85 },
      { name: "Azure Active Directory", level: 87 },
      { name: "Virtualization (VMware/Hyper-V)", level: 82 },
      { name: "Cloud Infrastructure", level: 80 },
    ],
  },
  {
    cat: "Systems & Tools",
    icon: "🛠️",
    color: "#8b5cf6",
    desc: "Core enterprise systems administration and endpoint management platforms.",
    skills: [
      { name: "Active Directory", level: 94 },
      { name: "SCCM / Endpoint Management", level: 89 },
      { name: "ServiceNow ITSM", level: 92 },
      { name: "Office 365 Administration", level: 88 },
      { name: "SolarWinds / Cisco Prime", level: 83 },
      { name: "Ansible Automation", level: 76 },
    ],
  },
  {
    cat: "Security",
    icon: "🔒",
    color: "#ef4444",
    desc: "Comprehensive cybersecurity covering prevention, detection, and access control.",
    skills: [
      { name: "Firewall Management", level: 90 },
      { name: "IDS/IPS Systems", level: 85 },
      { name: "Antivirus & Endpoint Security", level: 92 },
      { name: "Group Policy (GPO)", level: 88 },
      { name: "Access Control & Compliance", level: 86 },
    ],
  },
  {
    cat: "Data & Analytics",
    icon: "📊",
    color: "#f5c542",
    desc: "Data-driven reporting and analytics for operational and management insights.",
    skills: [
      { name: "Power BI", level: 85 },
      { name: "SQL / PostgreSQL", level: 80 },
      { name: "Data Cleaning & Wrangling", level: 78 },
      { name: "Python (Pandas / NumPy)", level: 75 },
      { name: "Basic Statistics & ML", level: 72 },
    ],
  },
  {
    cat: "Development",
    icon: "💻",
    color: "#10b981",
    desc: "Full-stack web development and scripting for automation and applications.",
    skills: [
      { name: "React.js", level: 75 },
      { name: "Node.js", level: 72 },
      { name: "Python / Bash Scripting", level: 80 },
      { name: "PostgreSQL", level: 78 },
      { name: "REST APIs", level: 73 },
    ],
  },
  {
    cat: "Lab & Specialized Systems",
    icon: "🔬",
    color: "#f97316",
    desc: "Integration and administration of specialized pharmaceutical laboratory systems.",
    skills: [
      { name: "HPLC / GC Systems", level: 80 },
      { name: "ERP Administration", level: 82 },
      { name: "Metrohm Systems", level: 75 },
      { name: "UV / IR / Polarimeter", level: 72 },
    ],
  },
];

const SOFT_SKILLS = [
  { name: "Problem Solving", icon: "🧩", desc: "Systematic root-cause analysis and creative resolution of complex technical challenges." },
  { name: "Communication", icon: "💬", desc: "Clear, professional communication with both technical teams and non-technical stakeholders." },
  { name: "Team Leadership", icon: "👥", desc: "Mentoring junior engineers, coordinating cross-functional teams, and driving project delivery." },
  { name: "Vendor Management", icon: "🤝", desc: "Effective vendor negotiations, SLA enforcement, and third-party relationship management." },
  { name: "Continuous Learning", icon: "📚", desc: "Passionate about staying current with emerging technologies, certifications, and best practices." },
  { name: "Attention to Detail", icon: "🎯", desc: "Meticulous documentation, configuration management, and quality assurance in every task." },
];

const EXPERIENCES = [
  {
    company: "SCL Life Sciences Ltd",
    role: "Executive – IT",
    period: "Jan 2025 – Present",
    duration: "Present",
    type: "Full-time",
    location: "Hyderabad, India",
    sector: "Life Sciences / Pharma",
    color: "#00d2ff",
    overview: "Leading enterprise IT operations for a regulated pharmaceutical manufacturing environment, managing everything from Azure cloud infrastructure to specialized laboratory instrument integration.",
    points: [
      "Manage and support full enterprise IT infrastructure including Microsoft Azure cloud, on-premise virtualization, and multi-site network architecture.",
      "Administer and integrate digital laboratory systems: ERP, HPLC, GC, UV, IR, Polarimeter, and Metrohm instruments, ensuring 21 CFR Part 11 compliance.",
      "Oversee cybersecurity posture, data governance frameworks, and regulatory compliance for mission-critical pharmaceutical systems.",
      "Lead ITSM activities including ServiceNow ticketing, SCCM endpoint management, Active Directory, firewall administration, antivirus, and IT asset lifecycle management.",
      "Coordinate with OEM vendors and internal stakeholders to maintain high system availability, minimizing downtime across production-critical environments.",
      "Implement and maintain Group Policy Objects (GPO) for standardized desktop configurations and security hardening across the organization.",
    ],
    tags: ["Azure", "SCCM", "ServiceNow", "HPLC", "ERP", "Compliance"],
  },
  {
    company: "Bargach Finance Pvt. Ltd",
    role: "Senior Executive – IT",
    period: "Mar 2024 – Dec 2024",
    duration: "10 months",
    type: "Full-time",
    location: "Hyderabad, India",
    sector: "Finance / NBFC",
    color: "#f5c542",
    overview: "Spearheaded IT operations and data analytics capabilities for a growing non-banking financial company, bridging the gap between raw operational data and executive decision-making.",
    points: [
      "Designed, built, and maintained comprehensive Power BI dashboards providing real-time operational and management-level insights to senior leadership.",
      "Enabled data-driven decision-making by establishing robust analytics pipelines, KPI monitoring frameworks, and automated reporting systems.",
      "Managed end-to-end IT operations including ERP system administration, network security management, SCCM, Active Directory, and ServiceNow.",
      "Led multi-vendor coordination, ensuring SLA compliance, contract adherence, and seamless third-party service integration.",
      "Implemented and enforced IT security policies, access control frameworks, and endpoint protection strategies across the organization.",
      "Provided L2/L3 escalation support for critical issues, maintaining high system reliability and minimal business disruption.",
    ],
    tags: ["Power BI", "ERP", "AD", "ServiceNow", "Analytics", "SLA"],
  },
  {
    company: "Aforeserve Ltd",
    role: "Technical Support Engineer – IT",
    period: "Jun 2023 – Mar 2024",
    duration: "9 months",
    type: "Full-time",
    location: "Hyderabad, India",
    sector: "Banking (IDFC First Bank Project)",
    color: "#8b5cf6",
    overview: "Deployed on-site at IDFC First Bank, delivering L2/L3 enterprise IT support for a large-scale banking environment with stringent security and compliance requirements.",
    points: [
      "Provided expert L2/L3 technical support for networking infrastructure, desktop environments, and critical enterprise banking applications.",
      "Configured and troubleshot complex TCP/IP, VLANs, site-to-site VPNs, firewalls, and enterprise Wi-Fi networks across multiple branch offices.",
      "Administered Active Directory, Group Policy, user access provisioning, security patching cycles, and endpoint security compliance.",
      "Supported Microsoft Azure cloud infrastructure including VM management, Azure AD, and cloud-to-on-prem hybrid connectivity.",
      "Ensured RBI compliance and banking-specific security standards across all managed systems and endpoints.",
      "Documented technical procedures, creating runbooks and knowledge base articles that reduced average ticket resolution time by 25%.",
    ],
    tags: ["Azure", "AD", "TCP/IP", "VLAN", "VPN", "Banking Security"],
  },
  {
    company: "TeamLease Pvt. Ltd",
    role: "Senior Technical Support Engineer",
    period: "Sep 2020 – May 2023",
    duration: "2 years 8 months",
    type: "Full-time",
    location: "India",
    sector: "Telecom",
    color: "#10b981",
    overview: "Senior engineer responsible for large-scale telecom network operations, ensuring the performance and reliability of 2G/3G/4G LTE infrastructure serving millions of subscribers.",
    points: [
      "Monitored, maintained, and optimized large-scale telecom networks (2G, 3G, 4G LTE) ensuring consistent uptime, capacity, and performance KPIs.",
      "Managed IP networking infrastructure including enterprise routers, switches, and MPLS-based WAN environments for high-throughput telecom traffic.",
      "Implemented, monitored, and tuned network security solutions including next-generation firewalls, IDS/IPS, and site-to-site VPN tunnels.",
      "Supported enterprise VoIP systems (SIP protocol), performing in-depth voice quality analysis and network performance optimization.",
      "Collaborated with telecom OSS/BSS teams to ensure seamless service delivery and rapid fault resolution across the network.",
      "Mentored junior support engineers, conducting technical training sessions on networking protocols and troubleshooting methodologies.",
    ],
    tags: ["4G LTE", "MPLS", "VoIP/SIP", "IDS/IPS", "IP Networking", "Firewall"],
  },
  {
    company: "SCOM Technology Ltd",
    role: "Network Engineer",
    period: "Dec 2018 – Sep 2020",
    duration: "1 year 10 months",
    type: "Full-time",
    location: "India",
    sector: "ISP / Enterprise",
    color: "#f97316",
    overview: "Foundation role as a Network Engineer, building deep expertise in Cisco routing and switching, advanced routing protocols, and network automation that forms the technical backbone of subsequent career growth.",
    points: [
      "Configured, maintained, and troubleshot Cisco ISR and ASR series routers for both enterprise LAN/WAN and ISP backbone environments.",
      "Implemented and maintained dynamic routing protocols including BGP for inter-AS routing, OSPF for enterprise IGP, EIGRP, and RIP.",
      "Proactively monitored network health, performance, and fault conditions using SolarWinds NPM and Cisco Prime Infrastructure.",
      "Automated repetitive network configuration tasks using Ansible playbooks and Python/Bash scripting, reducing manual configuration time by 40%.",
      "Designed and implemented QoS policies to prioritize business-critical voice and video traffic, significantly improving user experience.",
      "Performed regular network audits, capacity planning, and documentation updates to maintain accurate network topology diagrams.",
    ],
    tags: ["Cisco ISR/ASR", "BGP", "OSPF", "Ansible", "SolarWinds", "QoS"],
  },
];

const PROJECTS = [
  {
    title: "Customer Churn Prediction",
    subtitle: "Machine Learning · Predictive Analytics",
    desc: "Engineered a comprehensive end-to-end machine learning pipeline to predict customer attrition for a subscription-based business. The solution identifies at-risk customers before they churn, enabling proactive retention campaigns.",
    longDesc: "The project involved extensive feature engineering on behavioral and demographic data, handling class imbalance with SMOTE, and training multiple classification algorithms with hyperparameter tuning via GridSearchCV. Final model comparison used ROC-AUC, precision-recall curves, and business-impact metrics.",
    tools: ["Python", "Pandas", "Scikit-learn", "Logistic Regression", "Random Forest", "Gradient Boosting", "Matplotlib", "Seaborn"],
    metric: "ROC-AUC Optimized",
    metricDetail: "F1 Score: 0.89",
    icon: "◈",
    color: "#00d2ff",
    category: "Machine Learning",
  },
  {
    title: "Sales Forecasting",
    subtitle: "Time Series Analysis · Statistical Modeling",
    desc: "Built an accurate sales forecasting system using advanced time series statistical models. The solution processes historical sales data with seasonality, trend decomposition, and multiple forecasting horizons.",
    longDesc: "Implemented STL decomposition to separate trend and seasonal components before model fitting. Compared ARIMA, SARIMA, and Holt-Winters Exponential Smoothing. Used rolling-origin cross-validation for honest out-of-sample evaluation. Results significantly outperformed naive baselines.",
    tools: ["Python", "ARIMA", "SARIMA", "Exponential Smoothing", "Pandas", "NumPy", "Statsmodels", "Plotly"],
    metric: "RMSE & MAPE Evaluated",
    metricDetail: "15% Forecast Accuracy Gain",
    icon: "◉",
    color: "#f5c542",
    category: "Data Science",
  },
  {
    title: "Fraud & Anomaly Detection",
    subtitle: "Real-Time ML · Financial Security",
    desc: "Developed a production-ready ML system to detect fraudulent financial transactions in real time. Achieved a significant 30% reduction in false positives compared to the existing rule-based system.",
    longDesc: "Combined supervised (Random Forest) and unsupervised (Isolation Forest) approaches for a robust two-stage detection pipeline. Implemented real-time monitoring hooks, automated alerting, and a feedback loop for continuous model retraining on flagged transactions.",
    tools: ["Python", "Random Forest", "Isolation Forest", "Scikit-learn", "Real-time Monitoring", "Pandas", "REST API"],
    metric: "30% ↓ False Positives",
    metricDetail: "Real-time Detection Pipeline",
    icon: "◎",
    color: "#ef4444",
    category: "Machine Learning",
  },
  {
    title: "Job Portal System",
    subtitle: "Full-Stack Web Application · MCA Capstone",
    desc: "Designed and built a fully-featured job portal platform as the MCA capstone project. The platform supports job seekers and recruiters with a complete lifecycle from job posting to application management.",
    longDesc: "Implemented JWT-based authentication, role-based access control (seeker vs recruiter), file upload for resumes via multer, full-text job search with PostgreSQL, automated email notifications via Nodemailer, and a responsive React frontend with recruiter analytics dashboard.",
    tools: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT Auth", "Nodemailer", "REST API"],
    metric: "MCA Capstone Project",
    metricDetail: "Full-Stack · 10+ Features",
    icon: "⬡",
    color: "#10b981",
    category: "Full-Stack Web",
  },
  {
    title: "Remote Desktop Access System",
    subtitle: "Python · RDP · SSH · BCA Project",
    desc: "Built a remote desktop access solution using Python enabling administrators to securely manage remote machines over SSH and RDP protocols, useful for IT support and system administration scenarios.",
    longDesc: "Implemented SSH tunneling via Paramiko, RDP session management, and a simple command-line interface for remote file transfer, command execution, and screen sharing. Includes session logging for security auditing.",
    tools: ["Python", "Paramiko", "RDP Protocol", "SSH", "Socket Programming"],
    metric: "BCA Academic Project",
    metricDetail: "Network Protocol Implementation",
    icon: "▣",
    color: "#8b5cf6",
    category: "Systems / Networking",
  },
  {
    title: "Network Configuration Automation",
    subtitle: "Python · Bash · Cisco Packet Tracer",
    desc: "Automated repetitive Cisco network configuration tasks using Python and Bash scripting, reducing manual configuration effort and eliminating human errors in network provisioning workflows.",
    longDesc: "Created a library of reusable Python modules using Netmiko for SSH-based Cisco CLI automation. Built Ansible-inspired playbook-style YAML configuration files. Simulated and validated in Cisco Packet Tracer before production deployment.",
    tools: ["Python", "Bash", "Netmiko", "Ansible", "Cisco Packet Tracer", "YAML"],
    metric: "40% Time Reduction",
    metricDetail: "Automation · BCA Project",
    icon: "◧",
    color: "#f97316",
    category: "Automation",
  },
];

const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    field: "Information Technology",
    institution: "Amrita Vishwa Vidyapeetham",
    location: "Coimbatore, Tamil Nadu",
    period: "Aug 2021 – Dec 2024",
    grade: "CGPA: 7.6 / 10",
    year: "2024",
    highlights: [
      "Specialized in cloud computing, distributed systems, and machine learning applications.",
      "Capstone Project: Job Portal System — full-stack web application using React.js, Node.js, and PostgreSQL.",
      "Core subjects: Advanced DBMS, Cloud Architecture, Data Mining, Software Engineering, Network Security.",
      "Ranked among top performers in Data Structures and Algorithm Analysis.",
    ],
    color: "#00d2ff",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Information Technology",
    institution: "Rajeev Gandhi College",
    location: "Bhopal, Madhya Pradesh",
    period: "Aug 2016 – Oct 2020",
    grade: "",
    year: "2020",
    highlights: [
      "Built strong foundations in programming, networking fundamentals, and database management.",
      "Academic Project: Remote Desktop Access System using Python, RDP, and SSH.",
      "Academic Project: Network Configuration Automation using Python, Bash, and Cisco Packet Tracer.",
      "Academic Project: VPN Setup using OpenVPN, Linux, and Python.",
    ],
    color: "#f5c542",
  },
];

const CERTIFICATIONS = [
  {
    name: "Microsoft Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    icon: "☁️",
    color: "#0078d4",
    desc: "Foundational understanding of cloud concepts, Azure services, security, privacy, compliance, and Azure pricing.",
    status: "Completed",
  },
  {
    name: "CCNA – Cisco Certified Network Associate",
    code: "CCNA",
    issuer: "Cisco Systems",
    icon: "🌐",
    color: "#00bceb",
    desc: "Comprehensive networking certification covering routing, switching, WAN technologies, security fundamentals, and automation.",
    status: "Completed",
  },
  {
    name: "ITIL Foundation",
    code: "ITIL v4",
    issuer: "AXELOS",
    icon: "⚙️",
    color: "#7b2d8b",
    desc: "IT service management best practices including incident management, problem management, change management, and service desk operations.",
    status: "Completed",
  },
  {
    name: "CompTIA Security+",
    code: "SY0-701",
    issuer: "CompTIA",
    icon: "🔒",
    color: "#c8202f",
    desc: "Core cybersecurity skills including threat analysis, cryptography, identity management, network security, and incident response.",
    status: "In Progress",
  },
];

/* ─────────────────────────────────────────────
   CUSTOM HOOKS
───────────────────────────────────────────── */

function useScrollSpy(sectionIds) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const handler = () => {
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 130) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─────────────────────────────────────────────
   REUSABLE COMPONENTS
───────────────────────────────────────────── */

function TiltCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    ref.current.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
  }, []);
  const handleLeave = useCallback(() => {
    ref.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }, []);
  return (
    <div ref={ref} className={`tilt-card ${className}`} style={style}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

function RevealSection({ children, className = "" }) {
  const [ref, visible] = useIntersectionObserver(0.1);
  return (
    <div ref={ref} className={`reveal-section ${visible ? "reveal-section--visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SkillBar({ name, level, color, delay = 0 }) {
  const [ref, visible] = useIntersectionObserver(0.5);
  return (
    <div ref={ref} className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: visible ? `0 0 12px ${color}66` : "none",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function StatCounter({ value, suffix, label }) {
  const [ref, visible] = useIntersectionObserver(0.5);
  const count = useCountUp(value, 2000, visible);
  return (
    <div ref={ref} className="stat-card">
      <span className="stat-card__num">{count}{suffix}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,210,255,${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,210,255,${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden />;
}

/* ─────────────────────────────────────────────
   SECTION COMPONENTS
───────────────────────────────────────────── */

function HeroSection({ scrollTo }) {
  const [typedText, setTypedText] = useState("");
  const phrases = ["Technical Support Engineer", "IT Infrastructure Expert", "Cloud & Network Specialist", "ML Solutions Developer"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTypedText(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTypedText(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 45 : 80);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="about">
      <ParticleCanvas />
      <div className="hero__inner">
        <div className="hero__content">
          <RevealSection>
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Available for Opportunities
            </div>
            <div className="hero__location-tag">
              <svg viewBox="0 0 24 24" width="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Hyderabad, India
            </div>
            <h1 className="hero__name">
              <span className="hero__name-greeting">Hello, I'm</span>
              <span className="hero__name-main">Murlidhar</span>
              <span className="hero__name-last">Prajapati</span>
            </h1>
            <div className="hero__typewriter">
              <span className="hero__typed">{typedText}</span>
              <span className="hero__cursor">|</span>
            </div>
            <p className="hero__summary">{PERSONAL.summary}</p>
            <div className="hero__meta-row">
              {[["🎓", "MCA — Amrita Vishwa Vidyapeetham"], ["💼", "6+ Years Enterprise IT"], ["🏢", "Currently @ SCL Life Sciences"]].map(([ic, txt]) => (
                <div className="hero__meta-chip" key={txt}><span>{ic}</span>{txt}</div>
              ))}
            </div>
            <div className="hero__cta">
              <button className="btn btn--primary" onClick={() => scrollTo("contact")}>
                <svg viewBox="0 0 24 24" width="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                Contact Me
              </button>
              <a className="btn btn--outline" href="/resume.pdf" download="Murlidhar_Prajapati_Resume.pdf">
                <svg viewBox="0 0 24 24" width="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                Download Resume
              </a>
              <a className="btn btn--ghost" href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                LinkedIn
              </a>
            </div>
          </RevealSection>
        </div>
        <div className="hero__visual-wrap">
          <div className="avatar-system">
            <div className="orbit orbit--3"><div className="orbit__dot" /></div>
            <div className="orbit orbit--2"><div className="orbit__dot" /></div>
            <div className="orbit orbit--1"><div className="orbit__dot" /></div>
            <div className="avatar-core">
              {/* PROFILE PICTURE — save your photo as  public/profile.jpg  (.png and .webp also work) */}
              <img
                src="/profile.jpg"
                alt="Murlidhar Prajapati"
                className="avatar-img"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = e.currentTarget.nextSibling;
                  if (fb) fb.style.display = "flex";
                }}
              />
              {/* Fallback initials — visible only when image file is missing */}
              <div className="avatar-initials" style={{ display: "none" }}>MP</div>
            </div>
            {/* Floating tech badges */}
            {[
              { label: "Azure", top: "8%", left: "65%", delay: "0s" },
              { label: "CCNA", top: "70%", left: "72%", delay: "0.4s" },
              { label: "Power BI", top: "78%", left: "8%", delay: "0.8s" },
              { label: "ServiceNow", top: "12%", left: "2%", delay: "1.2s" },
            ].map((b) => (
              <div key={b.label} className="float-badge" style={{ top: b.top, left: b.left, animationDelay: b.delay }}>
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hero__scroll-cue" onClick={() => scrollTo("services")}>
        <span>Scroll to explore</span>
        <div className="scroll-arrow"><div /></div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="stats-strip">
      <div className="stats-strip__inner">
        {STATS.map((s) => <StatCounter key={s.label} {...s} />)}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <RevealSection>
          <div className="section__header">
            <span className="section__eyebrow">What I Do</span>
            <h2 className="section__title">Core <span>Services</span> & Expertise</h2>
            <p className="section__sub">Delivering end-to-end IT solutions across infrastructure, cloud, security, networking, and data analytics for enterprise environments.</p>
          </div>
        </RevealSection>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <RevealSection key={s.title}>
              <TiltCard className="service-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <ul className="service-card__highlights">
                  {s.highlights.map((h) => (
                    <li key={h}>
                      <span className="highlight-dot" />
                      {h}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [softRef, softVisible] = useIntersectionObserver(0.1);

  return (
    <section className="section section--alt" id="skills">
      <div className="container">
        <RevealSection>
          <div className="section__header">
            <span className="section__eyebrow">Capabilities</span>
            <h2 className="section__title">Technical <span>Skills</span> & Proficiency</h2>
            <p className="section__sub">A deep and broad technical toolkit refined through 6+ years of hands-on enterprise IT work across diverse industries and technology stacks.</p>
          </div>
        </RevealSection>

        {/* Category tabs */}
        <div className="skills-tabs">
          {SKILL_CATEGORIES.map((cat, i) => (
            <button
              key={cat.cat}
              className={`skills-tab ${activeTab === i ? "skills-tab--active" : ""}`}
              style={activeTab === i ? { borderColor: cat.color, color: cat.color } : {}}
              onClick={() => setActiveTab(i)}
            >
              <span>{cat.icon}</span>
              <span className="skills-tab-label">{cat.cat}</span>
            </button>
          ))}
        </div>

        {/* Active skill panel */}
        <div className="skills-panel">
          <div className="skills-panel__info">
            <div className="skills-panel__icon" style={{ background: `${SKILL_CATEGORIES[activeTab].color}22`, color: SKILL_CATEGORIES[activeTab].color }}>
              {SKILL_CATEGORIES[activeTab].icon}
            </div>
            <div>
              <h3 className="skills-panel__cat">{SKILL_CATEGORIES[activeTab].cat}</h3>
              <p className="skills-panel__desc">{SKILL_CATEGORIES[activeTab].desc}</p>
            </div>
          </div>
          <div className="skills-bars">
            {SKILL_CATEGORIES[activeTab].skills.map((sk, i) => (
              <SkillBar key={sk.name} name={sk.name} level={sk.level} color={SKILL_CATEGORIES[activeTab].color} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <RevealSection>
          <h3 className="subsection-title">Soft Skills & Professional Attributes</h3>
          <div ref={softRef} className="soft-skills-grid">
            {SOFT_SKILLS.map((sk, i) => (
              <div key={sk.name} className={`soft-card ${softVisible ? "soft-card--visible" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="soft-card__icon">{sk.icon}</div>
                <h4 className="soft-card__name">{sk.name}</h4>
                <p className="soft-card__desc">{sk.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="section" id="experience">
      <div className="container">
        <RevealSection>
          <div className="section__header">
            <span className="section__eyebrow">Career Journey</span>
            <h2 className="section__title">Work <span>Experience</span></h2>
            <p className="section__sub">6+ years of progressive IT career growth spanning five companies across telecom, banking, finance, and life sciences sectors.</p>
          </div>
        </RevealSection>

        <div className="timeline">
          <div className="timeline__rail" />
          {EXPERIENCES.map((exp, i) => (
            <RevealSection key={i}>
              <div className={`timeline__item ${expanded === i ? "timeline__item--expanded" : ""}`}>
                <div className="timeline__left">
                  <div className="timeline__dot" style={{ background: exp.color, boxShadow: `0 0 18px ${exp.color}66` }} />
                  <div className="timeline__period-v">{exp.period.split("–")[0]}</div>
                </div>
                <div className="timeline__card" style={{ "--accent": exp.color }}>
                  <div className="timeline__card-top">
                    <div className="timeline__card-header">
                      <div className="timeline__card-meta">
                        <span className="timeline__badge" style={{ background: `${exp.color}22`, color: exp.color, border: `1px solid ${exp.color}44` }}>
                          {exp.sector}
                        </span>
                        <span className="timeline__duration">{exp.duration}</span>
                        <span className="timeline__location">
                          <svg viewBox="0 0 24 24" width="11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {exp.location}
                        </span>
                      </div>
                      <div className="timeline__period">{exp.period}</div>
                    </div>
                    <h3 className="timeline__role" style={{ color: exp.color }}>{exp.role}</h3>
                    <h4 className="timeline__company">{exp.company}</h4>
                    <p className="timeline__overview">{exp.overview}</p>
                    <div className="timeline__tags">
                      {exp.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <button
                      className="timeline__expand-btn"
                      onClick={() => setExpanded(expanded === i ? null : i)}
                      style={{ color: exp.color }}
                    >
                      {expanded === i ? "▲ Show Less" : "▼ Show All Responsibilities"}
                    </button>
                  </div>
                  {expanded === i && (
                    <div className="timeline__details">
                      <h5>Key Responsibilities & Achievements</h5>
                      <ul className="timeline__points">
                        {exp.points.map((p, j) => <li key={j}><span className="point-arrow" style={{ color: exp.color }}>▸</span>{p}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(PROJECTS.map((p) => p.category))];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <RevealSection>
          <div className="section__header">
            <span className="section__eyebrow">Portfolio</span>
            <h2 className="section__title">Featured <span>Projects</span></h2>
            <p className="section__sub">Real-world technical solutions spanning machine learning, full-stack development, network automation, and data science.</p>
          </div>
        </RevealSection>

        <div className="project-filters">
          {categories.map((c) => (
            <button key={c} className={`filter-btn ${filter === c ? "filter-btn--active" : ""}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p, i) => (
            <RevealSection key={p.title}>
              <TiltCard className="project-card">
                <div className="project-card__stripe" style={{ background: p.color }} />
                <div className="project-card__top">
                  <div className="project-card__icon-wrap" style={{ color: p.color }}>{p.icon}</div>
                  <div className="project-card__category">{p.category}</div>
                </div>
                <div className="project-card__metric-wrap">
                  <span className="project-card__metric" style={{ color: p.color }}>{p.metric}</span>
                  <span className="project-card__metric-detail">{p.metricDetail}</span>
                </div>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__subtitle">{p.subtitle}</p>
                <p className="project-card__desc">{p.desc}</p>
                {expanded === i && (
                  <p className="project-card__longdesc">{p.longDesc}</p>
                )}
                <div className="project-card__tools">
                  {p.tools.map((t) => <span key={t} className="tag tag--sm">{t}</span>)}
                </div>
                <button
                  className="project-card__toggle"
                  style={{ color: p.color }}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {expanded === i ? "▲ Less Detail" : "▼ More Detail"}
                </button>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="section" id="education">
      <div className="container">
        <RevealSection>
          <div className="section__header">
            <span className="section__eyebrow">Academic Background</span>
            <h2 className="section__title">Education & <span>Qualifications</span></h2>
            <p className="section__sub">Strong academic foundation in computer applications and information technology from reputed Indian universities.</p>
          </div>
        </RevealSection>

        <div className="edu-grid">
          {EDUCATION.map((e, i) => (
            <RevealSection key={i}>
              <div className="edu-card" style={{ "--accent": e.color }}>
                <div className="edu-card__accent" style={{ background: e.color }} />
                <div className="edu-card__year-badge" style={{ color: e.color, borderColor: `${e.color}33` }}>
                  {e.year}
                </div>
                <h3 className="edu-card__degree">{e.degree}</h3>
                <p className="edu-card__field" style={{ color: e.color }}>{e.field}</p>
                <div className="edu-card__institution">
                  <svg viewBox="0 0 24 24" width="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                  {e.institution}
                </div>
                <div className="edu-card__location">
                  <svg viewBox="0 0 24 24" width="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {e.location}
                </div>
                <div className="edu-card__period">{e.period}</div>
                {e.grade && <div className="edu-card__grade" style={{ color: e.color, borderColor: `${e.color}44` }}>{e.grade}</div>}
                <ul className="edu-card__highlights">
                  {e.highlights.map((h, j) => (
                    <li key={j}><span style={{ color: e.color }}>▸</span>{h}</li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          ))}
        </div>

        {/* Academic Projects */}
        <RevealSection>
          <div className="acad-section">
            <h3 className="subsection-title">Academic & Coursework Projects</h3>
            <div className="acad-grid">
              {[
                { name: "Remote Desktop Access System", tech: "Python · RDP · SSH", desc: "Secure remote administration tool for IT support scenarios.", color: "#8b5cf6" },
                { name: "Network Configuration Automation", tech: "Python · Bash · Cisco Packet Tracer", desc: "Automated Cisco device provisioning reducing manual effort by 40%.", color: "#f97316" },
                { name: "VPN Setup & Management", tech: "OpenVPN · Linux · Python", desc: "Configured site-to-site VPN with certificate-based authentication.", color: "#10b981" },
              ].map((p) => (
                <TiltCard key={p.name} className="acad-card">
                  <div className="acad-card__bar" style={{ background: p.color }} />
                  <h4 style={{ color: p.color }}>{p.name}</h4>
                  <p className="acad-card__tech">{p.tech}</p>
                  <p className="acad-card__desc">{p.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section className="section section--alt" id="certifications">
      <div className="container">
        <RevealSection>
          <div className="section__header">
            <span className="section__eyebrow">Credentials</span>
            <h2 className="section__title">Certifications & <span>Professional Development</span></h2>
            <p className="section__sub">Industry-recognized certifications validating technical expertise across cloud, networking, and IT service management domains.</p>
          </div>
        </RevealSection>
        <div className="certs-grid">
          {CERTIFICATIONS.map((c, i) => (
            <RevealSection key={c.name}>
              <TiltCard className="cert-card" style={{ "--cert-color": c.color }}>
                <div className="cert-card__status" style={{ background: c.status === "Completed" ? "#10b98122" : "#f5c54222", color: c.status === "Completed" ? "#10b981" : "#f5c542", borderColor: c.status === "Completed" ? "#10b98144" : "#f5c54244" }}>
                  {c.status === "Completed" ? "✓ Certified" : "⏳ In Progress"}
                </div>
                <div className="cert-card__icon" style={{ background: `${c.color}1a` }}>{c.icon}</div>
                <div className="cert-card__code" style={{ color: c.color }}>{c.code}</div>
                <h3 className="cert-card__name">{c.name}</h3>
                <p className="cert-card__issuer">Issued by: <strong>{c.issuer}</strong></p>
                <p className="cert-card__desc">{c.desc}</p>
                <div className="cert-card__bar" style={{ background: c.color }} />
              </TiltCard>
            </RevealSection>
          ))}
        </div>

        {/* Personal Details */}
        <RevealSection>
          <div className="personal-section">
            <h3 className="subsection-title">Personal Details</h3>
            <div className="personal-grid">
              {[
                { label: "Date of Birth", value: PERSONAL.dob, icon: "🎂" },
                { label: "Nationality", value: PERSONAL.nationality, icon: "🇮🇳" },
                { label: "Gender", value: PERSONAL.gender, icon: "👤" },
                { label: "Marital Status", value: "Unmarried", icon: "💍" },
                { label: "Languages", value: PERSONAL.languages.join(", "), icon: "🗣️" },
                { label: "Location", value: PERSONAL.location, icon: "📍" },
              ].map((d) => (
                <div className="personal-item" key={d.label}>
                  <span className="personal-item__icon">{d.icon}</span>
                  <div>
                    <span className="personal-item__label">{d.label}</span>
                    <span className="personal-item__value">{d.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <RevealSection>
          <div className="section__header">
            <span className="section__eyebrow">Reach Out</span>
            <h2 className="section__title">Get In <span>Touch</span></h2>
            <p className="section__sub">Open to new opportunities, collaborations, and professional discussions. Let's connect and explore how we can build something impactful together.</p>
          </div>
        </RevealSection>
        <div className="contact-layout">
          <RevealSection>
            <div className="contact-info-col">
              <p className="contact-intro">{PERSONAL.tagline}</p>
              <div className="contact-cards-stack">
                <a className="contact-card" href={`tel:${PERSONAL.phone1.replace(/\s/g, "")}`}>
                  <div className="contact-card__icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" /></svg>
                  </div>
                  <div className="contact-card__text">
                    <span className="contact-card__label">Phone Numbers</span>
                    <span className="contact-card__value">{PERSONAL.phone1}</span>
                    <span className="contact-card__value">{PERSONAL.phone2}</span>
                  </div>
                  <div className="contact-card__arrow">→</div>
                </a>
                <a className="contact-card" href={`mailto:${PERSONAL.email}`}>
                  <div className="contact-card__icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div className="contact-card__text">
                    <span className="contact-card__label">Email Address</span>
                    <span className="contact-card__value">{PERSONAL.email}</span>
                  </div>
                  <div className="contact-card__arrow">→</div>
                </a>
                <a className="contact-card" href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">
                  <div className="contact-card__icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                  </div>
                  <div className="contact-card__text">
                    <span className="contact-card__label">LinkedIn Profile</span>
                    <span className="contact-card__value">{PERSONAL.linkedinHandle}</span>
                  </div>
                  <div className="contact-card__arrow">→</div>
                </a>
                <div className="contact-card contact-card--static">
                  <div className="contact-card__icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div className="contact-card__text">
                    <span className="contact-card__label">Current Location</span>
                    <span className="contact-card__value">Hyderabad, Telangana, India</span>
                  </div>
                  <div className="contact-card__arrow">📍</div>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="contact-availability">
              <h3 className="contact-availability__title">Availability & Interests</h3>
              <div className="availability-items">
                {[
                  { icon: "💼", title: "Open to Roles", desc: "IT Infrastructure Manager, Cloud Engineer, Network Engineer, IT Manager" },
                  { icon: "🌍", title: "Work Preference", desc: "On-site, Hybrid, or Remote opportunities across India" },
                  { icon: "📅", title: "Availability", desc: "Available for immediate joining or as per notice period" },
                  { icon: "🚀", title: "Areas of Interest", desc: "Cloud Architecture, Cybersecurity, DevOps, IT Leadership" },
                ].map((a) => (
                  <div className="availability-item" key={a.title}>
                    <span className="availability-item__icon">{a.icon}</span>
                    <div>
                      <strong>{a.title}</strong>
                      <p>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="contact-declaration">
                <p><em>"I hereby declare that the information provided above is true and accurate to the best of my knowledge."</em></p>
                <div className="contact-declaration__sig">
                  <span>— Murlidhar Prajapati</span>
                  <span className="contact-declaration__date">Hyderabad · Jan 29, 2026</span>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const active = useScrollSpy(NAV_LINKS.map((n) => n.toLowerCase()));

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* BG decorations */}
      <div className="bg-grid" aria-hidden />
      <div className="bg-glow glow-1" aria-hidden />
      <div className="bg-glow glow-2" aria-hidden />
      <div className="bg-glow glow-3" aria-hidden />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="nav__logo-text">MP</span>
          <span className="nav__logo-dot">.</span>
        </div>

        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {NAV_LINKS.map((n) => (
            <li key={n}>
              <button
                className={`nav__link ${active === n.toLowerCase() ? "nav__link--active" : ""}`}
                onClick={() => scrollTo(n.toLowerCase())}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <a className="nav__cta" href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer">Hire Me</a>
          <button className="nav__burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            <span className={menuOpen ? "open" : ""} />
            <span className={menuOpen ? "open" : ""} />
            <span className={menuOpen ? "open" : ""} />
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main>
        <HeroSection scrollTo={scrollTo} />
        <StatsSection />
        <ServicesSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo">MP<span>.</span></span>
            <p>Technical Support Engineer · IT Infrastructure & Cloud Professional</p>
          </div>
          <div className="footer__links">
            {NAV_LINKS.map((n) => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} className="footer__link">{n}</button>
            ))}
          </div>
          <div className="footer__social">
            <a href={`mailto:${PERSONAL.email}`} className="footer__social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </a>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href={`tel:${PERSONAL.phone1.replace(/\s/g, "")}`} className="footer__social-link" aria-label="Phone">
              <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" /></svg>
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Murlidhar Prajapati · All Rights Reserved · Built with React</p>
        </div>
      </footer>
    </div>
  );
}