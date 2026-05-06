import { useState, useEffect, useRef } from "react";
import type { FilterType, SortType } from "../types";

interface Props {
  onSearch: (q: string, f: FilterType) => void;
  onSortChange: (s: SortType) => void;
  sort: SortType;
  filter: FilterType;
}

export default function SearchBar({ onSearch, onSortChange, sort, filter }: Props) {
  const [query, setQuery] = useState("");
  const [localFilter, setLocalFilter] = useState<FilterType>(filter);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!query.trim()) return;
    debounceRef.current && clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(query, localFilter), 400);
    return () => { debounceRef.current && clearTimeout(debounceRef.current); };
  }, [query, localFilter, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debounceRef.current && clearTimeout(debounceRef.current);
    onSearch(query, localFilter);
  };

  return (
    <div id="search-panel" className="search-panel" data-edit-id="search-panel">
      <form className="search-form" onSubmit={handleSubmit} data-edit-id="search-form">
        <input
          id="search-input"
          className="search-input"
          type="text"
          placeholder="Введите название: матрица, интерстеллар, друзья..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-edit-id="search-input"
        />
        <button id="search-button" className="search-button" type="submit" data-edit-id="search-button">
          Искать
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
          <option value="all">Все типы</option>
          <option value="movie">Фильмы</option>
          <option value="series">Сериалы</option>
          <option value="episode">Эпизоды</option>
        </select>
        <select
          id="sort-select"
          className="filter-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          data-edit-id="sort-select"
        >
          <option value="default">Сортировка: по умолчанию</option>
          <option value="year_asc">Год: сначала старые</option>
          <option value="year_desc">Год: сначала новые</option>
          <option value="title_az">Название: А-Я</option>
          <option value="title_za">Название: Я-А</option>
        </select>
      </div>
    </div>
  );
}
