// dapp/app/components/WalletProvider.tsx
'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// 必须引入 UI 样式，否则按钮会很难看
import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  // 我们使用 Helius 的 Devnet 节点
  const endpoint = useMemo(() => "https://devnet.helius-rpc.com/?api-key=6c1473e7-a1ca-4d60-ae45-5c59ef27303e", []);

  const wallets = useMemo(() => [], []); // 留空则自动识别浏览器已安装的钱包

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};