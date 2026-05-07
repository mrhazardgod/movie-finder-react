import { getApiKey } from "../utils";
import type { FilterType, Lang, MovieDetail, MovieSummary } from "../types";

const BASE = "https://www.omdbapi.com/";
const PAGE_SIZE = 100;

interface SearchResponse {
  Search?: MovieSummary[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

interface LocalMovie {
  imdbID: string;
  type: MovieSummary["Type"];
  year: string;
  poster: string;
  title: { ru: string; en: string };
  genre: { ru: string; en: string };
  plot: { ru: string; en: string };
  language: { ru: string; en: string };
  country: { ru: string; en: string };
  runtime: { ru: string; en: string };
  director: string;
  actors: string;
  awards: string;
  rating: string;
  rated: string;
  released: string;
  writer: string;
  metascore: string;
  totalSeasons?: string;
  aliases: string[];
}

const LOCAL_MOVIES: LocalMovie[] = [
  {
    imdbID: "tt0133093",
    type: "movie",
    year: "1999",
    poster: "N/A",
    title: { ru: "Матрица", en: "The Matrix" },
    genre: { ru: "Фантастика, боевик", en: "Sci-Fi, Action" },
    plot: {
      ru: "Хакер Нео узнает, что привычный мир является симуляцией, и присоединяется к сопротивлению людей.",
      en: "A hacker named Neo discovers that his world is a simulation and joins the human resistance.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США, Австралия", en: "USA, Australia" },
    runtime: { ru: "136 мин", en: "136 min" },
    director: "Lana Wachowski, Lilly Wachowski",
    actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    awards: "4 Oscars",
    rating: "8.7",
    rated: "R",
    released: "31 Mar 1999",
    writer: "Lana Wachowski, Lilly Wachowski",
    metascore: "73",
    aliases: ["matrix", "the matrix", "матрица", "matritsa"],
  },
  {
    imdbID: "tt0816692",
    type: "movie",
    year: "2014",
    poster: "N/A",
    title: { ru: "Интерстеллар", en: "Interstellar" },
    genre: { ru: "Фантастика, драма, приключения", en: "Sci-Fi, Drama, Adventure" },
    plot: {
      ru: "Группа исследователей отправляется через червоточину, чтобы найти новый дом для человечества.",
      en: "A team of explorers travels through a wormhole to find a new home for humanity.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США, Великобритания, Канада", en: "USA, UK, Canada" },
    runtime: { ru: "169 мин", en: "169 min" },
    director: "Christopher Nolan",
    actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    awards: "1 Oscar",
    rating: "8.7",
    rated: "PG-13",
    released: "07 Nov 2014",
    writer: "Jonathan Nolan, Christopher Nolan",
    metascore: "74",
    aliases: ["interstellar", "интерстеллар"],
  },
  {
    imdbID: "tt1375666",
    type: "movie",
    year: "2010",
    poster: "N/A",
    title: { ru: "Начало", en: "Inception" },
    genre: { ru: "Фантастика, боевик, триллер", en: "Sci-Fi, Action, Thriller" },
    plot: {
      ru: "Специалист по внедрению идей во снах получает шанс вернуть прежнюю жизнь через почти невозможное задание.",
      en: "A thief who steals secrets through dreams is offered a chance to have his life back.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США, Великобритания", en: "USA, UK" },
    runtime: { ru: "148 мин", en: "148 min" },
    director: "Christopher Nolan",
    actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    awards: "4 Oscars",
    rating: "8.8",
    rated: "PG-13",
    released: "16 Jul 2010",
    writer: "Christopher Nolan",
    metascore: "74",
    aliases: ["inception", "начало", "nachalo"],
  },
  {
    imdbID: "tt0111161",
    type: "movie",
    year: "1994",
    poster: "N/A",
    title: { ru: "Побег из Шоушенка", en: "The Shawshank Redemption" },
    genre: { ru: "Драма", en: "Drama" },
    plot: {
      ru: "Банкир, осужденный за убийство, строит дружбу и надежду в стенах тюрьмы Шоушенк.",
      en: "A banker sentenced for murder builds friendship and hope inside Shawshank prison.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США", en: "USA" },
    runtime: { ru: "142 мин", en: "142 min" },
    director: "Frank Darabont",
    actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    awards: "7 Oscar nominations",
    rating: "9.3",
    rated: "R",
    released: "14 Oct 1994",
    writer: "Stephen King, Frank Darabont",
    metascore: "82",
    aliases: ["shawshank", "shawshank redemption", "the shawshank redemption", "побег", "шоушенк"],
  },
  {
    imdbID: "tt0068646",
    type: "movie",
    year: "1972",
    poster: "N/A",
    title: { ru: "Крестный отец", en: "The Godfather" },
    genre: { ru: "Криминал, драма", en: "Crime, Drama" },
    plot: {
      ru: "История семьи Корлеоне и передачи власти внутри влиятельного мафиозного клана.",
      en: "The story of the Corleone family and a transfer of power inside a mafia clan.",
    },
    language: { ru: "Английский, итальянский", en: "English, Italian" },
    country: { ru: "США", en: "USA" },
    runtime: { ru: "175 мин", en: "175 min" },
    director: "Francis Ford Coppola",
    actors: "Marlon Brando, Al Pacino, James Caan",
    awards: "3 Oscars",
    rating: "9.2",
    rated: "R",
    released: "24 Mar 1972",
    writer: "Mario Puzo, Francis Ford Coppola",
    metascore: "100",
    aliases: ["godfather", "the godfather", "крестный отец", "крёстный отец", "krestnyy otets"],
  },
  {
    imdbID: "tt0468569",
    type: "movie",
    year: "2008",
    poster: "N/A",
    title: { ru: "Темный рыцарь", en: "The Dark Knight" },
    genre: { ru: "Боевик, криминал, драма", en: "Action, Crime, Drama" },
    plot: {
      ru: "Бэтмен сталкивается с Джокером, который проверяет Готэм на прочность и разрушает привычные правила.",
      en: "Batman faces the Joker, whose chaos tests Gotham and breaks every familiar rule.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США, Великобритания", en: "USA, UK" },
    runtime: { ru: "152 мин", en: "152 min" },
    director: "Christopher Nolan",
    actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    awards: "2 Oscars",
    rating: "9.0",
    rated: "PG-13",
    released: "18 Jul 2008",
    writer: "Jonathan Nolan, Christopher Nolan, David S. Goyer",
    metascore: "84",
    aliases: ["dark knight", "the dark knight", "темный рыцарь", "тёмный рыцарь", "бетмен", "batman"],
  },
  {
    imdbID: "tt0109830",
    type: "movie",
    year: "1994",
    poster: "N/A",
    title: { ru: "Форрест Гамп", en: "Forrest Gump" },
    genre: { ru: "Драма, мелодрама", en: "Drama, Romance" },
    plot: {
      ru: "Добрый и прямолинейный Форрест становится свидетелем ключевых событий американской истории.",
      en: "Kind-hearted Forrest witnesses defining moments of American history.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США", en: "USA" },
    runtime: { ru: "142 мин", en: "142 min" },
    director: "Robert Zemeckis",
    actors: "Tom Hanks, Robin Wright, Gary Sinise",
    awards: "6 Oscars",
    rating: "8.8",
    rated: "PG-13",
    released: "06 Jul 1994",
    writer: "Winston Groom, Eric Roth",
    metascore: "82",
    aliases: ["forrest gump", "форрест гамп", "forest gump"],
  },
  {
    imdbID: "tt0110912",
    type: "movie",
    year: "1994",
    poster: "N/A",
    title: { ru: "Криминальное чтиво", en: "Pulp Fiction" },
    genre: { ru: "Криминал, драма", en: "Crime, Drama" },
    plot: {
      ru: "Несколько криминальных историй Лос-Анджелеса переплетаются в ироничной и жесткой манере.",
      en: "Several Los Angeles crime stories intertwine in a sharp, ironic style.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США", en: "USA" },
    runtime: { ru: "154 мин", en: "154 min" },
    director: "Quentin Tarantino",
    actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
    awards: "1 Oscar",
    rating: "8.9",
    rated: "R",
    released: "14 Oct 1994",
    writer: "Quentin Tarantino, Roger Avary",
    metascore: "95",
    aliases: ["pulp fiction", "криминальное чтиво", "chtivo"],
  },
  {
    imdbID: "tt0108778",
    type: "series",
    year: "1994-2004",
    poster: "N/A",
    title: { ru: "Друзья", en: "Friends" },
    genre: { ru: "Комедия, мелодрама", en: "Comedy, Romance" },
    plot: {
      ru: "Шестеро друзей живут в Нью-Йорке, влюбляются, работают, ссорятся и поддерживают друг друга.",
      en: "Six friends in New York fall in love, work, argue and support each other.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США", en: "USA" },
    runtime: { ru: "22 мин", en: "22 min" },
    director: "David Crane, Marta Kauffman",
    actors: "Jennifer Aniston, Courteney Cox, Lisa Kudrow",
    awards: "Emmy winner",
    rating: "8.9",
    rated: "TV-14",
    released: "22 Sep 1994",
    writer: "David Crane, Marta Kauffman",
    metascore: "N/A",
    totalSeasons: "10",
    aliases: ["friends", "друзья", "druzya"],
  },
  {
    imdbID: "tt0903747",
    type: "series",
    year: "2008-2013",
    poster: "N/A",
    title: { ru: "Во все тяжкие", en: "Breaking Bad" },
    genre: { ru: "Криминал, драма, триллер", en: "Crime, Drama, Thriller" },
    plot: {
      ru: "Учитель химии после тяжелого диагноза начинает производство запрещенных веществ, чтобы обеспечить семью.",
      en: "A chemistry teacher turns to crime after a terminal diagnosis to provide for his family.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США", en: "USA" },
    runtime: { ru: "49 мин", en: "49 min" },
    director: "Vince Gilligan",
    actors: "Bryan Cranston, Aaron Paul, Anna Gunn",
    awards: "16 Emmy Awards",
    rating: "9.5",
    rated: "TV-MA",
    released: "20 Jan 2008",
    writer: "Vince Gilligan",
    metascore: "N/A",
    totalSeasons: "5",
    aliases: ["breaking bad", "во все тяжкие", "vo vse tyazhkie"],
  },
  {
    imdbID: "tt0944947",
    type: "series",
    year: "2011-2019",
    poster: "N/A",
    title: { ru: "Игра престолов", en: "Game of Thrones" },
    genre: { ru: "Драма, фэнтези, приключения", en: "Drama, Fantasy, Adventure" },
    plot: {
      ru: "Благородные дома Вестероса борются за власть, пока с севера приближается древняя угроза.",
      en: "Noble houses of Westeros fight for power while an ancient threat rises in the North.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США, Великобритания", en: "USA, UK" },
    runtime: { ru: "57 мин", en: "57 min" },
    director: "David Benioff, D. B. Weiss",
    actors: "Emilia Clarke, Kit Harington, Peter Dinklage",
    awards: "59 Emmy Awards",
    rating: "9.2",
    rated: "TV-MA",
    released: "17 Apr 2011",
    writer: "David Benioff, D. B. Weiss, George R. R. Martin",
    metascore: "N/A",
    totalSeasons: "8",
    aliases: ["game of thrones", "игра престолов", "igra prestolov"],
  },
  {
    imdbID: "tt4154796",
    type: "movie",
    year: "2019",
    poster: "N/A",
    title: { ru: "Мстители: Финал", en: "Avengers: Endgame" },
    genre: { ru: "Боевик, приключения, драма", en: "Action, Adventure, Drama" },
    plot: {
      ru: "Оставшиеся Мстители пытаются отменить последствия щелчка Таноса и вернуть исчезнувших.",
      en: "The remaining Avengers attempt to undo Thanos' snap and bring back those who vanished.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США", en: "USA" },
    runtime: { ru: "181 мин", en: "181 min" },
    director: "Anthony Russo, Joe Russo",
    actors: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    awards: "Oscar nomination",
    rating: "8.4",
    rated: "PG-13",
    released: "26 Apr 2019",
    writer: "Christopher Markus, Stephen McFeely",
    metascore: "78",
    aliases: ["avengers", "endgame", "avengers endgame", "мстители", "финал"],
  },
  {
    imdbID: "tt7286456",
    type: "movie",
    year: "2019",
    poster: "N/A",
    title: { ru: "Джокер", en: "Joker" },
    genre: { ru: "Криминал, драма, триллер", en: "Crime, Drama, Thriller" },
    plot: {
      ru: "Одинокий комик Артур Флек постепенно превращается в символ городского хаоса.",
      en: "A lonely comedian named Arthur Fleck gradually becomes a symbol of urban chaos.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США, Канада", en: "USA, Canada" },
    runtime: { ru: "122 мин", en: "122 min" },
    director: "Todd Phillips",
    actors: "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
    awards: "2 Oscars",
    rating: "8.4",
    rated: "R",
    released: "04 Oct 2019",
    writer: "Todd Phillips, Scott Silver",
    metascore: "59",
    aliases: ["joker", "джокер", "dzhoker"],
  },
  {
    imdbID: "tt1160419",
    type: "movie",
    year: "2021",
    poster: "N/A",
    title: { ru: "Дюна", en: "Dune" },
    genre: { ru: "Фантастика, приключения, драма", en: "Sci-Fi, Adventure, Drama" },
    plot: {
      ru: "Пол Атрейдес отправляется на опасную планету Арракис, где решается судьба его семьи и империи.",
      en: "Paul Atreides travels to Arrakis, where the fate of his family and empire is decided.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "США, Канада", en: "USA, Canada" },
    runtime: { ru: "155 мин", en: "155 min" },
    director: "Denis Villeneuve",
    actors: "Timothee Chalamet, Rebecca Ferguson, Zendaya",
    awards: "6 Oscars",
    rating: "8.0",
    rated: "PG-13",
    released: "22 Oct 2021",
    writer: "Jon Spaihts, Denis Villeneuve, Eric Roth",
    metascore: "74",
    aliases: ["dune", "дюна", "dyuna"],
  },
  {
    imdbID: "tt1475582",
    type: "series",
    year: "2010-2017",
    poster: "N/A",
    title: { ru: "Шерлок", en: "Sherlock" },
    genre: { ru: "Криминал, драма, детектив", en: "Crime, Drama, Mystery" },
    plot: {
      ru: "Современная версия историй о Шерлоке Холмсе и докторе Ватсоне в Лондоне.",
      en: "A modern take on Sherlock Holmes and Doctor Watson in London.",
    },
    language: { ru: "Английский", en: "English" },
    country: { ru: "Великобритания, США", en: "UK, USA" },
    runtime: { ru: "88 мин", en: "88 min" },
    director: "Mark Gatiss, Steven Moffat",
    actors: "Benedict Cumberbatch, Martin Freeman, Una Stubbs",
    awards: "Emmy winner",
    rating: "9.1",
    rated: "TV-14",
    released: "24 Oct 2010",
    writer: "Mark Gatiss, Steven Moffat",
    metascore: "N/A",
    totalSeasons: "4",
    aliases: ["sherlock", "шерлок"],
  },
];

const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ы: "y", э: "e", ю: "yu", я: "ya", ь: "", ъ: "",
};

const QUERY_TRANSLATIONS: Record<string, string> = Object.fromEntries(
  LOCAL_MOVIES.flatMap((movie) => movie.aliases.map((alias) => [normalizeText(alias), movie.title.en]))
);

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^\p{L}\p{N}\s:-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function translit(value: string): string {
  return normalizeText(value)
    .split("")
    .map((char) => TRANSLIT[char] ?? char)
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function translateQuery(query: string): string {
  const normalized = normalizeText(query);
  if (QUERY_TRANSLATIONS[normalized]) return QUERY_TRANSLATIONS[normalized];

  const found = Object.entries(QUERY_TRANSLATIONS).find(([alias]) => normalized.includes(alias) || alias.includes(normalized));
  return found ? found[1] : translit(query) || query.trim();
}

function matchesType(movie: LocalMovie | MovieSummary, type: FilterType): boolean {
  const movieType = "type" in movie ? movie.type : movie.Type;
  return type === "all" || movieType === type;
}

function toSummary(movie: LocalMovie, lang: Lang): MovieSummary {
  return {
    imdbID: movie.imdbID,
    Title: movie.title[lang],
    Year: movie.year,
    Type: movie.type,
    Poster: movie.poster,
    imdbRating: movie.rating,
  };
}

function toDetail(movie: LocalMovie, lang: Lang): MovieDetail {
  return {
    ...toSummary(movie, lang),
    Genre: movie.genre[lang],
    Director: movie.director,
    Actors: movie.actors,
    Plot: movie.plot[lang],
    Language: movie.language[lang],
    Country: movie.country[lang],
    Awards: movie.awards,
    imdbRating: movie.rating,
    Runtime: movie.runtime[lang],
    Rated: movie.rated,
    Released: movie.released,
    Writer: movie.writer,
    Metascore: movie.metascore,
    totalSeasons: movie.totalSeasons,
  };
}

function searchLocalMovies(query: string, type: FilterType, page: number, lang: Lang) {
  const normalized = normalizeText(query);
  const latinQuery = translit(query);
  const translated = normalizeText(translateQuery(query));
  const hasQuery = normalized.length > 0;

  const matches = LOCAL_MOVIES
    .filter((movie) => matchesType(movie, type))
    .filter((movie) => {
      if (!hasQuery) return true;
      const haystack = normalizeText([
        movie.title.ru,
        movie.title.en,
        movie.year,
        movie.type,
        movie.genre.ru,
        movie.genre.en,
        ...movie.aliases,
      ].join(" "));
      const latinHaystack = translit(haystack);
      return (
        haystack.includes(normalized) ||
        haystack.includes(translated) ||
        latinHaystack.includes(latinQuery) ||
        latinHaystack.includes(translated)
      );
    });

  const start = (page - 1) * PAGE_SIZE;
  return {
    movies: matches.slice(start, start + PAGE_SIZE).map((movie) => toSummary(movie, lang)),
    total: matches.length,
  };
}

function localizeOmdbMovie(movie: MovieSummary, lang: Lang): MovieSummary {
  const local = LOCAL_MOVIES.find((item) => item.imdbID === movie.imdbID);
  return local ? toSummary(local, lang) : movie;
}

export async function searchMovies(
  query: string,
  type: FilterType,
  page: number,
  lang: Lang
): Promise<{ movies: MovieSummary[]; total: number }> {
  const localResult = searchLocalMovies(query, type, page, lang);
  const key = getApiKey();
  const isCatalogRequest = !query.trim();

  if (isCatalogRequest) return localResult;

  if (key) {
    try {
      const params = new URLSearchParams({
        apikey: key,
        s: translateQuery(query),
        page: String(page),
      });
      if (type !== "all") params.set("type", type);

      const res = await fetch(`${BASE}?${params}`);
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data: SearchResponse = await res.json();

      if (data.Response !== "False") {
        return {
          movies: (data.Search || []).map((movie) => localizeOmdbMovie(movie, lang)),
          total: parseInt(data.totalResults || "0", 10),
        };
      }
    } catch {
      if (localResult.total > 0) return localResult;
      throw new Error(
        lang === "ru"
          ? "Не удалось получить ответ OMDb. Проверьте API ключ или интернет-соединение."
          : "OMDb did not respond. Check the API key or internet connection."
      );
    }
  }

  if (localResult.total > 0) return localResult;

  if (!key) {
    throw new Error(
      lang === "ru"
        ? "Добавьте OMDb API ключ в настройках или попробуйте: матрица, интерстеллар, друзья, дюна."
        : "Add an OMDb API key in settings or try: matrix, interstellar, friends, dune."
    );
  }

  throw new Error(
    lang === "ru"
      ? "Ничего не найдено. Попробуйте русское или английское название фильма."
      : "Nothing found. Try the Russian or English movie title."
  );
}

export async function fetchMovieById(id: string, lang: Lang): Promise<MovieDetail> {
  const localMovie = LOCAL_MOVIES.find((movie) => movie.imdbID === id);
  if (localMovie) return toDetail(localMovie, lang);

  const key = getApiKey();
  if (!key) {
    throw new Error(
      lang === "ru"
        ? "Добавьте OMDb API ключ в настройках, чтобы открыть карточку этого фильма."
        : "Add an OMDb API key in settings to open this movie page."
    );
  }

  const params = new URLSearchParams({ apikey: key, i: id, plot: "full" });
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`Network error: ${res.status}`);
  const data = await res.json();
  if (data.Response === "False") {
    throw new Error(data.Error || (lang === "ru" ? "Фильм не найден." : "Movie not found."));
  }
  return data as MovieDetail;
}
