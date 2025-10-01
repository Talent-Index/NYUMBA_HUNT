import React from 'react';
import { ConnectButton, useCurrentAccount, useWallets } from '@mysten/dapp-kit';

export default function ConnectWalletButton() {
  const account = useCurrentAccount();
  const wallets = useWallets();

  const connectSlush = async () => {
    const slush = wallets.find(w => w.name?.toLowerCase().includes('slush'));
    if (!slush) {
      window.open('https://slushwallet.xyz', '_blank');
      return;
    }
    // Use standard connect via the modal by triggering click on ConnectButton or prompt users
    // Some wallet adapters don't expose direct connect; fallback to opening wallet site
    (document.querySelector('[data-dapp-kit="connect-button"]') as HTMLButtonElement)?.click?.();
  };

  return (
    <div>
      <ConnectButton data-dapp-kit="connect-button" />
      <button onClick={connectSlush} style={{ marginLeft: 8 }}>Connect Slush</button>
      {account?.address && (
        <span>
          Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </span>
      )}
    </div>
  );
}