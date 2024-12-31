import { Blockchain, Currency } from './common.enums.ts';

export interface IWalletBalance {
  currency: Currency;
  blockchain: Blockchain;
  amount: number;
}

export interface IPrices {
  [key: string]: number;
}

export interface IWallet {
  amount: number;
  blockchain: string;
  currency: string;
  formatted: string;
  priority: number;
  usdValue: number;
}

export interface IWalletRow {
  amount: number;
  className: string;
  formattedAmount: string;
  usdValue: number;
}
