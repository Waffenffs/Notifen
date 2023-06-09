import React, { useState } from 'react'
import NoteModal from './NoteModal'

function NormalNote(props: {
    title: string, 
    description: string,
    deleteNote: (id: string) => Promise<void>,
    id: string
}) {
    const [toggleNoteModal, setToggleNoteModal] = useState<boolean>(false);

    return (
        <React.Fragment>
            <article 
                onClick={() => setToggleNoteModal(true)} 
                className='cursor-pointer bg-white border rounded-2xl border-black px-2 py-3 flex flex-col'
            >
                <h1 className='text-2xl text-[#141C24] font-bold'>{props.title}</h1>
                <span>January 9th, 2023</span>
            </article>
            {toggleNoteModal && 
                <NoteModal 
                    title={props.title} 
                    description={props.description} 
                    changeState={setToggleNoteModal}
                    deleteNote={props.deleteNote}
                    id={props.id}
                />
            }
        </React.Fragment>
    )
}

export default NormalNote