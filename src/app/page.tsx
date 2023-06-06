'use client'

import { useAuthContext } from './context/AuthContext'
import { useState } from 'react'
import Image from 'next/image';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { navigate } from './functions/navigate';


export default function Home() {
  // master account: waffen.sultanofc@gmail.com / pogiako123

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordInputIsActive, setPasswordInputisActive] = useState<boolean>(false);

  const { user, _, authenticate } = useAuthContext();

  function handleSubmit(e: any) {
    e.preventDefault()

    // TO-DO: call for the signin method using the context
  }

  function changePasswordFormType() {
    setShowPassword(prevState => !prevState)
  }

  return (
    <main className='w-screen h-screen bg-[#F0E8F8] flex justify-center items-center'>
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
            <h1 className='text-slate-800 font-bold text-[3rem]'>Welcome back</h1>
            <p>Please enter the details of your account</p>
          </div>
          <form onSubmit={handleSubmit} className='mb-16 flex flex-col gap-10'>
            <div>
              <h5 className='text-sm mb-1 font-medium text-slate-800'>Email</h5>
              <input type="text" className='indent-1 border w-full rounded p-1 outline-none' />
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
                />
                <div className='cursor-pointer' onClick={changePasswordFormType}>
                  {showPassword ? <AiOutlineEye size={20}  /> : <AiOutlineEyeInvisible size={20} />}
                </div>
              </div>
              <p className='text-sm text-slate-600'>Input your account&#39;s password here</p>
            </div>
          </form>
          <footer className='flex flex-row items-center gap-3'>
            <p className='text-sm'>If you do not have an account, you can register <span onClick={() => navigate('/register')} className='underline text-blue-500 cursor-pointer'>here</span></p>
            <button className='text-white bg-blue-500 p-3 px-4 shadow-xl border-blue-300 border-2 rounded delay-150 transition hover:bg-indigo-500 hover:border-indigo-300'>Login</button>
          </footer>
      </article>
    </main>
  )
}
