import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Subtle ambient page background overlay */}
      <div className="fixed inset-0 -z-50 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.03),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.05),transparent)]" />
      
      <Header />
      <main>
        <Hero />
        <Skills />
        <FeaturedProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
