import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addNewPersons = (event) => {
        event.preventDefault();
        const personObject = {
            name: 'Robin Gh'
        }

        setPersons(persons.concat(personObject));
        setNewName('');
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input />
                </div>
                <div>
                    <form onSubmit={addNewPersons}>
                        <input
                            value={newName}
                            onChange={handleNameChange}
                        />
                        <button type="submit">add</button>
                    </form>
                </div>
            </form>
            <h2>Numbers</h2>
            ...
        </div>
    )
}

export default App