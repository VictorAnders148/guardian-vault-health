import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Shield, 
  Key, 
  CheckCircle, 
  AlertCircle,
  Hexagon
} from "lucide-react";

export const WalletConnect = () => {
  return (
    <section className="py-16 px-6 bg-secondary/50 hexagon-pattern">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Connect Your Digital Wallet
          </h2>
          <p className="text-xl text-muted-foreground">
            Your wallet is the key to owning and controlling your medical data on the blockchain
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Wallet Connection Card */}
          <Card className="glow-primary transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Wallet className="w-6 h-6 text-primary" />
                <span>Wallet Connection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Connection Status */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-warning rounded-full animate-encrypt-pulse"></div>
                  <span className="text-foreground">Status: Not Connected</span>
                </div>
                <Badge variant="outline" className="text-warning border-warning">
                  Disconnected
                </Badge>
              </div>

              {/* Supported Wallets */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Supported Wallets</h4>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start space-x-3 transition-bounce hover:glow-accent"
                >
                  <Hexagon className="w-5 h-5 text-accent" />
                  <span>MetaMask</span>
                  <Badge className="ml-auto bg-success text-success-foreground">Recommended</Badge>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start space-x-3 transition-bounce"
                >
                  <Wallet className="w-5 h-5 text-primary" />
                  <span>WalletConnect</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start space-x-3 transition-bounce"
                >
                  <Key className="w-5 h-5 text-primary" />
                  <span>Coinbase Wallet</span>
                </Button>
              </div>

              {/* Primary Connect Button */}
              <Button 
                className="w-full bg-gradient-primary glow-primary text-lg py-6 transition-bounce"
                size="lg"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            </CardContent>
          </Card>

          {/* Security Benefits */}
          <Card className="glow-accent transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-accent" />
                <span>Security Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">True Ownership</h4>
                    <p className="text-muted-foreground text-sm">
                      Your medical records are tied to your wallet address, ensuring you maintain complete ownership
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Cryptographic Security</h4>
                    <p className="text-muted-foreground text-sm">
                      Private keys ensure only you can decrypt and authorize access to your health data
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Decentralized Control</h4>
                    <p className="text-muted-foreground text-sm">
                      No central authority can access your records without your explicit permission
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Audit Trail</h4>
                    <p className="text-muted-foreground text-sm">
                      Every access attempt is recorded on the blockchain for complete transparency
                    </p>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start space-x-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-warning mt-1" />
                <div>
                  <h4 className="font-semibold text-warning">Important</h4>
                  <p className="text-warning/80 text-sm">
                    Keep your private keys secure. Lost keys mean permanent loss of access to your medical records.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};