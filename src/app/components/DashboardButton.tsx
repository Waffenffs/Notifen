import React from 'react'

function DashboardButton(props: {currentState: boolean, changeState: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <div className='flex justify-end items-center p-5'>
        <button onClick={() => props.changeState(!props.currentState)} className='hover:brightness-95 transition delay-150 border-2 rounded-xl border-black p-3 bg-[#D4AEFF] p-3'>
            <span className='font-medium text-slate-80'>Add New Note</span>
        </button>
    </div>
  )
}

export default DashboardButton