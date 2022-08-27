import { createContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const url = `${host}/api/note/fetch-notes`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE2YTU5NzY2OTc2MDRjMzQ4ZmFmYiIsImlhdCI6MTY2MTUyMjU4N30.8qedmYTCLEFwS9lNCUxqpZscM4tWBWpCOAo8_hZHaBs",
        },
      });
      if (response.ok) {
        setNotes(await response.json());
      } else {
        console.error(await response.json());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addNote = async (note) => {
    const url = `${host}/api/note/add-note`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE2YTU5NzY2OTc2MDRjMzQ4ZmFmYiIsImlhdCI6MTY2MTUyMjU4N30.8qedmYTCLEFwS9lNCUxqpZscM4tWBWpCOAo8_hZHaBs",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        console.log(await response.json());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteNote = async (id) => {
    const url = `${host}/api/note/delete-note/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE2YTU5NzY2OTc2MDRjMzQ4ZmFmYiIsImlhdCI6MTY2MTUyMjU4N30.8qedmYTCLEFwS9lNCUxqpZscM4tWBWpCOAo8_hZHaBs",
        },
      });
      if (!response.ok) {
        console.log(await response.json());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const editNote = async (id, title, description, tag) => {
    const url = `${host}/api/note/update-note/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE2YTU5NzY2OTc2MDRjMzQ4ZmFmYiIsImlhdCI6MTY2MTUyMjU4N30.8qedmYTCLEFwS9lNCUxqpZscM4tWBWpCOAo8_hZHaBs",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (!response.ok) {
        console.log(await response.json());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
