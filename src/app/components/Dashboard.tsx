"use client"

import React, { useState, useEffect } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardButton from './DashboardButton';
import CreateNoteModal from './CreateNoteModal';
import { AnimatePresence } from 'framer-motion'
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../content/page';
import NormalNote from './NormalNote';
import { uid } from 'uid'


function DashboardComponent(props: { user : any }) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<Array<Notes>>([]);

  useEffect(() => {
    const q = query(collection(db, `users/${props.user.uid}/notes`), orderBy("timestamp"))

    async function fetchData() {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {

        const updatedNotes: Notes[] = [];

        querySnapshot.forEach((doc) => {
          const noteExists = notes.find((note) => note.note_id === doc.id)

          if(!noteExists) {
            updatedNotes.push({
              note_title: doc.data().note_title,
              note_description: doc.data().note_description,
              note_id: doc.id,
              timestamp: doc.data().timestamp
            })
          }
        })

        // wait for 2 seconds before updating
        const timer = setTimeout(() => {
          setNotes(updatedNotes)
        }, 2000);

        // clean-up to avoid memory leak
        return () => clearTimeout(timer)
      })

      // clean-up to avoid memory leaks
      return () => unsubscribe();

    }

    fetchData();
  }, [])

  async function deleteData(id: string) {
    await deleteDoc(doc(db, `users/${props.user.uid}/notes`, id))

    const updatedNotes = notes.filter((note) => note.note_id !== id)

    setNotes(updatedNotes);
  }

  return (
    <main className='w-full h-screen'>
      <DashboardHeader />
      <DashboardButton currentState={toggleModal} changeState={setToggleModal} />
      {toggleModal && 
        <AnimatePresence>
          <CreateNoteModal user={props.user} currentState={toggleModal} changeState={setToggleModal} />
        </AnimatePresence>
      }
      <h1 className='pl-3 mb-3 font-bold text-3xl text-slate-800'>{`Notes (${notes.length})`}</h1>
      <section id='customized-scrollbar' className='p-3 overflow-y-auto w-5/6 max-h-[22rem]'>
        <div className='flex flex-col gap-2 '>
          {notes.map((note) => {
            return (
              <NormalNote 
                title={note.note_title}
                description={note.note_description}
                key={uid()}
                deleteNote={deleteData}
                id={note.note_id}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default DashboardComponent