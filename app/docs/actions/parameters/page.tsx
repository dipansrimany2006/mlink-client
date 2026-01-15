import { Badge } from '@/components/ui/badge'

export default function ParametersPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Actions
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Parameters
        </h1>
        <p className="text-xl text-muted-foreground">
          Collect user input using typed parameters with built-in validation.
        </p>
      </div>

      {/* Parameter Types */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Parameter Types</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Helper</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">text</td>
                <td className="p-3 font-mono text-xs">textParam()</td>
                <td className="p-3 text-muted-foreground">Single-line text input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">number</td>
                <td className="p-3 font-mono text-xs">numberParam()</td>
                <td className="p-3 text-muted-foreground">Numeric input with min/max</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">amount</td>
                <td className="p-3 font-mono text-xs">amountParam()</td>
                <td className="p-3 text-muted-foreground">Token amount input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">address</td>
                <td className="p-3 font-mono text-xs">addressParam()</td>
                <td className="p-3 text-muted-foreground">Ethereum address input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">email</td>
                <td className="p-3 font-mono text-xs">textParam type=&quot;email&quot;</td>
                <td className="p-3 text-muted-foreground">Email address input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">url</td>
                <td className="p-3 font-mono text-xs">textParam type=&quot;url&quot;</td>
                <td className="p-3 text-muted-foreground">URL input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">date</td>
                <td className="p-3 font-mono text-xs">dateParam()</td>
                <td className="p-3 text-muted-foreground">Date picker</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">textarea</td>
                <td className="p-3 font-mono text-xs">textareaParam()</td>
                <td className="p-3 text-muted-foreground">Multi-line text input</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">select</td>
                <td className="p-3 font-mono text-xs">selectParam()</td>
                <td className="p-3 text-muted-foreground">Dropdown selection</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">radio</td>
                <td className="p-3 font-mono text-xs">radioParam()</td>
                <td className="p-3 text-muted-foreground">Radio button group</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">checkbox</td>
                <td className="p-3 font-mono text-xs">checkboxParam()</td>
                <td className="p-3 text-muted-foreground">Checkbox group (multi-select)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Text Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Text Parameters</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { textParam } from '@dipansrimany/mlink-sdk';

// Basic text input
textParam({
  name: 'message',
  label: 'Your Message',
  required: true,
})

// With pattern validation
textParam({
  name: 'username',
  label: 'Username',
  required: true,
  pattern: '^[a-zA-Z0-9_]+$',
  patternDescription: 'Only letters, numbers, and underscores',
})

// Email input
textParam({
  name: 'email',
  type: 'email',
  label: 'Email Address',
  required: true,
})`}</code>
          </pre>
        </div>
      </div>

      {/* Amount Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Amount Parameters</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { amountParam } from '@dipansrimany/mlink-sdk';

// Token amount with min/max
amountParam({
  name: 'amount',
  label: 'Amount (MNT)',
  required: true,
  min: 0.01,
  max: 1000,
})

// In the handler, access as string:
handler: async (ctx) => {
  const amount = ctx.data?.amount; // "10.5"
  const wei = BigInt(Math.floor(parseFloat(amount) * 1e18));
  // ...
}`}</code>
          </pre>
        </div>
      </div>

      {/* Address Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Address Parameters</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { addressParam } from '@dipansrimany/mlink-sdk';

// Ethereum address input with validation
addressParam({
  name: 'recipient',
  label: 'Recipient Address',
  required: true,
})

// In the handler:
handler: async (ctx) => {
  const recipient = ctx.data?.recipient; // "0x..."
  // Address is automatically validated
}`}</code>
          </pre>
        </div>
      </div>

      {/* Select Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Select Parameters</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { selectParam, radioParam, checkboxParam, option } from '@dipansrimany/mlink-sdk';

// Dropdown select
selectParam({
  name: 'token',
  label: 'Select Token',
  required: true,
  options: [
    option({ label: 'MNT', value: 'mnt' }),
    option({ label: 'USDC', value: 'usdc' }),
    option({ label: 'USDT', value: 'usdt', selected: true }), // Default
  ],
})

// Radio buttons (single selection)
radioParam({
  name: 'tier',
  label: 'Donation Tier',
  options: [
    option({ label: 'Bronze', value: 'bronze' }),
    option({ label: 'Silver', value: 'silver' }),
    option({ label: 'Gold', value: 'gold' }),
  ],
})

// Checkboxes (multi-selection)
checkboxParam({
  name: 'features',
  label: 'Select Features',
  options: [
    option({ label: 'Email notifications', value: 'email' }),
    option({ label: 'SMS alerts', value: 'sms' }),
    option({ label: 'Push notifications', value: 'push' }),
  ],
})

// In the handler:
handler: async (ctx) => {
  const token = ctx.data?.token;     // "usdt"
  const tier = ctx.data?.tier;       // "silver"
  const features = ctx.data?.features; // ["email", "push"]
}`}</code>
          </pre>
        </div>
      </div>

      {/* Using Parameters in Linked Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Using Parameters in Linked Actions</h2>
        <p className="text-muted-foreground">
          Parameters are defined in linked actions using the <code className="text-[#64B3AE] bg-muted px-1.5 py-0.5 rounded">parameters</code> array.
          Use <code className="text-[#64B3AE] bg-muted px-1.5 py-0.5 rounded">{"{paramName}"}</code> placeholders in the href template.
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { createAction, linkedAction, amountParam, addressParam, selectParam, option } from '@dipansrimany/mlink-sdk';

const action = createAction({
  title: 'Send Tokens',
  description: 'Transfer tokens to any address',
  icon: 'https://example.com/icon.png',

  links: {
    actions: [
      // Action with multiple parameters
      linkedAction({
        label: 'Send Tokens',
        href: '/api/action/send?token={token}&amount={amount}&to={recipient}',
        parameters: [
          selectParam({
            name: 'token',
            label: 'Token',
            options: [
              option({ label: 'MNT', value: 'mnt' }),
              option({ label: 'USDC', value: 'usdc' }),
            ],
          }),
          amountParam({
            name: 'amount',
            label: 'Amount',
            required: true,
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
    const { token, amount, recipient } = ctx.data || {};

    // Build transaction based on parameters
    if (token === 'mnt') {
      return {
        transaction: {
          to: recipient,
          value: parseEther(amount).toString(),
          data: '0x',
          chainId: 5000,
        },
      };
    } else {
      // ERC20 transfer
      const tokenAddress = token === 'usdc' ? USDC_ADDRESS : USDT_ADDRESS;
      return {
        transaction: {
          to: tokenAddress,
          value: '0',
          data: encodeERC20Transfer(recipient, amount),
          chainId: 5000,
        },
      };
    }
  },
});`}</code>
          </pre>
        </div>
      </div>

      {/* Parameter Validation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Parameter Validation</h2>
        <p className="text-muted-foreground">
          Parameters are automatically validated on the client side before submission. You can also validate manually:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { validateParameter, validateParameterValues } from '@dipansrimany/mlink-sdk';

// Validate a single parameter definition
const result = validateParameter({
  name: 'amount',
  type: 'amount',
  required: true,
  min: 0.01,
});

if (!result.success) {
  console.error(result.error);
}

// Validate parameter values against definitions
const parameters = [
  amountParam({ name: 'amount', min: 1, max: 100 }),
  addressParam({ name: 'to', required: true }),
];

const values = {
  amount: '50',
  to: '0x1234...',
};

const validation = validateParameterValues(parameters, values);
if (!validation.success) {
  console.error(validation.error);
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
