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
      alert("Title and text cannot be empty.");
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
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="note-content">
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            {note.important && <span className="badge">Important</span>}
          </div>

          <div className="note-actions">
            <button onClick={() => handleToggleImportant(note.id)}>
              {note.important ? "Unmark" : "Important"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default NoteItem;
