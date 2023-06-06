"use client"

import { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '@/app/config/firebaseConfig'
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    UserCredential
} from 'firebase/auth'

interface LoggedOut {
    success: false
}

interface LoggedIn {
    success: true
    email: string | null
    uid: string | number | null
}

interface AuthenticationError {
    success: false
    error: any
}

export const AuthContext = createContext<any>({});

export const AuthContextProvider = ({children}: { children: React.ReactNode}) => {
    const [user, setUser] = useState<LoggedIn | LoggedOut | AuthenticationError>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // user is not logged in or does not exist
            if(!user) {
                return setUser({
                    success: false
                })
            }

            setUser({
                success: true,
                email: user.email,
                uid: user.uid
            })
        })

        return () => unsubscribe();
    }, [])

    function createUserInstance(userCredentials: UserCredential) {
        setUser({
            success: true,
            email: userCredentials.user.email,
            uid: userCredentials.user.uid
        })
    }

    function authenticate(email: string, password: string) {
        /* 
            @param email the email of the authenticating account
            @param password the password of the authenticating account
        */

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                createUserInstance(userCredential)
            })
            .catch((rejected) => {
                setUser({
                    success: false,
                    error: rejected
                })
            })
    }

    return (
        <AuthContext.Provider value={{ user, setUser, authenticate }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)