// import React from 'react';
import { IWalletRow } from '../utils/common.interface.ts';

// interface IProps {
//   amount: number;
//   className: string;
//   formattedAmount: string;
//   usdValue: number;
// }

const WalletRow = (props: IWalletRow) => {
  const { amount, usdValue, formattedAmount, className } = props;
  return (
    <div className={className}>
      <div className="wallet-info">
        <div className="wallet-amount">
          <strong>{formattedAmount}</strong> {amount > 1 ? 'coins' : 'coin'}
        </div>
        <div className="wallet-usd">USD Value: ${usdValue.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default WalletRow;
