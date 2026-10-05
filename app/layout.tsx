import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { FRAME_VERSION } from "@/lib/frames";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = getSiteUrl();
const title = `${profile.name} — ${profile.headline}`;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl.toString() }],
  creator: profile.name,
  keywords: [
    "AI Engineer",
    "Data Scientist",
    "Data Analyst",
    "GenAI",
    "LLM Agents",
    "RAG",
    "Knowledge Graphs",
    "NLP",
    "Materials Science AI",
    "Germany",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl.toString(),
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    jobTitle: "AI Engineer · Data Scientist · Data Analyst",
    address: { "@type": "PostalAddress", addressLocality: "Halver", addressCountry: "DE" },
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preload" as="image" href={`/hero-poster.webp?v=${FRAME_VERSION}`} fetchPriority="high" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
