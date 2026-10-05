export type Certification = {
  /** Short label shown as the card title (like "PMP®"). */
  short: string;
  name: string;
  org: string;
  url?: string;
  inProgress?: boolean;
  verifyLabel?: string;
};

/** From the resume certificate list (links extracted from the PDF). */
export const certifications: Certification[] = [
  {
    short: "Azure DP-900",
    name: "Microsoft Certified: Azure Data Fundamentals",
    org: "Microsoft",
    url: "https://learn.microsoft.com/en-gb/users/shyamsunderchiliveri-9670/credentials/4767183be28b3dce",
    verifyLabel: "Verify on Microsoft Learn",
  },
  {
    short: "AWS GenAI",
    name: "AWS Certified Generative AI Developer (AIP-C01)",
    org: "Amazon Web Services",
    url: "https://www.linkedin.com/learning/certificates/bf813f759586847d61cf1df210901ac9a55d682cfa5f84be8542b97338c0c2e0",
    verifyLabel: "Verify on LinkedIn",
  },
  {
    short: "PCEP",
    name: "PCEP — Certified Python Programmer",
    org: "Python Institute",
    url: "https://www.credly.com/badges/f18fb947-4a93-4535-b5d0-53e4d939cc37/linked_in_profile",
    verifyLabel: "Verify on Credly",
  },
  {
    short: "Ironhack",
    name: "Data Science & Machine Learning Certification",
    org: "Ironhack Berlin · 2025",
    url: "https://www.credential.net/088a0325-c93a-4deb-8422-69609f31d373#acc.AeFWx2KQ",
    verifyLabel: "Verify on Credential.net",
  },
  {
    short: "SageMaker",
    name: "ML with SageMaker — Pearson",
    org: "Amazon / Pearson",
    url: "https://www.linkedin.com/learning/certificates/fe3751b24878eccde60e0dfd4925b31e48fbe744da12d9592c41ce74e833b06f",
    verifyLabel: "Verify on LinkedIn",
  },
  {
    short: "Generative AI",
    name: "Career Essentials in Generative AI",
    org: "Microsoft & LinkedIn",
    url: "https://www.linkedin.com/learning/certificates/0ac2149e301578c5503fb6af4947e1659a8e6bbb8d4182084360c93afcb98f26",
    verifyLabel: "Verify on LinkedIn",
  },
  {
    short: "Six Sigma",
    name: "Six Sigma Black Belt",
    org: "Quality Engineering Certification",
    url: "https://www.linkedin.com/learning/certificates/e81cba1922232a2a4a1ddf693850beeecf60392c974d516d342cbe50ecd7841f",
    verifyLabel: "Verify on LinkedIn",
  },
  {
    short: "SAP S/4HANA",
    name: "SAP S/4HANA",
    org: "SAP Learning",
    url: "https://badger.learning.sap.com/verify/xigup-gaton-leloc-cipag-fanek",
    verifyLabel: "Verify on SAP Learning",
  },
  {
    short: "Materials",
    name: "Materialwissenschaft & Produktionstechnologie",
    org: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/certificate/UJN3P8L72LAL",
    verifyLabel: "Verify on Coursera",
  },
  {
    short: "Additive",
    name: "Additive Manufacturing: Materials for 3D Printing",
    org: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/certificates/4b71cdc5e159047bf7fac375da633287825e1986f3985dde2cf505e8fec05865",
    verifyLabel: "Verify on LinkedIn",
  },
  {
    short: "Scikit-learn",
    name: "Scikit-learn Associate Practitioner",
    org: "WBS Coding School",
    inProgress: true,
  },
];
