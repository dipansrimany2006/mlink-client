import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ClientPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Client
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Client SDK Overview
        </h1>
        <p className="text-xl text-muted-foreground">
          The Mlink Client SDK provides React components and hooks for rendering and interacting with mlinks in your applications.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong className="text-foreground">Mlink Component</strong> — Drop-in component for rendering mlinks with full UI</li>
          <li><strong className="text-foreground">useMlink Hook</strong> — Headless hook for custom mlink implementations</li>
          <li><strong className="text-foreground">useExecuteMlink Hook</strong> — Execute mlink actions programmatically</li>
          <li><strong className="text-foreground">Wallet Adapters</strong> — Pre-built adapters for wagmi and ethers.js</li>
          <li><strong className="text-foreground">Theming</strong> — Light, dark, and Mantle themes with full customization</li>
          <li><strong className="text-foreground">Registry Validation</strong> — Automatic validation against the mlink registry</li>
        </ul>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <p className="text-muted-foreground">
          The simplest way to render an mlink is using the <code className="text-[#64B3AE] bg-muted px-1.5 py-0.5 rounded">Mlink</code> component with a wallet adapter:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { Mlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';
import '@dipansrimany/mlink-sdk/styles.css';

function MyMlink() {
  // Create adapter using wagmi hooks
  const adapter = useMlinkWagmiAdapter({
    address: '0x...',
    isConnected: true,
    connect: async () => { /* connect wallet */ },
    sendTransaction: async (tx) => { /* send transaction */ },
  });

  return (
    <Mlink
      url="https://api.example.com/action/donate"
      adapter={adapter}
      theme="dark"
      onSuccess={(txHash) => console.log('Transaction:', txHash)}
      onError={(error) => console.error(error)}
    />
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Imports */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Exports</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import {
  // Components
  Mlink,
  MlinkComponent, // alias for Mlink
  MlinkProvider,

  // Hooks
  useMlink,
  useExecuteMlink,
  useMlinkContext,

  // Adapters
  useMlinkWagmiAdapter,
  useMlinkEthersAdapter,
  createMlinkAdapter,

  // Themes
  lightTheme,
  darkTheme,
  mantleTheme,
  themePresets,
  resolveTheme,

  // Types
  type MlinkAdapter,
  type MlinkTheme,
  type MlinkProps,
  type MlinkStatus,
  type UseMlinkOptions,
  type ExecutionResult,
} from '@dipansrimany/mlink-sdk/react';`}</code>
          </pre>
        </div>
      </div>

      {/* Component Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Component Overview</h2>

        <div className="grid gap-4">
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-lg mb-2">Mlink</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The main component for rendering an mlink. Handles fetching metadata, displaying the UI, and executing transactions.
            </p>
            <Link href="/docs/client/mlink-component" className="text-sm text-[#64B3AE] hover:underline inline-flex items-center">
              View documentation <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-lg mb-2">MlinkProvider</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Optional context provider for sharing theme and chain configuration across multiple Mlink components.
            </p>
            <div className="rounded-lg border border-border bg-zinc-950 p-3 overflow-x-auto mt-2">
              <pre className="text-sm text-zinc-100">
                <code>{`<MlinkProvider theme="dark" defaultChain={mantleMainnet}>
  <App />
</MlinkProvider>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Status States */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Mlink Status States</h2>
        <p className="text-muted-foreground">
          The mlink component goes through various status states during its lifecycle:
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">idle</td>
                <td className="p-3 text-muted-foreground">Initial state, not yet fetching</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">loading</td>
                <td className="p-3 text-muted-foreground">Fetching mlink metadata</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">validating</td>
                <td className="p-3 text-muted-foreground">Validating against the registry</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">ready</td>
                <td className="p-3 text-muted-foreground">Ready to execute actions</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">executing</td>
                <td className="p-3 text-muted-foreground">Transaction in progress</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">success</td>
                <td className="p-3 text-muted-foreground">Transaction succeeded</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">error</td>
                <td className="p-3 text-muted-foreground">An error occurred</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">unregistered</td>
                <td className="p-3 text-muted-foreground">Mlink not found in registry</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">blocked</td>
                <td className="p-3 text-muted-foreground">Mlink is blocked by registry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-2xl font-semibold">Documentation</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/docs/client/mlink-component"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Mlink Component
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Full component API reference
            </p>
          </Link>
          <Link
            href="/docs/client/use-mlink"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              useMlink Hook
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Headless hook for custom UIs
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
              Connect wagmi, ethers, or custom wallets
            </p>
          </Link>
          <Link
            href="/docs/client/theming"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Theming
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Customize the look and feel
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
