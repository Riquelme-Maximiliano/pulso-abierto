
import { useState } from "react";
import { z } from "zod";

const cryptoFormSchema = z.object({
  search: z.string().trim().min(2, "Ingresá al menos 2 caracteres."),
  currency: z.enum(["usd", "ars"], {
    message: "Seleccioná una moneda válida.",
  }),
});

interface CryptoFormProps {
  onSearch: (search: string, currency: string) => void;
  onInvalid: () => void;
}

function CryptoForm({ onSearch, onInvalid }: CryptoFormProps) {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [errors, setErrors] = useState<{
    search?: string;
    currency?: string;
  }>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = cryptoFormSchema.safeParse({ search, currency });

    if (!result.success) {
      const newErrors: typeof errors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (field === "search" || field === "currency") {
          newErrors[field] = issue.message;
        }
      }

      setErrors(newErrors);
      onInvalid();
      return;
    }

    setErrors({});
    onSearch(result.data.search, result.data.currency);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="search">Buscar criptomoneda:</label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Ejemplo: Bitcoin"
          aria-invalid={Boolean(errors.search)}
          aria-describedby={errors.search ? "search-error" : undefined}
        />
        {errors.search && <p id="search-error">{errors.search}</p>}
      </div>

      <div>
        <label htmlFor="currency">Moneda:</label>
        <select
          id="currency"
          value={currency}
          onChange={(event) => setCurrency(event.target.value)}
          aria-invalid={Boolean(errors.currency)}
          aria-describedby={errors.currency ? "currency-error" : undefined}
        >
          <option value="usd">Dólar (USD)</option>
          <option value="ars">Peso argentino (ARS)</option>
        </select>
        {errors.currency && <p id="currency-error">{errors.currency}</p>}
      </div>

      <button type="submit">Consultar</button>
    </form>
  );
}

export default CryptoForm;
