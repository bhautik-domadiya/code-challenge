export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface Token {
  currency: string;
  price: number;
  iconUrl: string;
}

export interface TokenPair {
  from: Token | null;
  to: Token | null;
}
