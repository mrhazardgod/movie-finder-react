import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main id="not-found-page" className="not-found-page" data-edit-id="not-found-page">
      <p id="not-found-code" className="not-found-code" data-edit-id="not-found-code">404</p>
      <h1 id="not-found-title" className="not-found-title" data-edit-id="not-found-title">Страница не найдена</h1>
      <p id="not-found-subtitle" className="not-found-subtitle" data-edit-id="not-found-subtitle">
        Такой страницы нет, но главная всегда рядом.
      </p>
      <Link to="/" id="go-home-button" className="go-home-btn" data-edit-id="go-home-button">На главную</Link>
    </main>
  );
}
