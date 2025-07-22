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
      {/* Logo - Always visible on all devices */}
      <div className="absolute top-4 left-4 sm:left-6 z-50 flex items-center gap-2">
        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-emotional" />
        <span className="font-serif text-lg sm:text-xl font-bold text-foreground">Timelessgram</span>
      </div>
      
      {/* Tubelight Navigation */}
      <NavBar items={navItems} />
      
      {/* CTA Button - Responsive positioning */}
      <div className="absolute top-4 right-4 sm:right-6 z-50">
        <a 
          href="/record" 
          className="bg-emotional hover:bg-emotional/90 text-white px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
        >
          Create Legacy
        </a>
      </div>
    </>
  );
};