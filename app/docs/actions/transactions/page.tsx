import { Badge } from '@/components/ui/badge'

export default function TransactionsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Actions
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Transactions
        </h1>
        <p className="text-xl text-muted-foreground">
          Build and return EVM transactions from your action handlers.
        </p>
      </div>

      {/* Transaction Structure */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Transaction Structure</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface EVMTransaction {
  to: string;      // Target address (contract or EOA)
  value: string;   // Wei value as string (for precision)
  data: string;    // Encoded calldata (0x for simple transfers)
  chainId: number; // Chain ID (5000 = Mantle Mainnet)
}

interface TransactionResponse {
  // Single transaction
  transaction?: EVMTransaction;

  // Multiple transactions (batch)
  transactions?: EVMTransaction[];

  // Message to display
  message?: string;

  // Next action (chaining)
  links?: {
    next?: NextActionLink;
  };
}`}</code>
          </pre>
        </div>
      </div>

      {/* Simple Transfer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Simple Transfer</h2>
        <p className="text-muted-foreground">
          Send native MNT tokens:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`handler: async (ctx) => {
  const amount = ctx.data?.amount as string || '1';

  // Convert to wei (1 MNT = 10^18 wei)
  const weiValue = BigInt(Math.floor(parseFloat(amount) * 1e18)).toString();

  return {
    transaction: {
      to: '0xReceiverAddress',
      value: weiValue,
      data: '0x',  // Empty data for simple transfer
      chainId: 5000,
    },
    message: \`Sending \${amount} MNT\`,
  };
}`}</code>
          </pre>
        </div>
      </div>

      {/* Contract Call */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Contract Call</h2>
        <p className="text-muted-foreground">
          Call a smart contract function using viem for encoding:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { encodeFunctionData, parseEther } from 'viem';

// Contract ABI
const abi = [
  {
    name: 'stake',
    type: 'function',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
  },
] as const;

handler: async (ctx) => {
  const amount = ctx.data?.amount as string;

  // Encode the function call
  const data = encodeFunctionData({
    abi,
    functionName: 'stake',
    args: [parseEther(amount)],
  });

  return {
    transaction: {
      to: STAKING_CONTRACT,
      value: '0',  // No MNT sent (token staking)
      data,
      chainId: 5000,
    },
    message: \`Staking \${amount} tokens\`,
  };
}`}</code>
          </pre>
        </div>
      </div>

      {/* ERC20 Transfer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ERC20 Token Transfer</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { encodeFunctionData, parseUnits } from 'viem';

const erc20Abi = [
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
] as const;

const USDC_ADDRESS = '0x...';
const USDC_DECIMALS = 6;

handler: async (ctx) => {
  const recipient = ctx.data?.recipient as string;
  const amount = ctx.data?.amount as string;

  const data = encodeFunctionData({
    abi: erc20Abi,
    functionName: 'transfer',
    args: [
      recipient as \`0x\${string}\`,
      parseUnits(amount, USDC_DECIMALS),
    ],
  });

  return {
    transaction: {
      to: USDC_ADDRESS,
      value: '0',
      data,
      chainId: 5000,
    },
    message: \`Sending \${amount} USDC\`,
  };
}`}</code>
          </pre>
        </div>
      </div>

      {/* Multiple Transactions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Multiple Transactions (Batch)</h2>
        <p className="text-muted-foreground">
          Return multiple transactions that will be executed sequentially:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`handler: async (ctx) => {
  const amount = ctx.data?.amount as string;

  // First: Approve token spending
  const approveData = encodeFunctionData({
    abi: erc20Abi,
    functionName: 'approve',
    args: [STAKING_CONTRACT, parseEther(amount)],
  });

  // Second: Stake tokens
  const stakeData = encodeFunctionData({
    abi: stakingAbi,
    functionName: 'stake',
    args: [parseEther(amount)],
  });

  return {
    transactions: [
      {
        to: TOKEN_ADDRESS,
        value: '0',
        data: approveData,
        chainId: 5000,
      },
      {
        to: STAKING_CONTRACT,
        value: '0',
        data: stakeData,
        chainId: 5000,
      },
    ],
    message: \`Approving and staking \${amount} tokens\`,
  };
}`}</code>
          </pre>
        </div>
      </div>

      {/* Action Chaining */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Action Chaining</h2>
        <p className="text-muted-foreground">
          Chain multiple actions together after a transaction confirms:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// Option 1: POST callback after transaction
handler: async (ctx) => {
  return {
    transaction: { /* ... */ },
    links: {
      next: {
        type: 'post',
        href: '/api/action/confirm?step=2',
      },
    },
  };
}

// Option 2: Inline next action
handler: async (ctx) => {
  return {
    transaction: { /* ... */ },
    links: {
      next: {
        type: 'inline',
        action: {
          type: 'completed',
          title: 'Transaction Complete!',
          description: 'Your transaction has been confirmed.',
          icon: 'https://example.com/success.png',
        },
      },
    },
  };
}`}</code>
          </pre>
        </div>
      </div>

      {/* Chain Configuration */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Supported Chains</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Chain</th>
                <th className="text-left p-3 font-medium">Chain ID</th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3">Mantle Mainnet</td>
                <td className="p-3 font-mono text-[#64B3AE]">5000</td>
                <td className="p-3">Production</td>
              </tr>
              <tr>
                <td className="p-3">Mantle Sepolia</td>
                <td className="p-3 font-mono text-[#64B3AE]">5003</td>
                <td className="p-3">Testnet</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { MANTLE_MAINNET, MANTLE_SEPOLIA } from '@dipansrimany/mlink-sdk';

// Chain configurations are pre-defined
console.log(MANTLE_MAINNET.chainId);  // 5000
console.log(MANTLE_SEPOLIA.chainId);  // 5003`}</code>
          </pre>
        </div>
      </div>

      {/* Utilities */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Utilities</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import {
  parseEther,
  formatEther,
  shortenAddress,
  getExplorerUrl,
  isValidAddress,
} from '@dipansrimany/mlink-sdk';

// Convert MNT to wei
const wei = parseEther('1.5');  // "1500000000000000000"

// Convert wei to MNT
const mnt = formatEther('1500000000000000000');  // "1.5"

// Shorten address for display
const short = shortenAddress('0x1234...5678');  // "0x1234...5678"

// Get explorer URL
const url = getExplorerUrl(5000, '0xtxhash...');
// "https://explorer.mantle.xyz/tx/0xtxhash..."

// Validate address
const valid = isValidAddress('0x...');  // true/false`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
