export const categories = ["Agentic AI", "GenAI", "DL", "ML", "Data Analytics", "Engineering"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  summary: string;
  metrics: string[];
  stack: string[];
  github?: string;
  demo?: string;
  extraLinks?: { label: string; href: string }[];
  badge?: "Live" | "Flagship";
  /** Present only for the detailed case studies. */
  caseStudy?: { problem: string; approach: string; result: string };
};

export const projects: Project[] = [
  {
    slug: "transfer-pricing-copilot",
    title: "Transfer Pricing Copilot",
    subtitle: "Agentic AI for OECD transfer-pricing retrieval and TNMM testing",
    category: "Agentic AI",
    badge: "Live",
    summary:
      "Portfolio desk that walks a controlled group from function to file: characterisation, method choice, comparable screening, the statutory range, a transaction matrix, and a critic that keeps a paragraph off the page unless it was retrieved. Docker app with English and German. Not tax advice and not a client engagement.",
    metrics: ["45/45 citation accuracy", "94% screening F1", "612 ledger bookings", "Live desk"],
    stack: ["Python", "RAG", "TF-IDF", "Logistic Regression", "Streamlit", "Docker", "pytest"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/transfer-pricing-copilot",
    demo: "https://shyam-gupta-chiliveri.github.io/transfer-pricing-copilot/",
    caseStudy: {
      problem:
        "Transfer-pricing files mix OECD guidelines, screening of comparables, and a margin test. The question is which paragraph was actually retrieved, and whether the tested party sits inside the range.",
      approach:
        "A router sends each question to guideline RAG, a knowledge graph, company screening, a TNMM margin test and a FAR characterisation. A critic checks that every citation was retrieved. The worked example is the fictional hardening group Härtetechnik AG.",
      result:
        "Top-3 citation accuracy 45/45 on the published question set. Company screening F1 about 94%. Public page plus an interactive Docker desk.",
    },
  },
  {
    slug: "agentic-ai-security-toolchain",
    title: "Agentic AI Security Toolchain",
    subtitle: "SAST, critic and CWE mapping on Open-SAE-J1939",
    category: "Agentic AI",
    badge: "Live",
    summary:
      "Agentic security desk on the public MIT-licensed Open-SAE-J1939 C stack. Router plus Semgrep, builtin C checkers, optional CodeQL SARIF, AFL++ crashes, an LLM reviewer and a critic that maps findings to CWEs. Research portfolio, not a full ISO/SAE 21434 CSMS.",
    metrics: ["4 critic-kept findings", "CWE-787 and CWE-190", "Open-SAE-J1939", "Live desk"],
    stack: ["Python", "Semgrep", "CodeQL", "AFL++", "CWE RAG", "Docker", "Streamlit"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Agentic-AI-Security-Toolchain",
    demo: "https://shyam-gupta-chiliveri.github.io/Agentic-AI-Security-Toolchain/",
    caseStudy: {
      problem:
        "Embedded CAN code can hide integer wrap and out-of-bounds writes that a reviewer will miss in a long C file. The desk has to show a real finding, a CWE, and a suggested bound, without claiming to be an OEM cybersecurity programme.",
      approach:
        "Same shape as the materials case desk: router chooses specialists, tools return facts, critic last. Target is Open-SAE-J1939 (about 33 .c files). The public page replays the first SAST scan so a recruiter can open the board without Docker.",
      result:
        "First builtin SAST run: 4 raw hits kept by the critic, including TP.DT index wrap (CWE-190) and a write past MAX_TP_DT (CWE-787). Live GitHub Pages desk, Docker rescan on a clone.",
    },
  },
  {
    slug: "beehaven-azure-pipeline",
    title: "Bee Haven Azure Pipeline",
    subtitle: "Medallion lakehouse on Azure Data Factory and Synapse",
    category: "Data Analytics",
    summary:
      "End-to-end Medallion lakehouse (Bronze, Silver, Gold) on Azure for 2.5 years of beehive sensor data, enriched with BrightSky weather. Azure Data Factory orchestrates 14 activities on a nightly trigger. Synapse Spark notebooks clean, join and aggregate to analysis-ready Parquet tables in Germany West Central.",
    metrics: ["2.5M flow rows", "14 ADF activities succeeded", "Bronze to Gold", "Germany West Central"],
    stack: ["Azure Data Factory", "Azure Synapse", "ADLS Gen2", "Spark", "Parquet", "Python", "pandas"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/beehaven-azure-data-pipeline",
    caseStudy: {
      problem:
        "What makes bees busy? Hive flow, temperature, humidity and weight sit in messy CSVs, in German local time, with stacked series and sensor sign errors. They need to meet hourly weather before anyone can answer the business question.",
      approach:
        "Source CSVs copy into bronze, archive with timestamps, then Synapse notebooks validate and write Parquet to silver. A second notebook joins weather and builds hourly, daily and insight tables in gold. If a quality check fails, the pipeline stops and files stay in processing.",
      result:
        "Full Data Factory run succeeded (14 activities). Data from January 2017 to May 2019, hive in Bad Schwartau. ARM template of the factory is in the repo.",
    },
  },
  {
    slug: "materials-intelligence",
    title: "Materials Intelligence",
    subtitle: "Agentic AI — multi-agent system for failure analysis",
    category: "Agentic AI",
    badge: "Live",
    summary:
      "Multi-agent system with a router and 6 specialist agents (standards RAG via FAISS, knowledge graph, fracture ML, SEM vision, digital twin, critic) for failure analysis of hardened steel axles. Deployed via Docker, AWS ECS Fargate, CloudFront and Secrets Manager (Frankfurt) with pytest CI/CD and a Streamlit UI.",
    metrics: ["Router + 6 specialist agents", "Critic agent", "AWS ECS Fargate · CloudFront", "Live demo"],
    stack: ["LangChain", "FAISS", "Knowledge Graph", "Docker", "AWS ECS Fargate", "CloudFront", "Secrets Manager", "Streamlit", "pytest CI/CD"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Agentic-AI__Materials-Intelligence-MI-",
    demo: "https://shyam-gupta-chiliveri.github.io/materials-intelligence/",
    extraLinks: [
      { label: "Case desk", href: "https://138.2.179.154.sslip.io" },
      { label: "SEM classifier", href: "https://sem.138.2.179.154.sslip.io" },
      { label: "RAG desk", href: "https://rag.138.2.179.154.sslip.io" },
    ],
    caseStudy: {
      problem:
        "Materials engineers need a traceable failure analysis for hardened steel axles: classify SEM fracture images, retrieve the relevant ISO/DIN standards, and estimate fracture risk from plant motor-load data on 4Cr13 axle steel.",
      approach:
        "A router dispatches each case to 6 specialist agents — standards RAG via FAISS, knowledge graph, fracture ML, SEM vision, digital twin — and a critic agent reviews the answer. Every case returns one traceable answer: cause, process, next inspection.",
      result:
        "Deployed via Docker on AWS ECS Fargate with CloudFront and Secrets Manager (Frankfurt), pytest CI/CD and a Streamlit UI — publicly available as a live app.",
    },
  },
  {
    slug: "ai-materials-analysis-system",
    title: "AI Materials Analysis System",
    subtitle: "RAG AI agent system for materials characterisation",
    category: "GenAI",
    badge: "Flagship",
    summary:
      "RAG system built with LangChain and Qdrant, indexing 13,400+ ISO/DIN documents and reaching R² = 0.90 in the semantic digital twin. U-Net trained for SEM analysis with 95% accuracy; results visualised in a Streamlit dashboard with SHAP explainability. XGBoost ductility/brittleness predictor on 385K training samples, full pytest CI/CD.",
    metrics: ["R² = 0.90", "95% seg. accuracy", "13,400+ ISO/DIN docs", "385K training samples"],
    stack: ["LangChain", "RAG", "Qdrant", "XGBoost", "U-Net", "ResNet50", "PyTorch", "SHAP", "Streamlit", "CI/CD"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Materials-Science-Analysis-Prediction-System-with-AI",
    caseStudy: {
      problem:
        "Materials characterisation needs three things at once: predicting ductility/brittleness, segmenting fracture surfaces in SEM images, and answering questions across thousands of ISO/DIN standards.",
      approach:
        "An XGBoost ductility/brittleness predictor, a U-Net for SEM fracture segmentation, and a RAG agent with full tool-calling over 13,400+ ISO/DIN standards — backed by a Qdrant vector DB, SHAP explainability, a Streamlit UI and full pytest CI/CD.",
      result:
        "R² = 0.90 on the predictor, 95% segmentation accuracy, 385K training samples and 13,400+ documents indexed.",
    },
  },
  {
    slug: "truthlens",
    title: "TruthLens",
    subtitle: "Fake news detection with NLP & Transformers",
    category: "DL",
    summary:
      "Full NLP pipeline comparing classical ML (TF-IDF + SVM, Logistic Regression) to fine-tuned BERT and RoBERTa transformers on 44,000 news articles. Fine-tuned BERT achieved 98.62% accuracy with GPU training on RTX 3060. Includes Bonferroni-corrected evaluation framework.",
    metrics: ["98.62% BERT accuracy", "94.04% SVM accuracy", "44K news articles"],
    stack: ["BERT", "RoBERTa", "HuggingFace", "PyTorch", "TF-IDF", "SVM", "NLTK", "CUDA"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/TruthLens---Detecting-fake-news-through-the-lens-of-NLP-Transformers",
    caseStudy: {
      problem: "Reliably separate fake from real news across a corpus of 44,000 news articles.",
      approach:
        "A full NLP pipeline comparing classical ML (TF-IDF + SVM, Logistic Regression) against fine-tuned BERT and RoBERTa transformers, trained on an RTX 3060 GPU and evaluated with a Bonferroni-corrected framework.",
      result: "Fine-tuned BERT reached 98.62% accuracy, against 94.04% for the best classical model (SVM).",
    },
  },
  {
    slug: "goexplore",
    title: "GoExplore CEO Dashboard",
    subtitle: "End-to-end data pipeline — €1.25B revenue analysed",
    category: "Data Analytics",
    summary:
      "BigQuery SQL pipeline processing 149,257 transactions from 21 markets via 14 CTE queries, feeding a self-service KPI dashboard in Data Studio for revenue, margin and seasonality — built directly for executives. 5 stakeholder pages covering revenue, European expansion, retailer performance and marketing KPIs.",
    metrics: ["€1.25B revenue analysed", "149,257 transactions", "21 markets · 289 retailers", "14 SQL queries"],
    stack: ["BigQuery", "SQL CTEs", "Google Data Studio", "Google Sheets", "KPI Dashboards"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/GoExplore-data-analytics-project",
    caseStudy: {
      problem:
        "An outdoor sports supplier operating across 21 markets needed a self-service view for the CEO covering revenue, margin, seasonality, European expansion, retailer performance and marketing KPIs.",
      approach:
        "An end-to-end pipeline — Google Sheets → BigQuery (14 SQL CTE queries over 149,257 transactions) → Google Data Studio — delivered as a dashboard with 5 stakeholder pages.",
      result: "€1.25B of revenue analysed across 149K transactions, 21 markets and 289 retailers.",
    },
  },
  {
    slug: "fracture-classification",
    title: "Semantic Digital Twin — Fracture Classification",
    subtitle: "Master's thesis at Brose · Tesla · BMW · Daimler",
    category: "DL",
    summary:
      "Segmented >1,000 SEM samples via U-Net on an HPC cluster to classify ductile and brittle fracture patterns. Semantic digital twin: SEM images → knowledge pipeline → CNN classifier → prediction with an automated tool-calling loop. pytest CI/CD in TensorFlow/PyTorch cut development time by >60%.",
    metrics: [">90% accuracy", ">1,000 SEM images", ">60% faster dev"],
    stack: ["PyTorch", "TensorFlow", "U-Net", "CNN", "OpenCV", "HPC", "pytest CI/CD", "Digital Twin"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/-SEM-Image-Processing-and-Machine-Learning-for-Ductility-and-Brittleness-Analysis",
  },
  {
    slug: "steel-properties-agent",
    title: "Steel Properties Optimisation",
    subtitle: "Autonomous multi-agent, multi-objective optimisation",
    category: "Agentic AI",
    summary:
      "Analysed 311 steel samples via SQL and feature engineering, identified a correlation of r = 0.80 and simulated tempering treatments. Multi-objective optimisation (Scikit-learn) with an autonomous agent loop delivered +58% yield strength and +63% ductility; full SQL + EDA workflow with statistical process control and Pareto optimisation.",
    metrics: ["r = 0.80", "+58% yield strength", "+63% ductility", "311 steel samples"],
    stack: ["Python", "SQL", "Pandas", "Scikit-learn", "Seaborn", "Agent Loop"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Materials_Properties_EDA_SQL_project",
  },
  {
    slug: "claimguard-agent",
    title: "ClaimGuard Agent",
    subtitle: "German motor-insurance risk, fraud triage and a claims agent",
    category: "Agentic AI",
    badge: "Live",
    summary:
      "Public desk for German and European motor-insurance risk. District classes from GDV, Destatis, KBA, Eurostat, EIOPA and BKA, a HistGradientBoosting model tested on Bundesländer it never saw in training, BM25 retrieval over the methodology notes, and a FastAPI agent with an offline fallback. n8n runs claim intake, app events, weekly drift and a daily red-queue digest.",
    metrics: ["400 districts", "MAE 1.50 on unseen states", "ρ = 0.74 density vs class"],
    stack: ["Python", "scikit-learn", "FastAPI", "BM25", "SQLite", "Docker", "n8n"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/ClaimGuard-Agent",
    demo: "https://claimguard.138.2.179.154.sslip.io",
    extraLinks: [{ label: "Workflows", href: "https://n8n.138.2.179.154.sslip.io" }],
  },
  {
    slug: "quellberg-receipt-review",
    title: "Quellberg Receipt Review",
    subtitle: "Approve or investigate each supplier invoice",
    category: "Agentic AI",
    badge: "Live",
    summary:
      "Reads each receipt and returns APPROVE or INVESTIGATE. PDF text comes from the text layer, photos and scans from Tesseract OCR, and fixed Python rules check the order, arithmetic, §14 UStG fields, the IBAN checksum and duplicates. The model only reads; it does not decide. On the hand-labelled set: 16/16 decisions, 32/32 required findings and 112/112 fields. The same rules run in the browser demo.",
    metrics: ["16/16 decisions", "32/32 findings", "112/112 fields"],
    stack: ["Python", "pdfplumber", "Tesseract", "Docker", "JavaScript"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/invoice-review-agent",
    demo: "https://invoice.138.2.179.154.sslip.io/",
  },
  {
    slug: "commerce-ops-agent",
    title: "Commerce Ops Agent",
    subtitle: "Harbor desk over Shopify, Zendesk, Klaviyo, Anvyl and Sage",
    category: "Agentic AI",
    badge: "Live",
    summary:
      "Reads the shop, helpdesk, marketing, purchase orders and supplier bills into a bronze, silver and gold warehouse, then drafts the customer reply and the pay-or-hold decision from those rows. Harbor House is fictional. The grounded drafter passes 6/6 tickets and 53/53 checks with 0 policy violations; a drafter that sees only the ticket text passes 0/6. Nothing is sent or paid until a person confirms.",
    metrics: ["6/6 grounded tickets", "53/53 checks", "0 policy violations"],
    stack: ["Python", "FastAPI", "SQLite", "Docker", "pytest"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/commerce-ops-agent",
    demo: "https://ops.138.2.179.154.sslip.io/",
  },
  {
    slug: "snowflake-cortex-materials-copilot",
    title: "Snowflake Cortex Materials Copilot",
    subtitle: "Quality questions over 4Cr13 axle heat treatment",
    category: "Agentic AI",
    badge: "Live",
    summary:
      "English questions over 4Cr13 axle heat treatment: HV10 and bending tests, SEM ductile/brittle maps, and 8D notes. Snowflake dynamic tables feed route-quality marts. A Node agent routes the question, applies work instruction WI-HT-4CR13 in code, and a numeric critic checks the answer. The public Docker site serves the marts and falls back to a deterministic composer when Cortex is unavailable.",
    metrics: ["385k test mirror", "1,999 SEM images", "WI-HT-4CR13 gate"],
    stack: ["Snowflake", "Cortex", "Node.js", "Express", "React", "Docker"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Snowflake-Cortex-Materials-Copilot",
    demo: "https://cortex.138.2.179.154.sslip.io",
  },
  {
    slug: "sap-btp-quality-copilot",
    title: "SAP BTP Quality Copilot",
    subtitle: "CAP workbench from Phase 0 to a governed quality agent",
    category: "Agentic AI",
    badge: "Live",
    summary:
      "SAP Cloud Application Programming Model workspace: a Phase 0 Greenfield, Brownfield or Hybrid assessment, a RISE and BTP reference architecture, a rough-order estimate, and a quality copilot over fictional S/4HANA-shaped QM data. A router calls inspection, trend, supplier, notification, lot and knowledge tools. The release decision is code (usage decision, open notifications, Cpk at least 1.33). A critic drops any number that was not retrieved.",
    metrics: ["6 specialist tools", "Cpk at least 1.33", "136 demo lots"],
    stack: ["SAP CAP", "Node.js", "OData", "BM25", "SQLite"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/SAP-BTP-Quality-Copilot",
    demo: "https://quality.138.2.179.154.sslip.io",
  },
  {
    slug: "hpc-deep-learning",
    title: "HPC Deep Learning",
    subtitle: "Large-scale image classification & MLOps",
    category: "DL",
    summary:
      "Trained four CNN models (MobileNetV2, ResNet50, EfficientNetB0, DenseNet121) via transfer learning on 60,000 images. Deployed the best model via TensorFlow Serving, Docker and GCP with a complete CI/CD pipeline and automated evaluation logging.",
    metrics: ["60K images", "4 architectures", "GCP deployed"],
    stack: ["TensorFlow", "MobileNetV2", "ResNet50", "EfficientNetB0", "DenseNet121", "Docker", "GCP"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Deep-Learning-Project--Image-Classification-using-CNN-and-Transfer-Learning",
    caseStudy: {
      problem:
        "Classify a large image corpus at production quality, then serve the winning architecture behind a real inference endpoint — not a notebook demo.",
      approach:
        "Trained four CNNs (MobileNetV2, ResNet50, EfficientNetB0, DenseNet121) with transfer learning on 60,000 images, compared them, and shipped the best model through TensorFlow Serving, Docker, GCP and a CI/CD pipeline with automated evaluation logging.",
      result: "A production deep-learning stack on GCP — 4 architectures trained, best model deployed with full MLOps.",
    },
  },
  {
    slug: "ab-testing-eniac",
    title: "A/B Testing — Eniac",
    subtitle: "Statistical process optimisation for e-commerce",
    category: "Data Analytics",
    summary:
      "Hypothesis tests (chi-square, Bonferroni, t-tests) with SciPy to analyse conversion rates across a 4-variant A/B test for Eniac's homepage CTA button. CLT, confidence intervals and guardrail metrics (bounce rate, drop-off) validated the conclusions; data-driven recommendations derived for stakeholders.",
    metrics: ["4 variants tested", "Bonferroni correction", "3 guardrail metrics"],
    stack: ["Python", "SciPy", "Pandas", "Chi-Square", "t-test", "Matplotlib"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/ab-testing-eniac-case-study",
  },
  {
    slug: "house-price-king-county",
    title: "House Price Prediction",
    subtitle: "ML regression — King County, WA",
    category: "ML",
    summary:
      "End-to-end regression pipeline on 21,000 house sales. Engineered 8 domain features (house age, renovation status, bath-to-bed ratio). Compared Linear Regression, KNN, Ridge, Random Forest, Gradient Boosting and XGBoost with GridSearchCV tuning. XGBoost achieved R² = 0.88 on test data.",
    metrics: ["R² = 0.88 (XGBoost)", "21K records", "8 engineered features"],
    stack: ["XGBoost", "Scikit-learn", "Random Forest", "GridSearchCV", "Pandas", "Seaborn"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Machine_Learning_Project-House-Price-Prediction---King-County-WA",
  },
  {
    slug: "axle-fracture-ml",
    title: "Axle Fracture ML",
    subtitle: "Hardness desk for ductility, brittleness and bending force",
    category: "ML",
    badge: "Live",
    summary:
      "Property desk for the 385,000-row axle tests. A hardness reading estimates ductility, brittleness and bending force; a target property returns a temper that was actually run. The notebook compares Linear, Ridge, Random Forest, XGBoost, LightGBM and a stacking ensemble. Ridge is the ductility model it keeps: test R² 0.9002, test MAE 1.59. Brittleness is 100 minus ductility, not a second model.",
    metrics: ["Test R² 0.9002", "Test MAE 1.59", "Ridge ductility model"],
    stack: ["Python", "scikit-learn", "XGBoost", "LightGBM", "MLflow", "Docker"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/axle-fracture-ml",
    demo: "https://axle.138.2.179.154.sslip.io",
  },
  {
    slug: "moosic-atlas",
    title: "Moosic Atlas",
    subtitle: "K-Means clustering of Spotify audio features",
    category: "ML",
    badge: "Live",
    summary:
      "K-Means (k=5) on 5,235 Spotify songs using 9 audio features: danceability, energy, acousticness, tempo, valence, speechiness, instrumentalness, liveness and loudness. The notebook also runs PCA, UMAP, DBSCAN and agglomerative clustering. A static dashboard plots the five groups, with radar charts and a playlist explorer.",
    metrics: ["5,235 songs", "k = 5", "9 audio features"],
    stack: ["Python", "scikit-learn", "K-Means", "PCA", "UMAP", "pandas"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/ML-Moosic-Project",
    demo: "https://shyam-gupta-chiliveri.github.io/ML-Moosic-Project/moosic_atlas_k5.html",
  },
  {
    slug: "ai-material-analysis-multimodal",
    title: "AI-Based Material Analysis",
    subtitle: "Multimodal learning with knowledge graphs & ontologies",
    category: "GenAI",
    summary:
      "Multimodal AI system combining image analysis, structured property data, and ontology-driven knowledge graphs for materials characterisation. Integrates semantic digital twin concepts with LLM-powered reasoning over material properties and failure modes.",
    metrics: ["Multimodal AI", "Knowledge Graphs", "Ontology-driven"],
    stack: ["Python", "Knowledge Graphs", "Ontologies", "LLM", "PyTorch"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/AI-based-material-analysis-system-with-multimodal-learning",
    demo: "https://sem.138.2.179.154.sslip.io",
    extraLinks: [{ label: "RAG desk", href: "https://rag.138.2.179.154.sslip.io" }],
  },
  {
    slug: "klarblick",
    title: "Klarblick",
    subtitle: "Plain-language reading of a German discharge letter",
    category: "GenAI",
    badge: "Live",
    summary:
      "Hackathon app for the CGM / WHU Innovation Career Hub. A German hospital discharge letter becomes next steps, medicines as written, contacts and a short summary beside the original. Dates, doses and phone numbers come only from the letter. The public site is a static GitHub Pages demo with four sample letters and no API key in the browser. It does not give medical advice.",
    metrics: ["4 sample letters", "GitHub Pages demo", "Letter-grounded"],
    stack: ["Next.js", "TypeScript", "GitHub Pages"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/klarblick",
    demo: "https://shyam-gupta-chiliveri.github.io/klarblick/",
  },
  {
    slug: "materials-intelligence-platform",
    title: "Materials Intelligence Platform",
    subtitle: "Grafana plant board on Kubernetes, Oracle Always Free",
    category: "Engineering",
    summary:
      "Operations board for the three public materials apps. Prometheus probes each HTTPS address every 15 seconds. Grafana shows in-service or offline, answer time, certificate days left, disk, uptime, CPU and RAM on a 24 GB Frankfurt Ampere VM. Cost: €0.",
    metrics: ["k3s + Prometheus", "Oracle Always Free", "Frankfurt", "Live Grafana"],
    stack: ["Grafana", "Prometheus", "Kubernetes", "k3s", "Terraform", "Oracle Cloud"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Materials-Intelligence-Platform",
    demo: "https://grafana.138.2.179.154.sslip.io/d/mi-platform/materials-intelligence-platform",
  },
  {
    slug: "lianes-library",
    title: "Liane's Library",
    subtitle: "Personal library system with MySQL, Streamlit and Docker",
    category: "Engineering",
    summary:
      "Book tracking, friend management, loan tracking with automatic fines, trust scores, wishlist and reviews. Six normalised MySQL tables, SQLAlchemy, Streamlit UI, Docker Compose. Trust score starts at 100 and drops for late or damaged returns. Fines calculate live at £0.50 per day overdue.",
    metrics: ["6 MySQL tables", "Live fine calculation", "Docker Compose"],
    stack: ["Python", "MySQL", "SQLAlchemy", "Streamlit", "Docker"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/Liane-s-Library-Management-System",
  },
  {
    slug: "vikings-oop",
    title: "Vikings",
    subtitle: "OOP data modelling in Python",
    category: "Engineering",
    summary:
      "Object-oriented Python project modelling Viking and Saxon soldiers with inheritance, encapsulation, and battle simulation logic. Demonstrates solid OOP foundations including class hierarchy, polymorphism, and unit testing with pytest.",
    metrics: ["OOP · Inheritance", "pytest unit tests"],
    stack: ["Python", "OOP", "pytest", "Inheritance"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/mini-project-vikings-en",
  },
  {
    slug: "tesla-everest-die-casting",
    title: "Tesla Everest Die Casting",
    subtitle: "Aluminium die-casting CFD simulation at Brose",
    category: "Engineering",
    summary:
      "Full filling and solidification simulation of an aluminium die cast motor carrier for the Tesla Everest (K-7595) programme at Brose. Alloy comparison EN AC-46000 vs EN AC-47100, X46Cr13 insert thermal analysis over 20s, validated against Friulpress production data.",
    metrics: ["Tesla K-7595", "53.3 cm³ part", "Production validated"],
    stack: ["FLOW-3D CAST", "EN AC-46000", "EN AC-47100", "Thermal FEM"],
  },
  {
    slug: "formula-sae-car-92",
    title: "Formula SAE Race Car #92",
    subtitle: "Team lead · SUPRA SAEIndia 2018",
    category: "Engineering",
    summary:
      "22-member team lead. Full design and build: CATIA V5 space-frame chassis (AISI 4130), ANSYS FEM 5 crash scenarios (all FoS >1.8), double-wishbone suspension via Lotus Analyser, Reverse Ackermann steering, KTM 390cc powertrain. 133 km/h top speed. All technical inspections cleared.",
    metrics: ["FoS >1.8 all 5 scenarios", "133 km/h top speed", "Competition certified"],
    stack: ["CATIA V5", "ANSYS FEM", "Lotus Analyser", "AISI 4130"],
  },
];

export const caseStudies = projects.filter((p) => p.caseStudy);
export const otherProjects = projects.filter((p) => !p.caseStudy);
