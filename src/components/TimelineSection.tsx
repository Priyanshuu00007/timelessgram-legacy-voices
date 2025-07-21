import { Mic, Shield, SendHorizontal, Clock } from "lucide-react";

const steps = [
  {
    icon: Mic,
    title: "Record",
    description: "Share your heart through video, voice, or written words",
    detail: "Take your time. Say what you've always wanted to say."
  },
  {
    icon: Shield,
    title: "Store Securely",
    description: "Your messages are encrypted and safely protected",
    detail: "Bank-level security ensures your legacy stays private."
  },
  {
    icon: Clock,
    title: "Annual Check",
    description: "We verify you're still with us each year",
    detail: "A gentle reminder that lets you update or add new messages."
  },
  {
    icon: SendHorizontal,
    title: "Delivered After Departure",
    description: "Your loved ones receive your final gift",
    detail: "When it matters most, your voice reaches them."
  }
];

export const TimelineSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple, secure process that ensures your most important words reach the right people
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 top-20 h-[calc(100%-160px)] w-0.5 bg-gradient-to-b from-accent via-emotional to-accent hidden lg:block"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex items-start gap-8 group">
                {/* Step Number Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-emotional rounded-full flex items-center justify-center shadow-emotional group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-background px-2 py-1 rounded text-xs font-semibold text-emotional">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="font-serif text-2xl font-bold mb-3 text-foreground group-hover:text-emotional transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-muted-foreground/80 italic">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};