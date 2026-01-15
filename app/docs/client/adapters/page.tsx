import { Badge } from '@/components/ui/badge'

export default function AdaptersPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Client
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Wallet Adapters
        </h1>
        <p className="text-xl text-muted-foreground">
          Connect your mlink to any Web3 wallet provider using adapters.
        </p>
      </div>

      {/* MlinkAdapter Interface */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">MlinkAdapter Interface</h2>
        <p className="text-muted-foreground">
          All adapters implement the MlinkAdapter interface:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface MlinkAdapter {
  // Connect wallet and return address
  connect: () => Promise<string>;

  // Sign and send transaction, return tx hash
  signAndSendTransaction: (transaction: EVMTransaction) => Promise<string>;

  // Check if wallet is connected
  isConnected: () => boolean;

  // Get current wallet address
  getAddress: () => string | null;
}

interface EVMTransaction {
  to: string;
  value: string;
  data: string;
  chainId: number;
}`}</code>
          </pre>
        </div>
      </div>

      {/* Wagmi Adapter */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Wagmi Adapter</h2>
        <p className="text-muted-foreground">
          The recommended adapter for wagmi-based applications. Works seamlessly with RainbowKit, ConnectKit, and Web3Modal.
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
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
      // Connect with first available connector
      await connectAsync({ connector: connectors[0] });
    },
    sendTransaction: sendTransactionAsync,
  });

  return <Mlink url="..." adapter={adapter} />;
}`}</code>
          </pre>
        </div>

        <div className="rounded-lg border border-border p-4 bg-muted/30">
          <h4 className="font-medium mb-2">WagmiAdapterConfig</h4>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Property</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 font-mono text-[#64B3AE]">address</td>
                  <td className="p-3 font-mono text-xs">{"`0x${string}` | undefined"}</td>
                  <td className="p-3 text-muted-foreground">Connected wallet address</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#64B3AE]">isConnected</td>
                  <td className="p-3 font-mono text-xs">boolean</td>
                  <td className="p-3 text-muted-foreground">Whether wallet is connected</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#64B3AE]">connect</td>
                  <td className="p-3 font-mono text-xs">{"() => Promise<void>"}</td>
                  <td className="p-3 text-muted-foreground">Function to connect wallet</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#64B3AE]">sendTransaction</td>
                  <td className="p-3 font-mono text-xs">{"(args) => Promise<`0x${string}`>"}</td>
                  <td className="p-3 text-muted-foreground">wagmi&apos;s sendTransaction function</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ethers Adapter */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Ethers.js Adapter</h2>
        <p className="text-muted-foreground">
          For applications using ethers.js directly.
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { Mlink, useMlinkEthersAdapter } from '@dipansrimany/mlink-sdk/react';
import { useEthersSigner } from './hooks/useEthersSigner';

function MyMlink() {
  const { signer, connect } = useEthersSigner();

  const adapter = useMlinkEthersAdapter({
    signer,
    connect,
  });

  return <Mlink url="..." adapter={adapter} />;
}`}</code>
          </pre>
        </div>

        <div className="rounded-lg border border-border p-4 bg-muted/30">
          <h4 className="font-medium mb-2">EthersAdapterConfig</h4>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Property</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 font-mono text-[#64B3AE]">signer</td>
                  <td className="p-3 font-mono text-xs">Signer | null</td>
                  <td className="p-3 text-muted-foreground">ethers Signer instance</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-[#64B3AE]">connect</td>
                  <td className="p-3 font-mono text-xs">{"() => Promise<void>"}</td>
                  <td className="p-3 text-muted-foreground">Function to connect and get signer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Adapter */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Adapter</h2>
        <p className="text-muted-foreground">
          Create a custom adapter for any wallet provider or custom implementation.
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { createMlinkAdapter, Mlink } from '@dipansrimany/mlink-sdk/react';

function MyMlink() {
  const adapter = createMlinkAdapter({
    connect: async () => {
      // Your wallet connection logic
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0];
    },

    signAndSendTransaction: async (tx) => {
      // Your transaction signing logic
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          to: tx.to,
          value: '0x' + BigInt(tx.value).toString(16),
          data: tx.data,
        }],
      });
      return txHash;
    },

    isConnected: () => {
      return window.ethereum?.selectedAddress !== undefined;
    },

    getAddress: () => {
      return window.ethereum?.selectedAddress || null;
    },
  });

  return <Mlink url="..." adapter={adapter} />;
}`}</code>
          </pre>
        </div>
      </div>

      {/* React Native / Mobile */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Mobile / React Native</h2>
        <p className="text-muted-foreground">
          For mobile applications, create a custom adapter that integrates with your mobile wallet SDK (WalletConnect, MetaMask Mobile SDK, etc.).
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { createMlinkAdapter } from '@dipansrimany/mlink-sdk/react';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

function useMobileAdapter() {
  const { open, isConnected, address, provider } = useWalletConnectModal();

  return createMlinkAdapter({
    connect: async () => {
      await open();
      // Wait for connection
      return address!;
    },

    signAndSendTransaction: async (tx) => {
      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });
      return txHash;
    },

    isConnected: () => isConnected,
    getAddress: () => address || null,
  });
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
