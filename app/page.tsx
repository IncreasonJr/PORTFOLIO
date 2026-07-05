import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import OtherProjects from "@/components/OtherProjects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Dynamic ambient page background overlay */}
      <div className="fixed inset-0 -z-50 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.06),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.08),transparent)]" />
      
      <Header />
      <main>
        <Hero />
        <Skills />
        <FeaturedProjects />
        <OtherProjects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
