'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mantleSepolia, mantleMainnet } from './chains';

export const config = getDefaultConfig({
  appName: 'MLinks',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
  chains: [mantleSepolia, mantleMainnet],
  ssr: true,
});
