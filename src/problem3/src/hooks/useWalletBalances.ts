import { Blockchain, Currency } from '../utils/common.enums.ts';
import { IWalletBalance } from '../utils/common.interface.ts';

// Mock `useWalletBalances` hook
export const useWalletBalances = (): IWalletBalance[] => {
  return [
    { currency: Currency.USD, amount: 150, blockchain: Blockchain.ETHEREUM },
    { currency: Currency.BTC, amount: 0.5, blockchain: Blockchain.ARBITRUM },
    { currency: Currency.ETH, amount: 2, blockchain: Blockchain.OSMOSIS },
    { currency: Currency.ADA, amount: 0, blockchain: Blockchain.NEO }, // This should be filtered out
    { currency: Currency.BTC, amount: 0.3, blockchain: Blockchain.ZILLIGA },
  ];
};
