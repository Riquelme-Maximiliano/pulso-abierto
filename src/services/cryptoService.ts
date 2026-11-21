
import { z } from "zod";
import type { CryptoResponse, Cryptocurrency } from "../types/crypto";

const API_URL = "https://api.coingecko.com/api/v3/simple/price";

export const cryptocurrencies: Cryptocurrency[] = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "solana", name: "Solana" },
];

const cryptoPriceSchema = z.object({
  usd: z.number().optional(),
  ars: z.number().optional(),
});

const cryptoResponseSchema = z.object({
  bitcoin: cryptoPriceSchema.optional(),
  ethereum: cryptoPriceSchema.optional(),
  solana: cryptoPriceSchema.optional(),
});

export async function getCryptoPrices(
  currency: string
): Promise<CryptoResponse> {
  if (currency !== "usd" && currency !== "ars") {
    throw new Error("La moneda seleccionada no es válida.");
  }

  const ids = cryptocurrencies.map((crypto) => crypto.id).join(",");

  const url = `${API_URL}?ids=${ids}&vs_currencies=${currency}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data: unknown = await response.json();

  return cryptoResponseSchema.parse(data);
}
