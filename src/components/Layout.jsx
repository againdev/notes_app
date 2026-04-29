import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Layout({ theme, onThemeChange }) {
  const toggleTheme = () => {
    onThemeChange(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="main-nav" aria-label="Основная навигация">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Заметки
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            Посты (API)
          </NavLink>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === "light"
              ? "Переключить на тёмную тему"
              : "Переключить на светлую тему"
          }
        >
          {theme === "light" ? "Тёмная тема" : "Светлая тема"}
        </button>
      </header>
      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
