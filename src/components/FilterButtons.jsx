import React from "react";

function FilterButtons({ currentFilter, setCurrentFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => setCurrentFilter("all")}
      >
        Все
      </button>

      <button
        className={currentFilter === "important" ? "active" : ""}
        onClick={() => setCurrentFilter("important")}
      >
        Важные
      </button>

      <button
        className={currentFilter === "normal" ? "active" : ""}
        onClick={() => setCurrentFilter("normal")}
      >
        Обычные
      </button>
    </div>
  );
}

export default FilterButtons;
