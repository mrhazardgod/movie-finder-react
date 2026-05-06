import MainCard from "./MainCard";
import type { MovieSummary } from "../types";

interface Props {
  movies: MovieSummary[];
  checkFav: (id: string) => boolean;
  onToggleFav: (m: MovieSummary) => void;
  showRemove?: boolean;
  onRemove?: (id: string) => void;
  listId?: string;
}

export default function MovieList({ movies, checkFav, onToggleFav, showRemove, onRemove, listId }: Props) {
  return (
    <div id={listId || "movie-list"} className="movie-grid" data-edit-id={listId || "movie-list"}>
      {movies.map((m) => (
        <MainCard
          key={m.imdbID}
          movie={m}
          isFav={checkFav(m.imdbID)}
          onToggleFav={onToggleFav}
          showRemove={showRemove}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}