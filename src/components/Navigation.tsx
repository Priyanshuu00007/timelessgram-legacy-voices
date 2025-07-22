import { NavBar } from "@/components/ui/tubelight-navbar";
import { Heart, Home, BookOpen, Info, Shield, User, MessageSquare } from "lucide-react";

export const Navigation = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'How It Works', url: '#how-it-works', icon: BookOpen },
    { name: 'Stories', url: '#stories', icon: MessageSquare },
    { name: 'About', url: '/about', icon: Info },
    { name: 'Security', url: '#security', icon: Shield },
  ];

  return (
    <>
      {/* Logo - Absolute top left */}
      <div className="absolute top-4 left-6 z-50 flex items-center gap-2">
        <Heart className="w-6 h-6 text-emotional" />
        <span className="font-serif text-xl font-bold text-foreground">Timelessgram</span>
      </div>
      
      {/* Tubelight Navigation */}
      <NavBar items={navItems} />
      
      {/* CTA Button - Absolute top right */}
      <div className="absolute top-4 right-6 z-50">
        <a 
          href="/record" 
          className="bg-emotional hover:bg-emotional/90 text-white px-6 py-2 rounded-full font-medium transition-colors"
        >
          Create Legacy
        </a>
      </div>
    </>
  );
};