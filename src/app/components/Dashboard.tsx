"use client"

import React, { useState, useEffect } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardButton from './DashboardButton';
import CreateNoteModal from './CreateNoteModal';
import { AnimatePresence } from 'framer-motion'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../content/page';
import NormalNote from './NormalNote';
import { uid } from 'uid'


function DashboardComponent(props: { user : any }) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<Array<Notes>>([]);

  // TO-DO:
  // 1. add delete functionalities to the notes
  // 2. add rewrite functionalities (possibly refactor note modal)

  // 1. fetch notes from firestore
  //    - if there are no notes, display a "no notes found"
  //    - if there are no more than 1-2 notes
  //        * in the prevous notes section add a "no notes found"

  // current notes schema: users/{uid_user_here}/notes/{...notes}

  // query/fetch notes and sort them by timestamp
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

        setNotes(updatedNotes)
      })

      return () => unsubscribe();
    }

    fetchData();
  }, [])

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
          <NormalNote key={uid()} />
          <NormalNote key={uid()} />
          <NormalNote key={uid()} />
          <NormalNote key={uid()} />
          <NormalNote key={uid()} />
          <NormalNote key={uid()} />
          <NormalNote key={uid()} />
        </div>
      </section>
    </main>
  )
}

export default DashboardComponent