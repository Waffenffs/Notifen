import React from 'react'
import { Notes } from './Dashboard'

function NormalNotes(props: {notes: Array<Notes>}) {
    console.log(props.notes)

    // display notes in descending order

    return (
        <div>NormalNotes</div>
    )
}

export default NormalNotes