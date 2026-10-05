export type Education = {
  degree: string;
  school: string;
  period: string;
  detail: string;
};

/** From the resume (dates as written there). */
export const education: Education[] = [
  {
    degree: "IT Specialist — Data Science & Artificial Intelligence (ongoing)",
    school: "WBS Coding School · Online · 2,400 hrs",
    period: "May 2026 – May 2027",
    detail: "Azure, ML, Deep Learning, RAG and Big Data analytics. Certificates: Azure DP-900, PCEP Python, Scikit-learn Associate Practitioner.",
  },
  {
    degree: "Data Science & Machine Learning Bootcamp",
    school: "Ironhack · Berlin",
    period: "Oct – Dec 2025",
    detail: "Intensive course in Python, Deep Learning, NLP, Computer Vision, RAG and MLOps with hands-on projects on real datasets.",
  },
  {
    degree: "M.Sc. Werkstofftechnologie (Materials Technology)",
    school: "TU Bergakademie Freiberg",
    period: "Oct 2020 – Jan 2025",
    detail: "XRD analytics, microscopy and scientific programming (28+ CP mathematics); Master's thesis at Brose on AI-based fracture classification.",
  },
  {
    degree: "B.Tech. Mechanical Engineering",
    school: "MLR Institute of Technology, JNTUH",
    period: "Jun 2015 – Nov 2019",
    detail: "Graduated 8.5/10 (German grade 1.3); focus on CATIA V5, ANSYS and composite materials.",
  },
];
