"use client"

import { useEffect} from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

function Dashboard() {
    const { _, __, ___, isUserAuthenticated } = useAuthContext();

    const router = useRouter();

    // check for authorization
    useEffect(() => {
        if(!isUserAuthenticated) { router.push('/') }
    }, [])

  return (
    <div>page</div>
  )
}

export default Dashboard