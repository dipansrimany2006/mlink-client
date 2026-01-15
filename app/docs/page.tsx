import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Zap, Code, Server } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          SDK Documentation
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Mlink SDK
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          A lightweight, framework-agnostic toolkit for building and executing mlink flows on Mantle Network — with server adapters, React hooks, and type-safe utilities.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-[#64B3AE]/10 p-2">
              <Code className="h-5 w-5 text-[#64B3AE]" />
            </div>
            <h3 className="font-semibold text-zinc-100">Client SDK</h3>
          </div>
          <p className="text-sm text-zinc-400">
            React components and hooks for rendering and interacting with mlinks in your applications. Includes the Mlink component, useMlink hook, and wallet adapters.
          </p>
          <Link href="/docs/client" className="inline-flex items-center text-sm text-[#64B3AE] hover:underline">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-[#64B3AE]/10 p-2">
              <Server className="h-5 w-5 text-[#64B3AE]" />
            </div>
            <h3 className="font-semibold text-zinc-100">Action SDK</h3>
          </div>
          <p className="text-sm text-zinc-400">
            Server-side utilities for creating and handling mlink actions. Build type-safe action endpoints with built-in validation and Next.js/Express adapters.
          </p>
          <Link href="/docs/actions" className="inline-flex items-center text-sm text-[#64B3AE] hover:underline">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Quick Install */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Install</h2>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`npm install @dipansrimany/mlink-sdk

# or with bun
bun add @dipansrimany/mlink-sdk`}</code>
          </pre>
        </div>
      </div>

      {/* Basic Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Example</h2>
        <p className="text-zinc-400">
          Here&apos;s a quick example of rendering an mlink in your React application:
        </p>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { Mlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';
import { useAccount, useConnect, useSendTransaction } from 'wagmi';

function MyMlink() {
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
      url="https://your-action-endpoint.com/api/action"
      adapter={adapter}
      onSuccess={(txHash) => console.log('Success:', txHash)}
      onError={(error) => console.error('Error:', error)}
    />
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* What are Mlinks */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">What are Mlinks?</h2>
        <p className="text-zinc-400">
          Mlinks are distributable blockchain experiences that can be embedded anywhere a link can exist. They offer a modern approach to service integration, replacing traditional SDKs with a more streamlined, maintainable solution.
        </p>
        <ul className="list-disc list-inside space-y-2 text-zinc-400">
          <li>Embed one-click blockchain actions anywhere</li>
          <li>No redirects — transactions happen in context</li>
          <li>Support for Mantle Network mainnet and testnet</li>
          <li>Full TypeScript support with type-safe APIs</li>
          <li>Customizable themes to match your brand</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild className="bg-[#64B3AE] hover:bg-[#64B3AE]/90">
            <Link href="/docs/getting-started">
              <Zap className="mr-2 h-4 w-4" />
              Get Started
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100">
            <Link href="/docs/client">
              View Client Docs
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100">
            <Link href="/docs/actions">
              View Action Docs
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
