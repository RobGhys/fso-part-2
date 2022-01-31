import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState([]);
    const [newTel, setNewTel] = useState([]);

    /**
    * Function ("effects") gets executed after rendering
    */
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => { // registers an event handler
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, []) // how often the effect is run ([] = once)
    console.log('render', persons.length, 'persons')

    const addNewPersons = (event) => {
        event.preventDefault();

        const personObject = {
            id: persons.length + 1,
            name: newName,
            tel: newTel
        }

        let nameExists = false;

        persons.forEach(persons => {
            if (persons.name === personObject.name) {
                nameExists = true;
            }
        })

        if (nameExists === false) {
            setPersons(persons.concat(personObject));
            setNewName('');
            setNewTel('');
        } else {
            alert(`${personObject.name} is already present in the phone book`)
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleTelChange = (event) => {
        console.log(event.target.value)
        setNewTel(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNewPersons}>
               <div>name : <input
                   value={newName}
                   onChange={handleNameChange}
               /></div>
                <div>Tel : <input
                    value={newTel}
                    onChange={handleTelChange}
                /></div>
                <button type="submit">add</button>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person =>
                <Person key={person.id} person={person} />
                )}
            </ul>
        </div>
    )
}

export default App

/*
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(false)

    /!**
     * Function ("effects") gets executed after rendering
     *!/
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => { // registers an event handler
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }, []) // how often the effect is run ([] = once)
    console.log('render', notes.length, 'notes')

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
        }

        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App*/
