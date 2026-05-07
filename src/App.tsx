import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import { useFavorites } from "./hooks/useFavorites";
import type { Lang } from "./types";

export interface AuthUser {
  name: string;
  email: string;
}

const USER_KEY = "moviefinder_user";
const LANG_KEY = "moviefinder_lang";

function readStoredUser(): AuthUser | null {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null") as AuthUser | null;
  } catch {
    return null;
  }
}

function readStoredLang(): Lang {
  return localStorage.getItem(LANG_KEY) === "en" ? "en" : "ru";
}

export default function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);
  const [lang, setLang] = useState<Lang>(readStoredLang);
  const { favorites, toggleFavorite, removeOne, clearAll, checkFav } = useFavorites();

  const handleLogin = (nextUser: AuthUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const handleLangChange = (nextLang: Lang) => {
    localStorage.setItem(LANG_KEY, nextLang);
    setLang(nextLang);
  };

  return (
    <>
      <Header
        favCount={favorites.length}
        user={user}
        lang={lang}
        onLanguageChange={handleLangChange}
        onLogout={handleLogout}
        onSettingsToggle={() => setShowSettings((value) => !value)}
      />
      {showSettings && (
        <SettingsPanel
          lang={lang}
          onClose={() => setShowSettings(false)}
          onSaved={() => setShowSettings(false)}
        />
      )}
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<HomePage lang={lang} checkFav={checkFav} onToggleFav={toggleFavorite} />} />
          <Route path="/login" element={<LoginPage lang={lang} user={user} onLogin={handleLogin} />} />
          <Route path="/movie/:id" element={<MovieDetailPage lang={lang} checkFav={checkFav} onToggleFav={toggleFavorite} />} />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                lang={lang}
                favorites={favorites}
                checkFav={checkFav}
                onToggleFav={toggleFavorite}
                onRemove={removeOne}
                onClearAll={clearAll}
              />
            }
          />
          <Route path="*" element={<NotFoundPage lang={lang} />} />
        </Routes>
      </div>
    </>
  );
}
