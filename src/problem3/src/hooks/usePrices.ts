import { IPrices } from '../utils/common.interface.ts';
// Mock `usePrices` hook
const usePrices = (): IPrices => {
  return {
    USD: 1,
    BTC: 50000,
    ETH: 3000,
    ADA: 1.5,
  };
};

export default usePrices;
