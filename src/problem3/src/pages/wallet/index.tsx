import { useMemo } from 'react';
import { useWalletBalances } from '../../hooks/useWalletBalances.ts';
import usePrices from '../../hooks/usePrices.ts';
import WalletRow from '../../component/WalletRow.tsx';
import { IWallet } from '../../utils/common.interface.ts';
import './styles.css';

const WALLET_INITIALIZE = {
  amount: 0,
  blockchain: '',
  currency: '',
  formatted: '',
  priority: 0,
  usdValue: 0,
};

const WalletPage = () => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // Cache priority values to avoid repeated calculations
  const getPriority = useMemo(() => {
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };

    return (blockchain: string): number => {
      return priorityMap[blockchain] ?? -99; // Default to -99 if not found
    };
  }, []);

  // Use a single pass for filtering, sorting, and formatting
  const sortedBalances: IWallet[] = useMemo((): IWallet[] => {
    return balances
      .map((balance): IWallet => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority <= -99 || balance.amount <= 0)
          return WALLET_INITIALIZE;

        const usdValue = prices[balance.currency] * balance.amount;
        const formattedAmount = balance.amount.toFixed(2); // Format to 2 decimal places

        return {
          ...balance,
          formatted: formattedAmount,
          usdValue,
          priority: balancePriority,
        };
      })
      .filter(Boolean) // Remove null values
      .sort((lhs: IWallet, rhs: IWallet) => rhs.priority - lhs.priority); // Sort by priority descending
  }, [balances, prices, getPriority]);

  const rows = sortedBalances.map(
    (balance: IWallet) => (
      <div key={`wallet-row${balance.amount}`}>
        <WalletRow
          className="wallet-row"
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      </div>
    )
  );

  // Calculate total USD value of all wallets
  const totalUsdValue: number = sortedBalances.reduce(
    (total: number, balance: IWallet) => total + balance.usdValue,
    0
  );

  return (
    <div className="wallet-wrapper">
      <div className="wallet-container">
        <header className="wallet-header">
          <h1>My Wallet Balances</h1>
          <p className="wallet-total">
            Total USD Value: ${totalUsdValue.toFixed(2)}
          </p>
        </header>
        {rows}
      </div>
    </div>
  );
};

export default WalletPage;
