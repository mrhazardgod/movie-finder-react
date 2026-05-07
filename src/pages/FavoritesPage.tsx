import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";
import type { Lang, MovieSummary } from "../types";

interface Props {
  lang: Lang;
  favorites: MovieSummary[];
  checkFav: (id: string) => boolean;
  onToggleFav: (m: MovieSummary) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

const copy = {
  ru: {
    title: "Избранное",
    saved: (count: number) => `Сохранено: ${count}`,
    clear: "Очистить все",
    confirm: "Очистить все избранное?",
    empty: "Вы пока не сохранили ни одного фильма",
    find: "Найти фильмы",
  },
  en: {
    title: "Favorites",
    saved: (count: number) => `Saved: ${count}`,
    clear: "Clear all",
    confirm: "Clear all favorites?",
    empty: "You have not saved any movies yet",
    find: "Find movies",
  },
};

export default function FavoritesPage({ lang, favorites, checkFav, onToggleFav, onRemove, onClearAll }: Props) {
  const t = copy[lang];
  const handleClear = () => {
    if (window.confirm(t.confirm)) onClearAll();
  };

  return (
    <main id="favorites-page" className="favorites-page" data-edit-id="favorites-page">
      <div id="favorites-header" className="favorites-header" data-edit-id="favorites-header">
        <div data-edit-id="favorites-header-titles">
          <h1 id="favorites-title" className="page-title" data-edit-id="favorites-title">{t.title}</h1>
          <span id="favorites-count" className="favorites-count" data-edit-id="favorites-count">{t.saved(favorites.length)}</span>
        </div>
        {favorites.length > 0 && (
          <button id="clear-all-button" className="clear-all-btn" onClick={handleClear} data-edit-id="clear-all-button">
            {t.clear}
          </button>
        )}
      </div>
      {favorites.length === 0 ? (
        <div id="favorites-empty" className="state-placeholder" data-edit-id="favorites-empty">
          <div className="state-icon" data-edit-id="favorites-empty-icon">{lang === "ru" ? "Пусто" : "Empty"}</div>
          <p data-edit-id="favorites-empty-text">{t.empty}</p>
          <Link to="/" className="find-movies-btn" data-edit-id="find-movies-btn">{t.find}</Link>
        </div>
      ) : (
        <MovieList
          lang={lang}
          movies={favorites}
          checkFav={checkFav}
          onToggleFav={onToggleFav}
          showRemove
          onRemove={onRemove}
          listId="favorites-list"
        />
      )}
    </main>
  );
}
