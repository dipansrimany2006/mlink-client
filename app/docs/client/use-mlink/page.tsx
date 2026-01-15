import { Badge } from '@/components/ui/badge'

export default function UseMlinkPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Client
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          useMlink Hook
        </h1>
        <p className="text-xl text-muted-foreground">
          A headless hook for fetching mlink metadata and building custom UIs.
        </p>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { useMlink } from '@dipansrimany/mlink-sdk/react';

function CustomMlink() {
  const mlink = useMlink('https://api.example.com/action/donate');

  if (mlink.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (mlink.status === 'error') {
    return <div>Error: {mlink.error}</div>;
  }

  if (!mlink.metadata) {
    return null;
  }

  return (
    <div>
      <img src={mlink.metadata.icon} alt={mlink.metadata.title} />
      <h2>{mlink.metadata.title}</h2>
      <p>{mlink.metadata.description}</p>

      {mlink.metadata.links?.actions.map((action, i) => (
        <button key={i} onClick={() => handleAction(action)}>
          {action.label}
        </button>
      ))}
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Return Value */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Return Value</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface MlinkInstance {
  // Current status
  status: MlinkStatus;

  // Fetched metadata (null if not loaded)
  metadata: ActionMetadata | null;

  // Error message (null if no error)
  error: string | null;

  // The mlink URL
  url: string;

  // Refresh metadata
  refresh: () => Promise<void>;

  // Registry validation result
  registration: RegistrationResult | null;

  // Whether mlink is registered
  isRegistered: boolean;
}

type MlinkStatus =
  | 'idle'
  | 'loading'
  | 'validating'
  | 'ready'
  | 'executing'
  | 'success'
  | 'error'
  | 'unregistered'
  | 'blocked';`}</code>
          </pre>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Options</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface UseMlinkOptions {
  // Auto-refresh interval (ms)
  refreshInterval?: number;

  // Enable/disable fetching
  enabled?: boolean;

  // Custom registry URL
  registryUrl?: string;

  // Require registration
  requireRegistration?: boolean;

  // Allow pending mlinks
  allowPending?: boolean;

  // Allow blocked mlinks
  allowBlocked?: boolean;
}

// Example with options
const mlink = useMlink('https://api.example.com/action/donate', {
  refreshInterval: 30000,  // Refresh every 30 seconds
  enabled: true,
  requireRegistration: false,  // Allow unregistered mlinks
});`}</code>
          </pre>
        </div>
      </div>

      {/* Custom UI Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Building Custom UI</h2>
        <p className="text-muted-foreground">
          Use useMlink with useExecuteMlink to build fully custom mlink interfaces:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { useMlink, useExecuteMlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';
import { useState } from 'react';

function CustomMlinkCard({ url }: { url: string }) {
  const adapter = useMlinkWagmiAdapter({ /* ... */ });
  const mlink = useMlink(url);
  const { execute, status, txHash, error, reset } = useExecuteMlink({
    adapter,
    actionUrl: url,
  });

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = async (action: LinkedAction) => {
    const result = await execute(action.href, undefined, formData);
    if (result.success) {
      console.log('Transaction:', result.txHash);
    }
  };

  if (mlink.status === 'loading') {
    return <Skeleton />;
  }

  const { metadata } = mlink;
  if (!metadata) return null;

  return (
    <div className="custom-card">
      <header>
        <img src={metadata.icon} alt="" />
        <h2>{metadata.title}</h2>
        {mlink.isRegistered && <VerifiedBadge />}
      </header>

      <p>{metadata.description}</p>

      <div className="actions">
        {metadata.links?.actions.map((action, i) => (
          <ActionButton
            key={i}
            action={action}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            loading={status === 'executing'}
          />
        ))}
      </div>

      {status === 'success' && (
        <SuccessMessage txHash={txHash} onReset={reset} />
      )}

      {status === 'error' && (
        <ErrorMessage error={error} onRetry={reset} />
      )}
    </div>
  );
}`}</code>
          </pre>
        </div>
      </div>

      {/* Conditional Fetching */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Conditional Fetching</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`// Only fetch when URL is available
const mlink = useMlink(url || '', {
  enabled: !!url,
});

// Disable and re-enable fetching
const [isEnabled, setIsEnabled] = useState(true);
const mlink = useMlink(url, { enabled: isEnabled });

// Manual refresh
const handleRefresh = async () => {
  await mlink.refresh();
};`}</code>
          </pre>
        </div>
      </div>

      {/* Registration Status */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Checking Registration</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`const mlink = useMlink(url);

// Check if registered
if (mlink.isRegistered) {
  console.log('Mlink is registered');
}

// Get detailed registration info
if (mlink.registration) {
  console.log('Status:', mlink.registration.status);
  // 'pending' | 'approved' | 'blocked' | null

  if (mlink.registration.mlink) {
    console.log('Name:', mlink.registration.mlink.name);
    console.log('ID:', mlink.registration.mlink.mlinkId);
  }
}

// Handle unregistered mlinks
if (mlink.status === 'unregistered') {
  return <WarningBanner message="This mlink is not verified" />;
}

if (mlink.status === 'blocked') {
  return <ErrorBanner message="This mlink has been blocked" />;
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
