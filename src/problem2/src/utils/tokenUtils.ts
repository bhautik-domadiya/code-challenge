import { TokenPrice, Token } from '../types/token';

export function getLatestTokenPrices(prices: TokenPrice[]): Token[] {
  const latestPrices = prices.reduce(
    (acc, curr) => {
      if (!acc[curr.currency] || new Date(curr.date) > new Date(acc[curr.currency].date)) {
        acc[curr.currency] = curr;
      }
      return acc;
    },
    {} as Record<string, TokenPrice>
  );

  return Object.values(latestPrices).map(({ currency, price }) => ({
    currency,
    price,
    iconUrl: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`,
  }));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price);
}

export function calculateExchangeRate(fromToken: Token, toToken: Token): number {
  return fromToken.price / toToken.price;
}
