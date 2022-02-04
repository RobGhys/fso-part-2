import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
    /*const [loginVisible, setLoginVisible] = useState(false)*/
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)

    const noteFormRef = useRef()

    /*****************************
     *        USE EFFECT         *
     *****************************/
     // Function ("effects") gets executed after rendering
    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
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

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    /*****************************
     *          Forms            *
     *****************************/
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
        // Assign a noteFormRef ref to the Togglable component
        // to give a reference to the component
        <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote}/>
        </Togglable>
    )

    /*****************************
     *          Helpers          *
     *****************************/
    // Show important notes or not
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

    // Create new note
    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()

        // Use axios' post method to send an object to the server
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })
    }

    // Login management
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

    /*****************************
     *          Return           *
     *****************************/
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