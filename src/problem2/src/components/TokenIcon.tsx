interface TokenIconProps {
  currency: string;
  iconUrl: string;
  size?: number;
}

export function TokenIcon({ currency, iconUrl, size = 24 }: TokenIconProps) {
  return (
    <img
      src={iconUrl}
      alt={currency}
      className="inline-block"
      style={{ width: size, height: size }}
      onError={(e) => {
        e.currentTarget.src = `https://via.placeholder.com/${size}?text=${currency}`;
      }}
    />
  );
}
