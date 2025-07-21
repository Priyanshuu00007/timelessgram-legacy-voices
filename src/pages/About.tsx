import { Navigation } from "@/components/Navigation";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;