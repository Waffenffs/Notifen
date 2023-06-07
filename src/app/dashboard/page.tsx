"use client"

import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react'
import SideNav from '../components/SideNav'
import DashboardComponent from '../components/Dashboard'
import Settings from '../components/Settings'

function Dashboard() {
  const [currentState, setCurrentState] = useState<'dashboard' | 'settings'>('dashboard');
  
  const { _, __, ___, isUserAuthenticated } = useAuthContext();

  const router = useRouter();

  // check for authorization
  useEffect(() => {
      if(!isUserAuthenticated) { router.push('/') }
  }, [])

  return (
    <React.Fragment>
      {isUserAuthenticated &&
        <main className='w-screen h-screen flex flex-row'>
          <SideNav currentState={currentState} changeState={setCurrentState} />
          {currentState === 'dashboard' && <DashboardComponent />}
          {currentState === 'settings' && <Settings /> }
        </main>
      }
    </React.Fragment>

  )
}

export default Dashboard