import { Link } from "react-router-dom";
import type { Lang } from "../types";

interface Props {
  lang: Lang;
}

const copy = {
  ru: {
    title: "Страница не найдена",
    subtitle: "Такой страницы нет, но главная всегда рядом.",
    home: "На главную",
  },
  en: {
    title: "Page not found",
    subtitle: "This page does not exist, but the home page is nearby.",
    home: "Home",
  },
};

export default function NotFoundPage({ lang }: Props) {
  const t = copy[lang];

  return (
    <main id="not-found-page" className="not-found-page" data-edit-id="not-found-page">
      <p id="not-found-code" className="not-found-code" data-edit-id="not-found-code">404</p>
      <h1 id="not-found-title" className="not-found-title" data-edit-id="not-found-title">{t.title}</h1>
      <p id="not-found-subtitle" className="not-found-subtitle" data-edit-id="not-found-subtitle">{t.subtitle}</p>
      <Link to="/" id="go-home-button" className="go-home-btn" data-edit-id="go-home-button">{t.home}</Link>
    </main>
  );
}
