import hourglassImage from "@/assets/hourglass-time.jpg";
import { Heart, Clock, Shield } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-8 text-foreground">
              Why Timelessgram Exists
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Life is unpredictable. One moment we're here, planning tomorrow, and the next, 
                we're gone—leaving behind the words we never said, the apologies we never made, 
                the love we never fully expressed.
              </p>
              
              <blockquote className="font-serif text-2xl text-emotional italic border-l-4 border-emotional pl-6 my-8">
                "The things we never said… still matter."
              </blockquote>
              
              <p>
                Timelessgram was born from a simple truth: our most important words often remain unspoken. 
                Whether it's pride we never voiced, forgiveness we never offered, or love we assumed 
                they already knew—these messages deserve to reach the people who need them.
              </p>
              
              <p>
                We believe that love transcends time, that healing can happen even after goodbye, 
                and that no one should carry the weight of words left unsaid.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <Heart className="w-8 h-8 text-emotional mx-auto mb-3" />
                <h4 className="font-serif font-semibold mb-2">Love</h4>
                <p className="text-sm text-muted-foreground">Beyond time</p>
              </div>
              
              <div className="text-center">
                <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
                <h4 className="font-serif font-semibold mb-2">Legacy</h4>
                <p className="text-sm text-muted-foreground">That lives on</p>
              </div>
              
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-serif font-semibold mb-2">Trust</h4>
                <p className="text-sm text-muted-foreground">Protected forever</p>
              </div>
            </div>
          </div>
          
          {/* Image and Quote */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-emotional">
              <img 
                src={hourglassImage} 
                alt="Hourglass representing the passage of time"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <blockquote className="font-serif text-xl lg:text-2xl italic mb-4 leading-relaxed">
                "Time is the most precious gift we can give—not just in life, but in the words we leave behind."
              </blockquote>
              <cite className="text-sm opacity-90 not-italic">
                — The Timelessgram Story
              </cite>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur rounded-lg p-4 shadow-warm">
              <div className="text-center">
                <div className="text-2xl font-bold text-emotional">10,000+</div>
                <div className="text-xs text-muted-foreground">Messages delivered</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-emotional/10 backdrop-blur rounded-lg p-4 shadow-warm">
              <div className="text-center">
                <div className="text-lg font-serif text-emotional">❤️</div>
                <div className="text-xs text-muted-foreground">Healing hearts</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Poetry Section */}
        <div className="mt-24 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-warm rounded-2xl p-12 shadow-warm">
            <blockquote className="font-serif text-2xl lg:text-3xl text-foreground italic leading-relaxed">
              "In the silence between heartbeats,<br />
              In the space between words,<br />
              Lives the love we meant to say—<br />
              <span className="text-emotional">Now it can still be heard.</span>"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};