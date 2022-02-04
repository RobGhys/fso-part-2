import React, { useState, useEffect } from 'react'

import axios from 'axios'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
    const [loginVisible, setLoginVisible] = useState(false)
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const [username, setUsername] = useState('rorob')
    const [password, setPassword] = useState('salut')

    const [user, setUser] = useState(null)

    /**
     * Function ("effects") gets executed after rendering
     */
    useEffect(() => {
        axios
            .get('http://localhost:3001/api/notes')
            .then(res => {
                setNotes(res.data)
            })
    }, [])

    // Register the effect only when we enter the component for the 1st time
    useEffect( () => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
        }

        // Use axios' post method to send an object to the server
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
                setSuccessMessage(
                    `Added new note with id: '${returnedNote.id}' `
                )
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 3000)
            })
    }

    const toggleImportanceOf = id => {
        // Find the note to modify
        const note = notes.find(n => n.id === id)
        // Copy the note object, and change its "important" attribute to its opposite
        const changedNote = { ...note, important: !note.important }

        // Create a new array where all objects are the same, except for the specific id
        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(err => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    // Login
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            // Save token to local storage
            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() =>{
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm username={username} password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )

    const noteForm = () => (
        <Togglable buttonLabel="new note">
            <NoteForm
                onSubmit={addNote}
                value={newNote}
                handleChange={handleNoteChange}
            />
        </Togglable>
    )


    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} styling={'error'} />
            <Notification message={successMessage} styling={'success'} />

            {user === null
                ? loginForm()
                :
                <div>
                    <p>{user.name} logged-in</p>
                    { noteForm() }
                </div>
            }

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <Footer />
        </div>
    )
}

export default App