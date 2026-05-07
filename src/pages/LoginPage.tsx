import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AuthUser } from "../App";
import type { Lang } from "../types";

interface Props {
  lang: Lang;
  user: AuthUser | null;
  onLogin: (user: AuthUser) => void;
}

const copy = {
  ru: {
    fallbackName: "Пользователь",
    badEmail: "Введите корректный email.",
    shortPassword: "Пароль должен быть не короче 4 символов.",
    account: "Аккаунт",
    already: "Вы уже вошли",
    active: (name: string) => `Сейчас активен профиль ${name}. Можно возвращаться к поиску и сохранять фильмы в избранное.`,
    home: "На главную",
    cabinet: "Личный кабинет",
    title: "Вход в КиноFinder",
    copy: "Войдите, чтобы сохранять избранные фильмы и быстро возвращаться к ним с этого устройства.",
    name: "Имя",
    namePlaceholder: "Например, Алексей",
    password: "Пароль",
    passwordPlaceholder: "Минимум 4 символа",
    submit: "Войти",
  },
  en: {
    fallbackName: "User",
    badEmail: "Enter a valid email.",
    shortPassword: "Password must be at least 4 characters.",
    account: "Account",
    already: "You are already signed in",
    active: (name: string) => `${name}'s profile is active. You can return to search and save movies.`,
    home: "Home",
    cabinet: "Personal account",
    title: "Sign in to MovieFinder",
    copy: "Sign in to save favorite movies and quickly return to them on this device.",
    name: "Name",
    namePlaceholder: "For example, Alex",
    password: "Password",
    passwordPlaceholder: "Minimum 4 characters",
    submit: "Sign in",
  },
};

export default function LoginPage({ lang, user, onLogin }: Props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const t = copy[lang];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    const cleanName = name.trim() || cleanEmail.split("@")[0] || t.fallbackName;

    if (!cleanEmail.includes("@")) {
      setError(t.badEmail);
      return;
    }

    if (password.trim().length < 4) {
      setError(t.shortPassword);
      return;
    }

    onLogin({ name: cleanName, email: cleanEmail });
    navigate("/");
  };

  if (user) {
    return (
      <main className="login-page" data-edit-id="login-page">
        <section className="login-card" data-edit-id="login-card">
          <p className="eyebrow" data-edit-id="login-eyebrow">{t.account}</p>
          <h1 data-edit-id="login-title">{t.already}</h1>
          <p className="login-copy" data-edit-id="login-copy">{t.active(user.name)}</p>
          <Link className="go-home-btn" to="/" data-edit-id="login-home-link">{t.home}</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="login-page" data-edit-id="login-page">
      <section className="login-card" data-edit-id="login-card">
        <p className="eyebrow" data-edit-id="login-eyebrow">{t.cabinet}</p>
        <h1 data-edit-id="login-title">{t.title}</h1>
        <p className="login-copy" data-edit-id="login-copy">{t.copy}</p>

        <form className="login-form" onSubmit={handleSubmit} data-edit-id="login-form">
          <label data-edit-id="login-name-label">
            {t.name}
            <input
              type="text"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(event) => setName(event.target.value)}
              data-edit-id="login-name-input"
            />
          </label>
          <label data-edit-id="login-email-label">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              data-edit-id="login-email-input"
            />
          </label>
          <label data-edit-id="login-password-label">
            {t.password}
            <input
              type="password"
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              data-edit-id="login-password-input"
            />
          </label>
          {error && <p className="form-error" data-edit-id="login-error">{error}</p>}
          <button className="login-submit" type="submit" data-edit-id="login-submit">
            {t.submit}
          </button>
        </form>
      </section>
    </main>
  );
}
