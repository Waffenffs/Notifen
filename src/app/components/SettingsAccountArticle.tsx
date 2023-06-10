import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { AiOutlineEdit } from 'react-icons/ai'
import EditAccountModal from './EditAccountModal';
import { AnimatePresence } from 'framer-motion'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebaseConfig';
import { navigate } from '../functions/navigate';

function SettingsAccountArticle() {
    const { user } = useAuthContext();

    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [currentName, setCurrentName] = useState<string | null>(user.displayName)

    function logOut() {
        const timer = setTimeout(() => {
            signOut(auth)
            navigate('/')
        }, 2000);

        return () => clearTimeout(timer)
    }

    return (
        <div className='p-3'>
            {showEdit && 
                <AnimatePresence>
                    <EditAccountModal 
                        currentName={currentName} 
                        changeName={setCurrentName} 
                        changeState={setShowEdit} 
                    />
                </AnimatePresence>
            }
            <article className='p-5 bg-white flex justify-between border rounded-xl border-black flex-col'>
                <div>
                    <h1 className='flex flex-row gap-2 text-[#141C24] text-3xl font-bold'>
                        {!currentName ? `user${user.uid}` : currentName}
                        <button className='cursor-pointer' onClick={() => setShowEdit(true)}>
                            <AiOutlineEdit />
                        </button>
                    </h1>
                    <span className='text-[#344051] text-sm font-bold'>{user.email}</span>
                </div>
                <div className='flex justify-end gap-5'>
                    <button 
                        className='p-2 bg-[#D4AEFF] rounded-xl border border-black text-black font-bold text-sm'
                        onClick={logOut}
                    >Logout</button>
                </div>
            </article>
        </div>
    )
}

export default SettingsAccountArticle