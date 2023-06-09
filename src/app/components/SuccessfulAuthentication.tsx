import React from 'react'
import { motion } from 'framer-motion'
import { BsCheckCircle } from 'react-icons/bs'

function SuccessfulAuthentication(props: { method: string }) {
    /* 
        @params method the 'method' for the authentication; either login or registration
    */

  return (
    <React.Fragment>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: 1,
                y: -21
                }}
            exit={{ opacity: 0 }}
            style={{
                position: 'absolute',
                top: 10,
                marginTop: '1rem'
            }}
        >
            <div className='cursor-default bg-[#1f2937] p-5 rounded-xl max-w-md flex flex-row items-center gap-3'>
                <BsCheckCircle color='#22c55e' size={60} />
                <div>
                    <h1 className='text-[#22c55e] font-bold'>{props.method === 'register' ? 'Your registration was successful!' : 'Your login was successful!'}</h1>
                    <p className='text-[#ddd6fe] text-sm'>{props.method === 'register' ? 'You will be shortly redirected to the login page. Thank you!' : 'You will be shortly redirected to the home page. Thank you!'}</p>
                </div>
            </div>
        </motion.div>
    </React.Fragment>
  )
}

export default SuccessfulAuthentication