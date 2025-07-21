import letterImage from "@/assets/letter-fade.jpg";

const testimonials = [
  {
    story: "He never said it out loud… until Timelessgram.",
    name: "Sarah M.",
    detail: "My father recorded a video the week before he passed. It was everything I needed to hear.",
    emotion: "healing"
  },
  {
    story: "The apology I thought would never come.",
    name: "Michael R.", 
    detail: "After 20 years of silence, his message reached me. We found peace.",
    emotion: "forgiveness"
  },
  {
    story: "Her laugh still fills the room.",
    name: "David K.",
    detail: "Mom recorded bedtime stories for my daughter. Now she'll always know her grandmother's voice.",
    emotion: "love"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-sepia">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Stories That Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real families. Real healing. Real love that transcends time.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-emotional">
              <img 
                src={letterImage} 
                alt="Handwritten letter fading into light"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-6 left-6 text-white/90">
              <p className="font-serif text-lg italic">
                "The things we never said… still matter."
              </p>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card/80 backdrop-blur rounded-xl p-6 shadow-warm hover:shadow-emotional transition-shadow duration-300">
                <blockquote className="font-serif text-xl font-medium text-foreground mb-4 leading-relaxed">
                  "{testimonial.story}"
                </blockquote>
                
                <div className="border-l-4 border-emotional pl-4">
                  <p className="text-muted-foreground mb-2">
                    {testimonial.detail}
                  </p>
                  <cite className="text-sm font-semibold text-emotional not-italic">
                    — {testimonial.name}
                  </cite>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-6">
              <p className="text-muted-foreground italic">
                Over 10,000 families have found healing through Timelessgram
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};