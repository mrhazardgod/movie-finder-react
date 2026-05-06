import { getApiKey } from "../utils";
import type { MovieSummary, MovieDetail, FilterType } from "../types";

const BASE = "https://www.omdbapi.com/";
const PAGE_SIZE = 10;

interface SearchResponse {
  Search?: MovieSummary[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

interface LocalMovie extends MovieDetail {
  aliases: string[];
}

const LOCAL_MOVIES: LocalMovie[] = [
  {
    imdbID: "tt0133093",
    Title: "Матрица",
    Year: "1999",
    Type: "movie",
    Poster: "N/A",
    Genre: "Фантастика, боевик",
    Director: "Лана Вачовски, Лилли Вачовски",
    Actors: "Киану Ривз, Лоренс Фишберн, Кэрри-Энн Мосс",
    Plot: "Хакер Нео узнает, что привычный мир является симуляцией, и присоединяется к сопротивлению людей.",
    Language: "Английский",
    Country: "США, Австралия",
    Awards: "4 премии Оскар",
    imdbRating: "8.7",
    Runtime: "136 мин",
    Rated: "R",
    Released: "31 Mar 1999",
    Writer: "Лана Вачовски, Лилли Вачовски",
    Metascore: "73",
    aliases: ["matrix", "the matrix", "матрица"],
  },
  {
    imdbID: "tt0816692",
    Title: "Интерстеллар",
    Year: "2014",
    Type: "movie",
    Poster: "N/A",
    Genre: "Фантастика, драма, приключения",
    Director: "Кристофер Нолан",
    Actors: "Мэттью Макконахи, Энн Хэтэуэй, Джессика Честейн",
    Plot: "Группа исследователей отправляется через червоточину, чтобы найти новый дом для человечества.",
    Language: "Английский",
    Country: "США, Великобритания, Канада",
    Awards: "1 премия Оскар",
    imdbRating: "8.7",
    Runtime: "169 мин",
    Rated: "PG-13",
    Released: "07 Nov 2014",
    Writer: "Джонатан Нолан, Кристофер Нолан",
    Metascore: "74",
    aliases: ["interstellar", "интерстеллар"],
  },
  {
    imdbID: "tt1375666",
    Title: "Начало",
    Year: "2010",
    Type: "movie",
    Poster: "N/A",
    Genre: "Фантастика, боевик, триллер",
    Director: "Кристофер Нолан",
    Actors: "Леонардо ДиКаприо, Джозеф Гордон-Левитт, Эллиот Пейдж",
    Plot: "Специалист по внедрению идей во снах получает шанс вернуть прежнюю жизнь через почти невозможное задание.",
    Language: "Английский",
    Country: "США, Великобритания",
    Awards: "4 премии Оскар",
    imdbRating: "8.8",
    Runtime: "148 мин",
    Rated: "PG-13",
    Released: "16 Jul 2010",
    Writer: "Кристофер Нолан",
    Metascore: "74",
    aliases: ["inception", "начало"],
  },
  {
    imdbID: "tt0111161",
    Title: "Побег из Шоушенка",
    Year: "1994",
    Type: "movie",
    Poster: "N/A",
    Genre: "Драма",
    Director: "Фрэнк Дарабонт",
    Actors: "Тим Роббинс, Морган Фриман, Боб Гантон",
    Plot: "Банкир, осужденный за убийство, строит дружбу и надежду в стенах тюрьмы Шоушенк.",
    Language: "Английский",
    Country: "США",
    Awards: "7 номинаций на Оскар",
    imdbRating: "9.3",
    Runtime: "142 мин",
    Rated: "R",
    Released: "14 Oct 1994",
    Writer: "Стивен Кинг, Фрэнк Дарабонт",
    Metascore: "82",
    aliases: ["shawshank redemption", "the shawshank redemption", "побег из шоушенка"],
  },
  {
    imdbID: "tt0068646",
    Title: "Крестный отец",
    Year: "1972",
    Type: "movie",
    Poster: "N/A",
    Genre: "Криминал, драма",
    Director: "Фрэнсис Форд Коппола",
    Actors: "Марлон Брандо, Аль Пачино, Джеймс Каан",
    Plot: "История семьи Корлеоне и передачи власти внутри влиятельного мафиозного клана.",
    Language: "Английский, итальянский",
    Country: "США",
    Awards: "3 премии Оскар",
    imdbRating: "9.2",
    Runtime: "175 мин",
    Rated: "R",
    Released: "24 Mar 1972",
    Writer: "Марио Пьюзо, Фрэнсис Форд Коппола",
    Metascore: "100",
    aliases: ["godfather", "the godfather", "крестный отец"],
  },
  {
    imdbID: "tt0468569",
    Title: "Темный рыцарь",
    Year: "2008",
    Type: "movie",
    Poster: "N/A",
    Genre: "Боевик, криминал, драма",
    Director: "Кристофер Нолан",
    Actors: "Кристиан Бэйл, Хит Леджер, Аарон Экхарт",
    Plot: "Бэтмен сталкивается с Джокером, который проверяет Готэм на прочность и разрушает привычные правила.",
    Language: "Английский",
    Country: "США, Великобритания",
    Awards: "2 премии Оскар",
    imdbRating: "9.0",
    Runtime: "152 мин",
    Rated: "PG-13",
    Released: "18 Jul 2008",
    Writer: "Джонатан Нолан, Кристофер Нолан, Дэвид С. Гойер",
    Metascore: "84",
    aliases: ["dark knight", "the dark knight", "темный рыцарь", "бэтмен"],
  },
  {
    imdbID: "tt0109830",
    Title: "Форрест Гамп",
    Year: "1994",
    Type: "movie",
    Poster: "N/A",
    Genre: "Драма, мелодрама",
    Director: "Роберт Земекис",
    Actors: "Том Хэнкс, Робин Райт, Гэри Синиз",
    Plot: "Добрый и прямолинейный Форрест становится свидетелем ключевых событий американской истории.",
    Language: "Английский",
    Country: "США",
    Awards: "6 премий Оскар",
    imdbRating: "8.8",
    Runtime: "142 мин",
    Rated: "PG-13",
    Released: "06 Jul 1994",
    Writer: "Уинстон Грум, Эрик Рот",
    Metascore: "82",
    aliases: ["forrest gump", "форрест гамп"],
  },
  {
    imdbID: "tt0110912",
    Title: "Криминальное чтиво",
    Year: "1994",
    Type: "movie",
    Poster: "N/A",
    Genre: "Криминал, драма",
    Director: "Квентин Тарантино",
    Actors: "Джон Траволта, Ума Турман, Сэмюэл Л. Джексон",
    Plot: "Несколько криминальных историй Лос-Анджелеса переплетаются в ироничной и жесткой манере.",
    Language: "Английский",
    Country: "США",
    Awards: "1 премия Оскар",
    imdbRating: "8.9",
    Runtime: "154 мин",
    Rated: "R",
    Released: "14 Oct 1994",
    Writer: "Квентин Тарантино, Роджер Эвери",
    Metascore: "95",
    aliases: ["pulp fiction", "криминальное чтиво"],
  },
  {
    imdbID: "tt0108778",
    Title: "Друзья",
    Year: "1994-2004",
    Type: "series",
    Poster: "N/A",
    Genre: "Комедия, мелодрама",
    Director: "Дэвид Крейн, Марта Кауффман",
    Actors: "Дженнифер Энистон, Кортни Кокс, Лиза Кудроу",
    Plot: "Шестеро друзей живут в Нью-Йорке, влюбляются, работают, ссорятся и поддерживают друг друга.",
    Language: "Английский",
    Country: "США",
    Awards: "Премия Emmy",
    imdbRating: "8.9",
    Runtime: "22 мин",
    Rated: "TV-14",
    Released: "22 Sep 1994",
    Writer: "Дэвид Крейн, Марта Кауффман",
    Metascore: "N/A",
    totalSeasons: "10",
    aliases: ["friends", "друзья"],
  },
  {
    imdbID: "tt0903747",
    Title: "Во все тяжкие",
    Year: "2008-2013",
    Type: "series",
    Poster: "N/A",
    Genre: "Криминал, драма, триллер",
    Director: "Винс Гиллиган",
    Actors: "Брайан Крэнстон, Аарон Пол, Анна Ганн",
    Plot: "Учитель химии после тяжелого диагноза начинает производить запрещенные вещества, чтобы обеспечить семью.",
    Language: "Английский",
    Country: "США",
    Awards: "16 премий Emmy",
    imdbRating: "9.5",
    Runtime: "49 мин",
    Rated: "TV-MA",
    Released: "20 Jan 2008",
    Writer: "Винс Гиллиган",
    Metascore: "N/A",
    totalSeasons: "5",
    aliases: ["breaking bad", "во все тяжкие"],
  },
  {
    imdbID: "tt0944947",
    Title: "Игра престолов",
    Year: "2011-2019",
    Type: "series",
    Poster: "N/A",
    Genre: "Драма, фэнтези, приключения",
    Director: "Дэвид Бениофф, Д. Б. Уайсс",
    Actors: "Эмилия Кларк, Кит Харингтон, Питер Динклэйдж",
    Plot: "Благородные дома Вестероса борются за власть, пока с севера приближается древняя угроза.",
    Language: "Английский",
    Country: "США, Великобритания",
    Awards: "59 премий Emmy",
    imdbRating: "9.2",
    Runtime: "57 мин",
    Rated: "TV-MA",
    Released: "17 Apr 2011",
    Writer: "Дэвид Бениофф, Д. Б. Уайсс, Джордж Р. Р. Мартин",
    Metascore: "N/A",
    totalSeasons: "8",
    aliases: ["game of thrones", "игра престолов"],
  },
  {
    imdbID: "tt4154796",
    Title: "Мстители: Финал",
    Year: "2019",
    Type: "movie",
    Poster: "N/A",
    Genre: "Боевик, приключения, драма",
    Director: "Энтони Руссо, Джо Руссо",
    Actors: "Роберт Дауни мл., Крис Эванс, Скарлетт Йоханссон",
    Plot: "Оставшиеся Мстители пытаются отменить последствия щелчка Таноса и вернуть исчезнувших.",
    Language: "Английский",
    Country: "США",
    Awards: "Номинация на Оскар",
    imdbRating: "8.4",
    Runtime: "181 мин",
    Rated: "PG-13",
    Released: "26 Apr 2019",
    Writer: "Кристофер Маркус, Стивен МакФили",
    Metascore: "78",
    aliases: ["avengers", "endgame", "avengers endgame", "мстители", "финал"],
  },
];

const QUERY_TRANSLATIONS: Record<string, string> = {
  "матрица": "the matrix",
  "интерстеллар": "interstellar",
  "начало": "inception",
  "побег из шоушенка": "the shawshank redemption",
  "крестный отец": "the godfather",
  "темный рыцарь": "the dark knight",
  "тёмный рыцарь": "the dark knight",
  "форрест гамп": "forrest gump",
  "криминальное чтиво": "pulp fiction",
  "друзья": "friends",
  "во все тяжкие": "breaking bad",
  "игра престолов": "game of thrones",
  "мстители": "avengers",
  "человек паук": "spider-man",
  "железный человек": "iron man",
  "дюна": "dune",
  "титаник": "titanic",
  "аватар": "avatar",
  "джокер": "joker",
  "шерлок": "sherlock",
  "чернобыль": "chernobyl",
};

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/ё/g, "е").trim();
}

function translateQuery(query: string): string {
  const normalized = normalizeText(query);
  const exact = QUERY_TRANSLATIONS[normalized];
  if (exact) return exact;

  const found = Object.entries(QUERY_TRANSLATIONS).find(([ru]) => normalized.includes(normalizeText(ru)));
  return found ? found[1] : query.trim();
}

function matchesType(movie: MovieSummary, type: FilterType): boolean {
  return type === "all" || movie.Type === type;
}

function toSummary(movie: LocalMovie): MovieSummary {
  return {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Type: movie.Type,
    Poster: movie.Poster,
  };
}

function searchLocalMovies(query: string, type: FilterType, page: number) {
  const normalized = normalizeText(query);
  const translated = normalizeText(translateQuery(query));
  const matches = LOCAL_MOVIES
    .filter((movie) => matchesType(movie, type))
    .filter((movie) => {
      const haystack = normalizeText([movie.Title, movie.Year, movie.Type, ...movie.aliases].join(" "));
      return haystack.includes(normalized) || haystack.includes(translated);
    });

  const start = (page - 1) * PAGE_SIZE;
  return {
    movies: matches.slice(start, start + PAGE_SIZE).map(toSummary),
    total: matches.length,
  };
}

export async function searchMovies(
  query: string,
  type: FilterType,
  page: number
): Promise<{ movies: MovieSummary[]; total: number }> {
  const localResult = searchLocalMovies(query, type, page);
  const key = getApiKey();

  if (key) {
    try {
      const params = new URLSearchParams({
        apikey: key,
        s: translateQuery(query),
        page: String(page),
      });
      if (type !== "all") params.set("type", type);

      const res = await fetch(`${BASE}?${params}`);
      if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`);
      const data: SearchResponse = await res.json();

      if (data.Response !== "False") {
        return {
          movies: data.Search || [],
          total: parseInt(data.totalResults || "0", 10),
        };
      }
    } catch {
      if (localResult.total > 0) return localResult;
      throw new Error("Не удалось получить ответ OMDb. Проверьте ключ API или интернет-соединение.");
    }
  }

  if (localResult.total > 0) return localResult;

  if (!key) {
    throw new Error("Добавьте OMDb API ключ в настройках или попробуйте запросы: матрица, интерстеллар, друзья.");
  }

  throw new Error("Ничего не найдено. Попробуйте русское или английское название фильма.");
}

export async function fetchMovieById(id: string): Promise<MovieDetail> {
  const localMovie = LOCAL_MOVIES.find((movie) => movie.imdbID === id);
  if (localMovie) return localMovie;

  const key = getApiKey();
  if (!key) throw new Error("Добавьте OMDb API ключ в настройках, чтобы открыть карточку этого фильма.");

  const params = new URLSearchParams({ apikey: key, i: id, plot: "full" });
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Фильм не найден.");
  return data as MovieDetail;
}
