import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Loader2, CheckCircle } from 'lucide-react';
import { ConnectButton, useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { getWallets } from '@mysten/wallet-standard';
import { SLUSH_WALLET_NAME } from '@mysten/slush-wallet';

const ConnectWalletButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string>('');
  const [availableWallets, setAvailableWallets] = useState<any[]>([]);
  const currentAccount = useCurrentAccount();
  const { currentWallet } = useCurrentWallet();

  // Detect available wallets using the wallet standard
  useEffect(() => {
    const detectWallets = async () => {
      try {
        console.log('🔍 Detecting wallets using Sui wallet standard...');
        const wallets = getWallets().get();
        console.log('Available wallets:', wallets);
        setAvailableWallets([...wallets]);
        
        if (wallets.length === 0) {
          console.log('❌ No wallets detected via wallet standard');
          // Fallback: check for SlushWallet class
          if ((window as any).SlushWallet) {
            console.log('✅ Found SlushWallet class:', (window as any).SlushWallet);
            setAvailableWallets([{ name: 'SlushWallet', class: (window as any).SlushWallet }]);
          }
        }
      } catch (error) {
        console.error('Error detecting wallets:', error);
      }
    };

    detectWallets();
  }, []);

  const connectToWallet = async (wallet: any) => {
    setIsConnecting(true);
    setError('');
    
    try {
      console.log('🔍 Connecting to wallet:', wallet);
      
      if (wallet.class) {
        // Handle SlushWallet class
        const walletInstance = new wallet.class();
        console.log('Created wallet instance:', walletInstance);
        
        // Try to connect using the wallet's methods
        if (walletInstance.connect) {
          await walletInstance.connect();
        } else if (walletInstance.requestPermissions) {
          await walletInstance.requestPermissions();
        }
        
        setIsConnected(true);
        console.log('Successfully connected to wallet!');
        window.location.reload();
      } else if (wallet.features && wallet.features['standard:connect']) {
        // Handle wallet standard
        await wallet.features['standard:connect'].connect();
        setIsConnected(true);
        console.log('Successfully connected to wallet!');
        window.location.reload();
      } else {
        throw new Error('Wallet does not support standard connection methods');
      }

    } catch (error) {
      console.error('Connection error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to wallet';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  // If already connected via dapp-kit, show connected state
  if (currentAccount) {
    const isSlushWallet = currentWallet?.name === SLUSH_WALLET_NAME;
    return (
      <Button variant="outline" size="sm" disabled>
        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
        Connected {isSlushWallet ? '(Slush)' : `(${currentWallet?.name || 'Unknown'})`} ({currentAccount.address.slice(0, 4)}...)
      </Button>
    );
  }

  // If our custom connection is working, show that state
  if (isConnected) {
    return (
      <Button variant="outline" size="sm" disabled>
        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
        Connected
      </Button>
    );
  }

  // Show available wallets or the standard ConnectButton
  if (availableWallets.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <ConnectButton 
          connectText="Connect Wallet"
          className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity"
        />
        <div className="text-xs text-muted-foreground">
          Or try detected wallets:
        </div>
        {availableWallets.map((wallet, index) => (
          <Button 
            key={index}
            variant="outline" 
            size="sm" 
            onClick={() => connectToWallet(wallet)}
            disabled={isConnecting}
            className="text-xs"
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="h-3 w-3 mr-1" />
                Connect {wallet.name || 'Wallet'}
              </>
            )}
          </Button>
        ))}
      </div>
    );
  }

  // Fallback to standard ConnectButton
  return (
    <div className="flex flex-col gap-2">
      <ConnectButton 
        connectText="Connect Wallet"
        className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity"
      />
      <div className="text-xs text-muted-foreground">
        No wallets detected. Make sure your wallet is installed and unlocked.
      </div>
    </div>
  );
};

export default ConnectWalletButton;
