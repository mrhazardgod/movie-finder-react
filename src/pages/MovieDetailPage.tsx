import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchMovieById } from "../api/omdb";
import InfoGrid from "../components/InfoGrid";
import type { MovieDetail, MovieSummary } from "../types";
import { noPoster } from "../utils";

interface Props {
  checkFav: (id: string) => boolean;
  onToggleFav: (m: MovieSummary) => void;
}

export default function MovieDetailPage({ checkFav, onToggleFav }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setStatus("loading");
    fetchMovieById(id)
      .then((m) => { setMovie(m); setStatus("success"); })
      .catch((e: Error) => { setError(e.message); setStatus("error"); });
  }, [id]);

  if (status === "loading") return (
    <div id="details-skeleton" className="details-skeleton" data-edit-id="details-skeleton">
      <div className="skeleton-poster-lg" /><div className="skeleton-details" />
    </div>
  );

  if (status === "error") return (
    <div id="details-error" className="state-placeholder error-state" data-edit-id="details-error">
      <div className="state-icon">Ошибка</div>
      <p data-edit-id="details-error-message">{error}</p>
      <Link to="/" className="go-home-btn" data-edit-id="details-go-home-btn">На главную</Link>
    </div>
  );

  if (!movie) return null;

  const poster = noPoster(movie.Poster) ? "./no-poster.svg" : movie.Poster;
  const isFav = checkFav(movie.imdbID);

  const infoItems = [
    { label: "Жанр", value: movie.Genre, id: "movie-genre", editId: "movie-genre" },
    { label: "Страна", value: movie.Country, id: "movie-country", editId: "movie-country" },
    { label: "Длительность", value: movie.Runtime, id: "movie-runtime", editId: "movie-runtime" },
    { label: "Премьера", value: movie.Released, editId: "movie-released" },
    { label: "Режиссер", value: movie.Director, editId: "movie-director" },
    { label: "Актеры", value: movie.Actors, editId: "movie-actors" },
  ];

  return (
    <main id="movie-details-page" className="details-page" data-edit-id="movie-details-page">
      <div id="details-nav" className="details-nav" data-edit-id="details-nav">
        <button id="back-button" className="back-btn" onClick={() => navigate(-1)} data-edit-id="back-button">
          Назад
        </button>
      </div>
      <section id="movie-hero" className="movie-hero" data-edit-id="movie-hero">
        <img id="movie-poster" src={poster} alt={movie.Title} className="details-poster" data-edit-id="movie-poster" />
        <div className="movie-meta" data-edit-id="movie-meta">
          <h1 id="movie-title" className="details-title" data-edit-id="movie-title">{movie.Title}</h1>
          <div className="meta-badges" data-edit-id="meta-badges">
            <span id="movie-year" className="meta-badge" data-edit-id="movie-year">{movie.Year}</span>
            <span id="movie-type" className="meta-badge type-badge" data-edit-id="movie-type">{movie.Type}</span>
            <span id="movie-rating" className="meta-badge rating-badge" data-edit-id="movie-rating">IMDb {movie.imdbRating}</span>
          </div>
          <InfoGrid items={infoItems} />
          <div id="details-actions" className="details-actions" data-edit-id="details-actions">
            <button
              id="favorite-toggle-button"
              className={`fav-toggle-btn${isFav ? " fav-active" : ""}`}
              onClick={() => onToggleFav({ imdbID: movie.imdbID, Title: movie.Title, Year: movie.Year, Type: movie.Type, Poster: movie.Poster })}
              data-edit-id="favorite-toggle-button"
            >
              {isFav ? "Удалить из избранного" : "Добавить в избранное"}
            </button>
          </div>
        </div>
      </section>
      <section id="movie-body" className="movie-body" data-edit-id="movie-body">
        <h2 data-edit-id="plot-heading">Описание</h2>
        <p id="movie-plot" className="movie-plot" data-edit-id="movie-plot">{movie.Plot}</p>
      </section>
    </main>
  );
}
