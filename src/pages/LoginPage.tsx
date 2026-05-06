import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AuthUser } from "../App";

interface Props {
  user: AuthUser | null;
  onLogin: (user: AuthUser) => void;
}

export default function LoginPage({ user, onLogin }: Props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    const cleanName = name.trim() || cleanEmail.split("@")[0] || "Пользователь";

    if (!cleanEmail.includes("@")) {
      setError("Введите корректный email.");
      return;
    }

    if (password.trim().length < 4) {
      setError("Пароль должен быть не короче 4 символов.");
      return;
    }

    onLogin({ name: cleanName, email: cleanEmail });
    navigate("/");
  };

  if (user) {
    return (
      <main className="login-page" data-edit-id="login-page">
        <section className="login-card" data-edit-id="login-card">
          <p className="eyebrow" data-edit-id="login-eyebrow">Аккаунт</p>
          <h1 data-edit-id="login-title">Вы уже вошли</h1>
          <p className="login-copy" data-edit-id="login-copy">
            Сейчас активен профиль {user.name}. Можно возвращаться к поиску и сохранять фильмы в избранное.
          </p>
          <Link className="go-home-btn" to="/" data-edit-id="login-home-link">
            На главную
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="login-page" data-edit-id="login-page">
      <section className="login-card" data-edit-id="login-card">
        <p className="eyebrow" data-edit-id="login-eyebrow">Личный кабинет</p>
        <h1 data-edit-id="login-title">Вход в КиноFinder</h1>
        <p className="login-copy" data-edit-id="login-copy">
          Войдите, чтобы сохранять избранные фильмы и быстро возвращаться к ним с этого устройства.
        </p>

        <form className="login-form" onSubmit={handleSubmit} data-edit-id="login-form">
          <label data-edit-id="login-name-label">
            Имя
            <input
              type="text"
              placeholder="Например, Алексей"
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
            Пароль
            <input
              type="password"
              placeholder="Минимум 4 символа"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              data-edit-id="login-password-input"
            />
          </label>
          {error && <p className="form-error" data-edit-id="login-error">{error}</p>}
          <button className="login-submit" type="submit" data-edit-id="login-submit">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}
