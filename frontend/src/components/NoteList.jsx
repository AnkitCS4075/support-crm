function NoteList({ notes = [] }) {

  return (
    <div className="notes-container">

      <h2 className="notes-title">
        Support Notes
      </h2>

      {notes.length === 0 ? (
        <p>No notes added yet.</p>
      ) : (
        notes.map((note, index) => (

          <div key={index} className="note-card">

            <p>{note.note_text}</p>

            <small>
              {new Date(note.created_at).toLocaleString()}
            </small>

          </div>

        ))
      )}

    </div>
  );
}

export default NoteList;

