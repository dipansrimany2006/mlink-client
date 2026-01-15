'use client';

import { useSearchParams } from 'next/navigation';
import { useAccount, useConnect, useSendTransaction, useSwitchChain } from 'wagmi';
import { Mlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';
import '@dipansrimany/mlink-sdk/styles.css';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WalletButton } from '@/components/WalletButton';

function MlinkViewer() {
  const searchParams = useSearchParams();
  const actionUrl = searchParams.get('action');

  const { address, isConnected, chainId } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const { sendTransactionAsync } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
  const [txHash, setTxHash] = useState<string | null>(null);

  const adapter = useMlinkWagmiAdapter({
    address,
    isConnected,
    connect: async () => {
      await connectAsync({ connector: connectors[0] });
    },
    sendTransaction: async (args) => {
      if (chainId !== args.chainId) {
        await switchChainAsync({ chainId: args.chainId as 5003 | 5000 });
      }
      return await sendTransactionAsync({
        to: args.to,
        value: args.value,
        data: args.data,
        chainId: args.chainId as 5003 | 5000,
      });
    },
  });

  if (!actionUrl) {
    return (
      <div className="min-h-screen bg-[#CCF1E7] flex items-center justify-center p-4">
        <div className="bg-white/50 rounded-2xl border border-black/10 p-8 max-w-md text-center">
          <div className="text-4xl mb-4">🔗</div>
          <h1 className="text-xl font-bold text-black mb-2">No MLink Provided</h1>
          <p className="text-black/60 mb-6">
            Please provide an action URL using the <code className="bg-black/10 px-2 py-1 rounded">?action=</code> parameter.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const decodedUrl = decodeURIComponent(actionUrl);

  return (
    <div className="min-h-screen bg-[#CCF1E7]">
      {/* Header */}
      <header className="border-b border-black/10 sticky top-0 z-50 bg-[#CCF1E7]/95 backdrop-blur supports-[backdrop-filter]:bg-[#CCF1E7]/60">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/mlinks-logo.png"
              alt="MLink Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <WalletButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-12">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">Execute MLink</h1>
          <p className="text-black/60 text-sm">
            Connect your wallet to execute this transaction
          </p>
        </div>

        {/* Mlink Card */}
        <div className="bg-white/50 rounded-2xl border border-black/10 p-1 overflow-hidden">
          <Mlink
            url={decodedUrl}
            adapter={adapter}
            theme="mantle"
            stylePreset="default"
            registryUrl="https://mlink-client.vercel.app"
            requireRegistration={true}
            allowPending={false}
            onSuccess={(hash, action) => {
              setTxHash(hash);
              console.log(`Transaction successful: ${hash}`);
            }}
            onError={(error) => {
              console.error('Transaction failed:', error);
            }}
          />
        </div>

        {/* Transaction Success */}
        {txHash && (
          <div className="mt-4 p-4 bg-[#00D395]/10 border border-[#00D395]/30 rounded-xl">
            <p className="text-[#00D395] text-sm font-medium mb-2">Transaction submitted!</p>
            <a
              href={`https://sepolia.mantlescan.xyz/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/60 text-xs hover:text-[#00D395] transition-colors break-all"
            >
              View on Explorer →
            </a>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 p-4 bg-white/30 rounded-xl border border-black/5">
          <h3 className="text-sm font-medium text-black mb-2">Action URL</h3>
          <code className="text-xs text-black/50 break-all block">{decodedUrl}</code>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 py-6 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center text-black/50 text-sm">
          <p>
            Powered by{' '}
            <a
              href="https://www.npmjs.com/package/@dipansrimany/mlink-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00D395] hover:underline"
            >
              @dipansrimany/mlink-sdk
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function MlinkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#CCF1E7] flex items-center justify-center">
          <div className="animate-pulse text-black/60">Loading...</div>
        </div>
      }
    >
      <MlinkViewer />
    </Suspense>
  );
}
