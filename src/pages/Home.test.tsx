import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { getCryptoPrices } from "../services/cryptoService";

vi.mock("../services/cryptoService", () => ({
  getCryptoPrices: vi.fn(),
  cryptocurrencies: [
    { id: "bitcoin", name: "Bitcoin" },
    { id: "ethereum", name: "Ethereum" },
    { id: "solana", name: "Solana" },
  ],
}));

describe("Home - consultas de criptomonedas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("debe mostrar los resultados cuando la consulta es exitosa", async () => {
    vi.mocked(getCryptoPrices).mockResolvedValue({
      bitcoin: { usd: 68000 },
      ethereum: { usd: 3500 },
      solana: { usd: 150 },
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/buscar criptomoneda/i), {
      target: { value: "Bitcoin" },
    });

    fireEvent.click(screen.getByRole("button", { name: /consultar/i }));

    expect(
      await screen.findByText("Consulta completada correctamente.")
    ).toBeInTheDocument();

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  });

  it("debe mostrar un mensaje cuando ocurre un error", async () => {
    vi.mocked(getCryptoPrices).mockRejectedValue(
      new Error("Error de conexión")
    );

    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/buscar criptomoneda/i), {
      target: { value: "Bitcoin" },
    });

    fireEvent.click(screen.getByRole("button", { name: /consultar/i }));

    expect(
      await screen.findByText(
        "Ocurrió un error al consultar. Podés intentar nuevamente."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /reintentar consulta/i })
    ).toBeInTheDocument();
  });

  it("debe realizar una nueva consulta al presionar reintentar", async () => {
    vi.mocked(getCryptoPrices)
      .mockRejectedValueOnce(new Error("Error de conexión"))
      .mockResolvedValueOnce({
        bitcoin: { usd: 68000 },
      });

    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/buscar criptomoneda/i), {
      target: { value: "Bitcoin" },
    });

    fireEvent.click(screen.getByRole("button", { name: /consultar/i }));

    const retryButton = await screen.findByRole("button", {
      name: /reintentar consulta/i,
    });

    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(getCryptoPrices).toHaveBeenCalledTimes(2);
    });

    expect(
      await screen.findByText("Consulta completada correctamente.")
    ).toBeInTheDocument();
  });
});
