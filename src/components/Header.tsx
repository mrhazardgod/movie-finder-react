import { NavLink, Link } from "react-router-dom";
import type { AuthUser } from "../App";

interface Props {
  favCount: number;
  user: AuthUser | null;
  onLogout: () => void;
  onSettingsToggle: () => void;
}

export default function Header({ favCount, user, onLogout, onSettingsToggle }: Props) {
  return (
    <header id="main-header" className="main-header" data-edit-id="main-header">
      <div className="header-inner">
        <Link to="/" id="header-logo" className="header-logo" data-edit-id="header-logo">
          <span>КиноFinder</span>
        </Link>
        <nav className="header-nav" data-edit-id="header-nav">
          <NavLink
            to="/"
            end
            id="nav-home"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            data-edit-id="nav-link-home"
          >
            Главная
          </NavLink>
          <NavLink
            to="/favorites"
            id="nav-favorites"
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            data-edit-id="nav-link-favorites"
          >
            Избранное
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
                Выйти
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              id="nav-login"
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              data-edit-id="nav-link-login"
            >
              Войти
            </NavLink>
          )}
          <button
            id="settings-toggle-button"
            className="settings-btn"
            onClick={onSettingsToggle}
            aria-label="Настройки"
            data-edit-id="settings-toggle-button"
          >
            API
          </button>
        </nav>
      </div>
    </header>
  );
}
