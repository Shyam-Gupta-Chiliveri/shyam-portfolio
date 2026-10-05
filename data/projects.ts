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
  badge?: "Live" | "Flagship";
  /** Present only for the detailed case studies. */
  caseStudy?: { problem: string; approach: string; result: string };
};

export const projects: Project[] = [
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
    slug: "ai-material-analysis-multimodal",
    title: "AI-Based Material Analysis",
    subtitle: "Multimodal learning with knowledge graphs & ontologies",
    category: "GenAI",
    summary:
      "Multimodal AI system combining image analysis, structured property data, and ontology-driven knowledge graphs for materials characterisation. Integrates semantic digital twin concepts with LLM-powered reasoning over material properties and failure modes.",
    metrics: ["Multimodal AI", "Knowledge Graphs", "Ontology-driven"],
    stack: ["Python", "Knowledge Graphs", "Ontologies", "LLM", "PyTorch"],
    github: "https://github.com/Shyam-Gupta-Chiliveri/AI-based-material-analysis-system-with-multimodal-learning",
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
