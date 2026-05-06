import MovieList from "../components/MovieList";
import type { MovieSummary } from "../types";
import { Link } from "react-router-dom";

interface Props {
  favorites: MovieSummary[];
  checkFav: (id: string) => boolean;
  onToggleFav: (m: MovieSummary) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export default function FavoritesPage({ favorites, checkFav, onToggleFav, onRemove, onClearAll }: Props) {
  const handleClear = () => {
    if (window.confirm("Очистить все избранное?")) onClearAll();
  };

  return (
    <main id="favorites-page" className="favorites-page" data-edit-id="favorites-page">
      <div id="favorites-header" className="favorites-header" data-edit-id="favorites-header">
        <div data-edit-id="favorites-header-titles">
          <h1 id="favorites-title" className="page-title" data-edit-id="favorites-title">Избранное</h1>
          <span id="favorites-count" className="favorites-count" data-edit-id="favorites-count">
            Сохранено: {favorites.length}
          </span>
        </div>
        {favorites.length > 0 && (
          <button id="clear-all-button" className="clear-all-btn" onClick={handleClear} data-edit-id="clear-all-button">
            Очистить все
          </button>
        )}
      </div>
      {favorites.length === 0 ? (
        <div id="favorites-empty" className="state-placeholder" data-edit-id="favorites-empty">
          <div className="state-icon" data-edit-id="favorites-empty-icon">Пусто</div>
          <p data-edit-id="favorites-empty-text">Вы пока не сохранили ни одного фильма</p>
          <Link to="/" className="find-movies-btn" data-edit-id="find-movies-btn">Найти фильмы</Link>
        </div>
      ) : (
        <MovieList
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
