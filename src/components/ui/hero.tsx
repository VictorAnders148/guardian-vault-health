import { Button } from "@/components/ui/button";
import { Shield, Lock, Database } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero hexagon-pattern relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full glow-primary animate-encrypt-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full glow-accent animate-encrypt-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="MedSecure Logo" className="w-20 h-20 transition-smooth hover:scale-110 glow-primary" />
        </div>
        
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          Your Health, 
          <span className="text-accent glow-accent drop-shadow-lg"> Your Privacy</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
          Revolutionary medical data exchange platform where patients control their health records 
          through encrypted blockchain technology. Share with doctors securely, decrypt only with your consent.
        </p>
        
        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 glow-primary transition-smooth hover:bg-white/25 border border-white/20">
            <Shield className="w-12 h-12 text-accent mb-4 mx-auto drop-shadow-lg" />
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">End-to-End Encryption</h3>
            <p className="text-white drop-shadow-sm">Your medical data is encrypted at rest and in transit</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 glow-accent transition-smooth hover:bg-white/25 border border-white/20">
            <Lock className="w-12 h-12 text-accent mb-4 mx-auto drop-shadow-lg" />
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">Consent-Based Access</h3>
            <p className="text-white drop-shadow-sm">Only you can grant access to your health records</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 glow-success transition-smooth hover:bg-white/25 border border-white/20">
            <Database className="w-12 h-12 text-accent mb-4 mx-auto drop-shadow-lg" />
            <h3 className="text-lg font-semibold text-white mb-2 drop-shadow-md">Blockchain Ownership</h3>
            <p className="text-white drop-shadow-sm">You own and control your medical data forever</p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 glow-primary px-8 py-4 text-lg font-semibold transition-bounce drop-shadow-lg">
              View Dashboard
            </Button>
          </Link>
          <Link to="/new-record">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold transition-bounce drop-shadow-lg bg-white/10 backdrop-blur-sm"
            >
              New Medical Records
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};