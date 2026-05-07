import { Link } from "react-router-dom";
import type { Lang, MovieSummary } from "../types";
import { noPoster } from "../utils";

interface Props {
  lang: Lang;
  movie: MovieSummary;
  isFav: boolean;
  onToggleFav: (m: MovieSummary) => void;
  showRemove?: boolean;
  onRemove?: (id: string) => void;
}

const copy = {
  ru: { inFav: "В избранном", addFav: "В избранное", remove: "Удалить" },
  en: { inFav: "Saved", addFav: "Save", remove: "Remove" },
};

export default function MainCard({ lang, movie, isFav, onToggleFav, showRemove, onRemove }: Props) {
  const hasPoster = !noPoster(movie.Poster);
  const t = copy[lang];

  return (
    <div className="movie-card" data-edit-id={`movie-card-${movie.imdbID}`}>
      <Link to={`/movie/${movie.imdbID}`} className="card-link" data-edit-id={`card-link-${movie.imdbID}`}>
        <div className="card-poster-wrap">
          <div className="poster-fallback" aria-hidden="true">
            <span className="poster-title">{movie.Title}</span>
            <span className="poster-rating">{movie.imdbRating ? `IMDb ${movie.imdbRating}` : movie.Year}</span>
          </div>
          {hasPoster && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="card-poster"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
              data-edit-id={`card-poster-${movie.imdbID}`}
            />
          )}
          <span className="card-type-badge" data-edit-id={`card-type-${movie.imdbID}`}>{movie.Type}</span>
        </div>
        <div className="card-info" data-edit-id={`card-info-${movie.imdbID}`}>
          <h3 className="card-title" data-edit-id={`card-title-${movie.imdbID}`}>{movie.Title}</h3>
          <div className="card-meta-row" data-edit-id={`card-meta-${movie.imdbID}`}>
            <span className="card-year" data-edit-id={`card-year-${movie.imdbID}`}>{movie.Year}</span>
            {movie.imdbRating && <span className="card-rating" data-edit-id={`card-rating-${movie.imdbID}`}>IMDb {movie.imdbRating}</span>}
          </div>
        </div>
      </Link>
      <div className="card-actions" data-edit-id={`card-actions-${movie.imdbID}`}>
        <button
          className={`fav-btn${isFav ? " fav-active" : ""}`}
          onClick={() => onToggleFav(movie)}
          data-edit-id={`fav-btn-${movie.imdbID}`}
        >
          {isFav ? t.inFav : t.addFav}
        </button>
        {showRemove && onRemove && (
          <button className="remove-btn" onClick={() => onRemove(movie.imdbID)} data-edit-id={`remove-btn-${movie.imdbID}`}>
            {t.remove}
          </button>
        )}
      </div>
    </div>
  );
}
