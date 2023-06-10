import React, { useState } from 'react'
import NoteModal from './NoteModal'

function NormalNote(props: {
    title: string, 
    description: string,
    deleteNote: any,
    id: string,
    updateData: any,
    noteTimestamp: any,
    changeModalState: any
}) {
    const [toggleNoteModal, setToggleNoteModal] = useState<boolean>(false);

    return (
        <React.Fragment>
            <article 
                onClick={() => setToggleNoteModal(true)} 
                className='cursor-pointer bg-white border rounded-2xl border-black px-2 py-3 flex flex-col'
            >
                <h1 className='text-2xl text-[#141C24] font-bold'>{props.title}</h1>
                <span>{props.noteTimestamp}</span>
            </article>
            {toggleNoteModal && 
                <NoteModal 
                    title={props.title} 
                    description={props.description} 
                    changeState={setToggleNoteModal}
                    deleteNote={props.deleteNote}
                    id={props.id}
                    updateData={props.updateData}
                    noteTimestamp={props.noteTimestamp}
                    changeModalState={props.changeModalState}
                />
            }
        </React.Fragment>
    )
}

export default NormalNote