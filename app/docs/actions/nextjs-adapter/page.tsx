import { Badge } from '@/components/ui/badge'

export default function NextJSAdapterPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Actions
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Next.js Adapter
        </h1>
        <p className="text-xl text-muted-foreground">
          Use the Next.js adapter to create mlink action endpoints with App Router.
        </p>
      </div>

      {/* Basic Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Setup</h2>
        <p className="text-muted-foreground">
          Create an API route using the <code className="text-[#64B3AE] bg-muted px-1.5 py-0.5 rounded">createNextHandler</code> function:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <div className="text-xs text-zinc-500 mb-2">app/api/action/donate/route.ts</div>
          <pre className="text-sm text-zinc-100">
            <code>{`import { createAction, linkedAction } from '@dipansrimany/mlink-sdk';
import { createNextHandler } from '@dipansrimany/mlink-sdk/adapters/next';

const donateAction = createAction({
  title: 'Donate',
  description: 'Support our project',
  icon: 'https://example.com/icon.png',

  links: {
    actions: [
      linkedAction({
        label: 'Donate 1 MNT',
        href: '/api/action/donate?amount=1',
      }),
    ],
  },

  handler: async (ctx) => {
    return {
      transaction: {
        to: '0x...',
        value: '1000000000000000000',
        data: '0x',
        chainId: 5000,
      },
    };
  },
});

// Export route handlers
export const { GET, POST, OPTIONS } = createNextHandler(donateAction);`}</code>
          </pre>
        </div>
      </div>

      {/* What the Handler Returns */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Route Handlers</h2>
        <p className="text-muted-foreground">
          The adapter creates three route handlers:
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Method</th>
                <th className="text-left p-3 font-medium">Purpose</th>
                <th className="text-left p-3 font-medium">Returns</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">GET</td>
                <td className="p-3 text-muted-foreground">Fetch action metadata</td>
                <td className="p-3 font-mono text-xs">ActionMetadata</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">POST</td>
                <td className="p-3 text-muted-foreground">Execute action and get transaction</td>
                <td className="p-3 font-mono text-xs">TransactionResponse</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">OPTIONS</td>
                <td className="p-3 text-muted-foreground">CORS preflight</td>
                <td className="p-3 font-mono text-xs">CORS headers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Routes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Dynamic Routes</h2>
        <p className="text-muted-foreground">
          Use Next.js dynamic routes for parameterized actions:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <div className="text-xs text-zinc-500 mb-2">app/api/action/nft/[tokenId]/route.ts</div>
          <pre className="text-sm text-zinc-100">
            <code>{`import { createAction, linkedAction } from '@dipansrimany/mlink-sdk';
import { createNextHandler } from '@dipansrimany/mlink-sdk/adapters/next';
import { NextRequest } from 'next/server';

// Create action factory
function createNFTAction(tokenId: string) {
  return createAction({
    title: \`Buy NFT #\${tokenId}\`,
    description: 'Purchase this NFT on Mantle',
    icon: \`https://nft-api.com/\${tokenId}/image\`,

    links: {
      actions: [
        linkedAction({
          label: 'Buy Now',
          href: \`/api/action/nft/\${tokenId}\`,
        }),
      ],
    },

    handler: async (ctx) => {
      // Fetch NFT price
      const price = await getNFTPrice(tokenId);

      return {
        transaction: {
          to: NFT_MARKETPLACE,
          value: price,
          data: encodeBuyNFT(tokenId, ctx.account),
          chainId: 5000,
        },
      };
    },
  });
}

// Handle dynamic route
export async function GET(
  request: NextRequest,
  { params }: { params: { tokenId: string } }
) {
  const action = createNFTAction(params.tokenId);
  const handler = createNextHandler(action);
  return handler.GET();
}

export async function POST(
  request: NextRequest,
  { params }: { params: { tokenId: string } }
) {
  const action = createNFTAction(params.tokenId);
  const handler = createNextHandler(action);
  return handler.POST(request);
}

export async function OPTIONS() {
  const action = createNFTAction('0');
  const handler = createNextHandler(action);
  return handler.OPTIONS();
}`}</code>
          </pre>
        </div>
      </div>

      {/* CORS Configuration */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">CORS Configuration</h2>
        <p className="text-muted-foreground">
          The adapter automatically handles CORS headers. For custom CORS configuration, you can modify the response:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// The adapter automatically sets these headers:
{
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// For custom CORS, wrap the handlers:
export async function GET() {
  const handler = createNextHandler(action);
  const response = await handler.GET();

  // Add custom headers
  response.headers.set(
    'Access-Control-Allow-Origin',
    'https://your-domain.com'
  );

  return response;
}`}</code>
          </pre>
        </div>
      </div>

      {/* Error Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Error Handling</h2>
        <p className="text-muted-foreground">
          The adapter catches errors from your handler and returns appropriate error responses:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`const action = createAction({
  // ...
  handler: async (ctx) => {
    // This error will be caught and returned as JSON
    if (!ctx.data?.amount) {
      throw new Error('Amount is required');
    }

    // Validation errors
    const amount = parseFloat(ctx.data.amount as string);
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }

    return { transaction: { /* ... */ } };
  },
});

// Error response format:
// Status: 400
// Body: { error: { message: 'Amount is required' } }`}</code>
          </pre>
        </div>
      </div>

      {/* Route Groups */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Organizing Multiple Actions</h2>
        <p className="text-muted-foreground">
          Use Next.js route groups to organize multiple action endpoints:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// Directory structure:
app/
  api/
    action/
      donate/
        route.ts      // /api/action/donate
      stake/
        route.ts      // /api/action/stake
      swap/
        route.ts      // /api/action/swap
      nft/
        [id]/
          route.ts    // /api/action/nft/123

// Or use route groups:
app/
  api/
    (mlinks)/
      donate/route.ts
      stake/route.ts`}</code>
          </pre>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Environment Variables</h2>
        <p className="text-muted-foreground">
          Use environment variables for sensitive data:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <div className="text-xs text-zinc-500 mb-2">.env.local</div>
          <pre className="text-sm text-zinc-100">
            <code>{`RECEIVER_ADDRESS=0x...
STAKING_CONTRACT=0x...
NEXT_PUBLIC_BASE_URL=https://your-app.com`}</code>
          </pre>
        </div>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <div className="text-xs text-zinc-500 mb-2">route.ts</div>
          <pre className="text-sm text-zinc-100">
            <code>{`const action = createAction({
  // ...
  handler: async (ctx) => {
    const receiver = process.env.RECEIVER_ADDRESS!;

    return {
      transaction: {
        to: receiver,
        // ...
      },
    };
  },
});`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
