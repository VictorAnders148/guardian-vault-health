import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle } from "lucide-react";
import { useState } from "react";

export const GlobalWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = () => {
    // Mock wallet connection
    setIsConnected(true);
    setWalletAddress("0x742d35Cc6466C4E7C7db3B...A23B1c");
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-3 bg-success/10 px-4 py-2 rounded-full border border-success/20">
        <CheckCircle className="w-4 h-4 text-success" />
        <span className="text-sm text-success-foreground">
          {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
        </span>
        <Badge variant="outline" className="text-success border-success">
          Connected
        </Badge>
      </div>
    );
  }

  return (
    <Button 
      onClick={connectWallet}
      variant="outline" 
      size="sm"
      className="border-primary text-primary hover:bg-primary/10"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
};