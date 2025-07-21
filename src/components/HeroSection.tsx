import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cassette.jpg";
import { Heart, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-sepia">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-tight mb-6 text-foreground">
              Your Final Words.{" "}
              <span className="bg-gradient-emotional bg-clip-text text-transparent">
                Delivered When It Matters Most.
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 font-light leading-relaxed">
              Record your last message for the ones who matter. Let your voice live beyond time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="text-xl" asChild>
                <a href="/record">
                  <Heart className="w-5 h-5" />
                  Create Your Timelessgram
                </a>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg border-accent bg-background/80 backdrop-blur">
                <Play className="w-5 h-5" />
                Watch Story
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emotional rounded-full"></div>
                <span>Securely Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Forever Protected</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-emotional">
              <img 
                src={heroImage} 
                alt="Vintage cassette player representing timeless memories"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur rounded-lg p-4 shadow-warm animate-float">
              <div className="text-sm text-muted-foreground">Last recorded</div>
              <div className="font-serif font-semibold">2 days ago</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-emotional/10 backdrop-blur rounded-lg p-4 shadow-warm">
              <div className="text-sm text-emotional">❤️ For Sarah</div>
              <div className="font-serif text-xs">Ready to deliver</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};