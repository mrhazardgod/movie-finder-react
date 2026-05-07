import { NavLink, Link } from "react-router-dom";
import type { AuthUser } from "../App";
import type { Lang } from "../types";

interface Props {
  favCount: number;
  user: AuthUser | null;
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  onLogout: () => void;
  onSettingsToggle: () => void;
}

const copy = {
  ru: {
    logo: "КиноFinder",
    home: "Главная",
    favorites: "Избранное",
    login: "Войти",
    logout: "Выйти",
    settings: "Настройки API",
  },
  en: {
    logo: "MovieFinder",
    home: "Home",
    favorites: "Favorites",
    login: "Sign in",
    logout: "Logout",
    settings: "API settings",
  },
};

export default function Header({ favCount, user, lang, onLanguageChange, onLogout, onSettingsToggle }: Props) {
  const t = copy[lang];

  return (
    <header id="main-header" className="main-header" data-edit-id="main-header">
      <div className="header-inner">
        <Link to="/" id="header-logo" className="header-logo" data-edit-id="header-logo">
          <span>{t.logo}</span>
        </Link>
        <nav className="header-nav" data-edit-id="header-nav">
          <NavLink
            to="/"
            end
            id="nav-home"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            data-edit-id="nav-link-home"
          >
            {t.home}
          </NavLink>
          <NavLink
            to="/favorites"
            id="nav-favorites"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            data-edit-id="nav-link-favorites"
          >
            {t.favorites}
            {favCount > 0 && (
              <span id="favorites-badge" className="fav-badge" data-edit-id="favorites-badge">
                {favCount}
              </span>
            )}
          </NavLink>
          {user ? (
            <div className="auth-actions" data-edit-id="auth-actions">
              <span className="user-pill" title={user.email} data-edit-id="user-pill">
                {user.name}
              </span>
              <button className="logout-btn" onClick={onLogout} data-edit-id="logout-button">
                {t.logout}
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              id="nav-login"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              data-edit-id="nav-link-login"
            >
              {t.login}
            </NavLink>
          )}
          <div className="language-toggle" aria-label="Language" data-edit-id="language-toggle">
            <button
              type="button"
              className={`lang-btn${lang === "ru" ? " active" : ""}`}
              onClick={() => onLanguageChange("ru")}
              data-edit-id="language-ru"
            >
              RU
            </button>
            <button
              type="button"
              className={`lang-btn${lang === "en" ? " active" : ""}`}
              onClick={() => onLanguageChange("en")}
              data-edit-id="language-en"
            >
              EN
            </button>
          </div>
          <button
            id="settings-toggle-button"
            className="settings-btn"
            onClick={onSettingsToggle}
            aria-label={t.settings}
            title={t.settings}
            data-edit-id="settings-toggle-button"
          >
            API
          </button>
        </nav>
      </div>
    </header>
  );
}
