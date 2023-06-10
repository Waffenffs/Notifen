import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthContext } from '../context/AuthContext'

function EditAccountModal(props: {
    currentName: string | null, 
    changeName: any , 
    changeState: any 
}) {
    const [desiredName, setDesiredName] = useState<string>('')

    const {  user, _, __, ___, ____, updateDisplayName } = useAuthContext();

    function confirmedChanges() {
        updateDisplayName(desiredName)

        const timer = setTimeout(() => {
            props.changeName(desiredName)
            props.changeState(false)
        }, 2000);

        return () => clearTimeout(timer)
    }

    function discardChanges() {
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
                <h1 className='text-slate-800 font-medium'>Previous Name</h1>
                <input 
                    type="text" 
                    disabled 
                    value={!props.currentName ? `user${user.uid}` : props.currentName} 
                    className='p-3 border border-black rounded-xl w-full'
                />
                <h1 className='text-slate-800 font-medium'>Desired Name</h1>
                <input 
                    type="text"
                    value={desiredName}
                    onChange={(e) => setDesiredName(e.target.value)} 
                    placeholder='Input your desired name here...'
                    className='outline-blue-600 p-3 border border-black rounded-xl w-full'
                />
                <div className='flex justify-end mt-3 gap-3'>
                    <button 
                        className='p-2 rounded text-sm border border-green-400 bg-green-500 text-white font-bold'
                        onClick={confirmedChanges}
                    >
                        Confirm Changes
                    </button>
                    <button
                        className='p-2 rounded text-sm border border-black bg-[#B91C1C] text-black font-bold'
                        onClick={discardChanges}
                    >
                        Discard
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default EditAccountModal