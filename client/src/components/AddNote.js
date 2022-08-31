import { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

function AddNote() {
  
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = () => {
    addNote(note);
    setNote({ title: "", description: "", tag: "" })
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h3>Add Note</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
        </div>
        <button 
        type="button" className="btn btn-primary" onClick={handleSubmit}
        disabled={note.title.length === 0 || note.description.length === 0 || note.tag.length === 0}
        >
          Add Note
        </button>
      </form>
    </>
  );
}

export default AddNote;
