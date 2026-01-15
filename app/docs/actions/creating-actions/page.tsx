import { Badge } from '@/components/ui/badge'

export default function CreatingActionsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Actions
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Creating Actions
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to build mlink actions step by step.
        </p>
      </div>

      {/* createAction Function */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">The createAction Function</h2>
        <p className="text-muted-foreground">
          Use <code className="text-[#64B3AE] bg-muted px-1.5 py-0.5 rounded">createAction</code> to define an action with metadata and a handler:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { createAction } from '@dipansrimany/mlink-sdk';

const myAction = createAction({
  // Required: Display information
  title: 'Action Title',
  description: 'What this action does',
  icon: 'https://example.com/icon.png', // URL or base64

  // Optional: Available actions
  links: {
    actions: [/* LinkedAction[] */],
  },

  // Optional: Disable the entire action
  disabled: false,

  // Required: Transaction handler
  handler: async (ctx) => {
    // Return transaction(s)
    return {
      transaction: { /* EVMTransaction */ },
    };
  },
});`}</code>
          </pre>
        </div>
      </div>

      {/* Simple Action */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Simple Action (No Parameters)</h2>
        <p className="text-muted-foreground">
          A basic action with preset buttons:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { createAction, linkedAction } from '@dipansrimany/mlink-sdk';
import { createNextHandler } from '@dipansrimany/mlink-sdk/adapters/next';

const donateAction = createAction({
  title: 'Donate to Project',
  description: 'Support our open source work',
  icon: 'https://example.com/donate-icon.png',

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
        label: 'Donate 10 MNT',
        href: '/api/action/donate?amount=10',
      }),
    ],
  },

  handler: async (ctx) => {
    // Parse amount from URL query (ctx.action contains the href)
    const url = new URL(ctx.action, 'http://localhost');
    const amount = url.searchParams.get('amount') || '1';
    const weiValue = BigInt(Math.floor(parseFloat(amount) * 1e18)).toString();

    return {
      transaction: {
        to: '0xReceiverAddress',
        value: weiValue,
        data: '0x',
        chainId: 5000,
      },
      message: \`Donating \${amount} MNT\`,
    };
  },
});

export const { GET, POST, OPTIONS } = createNextHandler(donateAction);`}</code>
          </pre>
        </div>
      </div>

      {/* Action with Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Action with User Input</h2>
        <p className="text-muted-foreground">
          Collect user input using parameters:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import {
  createAction,
  linkedAction,
  amountParam,
  addressParam,
} from '@dipansrimany/mlink-sdk';

const sendAction = createAction({
  title: 'Send MNT',
  description: 'Transfer MNT to any address',
  icon: 'https://example.com/send-icon.png',

  links: {
    actions: [
      linkedAction({
        label: 'Send MNT',
        href: '/api/action/send?amount={amount}&to={recipient}',
        parameters: [
          amountParam({
            name: 'amount',
            label: 'Amount',
            required: true,
            min: 0.001,
          }),
          addressParam({
            name: 'recipient',
            label: 'Recipient Address',
            required: true,
          }),
        ],
      }),
    ],
  },

  handler: async (ctx) => {
    // Access parameters from ctx.data
    const amount = ctx.data?.amount as string;
    const recipient = ctx.data?.recipient as string;

    const weiValue = BigInt(Math.floor(parseFloat(amount) * 1e18)).toString();

    return {
      transaction: {
        to: recipient,
        value: weiValue,
        data: '0x',
        chainId: 5000,
      },
      message: \`Sending \${amount} MNT to \${recipient.slice(0, 8)}...\`,
    };
  },
});`}</code>
          </pre>
        </div>
      </div>

      {/* Smart Contract Interaction */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Smart Contract Interaction</h2>
        <p className="text-muted-foreground">
          Call smart contract functions by encoding the calldata:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { createAction, linkedAction, amountParam } from '@dipansrimany/mlink-sdk';
import { encodeFunctionData, parseEther } from 'viem';

// Contract ABI (just the functions you need)
const stakingABI = [
  {
    name: 'stake',
    type: 'function',
    inputs: [],
    outputs: [],
  },
] as const;

const STAKING_CONTRACT = '0x...';

const stakeAction = createAction({
  title: 'Stake MNT',
  description: 'Stake your MNT to earn rewards',
  icon: 'https://example.com/stake-icon.png',

  links: {
    actions: [
      linkedAction({
        label: 'Stake MNT',
        href: '/api/action/stake?amount={amount}',
        parameters: [
          amountParam({
            name: 'amount',
            label: 'Amount to Stake',
            required: true,
            min: 1,
          }),
        ],
      }),
    ],
  },

  handler: async (ctx) => {
    const amount = ctx.data?.amount as string;

    // Encode the contract call
    const data = encodeFunctionData({
      abi: stakingABI,
      functionName: 'stake',
    });

    return {
      transaction: {
        to: STAKING_CONTRACT,
        value: parseEther(amount).toString(),
        data,
        chainId: 5000,
      },
      message: \`Staking \${amount} MNT\`,
    };
  },
});`}</code>
          </pre>
        </div>
      </div>

      {/* Action Context */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Action Context</h2>
        <p className="text-muted-foreground">
          The handler receives an ActionContext with all request information:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface ActionContext {
  // User's connected wallet address
  account: string;

  // The action href that was clicked
  action: string;

  // Parameter values from the form
  data?: Record<string, string | string[]>;

  // Legacy: single input value
  input?: string;
}

handler: async (ctx) => {
  console.log('User wallet:', ctx.account);
  console.log('Action href:', ctx.action);
  console.log('Parameters:', ctx.data);

  // Access individual parameters
  const amount = ctx.data?.amount as string;
  const options = ctx.data?.options as string[]; // For multi-select

  // ...
}`}</code>
          </pre>
        </div>
      </div>

      {/* Error Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Error Handling</h2>
        <p className="text-muted-foreground">
          Throw errors or return error responses to show messages to users:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`handler: async (ctx) => {
  const amount = parseFloat(ctx.data?.amount as string);

  // Validation errors
  if (amount < 0.01) {
    throw new Error('Minimum amount is 0.01 MNT');
  }

  // Check user balance (example)
  const balance = await getBalance(ctx.account);
  if (balance < amount) {
    throw new Error(\`Insufficient balance. You have \${balance} MNT\`);
  }

  // Proceed with transaction
  return {
    transaction: { /* ... */ },
  };
}`}</code>
          </pre>
        </div>
      </div>

      {/* Disabled State */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Disabled State</h2>
        <p className="text-muted-foreground">
          Disable the action or individual buttons based on conditions:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`const action = createAction({
  title: 'Limited Time Offer',
  description: 'This offer has expired',
  icon: '...',

  // Disable the entire action
  disabled: true,

  // Or disable specific buttons
  links: {
    actions: [
      linkedAction({
        label: 'Claim Reward',
        href: '/api/action/claim',
        disabled: true, // Disable just this button
      }),
      linkedAction({
        label: 'Learn More',
        href: 'https://example.com',
        type: 'external-link', // Opens in new tab
      }),
    ],
  },

  handler: async () => { /* ... */ },
});`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
