export const profile = {
  name: "Shyam Sunder Chiliveri",
  firstName: "Shyam",
  /** Title as on the resume. */
  title: "Data Scientist / AI Engineer",
  titleLines: ["Data Scientist", "AI Engineer"],
  headline: "Data Scientist · AI Engineer · Agentic AI · GenAI",
  tagline: "I bridge the gap between science and artificial intelligence.",
  /** Hero one-liner — from the resume summary. */
  intro:
    "Specialised in Agentic AI, RAG, time-series forecasting (LSTM, XGBoost) and deep learning. Production-ready in Python, PyTorch and LangChain.",
  description:
    "Data Scientist & AI Engineer specialising in Agentic AI, RAG, LLM agents, semantic digital twins, time-series forecasting and deep learning. 7+ years of experience with project work for BMW, Tesla and Daimler. Open to Data Science, AI Engineering, GenAI and Data Analyst roles.",
  status: "Open to new roles",
  location: "Halver, Germany",
  address: "Von-Vincke-Straße 6, 58553 Halver",
  email: "shyamsunderchiliveri29@gmail.com",
  phone: "+49 163 5139656",
  phoneHref: "tel:+491635139656",
  github: "https://github.com/Shyam-Gupta-Chiliveri",
  githubHandle: "Shyam-Gupta-Chiliveri",
  linkedin: "https://linkedin.com/in/shyam-sunder-chiliveri-890153167/",
  linkedinHandle: "shyam-sunder-chiliveri",
  website: "shyam-portfolio-ruby.vercel.app",
  resume: "/resume.pdf",

  /** About section — mindset, approach, results. */
  about: [
    "I'm a Data Scientist and AI Engineer. I start from the decision someone has to make, not from the model. I have an M.Sc. in Materials Technology from TU Bergakademie Freiberg, I am training at WBS Coding School, and I have 7+ years across ML pipelines, agentic AI, RAG and semantic digital twins, including project work for BMW, Tesla and Daimler. That is where science, data and production actually meet.",
    "My approach is simple. I frame the problem, decide what can be measured, then build the smallest thing that answers it. Sometimes that is a RAG system over ISO/DIN standards, sometimes a time-series forecast on plant data, sometimes a digital twin of a fracture surface. I work in Python, PyTorch and LangChain, and I stay close to the people who will use the result. Iterate, test, ship.",
    "I want results someone can act on: a clear cause, a next step, something an engineer or a CEO can take into a meeting. A critic agent on a case, SHAP on a materials model, a live dashboard instead of a slide. I'm open to Data Scientist, AI Engineer, GenAI or Data Analyst roles in Germany or remote.",
  ],

  softSkills: [
    "Analytical thinking",
    "Team leadership & collaboration",
    "Agile / Scrum",
    "Scientific communication",
    "Stakeholder management",
  ],

  languages: [
    { name: "Deutsch", level: "C1", note: "professional" },
    { name: "English", level: "C2", note: "professional" },
    { name: "Telugu", level: "C2", note: "native" },
    { name: "Hindi", level: "C2", note: "fluent" },
  ],

  stats: [
    { value: "7+", label: "Years in ML & AI" },
    { value: "11", label: "Professional certifications" },
    { value: "4", label: "Companies" },
  ],

  contact: {
    title: "Let's build something.",
    sub: "Based in Halver, Germany. Open to remote and relocation.",
  },
} as const;
