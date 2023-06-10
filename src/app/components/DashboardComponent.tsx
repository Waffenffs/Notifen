"use client"

import React, { useState, useEffect } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardButton from './DashboardButton';
import CreateNoteModal from './CreateNoteModal';
import { AnimatePresence } from 'framer-motion'
import { collection, onSnapshot, query, orderBy, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../content/page';
import NormalNote from './NormalNote';
import { uid } from 'uid'
import SuccessModal from './SuccessModal';
import DeletedModal from './DeletedModal';

function DashboardComponent(props: { user : any }) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [notes, setNotes] = useState<Array<Notes>>([]);
  const [goodNoteCreation, setGoodNoteCreation] = useState<boolean>(false)
  const [goodNoteDeletion, setGoodNoteDeletion] = useState<boolean>(false)

  useEffect(() => {
    const q = query(collection(db, `users/${props.user.uid}/notes`), orderBy("timestamp"))

    function formatDate(seconds: number) {
      const date = new Date(seconds * 1000) // convert seconds to milliseconds
      const result = date.toLocaleString()  // convert to local date and time format

      return result
    }

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
              timestamp: formatDate(doc.data().timestamp.seconds)
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

    const timer = setTimeout(() => {
      setGoodNoteDeletion(false)
    }, 2000);

    setNotes(updatedNotes);

    return () => clearTimeout(timer)
  }

  async function updateData(id: string, title: string, description: string, noteTimestamp: any) {
    await updateDoc(doc(db, `users/${props.user.uid}/notes`, id), {
      note_title: title,
      note_description: description,
      timestamp: noteTimestamp
    })
    
  }

  // show successful note modal or not
  useEffect(() => {
    // disable after 2 seconds
    if(goodNoteCreation) {
      const timer = setTimeout(() => {
        setGoodNoteCreation(false)
      }, 2000);

      return () => clearTimeout(timer)
    }
  }, [goodNoteCreation])

  return (
    <main className='w-full h-screen'>
      {goodNoteCreation &&
        <AnimatePresence>
          <SuccessModal />
        </AnimatePresence>
      }
      {goodNoteDeletion && 
        <AnimatePresence>
          <DeletedModal />
        </AnimatePresence>
      }
      <DashboardHeader />
      <DashboardButton 
        currentState={toggleModal} 
        changeState={setToggleModal} 
      />
      {toggleModal && 
        <AnimatePresence>
          <CreateNoteModal 
            user={props.user} 
            currentState={toggleModal} 
            changeState={setToggleModal}
            changeModalState={setGoodNoteCreation} 
          />
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
                updateData={updateData}
                id={note.note_id}
                noteTimestamp={note.timestamp}
                changeModalState={setGoodNoteDeletion}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default DashboardComponent