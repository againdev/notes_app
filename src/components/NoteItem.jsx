import React, { useState } from "react";

function NoteItem({
  note,
  handleDeleteNote,
  handleToggleImportant,
  handleEditNote,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editText, setEditText] = useState(note.text);

  const saveEdit = () => {
    if (editTitle.trim() === "" || editText.trim() === "") {
      alert("Заголовок и текст не могут быть пустыми.");
      return;
    }

    handleEditNote(note.id, editTitle, editText);
    setIsEditing(false);
  };

  return (
    <div className={`note-item ${note.important ? "important" : ""}`}>
      {isEditing ? (
        <div className="edit-block">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <div className="note-actions">
            <button onClick={saveEdit}>Сохранить</button>
            <button onClick={() => setIsEditing(false)}>Отмена</button>
          </div>
        </div>
      ) : (
        <>
          <div className="note-content">
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            {note.important && <span className="badge">Важно</span>}
          </div>

          <div className="note-actions">
            <button onClick={() => handleToggleImportant(note.id)}>
              {note.important ? "Снять важность" : "Пометить важным"}
            </button>
            <button onClick={() => setIsEditing(true)}>Изменить</button>
            <button onClick={() => handleDeleteNote(note.id)}>Удалить</button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteItem;
