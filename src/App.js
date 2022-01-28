import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
    const [persons, setPersons] = useState(props.persons);
    const [newName, setNewName] = useState('');

    const addNewPersons = (event) => {
        event.preventDefault();

        const personObject = {
            id: persons.length + 1,
            name: newName
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
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNewPersons}>
               name : <input
                    value={newName}
                    onChange={handleNameChange}
                />
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