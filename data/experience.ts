export type Role = {
  title: string;
  subtitle?: string;
  period: string;
  bullets: string[];
  tags: string[];
  links?: { label: string; href: string }[];
};

export type Company = {
  name: string;
  location: string;
  period: string;
  roles: Role[];
};

/** Translated faithfully from the resume (Lebenslauf_Chiliveri_AI.pdf). */
export const experience: Company[] = [
  {
    name: "Stemmermann Induktivhärterei GmbH",
    location: "Radevormwald",
    period: "Feb – Mar 2026",
    roles: [
      {
        title: "Materials Engineer — Metallography & Induction Hardening",
        subtitle: "Werkstoffingenieur – Metallographie & Induktionshärten",
        period: "Feb – Mar 2026",
        bullets: [
          "CAQ documentation to DIN standards and ISO 9001:2015 within the Airbus supply chain.",
          "Microstructure analysis and hardness testing (Vickers, Rockwell, Brinell); CQI-9, 8D and EMPB.",
        ],
        tags: ["ISO 9001:2015", "CQI-9", "Airbus supply chain", "8D", "EMPB", "CAQ"],
      },
    ],
  },
  {
    name: "Albert-Pielhau GmbH & Co. KG",
    location: "Halver",
    period: "Jan – Jun 2025",
    roles: [
      {
        title: "Materials Engineer — Quality Assurance & Characterisation",
        subtitle: "Werkstoffingenieur – Qualitätssicherung & Charakterisierung",
        period: "Jan – Jun 2025",
        bullets: [
          "Prepared PPAP and 8D documentation to ISO 9001:2015 and CQI-9.",
          "SEM · EDX · OES · XRD · NDT · metallography; heat treatment, surface and coating analysis; statistical process optimisation.",
        ],
        tags: ["PPAP (VDA)", "8D", "ISO 9001:2015", "CQI-9", "SEM / EDX", "XRD"],
      },
    ],
  },
  {
    name: "Brose Fahrzeugteile SE & Co. KG",
    location: "Würzburg",
    period: "Jan 2023 – Oct 2024",
    roles: [
      {
        title: "Senior Expert — AI Agents, Semantic Digital Twins & Materials Characterisation",
        subtitle:
          "Master's thesis (Oct 2023 – Oct 2024): AI-based failure analysis of hardened steel axles & aluminium die-cast motor carriers — an agentic-AI application for engineers",
        period: "Oct 2023 – Oct 2024",
        bullets: [
          "ML models predicting fracture share (ductile / brittle) and hardness (HV10); U-Net segmentation of >1,000 SEM images (PyTorch / TensorFlow) — >90% accuracy.",
          "RAG over ISO/DIN and GB/T standards with a knowledge graph (semantic digital twin); router with tool-calling specialist agents and a critic agent.",
          "One traceable answer per case (cause, process, next inspection); pytest CI/CD in Streamlit — >60% faster development; 8-person team for Tesla, BMW and Daimler.",
        ],
        tags: ["RAG", "Knowledge graph", "U-Net", "PyTorch / TensorFlow", "Tool-calling agents", "pytest CI/CD", "Tesla · BMW · Daimler"],
        links: [
          { label: "GitHub", href: "https://github.com/Shyam-Gupta-Chiliveri/Agentic-AI__Materials-Intelligence-MI-" },
          { label: "Live demo", href: "https://shyam-gupta-chiliveri.github.io/materials-intelligence/" },
        ],
      },
      {
        title: "Internship — Materials Characterisation",
        subtitle: "Praktikum (Jan – Sep 2023)",
        period: "Jan – Sep 2023",
        bullets: [
          "Characterised material samples using SEM/EDX, DSC, FTIR and Shore/IRHD.",
          "HPC particle counting to VDA 19.1.",
        ],
        tags: ["SEM / EDX", "DSC", "FTIR", "Shore / IRHD", "VDA 19.1"],
      },
    ],
  },
  {
    name: "HCL Technologies Ltd.",
    location: "India",
    period: "Nov 2018 – Apr 2021 · 2 years 6 months",
    roles: [
      {
        title: "Software Engineer — Machine Learning & Data Analysis",
        period: "Nov 2018 – Apr 2021",
        bullets: [
          "Developed time-series models (LSTM, ARIMA, XGBoost, FB Prophet) with 96% test accuracy to forecast critical production processes.",
          "Built end-to-end ML pipelines with SQL, Pandas and NumPy — from feature engineering to deployment.",
          "Ran EDA for anomaly detection and derived actionable recommendations for stakeholders.",
        ],
        tags: ["LSTM", "ARIMA · SARIMA", "XGBoost", "FB Prophet", "SQL", "Pandas · NumPy", "EDA"],
      },
    ],
  },
];
