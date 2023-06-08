import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../content/page';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function CreateNoteModal(props: {
  user: any,
  currentState: boolean,
  changeState: React.Dispatch<React.SetStateAction<boolean>>}
) {

  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteDescription, setNoteDescription] = useState<string>('');

  async function handleSubmit(e: any) {
    e.preventDefault()

    if(props.user) { 
      await addDoc(collection(db, `users/${props.user.uid}/notes`), {
        note_title: noteTitle,
        note_description: noteDescription,
        timestamp: serverTimestamp(),
      })

      const timer = setTimeout(() => {
        props.changeState(false)
      }, 2000);

      return () => clearTimeout(timer);
    }
  }

  function handleExit() {
    props.changeState(false)
  }

  return (
    <motion.div 
      className='bg-opacity-20 fixed top-0 left-0 w-full h-full bg-gray-500 flex justify-center items-center'
    >
        <motion.div 
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className='bg-white p-3 rounded border border-black w-[27rem]'
        >
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <div className='w-full'>
                <h1 className='text-slate-800 font-medium'>Title</h1>
                <input 
                  className='mb-5 w-full outline-none border p-2 rounded-xl indent-1' 
                  type="text"
                  placeholder='Enter the title for your note here' 
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
                <h1 className='text-slate-800 font-medium'>Description</h1>
                <textarea 
                  className='w-full outline-none border p-2 rounded-xl indent-1 resize-none h-60' 
                  placeholder='Enter further descriptions for your note here...'
                  value={noteDescription}
                  onChange={(e) => setNoteDescription(e.target.value)}
                ></textarea>
              </div>
              <div className='flex justify-end gap-2'>
                <button onClick={handleSubmit} className='w-20 text-white font-medium bg-blue-500 border border-blue-400 rounded p-2'>
                  Add
                </button>
                <button onClick={handleExit} className='w-20 text-black font-medium bg-red-600 border border-black rounded p-2'>
                  <span>Discard</span>
                </button>
              </div>
            </form>
        </motion.div>
    </motion.div>
  )
}

export default CreateNoteModal