import type { MovieSummary, SortType } from "./types";

export function sortMovies(movies: MovieSummary[], sort: SortType): MovieSummary[] {
  const copy = [...movies];
  switch (sort) {
    case "year_asc":
      return copy.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    case "year_desc":
      return copy.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    case "title_az":
      return copy.sort((a, b) => a.Title.localeCompare(b.Title));
    case "title_za":
      return copy.sort((a, b) => b.Title.localeCompare(a.Title));
    default:
      return copy;
  }
}

export function getApiKey(): string {
  return (
    localStorage.getItem("omdb_api_key") ||
    (typeof import.meta !== "undefined" ? (import.meta.env.VITE_OMDB_API_KEY as string) || "" : "")
  );
}

export function saveApiKey(key: string): void {
  localStorage.setItem("omdb_api_key", key);
}

export function getFavorites(): MovieSummary[] {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
}

export function saveFavorites(favs: MovieSummary[]): void {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((f) => f.imdbID === id);
}

export function addFavorite(movie: MovieSummary): void {
  const favs = getFavorites();
  if (!favs.find((f) => f.imdbID === movie.imdbID)) {
    saveFavorites([...favs, movie]);
  }
}

export function removeFavorite(id: string): void {
  saveFavorites(getFavorites().filter((f) => f.imdbID !== id));
}

export function noPoster(poster: string): boolean {
  return !poster || poster === "N/A";
}