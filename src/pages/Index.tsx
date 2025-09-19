import { Hero } from "@/components/ui/hero";
import { Dashboard } from "@/components/ui/dashboard";
import { WalletConnect } from "@/components/ui/wallet-connect";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Dashboard />
      <WalletConnect />
      <Footer />
    </div>
  );
};

export default Index;