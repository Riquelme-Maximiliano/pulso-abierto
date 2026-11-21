
import { useRef, useState } from "react";
import CryptoForm from "../components/CryptoForm";
import CryptoStatus from "../components/CryptoStatus";
import CryptoList from "../components/CryptoList";
import {
  getCryptoPrices,
  cryptocurrencies,
} from "../services/cryptoService";
import type { CryptoResponse } from "../types/crypto";

function Home() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState(
    "Ingresá una búsqueda para consultar los precios."
  );
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [selectedId, setSelectedId] = useState("");

  // Identifica cada consulta para ignorar respuestas anteriores.
  const requestIdRef = useRef(0);

  function handleInvalid() {
    requestIdRef.current += 1;

    setLoading(false);
    setPrices({});
    setSelectedId("");
    setHasError(false);
    setHasSearched(false);
    setMessage(
      "La búsqueda no es válida. Corregí los campos e intentá nuevamente."
    );
  }

  async function handleSearch(
    searchText: string,
    selectedCurrency: string
  ) {
    const currentRequestId = ++requestIdRef.current;

    setSearch(searchText);
    setCurrency(selectedCurrency);
    setLoading(true);
    setHasError(false);
    setHasSearched(false);
    setPrices({});
    setSelectedId("");
    setMessage("Cargando precios de las criptomonedas...");

    try {
      const data: CryptoResponse = await getCryptoPrices(selectedCurrency);

      // Ignora la respuesta si ya comenzó otra consulta.
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      const newPrices: Record<string, number> = {};

      for (const crypto of cryptocurrencies) {
        const price =
          data[crypto.id as keyof CryptoResponse]?.[
            selectedCurrency as "usd" | "ars"
          ];

        if (typeof price === "number") {
          newPrices[crypto.id] = price;
        }
      }

      setPrices(newPrices);
      setHasSearched(true);
      setMessage("Consulta completada correctamente.");
    } catch (error) {
      if (currentRequestId !== requestIdRef.current) {
        return;
      }

      setPrices({});
      setHasError(true);
      setMessage(
        "Ocurrió un error al consultar. Podés intentar nuevamente."
      );
      console.error("Error al consultar CoinGecko:", error);
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }

  const filteredCryptocurrencies = cryptocurrencies.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleCryptocurrencies = filteredCryptocurrencies.filter(
    (crypto) => prices[crypto.id] !== undefined
  );

  return (
    <main>
      <h1>Consulta de criptomonedas</h1>

      <CryptoForm
        onSearch={handleSearch}
        onInvalid={handleInvalid}
      />

      <CryptoStatus message={message} loading={loading} />

      {!loading && hasSearched && (
        <>
          <h2>Resultados</h2>

          <p>Cantidad de resultados: {visibleCryptocurrencies.length}</p>

          <CryptoList
            cryptocurrencies={visibleCryptocurrencies}
            prices={prices}
            currency={currency}
            selectedId={selectedId}
            onSelect={(id) =>
              setSelectedId((previousId) =>
                previousId === id ? "" : id
              )
            }
          />
        </>
      )}

      {!loading && (hasSearched || hasError) && (
        <button
          type="button"
          onClick={() => handleSearch(search, currency)}
        >
          Reintentar consulta
        </button>
      )}
    </main>
  );
}

export default Home;
