import React from 'react'

const Person = ({person}) => {
    // No need for the note.id to be added as key
    // This has to be dealt with at the low level
    return (
        <li>{person.name}, tel: {person.tel}</li>
    )
}

export default Person