import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoCloseSharp } from 'react-icons/io5'

function NoteModal(props: { 
    title: string, 
    description: string,
    changeState: any,
    deleteNote: any,
    id: string,
    updateData: any,
    noteTimestamp: any,
    changeModalState: any
}) {

    const [title, setTitle] = useState<string>(props.title)
    const [description, setDescription] = useState<string>(props.description)

    function handleSubmit(e: any) {
      e.preventDefault()
    }

    function handleDicard() {
      // disable modal
      props.changeState(false)
    }

    function handleDelete() {
      const timer = setTimeout(() => {
        props.changeModalState(true)

        props.deleteNote(props.id)
      }, 2000);

      return () => clearTimeout(timer)
    }
    
    function handleEdit() {
      const timer = setTimeout(() => {
          props.updateData(props.id, title, description, props.noteTimestamp)    
      }, 2000);

      return () => clearTimeout(timer)
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
            <div className='flex items-center justify-end'>
                <button onClick={handleDicard}>
                    <IoCloseSharp /> 
                </button>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-3'>
              <div className='w-full'>
                <h1 className='text-slate-800 font-medium'>Title</h1>
                <input 
                  className='mb-5 w-full outline-none border p-2 rounded-xl indent-1' 
                  type="text"
                  placeholder='Enter the title for your note here'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <h1 className='text-slate-800 font-medium'>Description</h1>
                <textarea 
                  className='w-full outline-none border p-2 rounded-xl indent-1 resize-none h-60' 
                  placeholder='Enter further descriptions for your note here...'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className='flex justify-end gap-2'>
                <button onClick={handleEdit} className='w-20 text-white font-medium bg-green-500 border border-green-400 rounded p-2'>
                  Edit
                </button>
                <button onClick={handleDelete} className='w-20 text-black font-medium bg-red-600 border border-black rounded p-2'>
                  <span>Delete</span>
                </button>
              </div>
            </form>
        </motion.div>
    </motion.div>
  )
}

export default NoteModal