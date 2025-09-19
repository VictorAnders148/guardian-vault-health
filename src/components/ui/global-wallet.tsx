import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const GlobalWallet = () => {
  const { isConnected, address } = useAccount();

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-3 bg-success/10 px-4 py-2 rounded-full border border-success/20">
        <CheckCircle className="w-4 h-4 text-success" />
        <span className="text-sm text-success-foreground">
          {address.slice(0, 8)}...{address.slice(-6)}
        </span>
        <Badge variant="outline" className="text-success border-success">
          Connected
        </Badge>
      </div>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button 
                    onClick={openConnectModal}
                    variant="outline" 
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} variant="outline" size="sm">
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex items-center space-x-3 bg-success/10 px-4 py-2 rounded-full border border-success/20">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-success-foreground">
                    {account.displayName}
                  </span>
                  <Badge variant="outline" className="text-success border-success">
                    Connected
                  </Badge>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};