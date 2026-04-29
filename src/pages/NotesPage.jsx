import React, { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";

const STORAGE_KEY = "notes-app-notes";

const DEFAULT_NOTES = [
  {
    id: 1,
    title: "Сходить в спортзал",
    text: "Сегодня вечером: кардио и растяжка.",
    important: true,
  },
  {
    id: 2,
    title: "Покормить собаку",
    text: "В 19:00 корм из шкафа, вода в миске.",
    important: false,
  },
  {
    id: 3,
    title: "Купить продукты",
    text: "Хлеб, молоко, курица.",
    important: false,
  },
];

function isLegacyEnglishDemo(stored) {
  if (!Array.isArray(stored) || stored.length !== 2) return false;
  const [a, b] = stored;
  return (
    a?.id === 1 &&
    a?.title === "Study React" &&
    b?.id === 2 &&
    b?.title === "Go shopping"
  );
}

function isPreviousTechDemo(stored) {
  if (!Array.isArray(stored) || stored.length !== 3) return false;
  return (
    stored[0]?.title === "Курс по React" &&
    stored[1]?.title === "Список покупок" &&
    stored[2]?.title === "Доработки приложения"
  );
}

function NotesPage() {
  const [notes, setNotes] = useState(DEFAULT_NOTES);
  const [storageReady, setStorageReady] = useState(false);

  const [titleValue, setTitleValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          if (isLegacyEnglishDemo(parsed) || isPreviousTechDemo(parsed)) {
            setNotes(DEFAULT_NOTES);
          } else {
            setNotes(parsed.length > 0 ? parsed : DEFAULT_NOTES);
          }
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // quota or private mode
    }
  }, [notes, storageReady]);

  const handleAddNote = () => {
    if (titleValue.trim() === "" || inputValue.trim() === "") {
      alert("Заполните заголовок и текст заметки.");
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
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleToggleImportant = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, important: !note.important } : note
      )
    );
  };

  const handleEditNote = (id, newTitle, newText) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title: newTitle, text: newText } : note
      )
    );
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
    <>
      <h1>Приложение заметок</h1>

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
    </>
  );
}

export default NotesPage;
