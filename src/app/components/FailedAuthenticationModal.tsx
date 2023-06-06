import React from 'react'
import { motion } from 'framer-motion'
import { FiAlertTriangle } from 'react-icons/fi'

function FailedAuthentication(props: {method: string }) {
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
                    <FiAlertTriangle color='#cb4226' size={60} />
                    <div>
                        <h1 className='text-[#cb4226] font-bold'>{props.method === 'register' ? 'There was an error with your registration!' : 'There was an error with your login!'}</h1>
                        <p className='text-[#ddd6fe] text-sm'>Carefully inspect your input fields, or you can message me through my Github account!</p>
                    </div>
                </div>
            </motion.div>
    </React.Fragment>
  )
}

export default FailedAuthentication