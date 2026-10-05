import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { getFrameCounts } from "@/lib/frames.server";

export default function Page() {
  const counts = getFrameCounts();

  return (
    <>
      <Nav />
      <main id="main">
        <Hero counts={counts} />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
