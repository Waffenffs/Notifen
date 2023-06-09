"use client"

import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import React from 'react'
import SideNav from '../components/SideNav'
import DashboardComponent from '../components/DashboardComponent'
import Settings from '../components/Settings'
import { app } from '../config/firebaseConfig'
import { getFirestore } from 'firebase/firestore'

export const db = getFirestore(app)

function Dashboard() {
  const [currentState, setCurrentState] = useState<'dashboard' | 'settings'>('dashboard');
  
  const { user, __, ___, isUserAuthenticated } = useAuthContext();

  const router = useRouter();

  // check for authorization
  useEffect(() => {
      if(!isUserAuthenticated) { router.push('/') }
  }, [])

  return (
    <React.Fragment>
      {isUserAuthenticated &&
        <main className='w-screen h-screen flex flex-row bg-[#F0E8F8]'>
          <SideNav currentState={currentState} changeState={setCurrentState} />
          {currentState === 'dashboard' && <DashboardComponent user={user} />}
          {currentState === 'settings' && <Settings /> }
        </main>
      }
    </React.Fragment>

  )
}

export default Dashboard