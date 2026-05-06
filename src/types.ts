export interface MovieSummary {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends MovieSummary {
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbRating: string;
  Runtime: string;
  Rated: string;
  Released: string;
  Writer: string;
  Metascore: string;
  totalSeasons?: string;
  BoxOffice?: string;
}

export type FilterType = "all" | "movie" | "series" | "episode";
export type SortType = "default" | "year_asc" | "year_desc" | "title_az" | "title_za";

export interface SearchState {
  query: string;
  filter: FilterType;
  sort: SortType;
  page: number;
  totalResults: number;
  movies: MovieSummary[];
  status: "idle" | "loading" | "error" | "success" | "empty_query";
  error: string;
}