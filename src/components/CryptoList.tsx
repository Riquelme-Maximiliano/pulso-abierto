
import type { Cryptocurrency } from "../types/crypto";
import CryptoCard from "./CryptoCard";

interface CryptoListProps {
  cryptocurrencies: Cryptocurrency[];
  prices: Record<string, number>;
  currency: string;
  selectedId: string;
  onSelect: (id: string) => void;
}

function CryptoList({
  cryptocurrencies,
  prices,
  currency,
  selectedId,
  onSelect,
}: CryptoListProps) {
  if (cryptocurrencies.length === 0) {
    return <p>No se encontraron criptomonedas.</p>;
  }

  return (
    <section>
      {cryptocurrencies.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          id={crypto.id}
          name={crypto.name}
          price={prices[crypto.id]}
          currency={currency}
          selected={selectedId === crypto.id}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}

export default CryptoList;
