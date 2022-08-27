import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function Noteitem({ note }) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-between">
            <i className="fa-regular fa-pen-to-square"></i>
            <i className="fa-solid fa-trash-can" onClick={() => deleteNote(note._id)}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;