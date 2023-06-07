import React, { useState } from 'react'
import Image from 'next/image'
import { RxDashboard } from 'react-icons/rx'
import { FiSettings } from 'react-icons/fi'
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from 'react-icons/bs'
import { motion } from 'framer-motion'

function SideNav(props: {currentState: 'dashboard' | 'settings', changeState: React.Dispatch<React.SetStateAction<'dashboard' | 'settings'>>}) {
    // make it toggleable, use something like framer motion.div and transition or something

    const [hovered, setHovered] = useState<boolean>(false);
    const [hoveredSettings, setHoveredSettings] = useState<boolean>(false);
    const [toggled, setToggled] = useState<boolean>(true);

    // if !toggled, then show another shit

  return (
    <motion.nav
        initial={{ width: '100%' }}
        animate={{ width: toggled ? '16rem' : '4rem' }}
        className={`${!toggled && 'pt-3'} px-3 h-screen bg-black w-1/6 flex flex-col items-center`}
    >
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
            className={`${props.currentState === 'dashboard' && 'bg-white'} mb-3 w-full flex flex-row gap-3 items-center hover:bg-white p-3 rounded-xl transition active`}
            onClick={() => {props.changeState('dashboard')}}
        >
            <RxDashboard color={props.currentState === 'dashboard' || hovered ? 'black' : 'white'} size={30} />
            {toggled && <span id='dashboard-text' className={`${props.currentState === 'dashboard' ? 'text-black' : 'text-white'} font-medium`}>Dashboard</span>}
        </button>
        <button
            onMouseEnter={() => setHoveredSettings(true)} 
            onMouseLeave={() => setHoveredSettings(false)} 
            className={`${props.currentState === 'settings' && 'bg-white'} mb-3 w-full flex flex-row gap-3 items-center hover:bg-white p-3 rounded-xl transition active-1`}
            onClick={() => {props.changeState('settings')}}
        >
            <FiSettings color={props.currentState === 'settings' || hoveredSettings ? 'black' : 'white'} size={30} />
            {toggled && <span id='settings-text' className={`${props.currentState === 'settings' ? 'text-black' : 'text-white'} font-medium`}>Settings</span>}
        </button>
        <div className='h-full self-start flex flex-col justify-end pb-3'>
            <div className='cursor-pointer' onClick={() => setToggled(prevState => !prevState)}>
                {toggled && <BsLayoutSidebarInsetReverse size={25} color={'white'} />}
                {!toggled && <BsLayoutSidebarInset size={25} color={'white'} />}
            </div>
        </div>
    </motion.nav>
  )
}

export default SideNav