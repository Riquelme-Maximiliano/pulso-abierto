
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCryptoPrices, cryptocurrencies } from "../services/cryptoService";
import type { CryptoResponse } from "../types/crypto";
import { useFavoritesStore } from "../store/favoritesStore";

function CryptoDetail() {
  const { id } = useParams<{ id: string }>();

  // Buscamos la criptomoneda una sola vez
  const crypto = cryptocurrencies.find((item) => item.id === id);

  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isFavorite = useFavoritesStore((state) =>
    state.favorites.includes(id ?? "")
  );

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      setLoading(true);
      setError("");
      setPrice(null);

      try {
        if (!crypto) {
          throw new Error("Criptomoneda no encontrada.");
        }

        const data: CryptoResponse = await getCryptoPrices("usd");
        const cryptoPrice = data[crypto.id as keyof CryptoResponse]?.usd;

        if (typeof cryptoPrice !== "number") {
          throw new Error("No hay un precio disponible.");
        }

        if (active) {
          setPrice(cryptoPrice);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudo cargar el detalle."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDetail();

    return () => {
      active = false;
    };
  }, [id, crypto]);

  return (
    <main>
      <h1>Detalle de criptomoneda</h1>

      {loading && <p>Cargando información...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && crypto && price !== null && (
        <article>
          <h2>{crypto.name}</h2>
          <p>Identificador: {crypto.id}</p>
          <p>Precio actual: USD ${price.toLocaleString("en-US")}</p>

          <button
            type="button"
            onClick={() => toggleFavorite(crypto.id)}
          >
            {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
          </button>
        </article>
      )}

      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default CryptoDetail;
