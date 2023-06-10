"use client"

import { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '@/app/config/firebaseConfig'
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    UserCredential,
    updateProfile
} from 'firebase/auth'

export const AuthContext = createContext<any>({});

export const AuthContextProvider = ({children}: { children: React.ReactNode}) => {
    const [user, setUser] = useState<LoggedIn | LoggedOut | AuthenticationError>();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // user is not logged in or does not exist
            if(!user) {
                setUser({
                    success: false
                })

                return setIsUserAuthenticated(false)
            }

            setUser({
                success: true,
                email: user.email,
                uid: user.uid,
                displayName: user.displayName
            })

            setIsUserAuthenticated(true)
        })

        return () => unsubscribe();
    }, [])

    function createUserInstance(userCredentials: UserCredential) {
        setUser({
            success: true,
            email: userCredentials.user.email,
            uid: userCredentials.user.uid,
            displayName: null // null when user first creates an account
        })
    }

    function signIn(email: string, password: string) {
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

    function updateDisplayName(name: string) {
        updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            signIn, 
            isUserAuthenticated, 
            setIsUserAuthenticated, 
            updateDisplayName 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)