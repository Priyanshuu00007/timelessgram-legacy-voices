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
      {/* Fixed Navigation Bar at top */}
      <NavBar items={navItems} />
      
      {/* Header with Logo and CTA - below navigation */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 mt-16 mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-emotional" />
          <span className="font-serif text-lg sm:text-xl font-bold text-foreground">Timelessgram</span>
        </div>
        
        <a 
          href="/create-legacy" 
          className="bg-emotional hover:bg-emotional/90 text-white px-4 sm:px-6 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
        >
          Create Legacy
        </a>
      </div>
    </>
  );
};