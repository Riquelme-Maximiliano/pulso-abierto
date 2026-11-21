
import { beforeEach, describe, expect, it } from "vitest";
import { useFavoritesStore } from "./favoritesStore";

describe("Favorites Store", () => {
  beforeEach(() => {
    localStorage.clear();

    useFavoritesStore.setState({
      favorites: [],
    });
  });

  it("debe agregar una criptomoneda a favoritos", () => {
    useFavoritesStore.getState().toggleFavorite("bitcoin");

    expect(useFavoritesStore.getState().favorites).toContain("bitcoin");
  });

  it("debe quitar una criptomoneda de favoritos", () => {
    useFavoritesStore.setState({
      favorites: ["bitcoin"],
    });

    useFavoritesStore.getState().toggleFavorite("bitcoin");

    expect(useFavoritesStore.getState().favorites).not.toContain("bitcoin");
  });

  it("debe guardar los favoritos en localStorage", () => {
    useFavoritesStore.getState().toggleFavorite("ethereum");

    const savedData = localStorage.getItem("pulso-abierto-favorites");

    expect(savedData).not.toBeNull();
    expect(savedData).toContain("ethereum");
  });
});
