import { useCallback } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import SkeletonCard from "../components/SkeletonCard";
import { useSearch } from "../hooks/useSearch";
import type { FilterType, Lang, MovieSummary, SortType } from "../types";

interface Props {
  lang: Lang;
  checkFav: (id: string) => boolean;
  onToggleFav: (m: MovieSummary) => void;
}

const copy = {
  ru: {
    title: "КиноFinder",
    subtitle: "Ищите фильмы и сериалы на русском или английском языке",
    idleTitle: "Поиск",
    idleText: "Начните с запроса: матрица, интерстеллар, друзья, дюна",
    emptyText: "Введите название фильма или сериала",
    error: "Ошибка",
    retry: "Повторить",
    noResults: (query: string) => `По запросу "${query}" ничего не найдено`,
    shown: (shown: number, total: number) => `Показано ${shown} из ${total}`,
    more: "Загрузить еще",
  },
  en: {
    title: "MovieFinder",
    subtitle: "Search movies and series in Russian or English",
    idleTitle: "Search",
    idleText: "Try: matrix, interstellar, friends, dune",
    emptyText: "Enter a movie or series title",
    error: "Error",
    retry: "Retry",
    noResults: (query: string) => `Nothing found for "${query}"`,
    shown: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    more: "Load more",
  },
};

export default function HomePage({ lang, checkFav, onToggleFav }: Props) {
  const { state, search, loadMore, setSort, getSorted } = useSearch(lang);
  const { status, movies, totalResults, error, query } = state as typeof state & { sort: SortType };
  const t = copy[lang];

  const handleSearch = useCallback((q: string, f: FilterType) => search(q, f), [search]);
  const sorted = getSorted(movies, state.sort);
  const hasMore = sorted.length < totalResults;

  return (
    <main className="home-page" data-edit-id="home-page">
      <section className="hero-section" data-edit-id="hero-section">
        <h1 id="app-title" className="app-title" data-edit-id="app-title">{t.title}</h1>
        <p id="app-subtitle" className="app-subtitle" data-edit-id="app-subtitle">{t.subtitle}</p>
      </section>
      <SearchBar lang={lang} onSearch={handleSearch} onSortChange={setSort} sort={state.sort} filter={state.filter} />
      <section id="results-area" className="results-area" data-edit-id="results-area">
        {status === "idle" && (
          <div id="idle-state" className="state-placeholder" data-edit-id="idle-state">
            <div className="state-icon" data-edit-id="idle-state-icon">{t.idleTitle}</div>
            <p data-edit-id="idle-state-text">{t.idleText}</p>
          </div>
        )}
        {status === "empty_query" && (
          <div id="empty-query-state" className="state-placeholder" data-edit-id="empty-query-state">
            <div className="state-icon">!</div>
            <p data-edit-id="empty-query-text">{t.emptyText}</p>
          </div>
        )}
        {status === "loading" && (
          <div id="loading-skeleton" className="movie-grid" data-edit-id="loading-skeleton">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {status === "error" && (
          <div id="error-state" className="state-placeholder error-state" data-edit-id="error-state">
            <div className="state-icon">{t.error}</div>
            <p data-edit-id="error-state-message">{error}</p>
            <button className="retry-btn" onClick={() => handleSearch(query, state.filter)} data-edit-id="retry-button">
              {t.retry}
            </button>
          </div>
        )}
        {status === "success" && sorted.length === 0 && (
          <div id="no-results-state" className="state-placeholder" data-edit-id="no-results-state">
            <div className="state-icon">0</div>
            <p data-edit-id="no-results-text">{t.noResults(query)}</p>
          </div>
        )}
        {status === "success" && sorted.length > 0 && (
          <MovieList lang={lang} movies={sorted} checkFav={checkFav} onToggleFav={onToggleFav} />
        )}
      </section>
      {status === "success" && sorted.length > 0 && (
        <section id="pagination-area" className="pagination-area" data-edit-id="pagination-area">
          <p id="results-counter" className="results-counter" data-edit-id="results-counter">
            {t.shown(sorted.length, totalResults)}
          </p>
          {hasMore && (
            <button id="load-more-button" className="load-more-btn" onClick={loadMore} data-edit-id="load-more-button">
              {t.more}
            </button>
          )}
        </section>
      )}
    </main>
  );
}
