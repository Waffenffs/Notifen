import React, { useState } from 'react'
import Image from 'next/image'
import { RxDashboard } from 'react-icons/rx'
import { FiSettings } from 'react-icons/fi'

function SideNav(props: {currentState: 'dashboard' | 'settings' | null, changeState: React.Dispatch<React.SetStateAction<'dashboard' | 'settings' | null>>}) {
    // when user clicks either dashboard or settings
    // render those components
    const [hovered, setHovered] = useState<boolean>(false);
    const [hoveredSettings, setHoveredSettings] = useState<boolean>(false);

  return (
    <nav className='px-3 h-screen bg-black w-1/6 flex flex-col items-center'>
        <div className='-mt-10'>
            <Image 
                src="/logo_transparent.png"
                alt='website logo'
                width={200}
                height={200}
            />
        </div>
        <button 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)} 
            className='mb-3 w-full flex flex-row gap-3 items-center hover:bg-white p-3 rounded-xl transition active'
            onClick={() => props.changeState('dashboard')}
        >
            <RxDashboard color={hovered ? 'black' : 'white'} size={30} id='dashboard-icon' />
            <span id='dashboard-text' className='font-medium text-white'>Dashboard</span>
        </button>
        <button
            onMouseEnter={() => setHoveredSettings(true)} 
            onMouseLeave={() => setHoveredSettings(false)} 
            className='mb-3 w-full flex flex-row gap-3 items-center hover:bg-white p-3 rounded-xl transition active-1'
            onClick={() => props.changeState('settings')}
        >
            <FiSettings color={hoveredSettings ? 'black' : 'white'} size={30} />
            <span id='settings-text' className='font-medium text-white'>Settings</span>
        </button>
    </nav>
  )
}

export default SideNav