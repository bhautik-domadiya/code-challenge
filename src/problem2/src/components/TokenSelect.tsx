import { ChevronDown } from 'lucide-react';
import { Token } from '../types/token';
import { TokenIcon } from './TokenIcon';
import { formatPrice } from '../utils/tokenUtils';

interface TokenSelectProps {
  value: Token | null;
  onChange: (token: Token) => void;
  tokens: Token[];
  label: string;
}

export function TokenSelect({ value, onChange, tokens, label }: TokenSelectProps) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <select
          value={value?.currency || ''}
          onChange={(e) => {
            const token = tokens.find((t) => t.currency === e.target.value);
            if (token) onChange(token);
          }}
          className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select token
          </option>
          {tokens.map((token) => (
            <option key={token.currency} value={token.currency}>
              {token.currency}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown size={20} />
        </div>
      </div>
      {value && (
        <div className="mt-1 flex items-center">
          <TokenIcon currency={value.currency} iconUrl={value.iconUrl} />
          <span className="ml-2 text-sm text-gray-600">{formatPrice(value.price)}</span>
        </div>
      )}
    </div>
  );
}
