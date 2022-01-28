import React, {useState} from 'react'
import Note from './components/Note'

const App = (props) => {
    // Uses the useState function to initialize the piece of state stored in notes with the array of notes passed in the props
    const [notes, setNotes]  = useState(props.notes);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    // Event handler
    const addNote = (event) => {
        event.preventDefault()

        // Create a new object that represents a Note
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        // Use concat to add the new noteObject to existing "notes"
        // Creates new copy of the array with the new item added to the end
        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    }

    // Filter
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important);

    return (
      <div>
        <h1>Notes</h1>
          <div>
              <button onClick={() => setShowAll(!showAll)}>
                  show {showAll ? 'important' : 'true'}
              </button>
          </div>
        <ul>
            {notesToShow.map(note =>
                <Note key={note.id} note={note} />
            )}
        </ul>
          <form onSubmit={addNote}>
              <input value={newNote}
                    onChange={handleNoteChange}
              />
              <button type="submit">save</button>
          </form>
      </div>
    )
}

export default App