import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function QuickStartPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Getting Started
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Quick Start
        </h1>
        <p className="text-xl text-muted-foreground">
          Build your first mlink in 5 minutes — from action endpoint to rendered component.
        </p>
      </div>

      {/* Step 1 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#64B3AE] text-white font-semibold text-sm">
            1
          </div>
          <h2 className="text-2xl font-semibold">Create the Action Endpoint</h2>
        </div>
        <p className="text-muted-foreground">
          First, create an API endpoint that defines what your mlink does. This example creates a simple donation action.
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <div className="text-xs text-zinc-500 mb-2">app/api/action/donate/route.ts</div>
          <pre className="text-sm text-zinc-100">
            <code>{`import { createAction, linkedAction, amountParam } from '@dipansrimany/mlink-sdk';
import { createNextHandler } from '@dipansrimany/mlink-sdk/adapters/next';

const donateAction = createAction({
  title: 'Support Our Project',
  description: 'Send a donation on Mantle Network',
  icon: 'https://your-domain.com/icon.png',

  links: {
    actions: [
      linkedAction({
        label: 'Donate 1 MNT',
        href: '/api/action/donate?amount=1',
      }),
      linkedAction({
        label: 'Donate 5 MNT',
        href: '/api/action/donate?amount=5',
      }),
      linkedAction({
        label: 'Custom Amount',
        href: '/api/action/donate?amount={amount}',
        parameters: [
          amountParam({
            name: 'amount',
            label: 'Amount (MNT)',
            required: true,
            min: 0.01,
          }),
        ],
      }),
    ],
  },

  handler: async (ctx) => {
    const amount = ctx.data?.amount || '1';
    const receiver = '0xYourReceiverAddress';

    // Convert MNT to wei (1 MNT = 10^18 wei)
    const weiValue = (BigInt(Math.floor(parseFloat(amount) * 1e18))).toString();

    return {
      transaction: {
        to: receiver,
        value: weiValue,
        data: '0x',
        chainId: 5000, // Mantle Mainnet
      },
      message: \`Donating \${amount} MNT\`,
    };
  },
});

export const { GET, POST, OPTIONS } = createNextHandler(donateAction);`}</code>
          </pre>
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#64B3AE] text-white font-semibold text-sm">
            2
          </div>
          <h2 className="text-2xl font-semibold">Set Up the Web3 Provider</h2>
        </div>
        <p className="text-muted-foreground">
          Configure wagmi and RainbowKit (or your preferred Web3 provider) in your app.
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <div className="text-xs text-zinc-500 mb-2">providers/Web3Provider.tsx</div>
          <pre className="text-sm text-zinc-100">
            <code>{`'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mantle } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'My App',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [mantle],
  transports: {
    [mantle.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Step 3 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#64B3AE] text-white font-semibold text-sm">
            3
          </div>
          <h2 className="text-2xl font-semibold">Render the Mlink Component</h2>
        </div>
        <p className="text-muted-foreground">
          Use the Mlink component to render your action anywhere in your app.
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <div className="text-xs text-zinc-500 mb-2">components/DonationMlink.tsx</div>
          <pre className="text-sm text-zinc-100">
            <code>{`'use client';

import { Mlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';
import '@dipansrimany/mlink-sdk/styles.css';
import { useAccount, useConnect, useSendTransaction } from 'wagmi';
import { toast } from 'sonner';

export function DonationMlink() {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { sendTransactionAsync } = useSendTransaction();

  const adapter = useMlinkWagmiAdapter({
    address,
    isConnected,
    connect: async () => {
      await connectAsync({ connector: connectors[0] });
    },
    sendTransaction: sendTransactionAsync,
  });

  return (
    <Mlink
      url="https://your-domain.com/api/action/donate"
      adapter={adapter}
      theme="dark"
      onSuccess={(txHash) => {
        toast.success('Donation sent!', {
          description: \`Transaction: \${txHash.slice(0, 10)}...\`,
        });
      }}
      onError={(error) => {
        toast.error('Transaction failed', {
          description: error,
        });
      }}
    />
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Step 4 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#64B3AE] text-white font-semibold text-sm">
            4
          </div>
          <h2 className="text-2xl font-semibold">Register Your Mlink (Optional)</h2>
        </div>
        <p className="text-muted-foreground">
          Register your mlink with the registry to enable discovery and validation.
        </p>
        <div className="rounded-lg border border-border p-4 bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Visit the <Link href="/dashboard/register" className="text-[#64B3AE] hover:underline">Mlink Dashboard</Link> to register your action endpoint. Registration provides:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
            <li>Verification badge in the UI</li>
            <li>Discovery in the mlink registry</li>
            <li>Protection against malicious impersonation</li>
          </ul>
        </div>
      </div>

      {/* What&apos;s Next */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-2xl font-semibold">What&apos;s Next?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/docs/client"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Client SDK
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Explore all client components and hooks
            </p>
          </Link>
          <Link
            href="/docs/actions"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Action SDK
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Build more complex action endpoints
            </p>
          </Link>
          <Link
            href="/docs/client/adapters"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Wallet Adapters
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Connect different wallet providers
            </p>
          </Link>
          <Link
            href="/docs/actions/parameters"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Parameters
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Collect user input with typed parameters
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
