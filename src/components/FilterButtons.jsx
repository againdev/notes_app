import React from "react";

function FilterButtons({ currentFilter, setCurrentFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => setCurrentFilter("all")}
      >
        All
      </button>

      <button
        className={currentFilter === "important" ? "active" : ""}
        onClick={() => setCurrentFilter("important")}
      >
        Important
      </button>

      <button
        className={currentFilter === "normal" ? "active" : ""}
        onClick={() => setCurrentFilter("normal")}
      >
        Normal
      </button>
    </div>
  );
}

export default FilterButtons;
