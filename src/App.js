import React, { useState } from 'react'
import Person from './components/Person'

const App = (props) => {
    const [persons, setPersons] = useState(props.persons);
    const [newName, setNewName] = useState('');
    const [newTel, setNewTel] = useState('');

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