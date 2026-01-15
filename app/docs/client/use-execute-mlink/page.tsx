import { Badge } from '@/components/ui/badge'

export default function UseExecuteMlinkPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <Badge className="bg-[#64B3AE]/10 text-[#64B3AE] hover:bg-[#64B3AE]/20">
          Client
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          useExecuteMlink Hook
        </h1>
        <p className="text-xl text-muted-foreground">
          Execute mlink actions programmatically with transaction handling.
        </p>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { useExecuteMlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';

function ExecuteButton() {
  const adapter = useMlinkWagmiAdapter({ /* ... */ });

  const { execute, status, txHash, error, reset } = useExecuteMlink({
    adapter,
    actionUrl: 'https://api.example.com/action/donate',
    onSuccess: (txHash, action) => {
      console.log('Transaction successful:', txHash);
    },
    onError: (error) => {
      console.error('Transaction failed:', error);
    },
  });

  const handleClick = async () => {
    const result = await execute(
      '/api/action/donate?amount=1',  // action href
      undefined,                       // legacy input (optional)
      { amount: '1' }                  // form data
    );

    if (result.success) {
      console.log('Tx Hash:', result.txHash);
    } else {
      console.log('Error:', result.error);
    }
  };

  return (
    <button onClick={handleClick} disabled={status === 'executing'}>
      {status === 'executing' ? 'Confirming...' : 'Donate 1 MNT'}
    </button>
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
            <code>{`interface UseExecuteMlinkReturn {
  // Execute an action
  execute: (
    action: string,
    input?: string,
    data?: Record<string, string | string[]>
  ) => Promise<ExecutionResult>;

  // Current status
  status: MlinkStatus;

  // Transaction hash (after success)
  txHash: string | null;

  // Error message (after failure)
  error: string | null;

  // Reset to idle state
  reset: () => void;
}

interface ExecutionResult {
  success: boolean;
  txHash?: string;
  error?: string;
  message?: string;
}`}</code>
          </pre>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Options</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`interface UseExecuteMlinkOptions {
  // Required: wallet adapter
  adapter: MlinkAdapter;

  // Required: base action URL
  actionUrl: string;

  // Callback on successful transaction
  onSuccess?: (txHash: string, action: string) => void;

  // Callback on error
  onError?: (error: string) => void;
}`}</code>
          </pre>
        </div>
      </div>

      {/* Execute with Parameters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Execute with Parameters</h2>
        <p className="text-muted-foreground">
          Pass form data to the execute function for actions with parameters:
        </p>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`const { execute } = useExecuteMlink({
  adapter,
  actionUrl: 'https://api.example.com/action/send',
});

// Execute with form data
const handleSend = async () => {
  const result = await execute(
    '/api/action/send?amount={amount}&to={recipient}',
    undefined,
    {
      amount: '10',
      recipient: '0x1234...',
    }
  );
};

// For multi-select (checkboxes)
const handleMultiSelect = async () => {
  await execute('/api/action/vote?options={options}', undefined, {
    options: ['option1', 'option2', 'option3'],
  });
};`}</code>
          </pre>
        </div>
      </div>

      {/* Status Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Status Handling</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`function ActionButton() {
  const { execute, status, txHash, error, reset } = useExecuteMlink({
    adapter,
    actionUrl,
  });

  // Render based on status
  if (status === 'idle') {
    return <button onClick={() => execute(...)}>Execute</button>;
  }

  if (status === 'executing') {
    return (
      <button disabled>
        <Spinner /> Confirming transaction...
      </button>
    );
  }

  if (status === 'success') {
    return (
      <div className="success">
        <p>Transaction confirmed!</p>
        <a href={\`https://explorer.mantle.xyz/tx/\${txHash}\`}>
          View on Explorer
        </a>
        <button onClick={reset}>New Transaction</button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={reset}>Try Again</button>
      </div>
    );
  }
}`}</code>
          </pre>
        </div>
      </div>

      {/* Full Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Complete Form Example</h2>
        <div className="rounded-lg border border-border bg-zinc-950 p-4 overflow-x-auto">
          <pre className="text-sm text-zinc-100">
            <code>{`import { useState } from 'react';
import { useExecuteMlink, useMlinkWagmiAdapter } from '@dipansrimany/mlink-sdk/react';
import { toast } from 'sonner';

function SendForm() {
  const adapter = useMlinkWagmiAdapter({ /* ... */ });

  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const { execute, status, reset } = useExecuteMlink({
    adapter,
    actionUrl: 'https://api.example.com/action/send',
    onSuccess: (txHash) => {
      toast.success('Transaction sent!');
      setAmount('');
      setRecipient('');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !recipient) {
      toast.error('Please fill all fields');
      return;
    }

    await execute(
      '/api/action/send?amount={amount}&to={recipient}',
      undefined,
      { amount, recipient }
    );
  };

  const isLoading = status === 'executing';

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (MNT)"
        disabled={isLoading}
      />

      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
        disabled={isLoading}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send MNT'}
      </button>

      {status === 'success' && (
        <button type="button" onClick={reset}>
          Send Another
        </button>
      )}
    </form>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
