'use client';

import { useState, useCallback } from 'react';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import type { EVMTransaction, TransactionResponse } from '@dipansrimany/mlink-sdk';
import { useChainSwitch } from './use-chain-switch';

export type ExecutionStatus =
  | 'idle'
  | 'building'
  | 'previewing'
  | 'switching-chain'
  | 'signing'
  | 'pending'
  | 'success'
  | 'error';

interface UseExecuteActionResult {
  execute: (action: string, input?: string) => Promise<void>;
  confirm: () => Promise<void>;
  cancel: () => void;
  status: ExecutionStatus;
  transaction: EVMTransaction | null;
  message: string | null;
  txHash: `0x${string}` | null;
  error: string | null;
  reset: () => void;
}

export function useExecuteAction(actionUrl: string | null): UseExecuteActionResult {
  const { address, isConnected } = useAccount();
  const { switchToChain, isCorrectChain } = useChainSwitch();
  const { sendTransactionAsync } = useSendTransaction();

  const [status, setStatus] = useState<ExecutionStatus>('idle');
  const [transaction, setTransaction] = useState<EVMTransaction | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Watch for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
  });

  // Update status based on transaction confirmation
  if (txHash && isConfirming && status !== 'pending') {
    setStatus('pending');
  }
  if (txHash && isConfirmed && status === 'pending') {
    setStatus('success');
  }

  const reset = useCallback(() => {
    setStatus('idle');
    setTransaction(null);
    setMessage(null);
    setTxHash(null);
    setError(null);
  }, []);

  const execute = useCallback(
    async (action: string, input?: string) => {
      if (!actionUrl) {
        setError('No action URL provided');
        setStatus('error');
        return;
      }

      if (!isConnected || !address) {
        setError('Please connect your wallet first');
        setStatus('error');
        return;
      }

      setStatus('building');
      setError(null);

      try {
        const response = await fetch(actionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: address,
            action,
            input,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || 'Failed to build transaction');
        }

        const data: TransactionResponse = await response.json();

        if (!data.transaction) {
          throw new Error('No transaction returned');
        }

        setTransaction(data.transaction);
        setMessage(data.message || null);
        setStatus('previewing');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to build transaction';
        setError(errorMessage);
        setStatus('error');
      }
    },
    [actionUrl, address, isConnected]
  );

  const confirm = useCallback(async () => {
    if (!transaction) {
      setError('No transaction to confirm');
      setStatus('error');
      return;
    }

    // Check if we need to switch chains
    if (!isCorrectChain(transaction.chainId)) {
      setStatus('switching-chain');
      const switched = await switchToChain(transaction.chainId);
      if (!switched) {
        setError('Failed to switch to the correct network');
        setStatus('error');
        return;
      }
    }

    setStatus('signing');

    try {
      const hash = await sendTransactionAsync({
        to: transaction.to as `0x${string}`,
        value: BigInt(transaction.value),
        data: transaction.data as `0x${string}`,
      });

      setTxHash(hash);
      setStatus('pending');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed';
      setError(errorMessage);
      setStatus('error');
    }
  }, [transaction, isCorrectChain, switchToChain, sendTransactionAsync]);

  const cancel = useCallback(() => {
    setStatus('idle');
    setTransaction(null);
    setMessage(null);
  }, []);

  return {
    execute,
    confirm,
    cancel,
    status,
    transaction,
    message,
    txHash,
    error,
    reset,
  };
}
