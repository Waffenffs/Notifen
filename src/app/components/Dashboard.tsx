"use client"

import React, { useState, useEffect } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardButton from './DashboardButton';
import CreateNoteModal from './CreateNoteModal';
import { AnimatePresence } from 'framer-motion'
import { collection, onSnapshot, query, getDocs, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../content/page';
import NormalNotes from './NormalNotes';

export interface Notes {
  note_title: string
  note_description: string
  note_id: string
  timestamp: any
}

function DashboardComponent(props: { user : any }) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<Array<Notes>>([]);

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
    <main className='w-full'>
      <DashboardHeader />
      <DashboardButton currentState={toggleModal} changeState={setToggleModal} />
      {toggleModal && 
        <AnimatePresence>
          <CreateNoteModal user={props.user} currentState={toggleModal} changeState={setToggleModal} />
        </AnimatePresence>
      }
      <section className='p-3'>
        <h1 className='font-bold text-3xl text-slate-800'>{`Notes (${notes.length})`}</h1>
        <NormalNotes notes={notes} />
      </section>
    </main>
  )
}

export default DashboardComponent