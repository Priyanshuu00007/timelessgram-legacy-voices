import { Heart, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-emotional" />
              <h3 className="font-serif text-2xl font-bold">Timelessgram</h3>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Where love transcends time, and words live forever. 
              Creating bridges between hearts, even across the greatest distance.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Trusted by over 10,000 families worldwide
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-emotional transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-emotional transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-emotional transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emotional transition-colors">Legacy Plan</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-emotional transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emotional transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emotional transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-emotional transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@timelessgram.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-TIMELESS</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Available worldwide</span>
              </div>
            </div>
            
            <div className="text-sm text-primary-foreground/60">
              © 2024 Timelessgram. Made with ❤️ for lasting love.
            </div>
          </div>
        </div>
        
        {/* Final Quote */}
        <div className="text-center mt-8 pt-8 border-t border-primary-foreground/10">
          <p className="font-serif italic text-primary-foreground/60">
            "Love is the bridge between two hearts, and words are the path that love travels."
          </p>
        </div>
      </div>
    </footer>
  );
};