import React from 'react'

const Note = ({note}) => {
    // No need for the note.id to be added as key
    // This has to be dealt with at the low level
    return (
        <li>{note.content}</li>
    )
}

export default Note