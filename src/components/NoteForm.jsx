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
        placeholder="Enter note title..."
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />

      <textarea
        placeholder="Enter note text..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default NoteForm;
