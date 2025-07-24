import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-emotional">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-6xl font-bold mb-6 text-white">
            Don't Wait for Tomorrow
          </h2>

          <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            The words you don't say today might be the ones that matter most tomorrow.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <blockquote className="font-serif text-2xl lg:text-3xl text-white italic mb-6">
              "Life is fragile. Love is eternal. Your words can be too."
            </blockquote>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="bg-white text-emotional hover:bg-white/90 text-xl" asChild>
              <a href="/create-legacy">
                <Heart className="w-5 h-5" />
                Create Legacy
              </a>
            </Button>

            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white text-lg bg-white/10">
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-white/70 text-sm mt-8">
            Free to start. No time limit on love.
          </p>
        </div>
      </div>
    </section>
  );
};
