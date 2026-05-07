import { useState, useCallback, useRef } from "react";
import type { SearchState, FilterType, SortType, MovieSummary, Lang } from "../types";
import { searchMovies } from "../api/omdb";
import { sortMovies } from "../utils";

const INITIAL: SearchState = {
  query: "",
  filter: "all",
  sort: "default",
  page: 1,
  totalResults: 0,
  movies: [],
  status: "idle",
  error: "",
};

export function useSearch(lang: Lang) {
  const [state, setState] = useState<SearchState>(INITIAL);
  const abortRef = useRef<AbortController | null>(null);

  const doSearch = useCallback(
    async (query: string, filter: FilterType, page: number, append: boolean) => {
      if (!query.trim()) {
        setState((s) => ({ ...s, status: "empty_query", movies: [], totalResults: 0 }));
        return;
      }
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      setState((s) => ({ ...s, status: "loading", error: "" }));
      try {
        const { movies, total } = await searchMovies(query, filter, page, lang);
        setState((s) => {
          const merged: MovieSummary[] = append ? [...s.movies, ...movies] : movies;
          return {
            ...s,
            status: "success",
            movies: merged,
            totalResults: total,
            page,
            query,
            filter,
          };
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setState((s) => ({ ...s, status: "error", error: msg }));
      }
    },
    [lang]
  );

  const search = useCallback(
    (query: string, filter: FilterType) => doSearch(query, filter, 1, false),
    [doSearch]
  );

  const loadMore = useCallback(() => {
    setState((s) => {
      doSearch(s.query, s.filter, s.page + 1, true);
      return s;
    });
  }, [doSearch]);

  const setSort = useCallback((sort: SortType) => {
    setState((s) => ({ ...s, sort }));
  }, []);

  const getSorted = useCallback(
    (movies: MovieSummary[], sort: SortType) => sortMovies(movies, sort),
    []
  );

  return { state, search, loadMore, setSort, getSorted };
}
