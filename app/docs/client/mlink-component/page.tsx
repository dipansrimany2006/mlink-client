import { Badge } from '@/components/ui/badge'

export default function MlinkComponentPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Client
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Mlink Component
        </h1>
        <p className="text-xl text-muted-foreground">
          The main component for rendering mlinks with full UI and transaction execution.
        </p>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { Mlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';
import '@dipansrimany/mlink-sdk/styles.css';

function MyMlink() {
  const adapter = useMlinkWagmiAdapter({ /* ... */ });

  return (
    <Mlink
      url="https://api.example.com/action/donate"
      adapter={adapter}
    />
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Props</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">url</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 text-muted-foreground">required</td>
                <td className="p-3 text-muted-foreground">Action endpoint URL</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">adapter</td>
                <td className="p-3 font-mono text-xs">MlinkAdapter</td>
                <td className="p-3 text-muted-foreground">required</td>
                <td className="p-3 text-muted-foreground">Wallet adapter instance</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">theme</td>
                <td className="p-3 font-mono text-xs">{`'light' | 'dark' | 'mantle' | MlinkTheme`}</td>
                <td className="p-3 text-muted-foreground">&apos;light&apos;</td>
                <td className="p-3 text-muted-foreground">Theme preset or custom theme</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">stylePreset</td>
                <td className="p-3 font-mono text-xs">{`'default' | 'compact' | 'minimal'`}</td>
                <td className="p-3 text-muted-foreground">&apos;default&apos;</td>
                <td className="p-3 text-muted-foreground">UI style preset</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">className</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Additional CSS classes</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">onSuccess</td>
                <td className="p-3 font-mono text-xs">{`(txHash, action) => void`}</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Called on successful transaction</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">onError</td>
                <td className="p-3 font-mono text-xs">{`(error) => void`}</td>
                <td className="p-3 text-muted-foreground">-</td>
                <td className="p-3 text-muted-foreground">Called on error</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">registryUrl</td>
                <td className="p-3 font-mono text-xs">string</td>
                <td className="p-3 text-muted-foreground">default registry</td>
                <td className="p-3 text-muted-foreground">Custom registry URL</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">requireRegistration</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3 text-muted-foreground">true</td>
                <td className="p-3 text-muted-foreground">Require registry validation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">allowPending</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3 text-muted-foreground">true</td>
                <td className="p-3 text-muted-foreground">Allow pending mlinks</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-[#64B3AE]">allowBlocked</td>
                <td className="p-3 font-mono text-xs">boolean</td>
                <td className="p-3 text-muted-foreground">false</td>
                <td className="p-3 text-muted-foreground">Allow blocked mlinks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Complete Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Complete Example</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { Mlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';
import '@dipansrimany/mlink-sdk/styles.css';
import { useAccount, useConnect, useSendTransaction } from 'wagmi';
import { toast } from 'sonner';

function DonateMlink() {
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
      url="https://api.example.com/action/donate"
      adapter={adapter}
      theme="dark"
      stylePreset="default"
      className="max-w-md mx-auto"
      onSuccess={(txHash, action) => {
        toast.success('Transaction successful!', {
          description: \`Hash: \${txHash.slice(0, 10)}...\`,
          action: {
            label: 'View',
            onClick: () => window.open(
              \`https://explorer.mantle.xyz/tx/\${txHash}\`,
              '_blank'
            ),
          },
        });
      }}
      onError={(error) => {
        toast.error('Transaction failed', {
          description: error,
        });
      }}
      requireRegistration={true}
      allowPending={true}
    />
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Style Presets */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Style Presets</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-2">default</h3>
            <p className="text-sm text-muted-foreground">
              Full-featured card with icon, title, description, and action buttons.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-2">compact</h3>
            <p className="text-sm text-muted-foreground">
              Condensed layout with smaller padding and inline elements.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold mb-2">minimal</h3>
            <p className="text-sm text-muted-foreground">
              Minimal UI with just essential elements and actions.
            </p>
          </div>
        </div>
      </div>

      {/* Registry Behavior */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Registry Behavior</h2>
        <p className="text-muted-foreground">
          By default, the Mlink component validates actions against the registry. Configure this behavior with the following props:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// Require registration (default)
<Mlink
  url="..."
  adapter={adapter}
  requireRegistration={true}
/>

// Allow unregistered mlinks (development mode)
<Mlink
  url="..."
  adapter={adapter}
  requireRegistration={false}
/>

// Custom registry
<Mlink
  url="..."
  adapter={adapter}
  registryUrl="https://custom-registry.com"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
