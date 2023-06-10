import React from 'react'
import { motion } from 'framer-motion'

function SuccessModal() {
  return (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="absolute mt-3 top-0 left-1/2 transform -translate-x-1/2 p-3 bg-green-500 text-white rounded font-bold shadow"
    >
        <h1>Successfully created a new note!</h1>
    </motion.div>
  )
}

export default SuccessModal