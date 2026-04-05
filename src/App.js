import React, { useState } from "react";
import "./App.css";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import FilterButtons from "./components/FilterButtons";

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Study React",
      text: "Learn components, props and state",
      important: true,
    },
    {
      id: 2,
      title: "Go shopping",
      text: "Buy milk, bread and eggs",
      important: false,
    },
  ]);

  const [titleValue, setTitleValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  const handleAddNote = () => {
    if (titleValue.trim() === "" || inputValue.trim() === "") {
      alert("Please fill in both title and note text.");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: titleValue,
      text: inputValue,
      important: false,
    };

    setNotes([newNote, ...notes]);
    setTitleValue("");
    setInputValue("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleToggleImportant = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, important: !note.important } : note
    );
    setNotes(updatedNotes);
  };

  const handleEditNote = (id, newTitle, newText) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title: newTitle, text: newText } : note
    );
    setNotes(updatedNotes);
  };

  const filteredNotes = notes
    .filter((note) => {
      if (currentFilter === "important") return note.important;
      if (currentFilter === "normal") return !note.important;
      return true;
    })
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        note.text.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className="app">
      <div className="container">
        <h1>Notes App</h1>

        <NoteForm
          titleValue={titleValue}
          setTitleValue={setTitleValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleAddNote={handleAddNote}
        />

        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

        <FilterButtons
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />

        <NoteList
          notes={filteredNotes}
          handleDeleteNote={handleDeleteNote}
          handleToggleImportant={handleToggleImportant}
          handleEditNote={handleEditNote}
        />
      </div>
    </div>
  );
}

export default App;
