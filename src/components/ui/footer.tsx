import { Button } from "@/components/ui/button";
import { Heart, Github, Twitter, Mail, Dna } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Animated DNA Strand Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="animate-dna-unravel">
          {/* DNA Double Helix represented as interconnected dots */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full glow-accent"
                style={{
                  left: `${5 + (i * 4)}%`,
                  top: `${50 + Math.sin(i * 0.5) * 20}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={`alt-${i}`}
                className="absolute w-2 h-2 bg-accent-glow rounded-full glow-accent"
                style={{
                  left: `${5 + (i * 4)}%`,
                  top: `${50 - Math.sin(i * 0.5) * 20}%`,
                  animationDelay: `${i * 0.1 + 0.5}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Blockchain blocks emerging from DNA */}
        <div className="absolute bottom-10 right-10">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={`block-${i}`}
              className="absolute w-6 h-6 border-2 border-accent/30 transform rotate-45 animate-encrypt-pulse"
              style={{
                right: `${i * 40}px`,
                bottom: `${i * 20}px`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="MedSecure Logo" className="w-10 h-10 glow-accent" />
              <h3 className="text-2xl font-bold">MedSecure</h3>
            </div>
            <p className="text-primary-foreground/80 mb-6 text-lg leading-relaxed">
              Revolutionizing healthcare data privacy through blockchain technology. 
              Your health records, your control, your peace of mind.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Platform</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-smooth">Dashboard</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Medical Records</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Doctor Access</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Wallet Integration</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Privacy Settings</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent">Resources</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-smooth">Documentation</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Security Guide</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-smooth">Support Center</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-primary-foreground/60 mb-4 md:mb-0">
              <Dna className="w-5 h-5 animate-encrypt-pulse" />
              <span>© 2024 MedSecure. Healthcare data sovereignty through blockchain.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-primary-foreground/80">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-accent animate-encrypt-pulse" />
              <span>for patient privacy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};