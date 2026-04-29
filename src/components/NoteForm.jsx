import React from "react";

function NoteForm({
  titleValue,
  setTitleValue,
  inputValue,
  setInputValue,
  handleAddNote,
}) {
  return (
    <div className="note-form">
      <input
        type="text"
        placeholder="Заголовок заметки…"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />

      <textarea
        placeholder="Текст заметки…"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={handleAddNote}>Добавить заметку</button>
    </div>
  );
}

export default NoteForm;
