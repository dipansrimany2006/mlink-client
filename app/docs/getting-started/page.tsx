import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function GettingStartedPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Getting Started
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="text-xl text-muted-foreground">
          Get started with the Mlink SDK in your project.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Prerequisites</h2>
        <p className="text-muted-foreground">
          Before you begin, make sure you have the following:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Node.js 18+ or Bun 1.0+</li>
          <li>React 18+ (for client-side components)</li>
          <li>A Web3 wallet provider (wagmi, ethers, or custom)</li>
        </ul>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          Install the SDK using your preferred package manager:
        </p>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">npm</h3>
          <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-100">
              <code>npm install @dipansrimany/mlink-sdk</code>
            </pre>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">bun</h3>
          <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-100">
              <code>bun add @dipansrimany/mlink-sdk</code>
            </pre>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">yarn</h3>
          <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-100">
              <code>yarn add @dipansrimany/mlink-sdk</code>
            </pre>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">pnpm</h3>
          <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-100">
              <code>pnpm add @dipansrimany/mlink-sdk</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Package Exports */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Package Exports</h2>
        <p className="text-muted-foreground">
          The SDK is organized into multiple entry points for optimal tree-shaking:
        </p>

        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Import Path</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">@dipansrimany/mlink-sdk</td>
                <td className="p-3 text-muted-foreground">Core utilities, validators, and constants</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">@dipansrimany/mlink-sdk/react</td>
                <td className="p-3 text-muted-foreground">React components, hooks, and adapters</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">@dipansrimany/mlink-sdk/adapters/next</td>
                <td className="p-3 text-muted-foreground">Next.js API route handlers</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">@dipansrimany/mlink-sdk/adapters/express</td>
                <td className="p-3 text-muted-foreground">Express.js middleware handlers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Styles */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import Styles</h2>
        <p className="text-muted-foreground">
          The Mlink component requires its styles to be imported. Add this to your root layout or entry file:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import '@dipansrimany/mlink-sdk/styles.css';`}</code>
          </pre>
        </div>
      </div>

      {/* TypeScript */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">TypeScript Support</h2>
        <p className="text-muted-foreground">
          The SDK is written in TypeScript and includes full type definitions. No additional @types packages are required.
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// All types are exported from the main package
import type {
  ActionMetadata,
  TransactionRequest,
  TransactionResponse,
  LinkedAction,
  MlinkAdapter,
  MlinkTheme,
} from '@dipansrimany/mlink-sdk';`}</code>
          </pre>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/docs/quick-start"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Quick Start
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Build your first mlink in 5 minutes
            </p>
          </Link>
          <Link
            href="/docs/client"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Client SDK
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Learn about React components and hooks
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
