'use client';

import { useCallback } from 'react';
import { useSwitchChain, useChainId } from 'wagmi';

interface UseChainSwitchResult {
  currentChainId: number;
  isCorrectChain: (targetChainId: number) => boolean;
  switchToChain: (chainId: number) => Promise<boolean>;
  isSwitching: boolean;
}

export function useChainSwitch(): UseChainSwitchResult {
  const chainId = useChainId();
  const { switchChainAsync, isPending } = useSwitchChain();

  const isCorrectChain = useCallback(
    (targetChainId: number) => {
      return chainId === targetChainId;
    },
    [chainId]
  );

  const switchToChain = useCallback(
    async (targetChainId: number): Promise<boolean> => {
      if (chainId === targetChainId) {
        return true;
      }

      try {
        await switchChainAsync({ chainId: targetChainId });
        return true;
      } catch (err) {
        console.error('Failed to switch chain:', err);
        return false;
      }
    },
    [chainId, switchChainAsync]
  );

  return {
    currentChainId: chainId,
    isCorrectChain,
    switchToChain,
    isSwitching: isPending,
  };
}
