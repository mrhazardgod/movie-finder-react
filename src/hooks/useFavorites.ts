import { useState, useCallback } from "react";
import type { MovieSummary } from "../types";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  saveFavorites,
  isFavorite,
} from "../utils";

export function useFavorites() {
  const [favorites, setFavorites] = useState<MovieSummary[]>(() => getFavorites());

  const toggleFavorite = useCallback((movie: MovieSummary) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
    setFavorites(getFavorites());
  }, []);

  const removeOne = useCallback((id: string) => {
    removeFavorite(id);
    setFavorites(getFavorites());
  }, []);

  const clearAll = useCallback(() => {
    saveFavorites([]);
    setFavorites([]);
  }, []);

  const checkFav = useCallback(
    (id: string) => favorites.some((f) => f.imdbID === id),
    [favorites]
  );

  return { favorites, toggleFavorite, removeOne, clearAll, checkFav };
}