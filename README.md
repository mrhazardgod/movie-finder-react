# Generated project

## Source request

# React Movie Search App — Implementation Brief

---

## 1. Product Goal

Создать полноценное веб-приложение для поиска фильмов с использованием React + TypeScript + Vite + React Router. Приложение должно выглядеть как продакшн-проект: аккуратный UI, обработанные edge-cases, адаптивная вёрстка, чистая архитектура. Цель — портфолио-проект уровня junior frontend, демонстрирующий работу с API, роутингом, TypeScript, localStorage и компонентным подходом.

---

## 2. Target Users and Main Scenarios

**Основной пользователь:** человек, который хочет найти информацию о фильме по названию.

**Сценарий 1 — Поиск фильма:**
Пользователь вводит название фильма в строку поиска → нажимает Enter или кнопку Search → видит список карточек с результатами → кликает на карточку → попадает на страницу деталей.

**Сценарий 2 — Избранное:**
Пользователь на карточке или странице деталей нажимает «Add to Favorites» → фильм сохраняется в localStorage → пользователь переходит на `/favorites` → видит сохранённые фильмы → может удалить любой.

**Сценарий 3 — Прямой переход по URL:**
Пользователь открывает `/movie/:id` напрямую → приложение делает запрос по id → отображает детали. Открывает несуществующий маршрут → видит страницу 404 с кнопкой «Go Home».

---

## 3. Must-Have Functionality Checklist

- [ ] Поиск фильмов по названию через OMDb API
- [ ] Debounce при вводе (300–500 мс) — дополнительно к поиску по кнопке/Enter
- [ ] Запрос не отправляется при пустом поле
- [ ] Отображение списка найденных фильмов в виде карточек
- [ ] Кнопка «Load More» / пагинация (постраничная загрузка через OMDb `page` param)
- [ ] Фильтрация результатов по типу: `movie`, `series`, `episode`
- [ ] Сортировка списка по году (ascending/descending) и по названию (A→Z / Z→A)
- [ ] Переход на `/movie/:id` — страница деталей
- [ ] Подробная информация: постер, название, год, жанр, рейтинг, описание, страна, длительность
- [ ] Loader/Skeleton при каждом запросе к API
- [ ] Error state при ошибке запроса или `Response: "False"`
- [ ] Empty state при пустом результате поиска
- [ ] Добавление фильма в избранное (без дублей)
- [ ] Удаление фильма из избранного
- [ ] Сохранение избранного в localStorage
- [ ] Страница `/favorites` с полным списком и возможностью удаления
- [ ] Empty state на странице Favorites
- [ ] Кнопка «Назад» на странице деталей
- [ ] Страница 404 с кнопкой «Go Home»
- [ ] Адаптивная вёрстка: 1 / 2 / 3–4 колонки
- [ ] Конфигурация API-ключа: поле в UI, сохранение в localStorage, fallback на `.env`
- [ ] README с полным описанием проекта
- [ ] `.env` и `.env.example`

---

## 4. Page / Screen Map and Section-by-Section Content

### 4.1 Home Page `/`

**id секции:** `#home-page`

**Секция: Hero/Header area**
- Заголовок приложения (`id="app-title"`) — «🎬 MovieFinder»
- Подзаголовок (`id="app-subtitle"`) — «Search millions of movies and TV shows»

**Секция: Search Panel** (`id="search-panel"`)
- Компонент `SearchBar`: текстовое поле (`id="search-input"`) + кнопка (`id="search-button"`)
- Строка фильтров (`id="filter-bar"`):
  - Dropdown «Type»: All / Movie / Series / Episode (`id="filter-type"`)
  - Dropdown «Sort by»: Default / Year ↑ / Year ↓ / Title A→Z / Title Z→A (`id="sort-select"`)

**Секция: Results Area** (`id="results-area"`)

Состояния (взаимоисключающие):

- **Idle state** (ничего не искали): иллюстрация + текст «Start searching for movies» (`id="idle-state"`)
- **Empty query** (нажал Search с пустым полем): сообщение `Please enter a movie title` (`id="empty-query-state"`)
- **Loading state**: Skeleton-карточки (8 штук) (`id="loading-skeleton"`)
- **Error state**: иконка ошибки + текст ошибки + кнопка Retry (`id="error-state"`)
- **Empty results**: иконка + «No movies found for "query"» (`id="no-results-state"`)
- **Results list**: `MovieList` (`id="movie-list"`)

**Секция: Pagination** (`id="pagination-area"`)
- Кнопка «Load More» (`id="load-more-button"`) — видна, если есть ещё страницы
- Счётчик «Showing X of Y results» (`id="results-counter"`)

---

### 4.2 Movie Details Page `/movie/:id`

**id секции:** `#movie-details-page`

**Секция: Navigation** (`id="details-nav"`)
- Кнопка «← Back» (`id="back-button"`)

**Состояния:**
- **Loading**: Skeleton на всю секцию деталей (`id="details-skeleton"`)
- **Error**: текст ошибки + кнопка «Go Home» (`id="details-error"`)

**Секция: Movie Hero** (`id="movie-hero"`)
- Постер (`id="movie-poster"`) — при `Poster === "N/A"` заглушка `/assets/no-poster.svg`
- Блок метаданных:
  - Название (`id="movie-title"`)
  - Год (`id="movie-year"`)
  - Жанр (`id="movie-genre"`)
  - Страна (`id="movie-country"`)
  - Длительность (`id="movie-runtime"`)
  - Рейтинг IMDb (`id="movie-rating"`) — badge со звёздочкой
  - Тип (`id="movie-type"`) — badge (movie / series / episode)

**Секция: Movie Body** (`id="movie-body"`)
- Описание/Plot (`id="movie-plot"`)

**Секция: Actions** (`id="details-actions"`)
- Кнопка «Add to Favorites» / «Remove from Favorites» (`id="favorite-toggle-button"`)
- Состояние кнопки меняется в зависимости от `isFavorite(imdbID)`

---

### 4.3 Favorites Page `/favorites`

**id секции:** `#favorites-page`

**Секция: Page Header** (`id="favorites-header"`)
- Заголовок «My Favorites» (`id="favorites-title"`)
- Счётчик «X saved films» (`id="favorites-count"`)
- Кнопка «Clear All» (`id="clear-all-button"`) — видна если список не пустой, с confirm-диалогом

**Состояния:**
- **Empty state**: иллюстрация + «You haven't saved any movies yet» + кнопка «Find Movies» (`id="favorites-empty"`)
- **List**: `MovieList` с карточками в режиме favorites (`id="favorites-list"`)

---

### 4.4 Not Found Page `*`

**id секции:** `#not-found-page`

- Большой текст «404» (`id="not-found-code"`)
- Заголовок «Page not found» (`id="not-found-title"`)
- Подтекст «The page you're looking for doesn't exist» (`id="not-found-subtitle"`)
- Кнопка «Go Home» (`id="go-home-button"`)

---

### 4.5 Settings / API Key Panel

**Реализация:** floating settings panel (иконка шестерёнки в Header), которая скрывается после сохранения ключа.

- Поле ввода API ключа (`id="api-key-input"`)
- Кнопка «Save Key» (`id="save-api-key-button"`)
- Статус: «Key saved ✓» или «Missing API key» (`id="api-key-status"`)
- Маленькая кнопка-иконка для переоткрытия (`id="settings-toggle-button"`) — всегда видна в Header

---

## 5. Components and Interactions

### Header (`Header.tsx`)

```
id="main-header"
```

- Логотип/название (`id="header-logo"`) — ссылка на `/`
- Nav: ссылка Home (`id="nav-home"`), ссылка Favorites (`id="nav-favorites"`) с badge-счётчиком избранного (`id="favorites-badge"`)
- Кнопка Settings (`id="settings-toggle-button"`) — иконка шестерёнки
- Активный маршрут подсвечивается через `NavLink`

**Hover/Focus:** nav-ссылки имеют underline-анимацию, кнопка

## Structure

- `.env` - project-local runtime values.
- `.env.example` - safe template for required variables.
- `public/generated-media` - uploaded or generated media.
- `editor_overrides.json` - visual editor overrides for text, styles, position, size, and media.

## Editing notes

Visible elements should keep stable `data-edit-id` attributes so manual edits can be applied without regenerating the whole page.
