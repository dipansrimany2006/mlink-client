import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ActionsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Actions
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Action SDK Overview
        </h1>
        <p className="text-xl text-muted-foreground">
          The Mlink Action SDK provides server-side utilities for creating and handling mlink action endpoints.
        </p>
      </div>

      {/* How Actions Work */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">How Actions Work</h2>
        <p className="text-muted-foreground">
          Mlink actions follow a simple request-response pattern:
        </p>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
          <li>
            <strong className="text-foreground">GET Request</strong> — Returns action metadata (title, description, icon, available actions)
          </li>
          <li>
            <strong className="text-foreground">POST Request</strong> — Receives user input and wallet address, returns transaction data
          </li>
          <li>
            <strong className="text-foreground">Transaction Execution</strong> — Client executes the transaction using the user&apos;s wallet
          </li>
        </ol>
      </div>

      {/* Quick Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Example</h2>
        <p className="text-muted-foreground">
          Here&apos;s a complete example of creating a donation action with Next.js:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// app/api/action/donate/route.ts
import { createAction, linkedAction, amountParam } from '@dipansrimany/mlink-sdk';
import { createNextHandler } from '@dipansrimany/mlink-sdk/adapters/next';
import { parseEther } from 'viem';

const donateAction = createAction({
  title: 'Donate to Project',
  description: 'Support our project with a donation on Mantle Network',
  icon: 'https://example.com/icon.png',

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

    return {
      transaction: {
        to: '0xYourReceiverAddress',
        value: parseEther(amount).toString(),
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

      {/* Available Imports */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Available Exports</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// Core action builder
import {
  createAction,
  linkedAction,
  button,
  input,
} from '@dipansrimany/mlink-sdk';

// Parameter helpers
import {
  textParam,
  numberParam,
  amountParam,
  addressParam,
  selectParam,
  radioParam,
  checkboxParam,
  dateParam,
  option,
} from '@dipansrimany/mlink-sdk';

// Validators
import {
  validateActionMetadata,
  validateTransactionRequest,
  validateTransactionResponse,
  validateLinkedAction,
  validateParameter,
} from '@dipansrimany/mlink-sdk';

// Framework adapters
import { createNextHandler } from '@dipansrimany/mlink-sdk/adapters/next';
import { createExpressHandler } from '@dipansrimany/mlink-sdk/adapters/express';`}</code>
          </pre>
        </div>
      </div>

      {/* Action Flow Diagram */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Request/Response Flow</h2>
        <div className="rounded-lg border border-border p-6 bg-muted/30">
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="w-24 font-medium">GET /action</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-muted-foreground">Returns ActionMetadata (title, description, icon, actions)</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 font-medium">POST /action</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-muted-foreground">Receives account + action + data, returns TransactionResponse</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Metadata */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ActionMetadata Structure</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface ActionMetadata {
  // Action type ('action' or 'completed')
  type?: 'action' | 'completed';

  // Display information
  title: string;
  description: string;
  icon: string; // URL or base64 image
  label?: string;

  // Available actions
  links?: {
    actions: LinkedAction[];
  };

  // State
  disabled?: boolean;
  error?: { message: string };
}`}</code>
          </pre>
        </div>
      </div>

      {/* Transaction Response */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">TransactionResponse Structure</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface TransactionResponse {
  // Single transaction
  transaction?: {
    to: string;      // Contract address
    value: string;   // Wei value (as string)
    data: string;    // Encoded calldata
    chainId: number; // Chain ID (5000 = Mantle)
  };

  // Multiple transactions (for batching)
  transactions?: EVMTransaction[];

  // Display message
  message?: string;

  // Action chaining
  links?: {
    next?: NextActionLink;
  };
}`}</code>
          </pre>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h2 className="text-2xl font-semibold">Documentation</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/docs/actions/creating-actions"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Creating Actions
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Step-by-step guide to building actions
            </p>
          </Link>
          <Link
            href="/docs/actions/nextjs-adapter"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Next.js Adapter
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Using actions with Next.js App Router
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
              All parameter types and validation
            </p>
          </Link>
          <Link
            href="/docs/actions/transactions"
            className="group rounded-lg border border-border p-4 hover:border-[#64B3AE]/50 transition-colors"
          >
            <h3 className="font-semibold group-hover:text-[#64B3AE] transition-colors flex items-center">
              Transactions
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Building and returning transactions
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
