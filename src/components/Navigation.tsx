import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-emotional" />
            <span className="font-serif text-xl font-bold text-foreground">Timelessgram</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-emotional transition-colors">
              How It Works
            </a>
            <a href="#stories" className="text-muted-foreground hover:text-emotional transition-colors">
              Stories
            </a>
            <a href="#about" className="text-muted-foreground hover:text-emotional transition-colors">
              About
            </a>
            <a href="#security" className="text-muted-foreground hover:text-emotional transition-colors">
              Security
            </a>
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost">
              Sign In
            </Button>
            <Button variant="emotional" asChild>
              <a href="/record">Create Legacy</a>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <div className="flex flex-col gap-4">
              <a href="#how-it-works" className="text-muted-foreground hover:text-emotional transition-colors">
                How It Works
              </a>
              <a href="#stories" className="text-muted-foreground hover:text-emotional transition-colors">
                Stories
              </a>
              <a href="/about" className="text-muted-foreground hover:text-emotional transition-colors">
                About
              </a>
              <a href="#security" className="text-muted-foreground hover:text-emotional transition-colors">
                Security
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button variant="ghost" className="justify-start">
                  Sign In
                </Button>
                <Button variant="emotional" className="justify-start" asChild>
                  <a href="/record">Create Legacy</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};