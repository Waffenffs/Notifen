'use client'

import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { navigate } from '../functions/navigate';
import { AnimatePresence } from 'framer-motion';
import SuccessRegister from '../components/SuccessRegister';
import FailedRegister from '../components/FailedRegister';
import { auth } from '@/app/config/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordInputIsActive, setPasswordInputisActive] = useState<boolean>(false);
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [successRegistration, setSuccessRegistration] = useState<boolean | null>(null);
  const [failedRegistration, setFailedRegistration] = useState<boolean | null>(null);

  function handleSubmit(e: any) {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then(() => {
            // successfully registered user
            setSuccessRegistration(true)

            const successTimeout = setTimeout(() => {
                setSuccessRegistration(false)
                navigate('/')
            }, 3000);

            return () => clearTimeout(successTimeout)
        })
        .catch(() => {
            // unsuccessfully registered user
            setFailedRegistration(true)

            const failedTimeout = setTimeout(() => {
                setFailedRegistration(false)
            }, 4000);

            return () => clearTimeout(failedTimeout)
        })

    // reset input fields after authentication
    setRegisterEmail('')
    setRegisterPassword('')
  }


  function changePasswordFormType() {
    setShowPassword(prevState => !prevState)
  }

  return (
    <main className='w-screen h-screen bg-[#F0E8F8] flex justify-center items-center'>
        <AnimatePresence>
            {successRegistration  && <SuccessRegister /> }
            {failedRegistration && <FailedRegister /> }
        </AnimatePresence>
      <article className='bg-white border shadow-xl border-black p-10 rounded-xl flex justify-center flex-col'>
          <div className='flex justify-center items-center border-indigo-500 -mt-24'>
            <Image 
              src="/logo_transparent.png"
              width={350}
              height={350}
              alt='website logo'
            />
          </div>
          <div className='text-center -mt-32 mb-16'>
            <h1 className='text-slate-800 font-bold text-[3rem]'>Registration</h1>
            <p>Please enter the details of your account</p>
          </div>
          <form onSubmit={handleSubmit} className='mb-16 flex flex-col gap-10'>
            <div>
              <h5 className='text-sm mb-1 font-medium text-slate-800'>Email</h5>
              <input 
                type="email" 
                className='indent-1 border w-full rounded p-1 outline-none' 
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                />
              <p className='text-sm text-slate-600'>Input your account&#39;s email here</p>
            </div>
            <div>
              <h5 className='text-sm mb-1 font-medium text-slate-800'>Password</h5>
              <div className={`flex flex-row border w-full rounded items-center justify-between p-1 ${passwordInputIsActive ? 'outline-2 outline-blue-500' : ''}`}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder='*********' 
                  className='indent-1 outline-none'
                  onFocus={() => setPasswordInputisActive(true)}
                  onBlur={() => setPasswordInputisActive(false)}
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <div className='cursor-pointer' onClick={changePasswordFormType}>
                  {showPassword ? <AiOutlineEye size={20}  /> : <AiOutlineEyeInvisible size={20} />}
                </div>
              </div>
              <p className='text-sm text-slate-600'>Input your account&#39;s desired password here</p>
            </div>
          </form>
          <footer className='flex flex-row items-center gap-3'>
            <p className='text-sm'>If you already have an account, you can go <span onClick={() => navigate('/')} className='underline text-blue-500 cursor-pointer'>here</span></p>
            <button onClick={handleSubmit} className='text-white bg-blue-500 p-3 px-4 shadow-xl border-blue-300 border-2 rounded delay-150 transition hover:bg-indigo-500 hover:border-indigo-300'>Register</button>
          </footer>
      </article>
    </main>
  )
}

export default Register