
import { Link } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesStore";

interface CryptoCardProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

function CryptoCard({
  id,
  name,
  price,
  currency,
  selected,
  onSelect,
}: CryptoCardProps) {
  const isFavorite = useFavoritesStore((state) =>
    state.favorites.includes(id)
  );

  const toggleFavorite = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  return (
    <article>
      <h3>{name}</h3>

      <p>
        Precio: {currency.toUpperCase()} $
        {price.toLocaleString("es-AR")}
      </p>

      <Link to={`/criptomonedas/${id}`}>
        Ver detalle
      </Link>

      <button type="button" onClick={() => onSelect(id)}>
        {selected ? "Quitar selección" : "Seleccionar"}
      </button>

      <button type="button" onClick={() => toggleFavorite(id)}>
        {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      </button>
    </article>
  );
}

export default CryptoCard;
