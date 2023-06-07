import React from 'react'

function CreateNoteModal(props: {currentState: boolean, changeState: React.Dispatch<React.SetStateAction<boolean>>}) {

  return (
    <div onClick={() => props.changeState(false)} className='bg-opacity-20 fixed top-0 left-0 w-full h-full bg-gray-500 flex justify-center items-center'>
        <div className='bg-white opacity-100'>
            createmodalhere
        </div>
    </div>
  )
}

export default CreateNoteModal