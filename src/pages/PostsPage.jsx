import React, { useState, useEffect } from "react";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=15";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(POSTS_URL);
        if (!res.ok) {
          throw new Error(`Ошибка HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!cancelled) {
          setPosts(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Не удалось загрузить посты");
          setPosts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = posts.filter(
    (p) =>
      String(p.title).toLowerCase().includes(query.toLowerCase()) ||
      String(p.body).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <h1>Посты из API</h1>
      <p className="posts-intro">
        Данные загружаются методом <code>fetch</code> с сервиса JSONPlaceholder
        при открытии этой страницы.
      </p>

      <div className="posts-toolbar">
        <label className="posts-search-label" htmlFor="posts-filter">
          Фильтр постов
        </label>
        <input
          id="posts-filter"
          className="posts-search-input"
          type="search"
          placeholder="Поиск по заголовку или тексту…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p className="posts-status">Загрузка…</p>}
      {error && (
        <p className="posts-status posts-status--error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="posts-status">Нет постов, подходящих под запрос.</p>
      )}

      <ul className="posts-list">
        {filtered.map((post) => (
          <li key={post.id} className="posts-list__item">
            <span className="posts-list__id">#{post.id}</span>
            <h2 className="posts-list__title">{post.title}</h2>
            <p className="posts-list__body">{post.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostsPage;
