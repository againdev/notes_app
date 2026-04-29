import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import NotesPage from "./pages/NotesPage";
import PostsPage from "./pages/PostsPage";

const THEME_KEY = "notes-app-theme";

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === "dark" || saved === "light" ? saved : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="app-root" data-theme={theme}>
        <Routes>
          <Route
            element={<Layout theme={theme} onThemeChange={setTheme} />}
          >
            <Route path="/" element={<NotesPage />} />
            <Route path="/posts" element={<PostsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
