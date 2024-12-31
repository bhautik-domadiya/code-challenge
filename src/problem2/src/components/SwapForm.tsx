import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Loader2 } from 'lucide-react';
import { TokenSelect } from './TokenSelect';
import { Token } from '../types/token';
import { fetchTokenPrices } from '../api/tokens';
import { getLatestTokenPrices, calculateExchangeRate, formatPrice } from '../utils/tokenUtils';
import { Input } from './ui/Input';

export function SwapForm() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [swapping, setSwapping] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false); // Control showing token details
  const [exchangeRate, setExchangeRate] = useState<number | null>(null); // Store calculated exchange rate
  const [estimatedOutput, setEstimatedOutput] = useState<number>(0); // Store estimated output after swap
  const [error, setError] = useState<string>('');

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromToken || !toToken || !amount) return;

    setSwapping(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const calculatedExchangeRate = calculateExchangeRate(fromToken, toToken);
    const calculatedEstimatedOutput = parseFloat(amount || '0') * calculatedExchangeRate;

    setExchangeRate(calculatedExchangeRate);
    setEstimatedOutput(calculatedEstimatedOutput);

    setSwapping(false);
    setShowDetails(true);
  };

  const validateAmount = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError('Please enter a valid amount greater than 0');
    } else {
      setError('');
    }
    setAmount(value);
    setShowDetails(false);
  };

  useEffect(() => {
    const loadTokens = async () => {
      setLoading(true);
      try {
        const prices = await fetchTokenPrices();
        const tokenList = getLatestTokenPrices(prices);
        setTokens(tokenList);
      } catch (error) {
        console.error('Error loading tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
  }, []);

  useEffect(() => {
    if (fromToken && toToken) {
      const calculatedExchangeRate = calculateExchangeRate(fromToken, toToken);

      setExchangeRate(calculatedExchangeRate);
      setShowDetails(false);
    }
  }, [fromToken, toToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSwap}
      className="min-w-[300px] md:min-w-[375px] mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Swap Tokens</h2>

      <div className="space-y-6">
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => validateAmount(e.target.value)}
          min="0"
          step="any"
          required
          placeholder="0.00"
          error={error}
        />

        <TokenSelect value={fromToken} onChange={setFromToken} tokens={tokens} label="From" />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowDownUp className="text-gray-600" />
          </button>
        </div>

        <TokenSelect value={toToken} onChange={setToToken} tokens={tokens} label="To" />

        <button
          type="submit"
          disabled={!fromToken || !toToken || !amount || swapping}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {swapping ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Swapping...
            </span>
          ) : (
            'Swap Tokens'
          )}
        </button>

        {showDetails && exchangeRate && fromToken && toToken && amount && (
          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <p className="text-sm text-gray-600">
              Exchange Rate: 1 {fromToken.currency} = {exchangeRate?.toFixed(6)} {toToken.currency}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Estimated Output: {formatPrice(estimatedOutput)}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
