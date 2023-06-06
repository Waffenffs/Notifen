import React from 'react'
import { motion } from 'framer-motion'
import { BsCheckCircle } from 'react-icons/bs'

function SuccessRegister() {
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
            <div className='cursor-pointer transition hover:bg-[#0f172a] bg-[#1f2937] p-5 rounded-xl max-w-md flex flex-row items-center gap-3'>
                <BsCheckCircle color='#22c55e' size={60} />
                <div>
                    <h1 className='text-[#22c55e] font-bold'>Your registration was successful!</h1>
                    <p className='text-[#ddd6fe] text-sm'>You will be shortly redirected to the login page. Thank you!</p>
                </div>
            </div>
        </motion.div>
    </React.Fragment>
  )
}

export default SuccessRegister