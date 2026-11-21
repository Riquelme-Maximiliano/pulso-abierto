import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CryptoCard from "./CryptoCard";
import { useFavoritesStore } from "../store/favoritesStore";

describe("CryptoCard - favoritos en pantalla", () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] });
  });

  it("debe agregar y quitar una criptomoneda de favoritos desde el botón", () => {
    render(
      <MemoryRouter>
        <CryptoCard
          id="bitcoin"
          name="Bitcoin"
          price={68000}
          currency="usd"
          selected={false}
          onSelect={() => {}}
        />
      </MemoryRouter>
    );

    const addButton = screen.getByRole("button", {
      name: "Agregar a favoritos",
    });

    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(
      screen.getByRole("button", { name: "Quitar de favoritos" })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Quitar de favoritos" })
    );

    expect(
      screen.getByRole("button", { name: "Agregar a favoritos" })
    ).toBeInTheDocument();
  });
});
