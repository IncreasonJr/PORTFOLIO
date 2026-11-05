import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundAtmosphere from "@/components/BackgroundAtmosphere";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <BackgroundAtmosphere />
      <Header />
      <main className="relative z-10">
        <Hero />
        <FeaturedProjects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
