import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlobalWallet } from "./global-wallet";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="MedSecure Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-foreground">MedSecure</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                size="sm"
              >
                Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant={isActive("/dashboard") ? "default" : "ghost"} 
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/new-record">
              <Button 
                variant={isActive("/new-record") ? "default" : "ghost"} 
                size="sm"
              >
                New Medical Records
              </Button>
            </Link>
            <Link to="/grant-access">
              <Button 
                variant={isActive("/grant-access") ? "default" : "ghost"} 
                size="sm"
              >
                Grant Access
              </Button>
            </Link>
          </div>

          {/* Wallet */}
          <GlobalWallet />
        </div>
      </div>
    </nav>
  );
};