export type SkillGroup = { title: string; items: string[] };

/** Tech skills and domain expertise exactly as grouped on the resume. */
export const skills: SkillGroup[] = [
  {
    title: "AI & LLM Engineering",
    items: ["Agentic AI", "LangChain", "RAG", "Tool-Calling", "LLM Fine-tuning", "Prompt Engineering", "SHAP", "Agentic Workflows"],
  },
  {
    title: "Machine Learning",
    items: ["Scikit-learn", "XGBoost", "ARIMA", "SARIMA", "FB Prophet", "LSTM", "Ensemble Methods"],
  },
  {
    title: "Deep Learning",
    items: ["PyTorch", "TensorFlow", "CNNs", "U-Net", "Transformers", "MLOps"],
  },
  {
    title: "Data Science",
    items: ["Pandas", "NumPy", "SciPy", "EDA", "Feature Engineering", "Matplotlib", "Seaborn", "Plotly"],
  },
  {
    title: "Knowledge Graphs",
    items: ["Semantic Modelling", "Qdrant", "Digital Twins", "Ontologies"],
  },
  {
    title: "MLOps & Engineering",
    items: ["Python", "Docker", "CI/CD", "pytest", "REST APIs", "Streamlit", "Git"],
  },
  {
    title: "Cloud Platforms",
    items: ["AWS (S3, EC2, SageMaker)", "Azure", "GCP", "BigQuery", "TensorFlow Serving"],
  },
  {
    title: "Tools & Software",
    items: ["ANSYS FEM", "SolidWorks", "CATIA V5", "SAP S/4HANA", "Power BI", "Data Studio"],
  },
  {
    title: "Domain Expertise",
    items: ["Automotive production", "Supply Chain", "Materials Science · SEM", "Six Sigma Black Belt", "ISO 9001:2015 · CQI-9", "PPAP · 8D · EMPB"],
  },
];
