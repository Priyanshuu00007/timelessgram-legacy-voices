import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import LifeCapsule from './LifeCapsule';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <div id="how-it-works">
          <TimelineSection />
        </div>
        <div id="stories">
          <TestimonialsSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
