import { createContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {

  const HOST = process.env.SERVER_URL || "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const getNotes = async () => {
    const URL = `${HOST}/api/note/fetch-notes`;
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE2YTU5NzY2OTc2MDRjMzQ4ZmFmYiIsImlhdCI6MTY2MTUyMjU4N30.8qedmYTCLEFwS9lNCUxqpZscM4tWBWpCOAo8_hZHaBs",
        },
      });
      if (response.ok) {
        const json = await response.json();
        setNotes(json);
      } else {
        const json = await response.json();
        console.error(json);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const addNote = async (note) => {
    const URL = `${HOST}/api/note/add-note`;
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE2YTU5NzY2OTc2MDRjMzQ4ZmFmYiIsImlhdCI6MTY2MTUyMjU4N30.8qedmYTCLEFwS9lNCUxqpZscM4tWBWpCOAo8_hZHaBs",
        },
        body: JSON.stringify(note),
      });
      if (response.ok) {
        const note = await response.json();
        setNotes(notes.concat(note));
        showAlert("Added Successfully", "success")
      } else {
        const json = await response.json();
        console.error(json);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteNote = async (id) => {
    const URL = `${HOST}/api/note/delete-note/${id}`;
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE2YTU5NzY2OTc2MDRjMzQ4ZmFmYiIsImlhdCI6MTY2MTUyMjU4N30.8qedmYTCLEFwS9lNCUxqpZscM4tWBWpCOAo8_hZHaBs",
        },
      });
      if (response.ok) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
        showAlert("Deleted Successfully", "success");
      } else {
        const json = await response.json();
        console.error(json);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const editNote = async (id, title, description, tag) => {
    const URL = `${HOST}/api/note/update-note/${id}`;
    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDE2YTU5NzY2OTc2MDRjMzQ4ZmFmYiIsImlhdCI6MTY2MTUyMjU4N30.8qedmYTCLEFwS9lNCUxqpZscM4tWBWpCOAo8_hZHaBs",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      if (response.ok) {
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          if (newNotes[index]._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
        showAlert("Updated Succesfully", "success")
      } else {
        const json = await response.json();
        console.error(json);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote, alert, showAlert }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
