
import { afterEach, describe, expect, it, vi } from "vitest";
import { getCryptoPrices } from "./cryptoService";

describe("Crypto Service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debe devolver los precios correctamente", async () => {
    const mockResponse = {
      bitcoin: { usd: 68000 },
      ethereum: { usd: 3500 },
      solana: { usd: 150 },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })
    );

    const result = await getCryptoPrices("usd");

    expect(result.bitcoin?.usd).toBe(68000);
    expect(result.ethereum?.usd).toBe(3500);
    expect(result.solana?.usd).toBe(150);
  });

  it("debe generar un error cuando la API responde con error HTTP", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    await expect(getCryptoPrices("usd")).rejects.toThrow("Error HTTP: 500");
  });

  it("debe rechazar una respuesta con datos incorrectos", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          bitcoin: { usd: "precio incorrecto" },
        }),
      })
    );

    await expect(getCryptoPrices("usd")).rejects.toThrow();
  });

  it("debe rechazar una moneda no permitida", async () => {
    await expect(getCryptoPrices("eur")).rejects.toThrow(
      "La moneda seleccionada no es válida."
    );
  });
});
