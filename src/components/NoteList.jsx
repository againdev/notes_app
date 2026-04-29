import React from "react";
import NoteItem from "./NoteItem";

function NoteList({
  notes,
  handleDeleteNote,
  handleToggleImportant,
  handleEditNote,
}) {
  if (notes.length === 0) {
    return <p className="empty-message">Заметок не найдено.</p>;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          handleDeleteNote={handleDeleteNote}
          handleToggleImportant={handleToggleImportant}
          handleEditNote={handleEditNote}
        />
      ))}
    </div>
  );
}

export default NoteList;
