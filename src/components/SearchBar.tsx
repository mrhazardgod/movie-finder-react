import { useState, useEffect, useRef } from "react";
import type { FilterType, Lang, SortType } from "../types";

interface Props {
  lang: Lang;
  onSearch: (q: string, f: FilterType) => void;
  onSortChange: (s: SortType) => void;
  sort: SortType;
  filter: FilterType;
}

const copy = {
  ru: {
    placeholder: "Введите название или оставьте пустым для каталога...",
    search: "Показать",
    catalog: "Весь каталог",
    top: "Топ рейтинга",
    newest: "Новинки",
    all: "Все типы",
    movies: "Фильмы",
    series: "Сериалы",
    episodes: "Эпизоды",
    sortDefault: "Сортировка: как в каталоге",
    yearAsc: "Дата: сначала старые",
    yearDesc: "Дата: сначала новые",
    ratingAsc: "Рейтинг: сначала низкий",
    ratingDesc: "Рейтинг: сначала высокий",
    titleAz: "Название: А-Я",
    titleZa: "Название: Я-А",
  },
  en: {
    placeholder: "Search a title or leave empty for the catalog...",
    search: "Show",
    catalog: "Full catalog",
    top: "Top rated",
    newest: "Newest",
    all: "All types",
    movies: "Movies",
    series: "Series",
    episodes: "Episodes",
    sortDefault: "Sort: catalog order",
    yearAsc: "Date: oldest first",
    yearDesc: "Date: newest first",
    ratingAsc: "Rating: lowest first",
    ratingDesc: "Rating: highest first",
    titleAz: "Title: A-Z",
    titleZa: "Title: Z-A",
  },
};

export default function SearchBar({ lang, onSearch, onSortChange, sort, filter }: Props) {
  const [query, setQuery] = useState("");
  const [localFilter, setLocalFilter] = useState<FilterType>(filter);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = copy[lang];

  useEffect(() => {
    if (!query.trim()) return;
    debounceRef.current && clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(query, localFilter), 400);
    return () => {
      debounceRef.current && clearTimeout(debounceRef.current);
    };
  }, [query, localFilter, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debounceRef.current && clearTimeout(debounceRef.current);
    onSearch(query, localFilter);
  };

  const showCatalog = (nextSort: SortType) => {
    debounceRef.current && clearTimeout(debounceRef.current);
    setQuery("");
    onSortChange(nextSort);
    onSearch("", localFilter);
  };

  return (
    <div id="search-panel" className="search-panel" data-edit-id="search-panel">
      <form className="search-form" onSubmit={handleSubmit} data-edit-id="search-form">
        <input
          id="search-input"
          className="search-input"
          type="text"
          placeholder={t.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-edit-id="search-input"
        />
        <button id="search-button" className="search-button" type="submit" data-edit-id="search-button">
          {t.search}
        </button>
      </form>
      <div id="filter-bar" className="filter-bar" data-edit-id="filter-bar">
        <select
          id="filter-type"
          className="filter-select"
          value={localFilter}
          onChange={(e) => setLocalFilter(e.target.value as FilterType)}
          data-edit-id="filter-type-select"
        >
          <option value="all">{t.all}</option>
          <option value="movie">{t.movies}</option>
          <option value="series">{t.series}</option>
          <option value="episode">{t.episodes}</option>
        </select>
        <select
          id="sort-select"
          className="filter-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          data-edit-id="sort-select"
        >
          <option value="default">{t.sortDefault}</option>
          <option value="rating_desc">{t.ratingDesc}</option>
          <option value="year_desc">{t.yearDesc}</option>
          <option value="year_asc">{t.yearAsc}</option>
          <option value="rating_asc">{t.ratingAsc}</option>
          <option value="title_az">{t.titleAz}</option>
          <option value="title_za">{t.titleZa}</option>
        </select>
      </div>
      <div className="quick-filter-row" data-edit-id="quick-filter-row">
        <button type="button" className="quick-filter-btn" onClick={() => showCatalog("default")} data-edit-id="quick-catalog">
          {t.catalog}
        </button>
        <button type="button" className="quick-filter-btn" onClick={() => showCatalog("rating_desc")} data-edit-id="quick-top-rated">
          {t.top}
        </button>
        <button type="button" className="quick-filter-btn" onClick={() => showCatalog("year_desc")} data-edit-id="quick-newest">
          {t.newest}
        </button>
      </div>
    </div>
  );
}
