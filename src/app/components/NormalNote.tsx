import React from 'react'

function NormalNote() {

    // display notes in descending order

    return (
        <article className='bg-white border rounded-2xl border-black px-2 py-3 flex flex-col'>
            <h1 className='text-2xl text-[#141C24] font-bold'>Feed the Chicken</h1>
            <span>January 9th, 2023</span>
        </article>
    )
}

export default NormalNote