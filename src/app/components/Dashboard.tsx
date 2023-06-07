"use client"

import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import DashboardHeader from './DashboardHeader';
import DashboardButton from './DashboardButton';
import CreateNoteModal from './CreateNoteModal';

function DashboardComponent() {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const { user } = useAuthContext();

  // 1. fetch notes from firestore
  //    - if there are no notes, display a "no notes found"
  //    - if there are no more than 1-2 notes
  //        * in the prevous notes section add a "no notes found"

  // current notes schema: notes/{uid_user_here}/{... notes}

  return (
    <main className='w-full'>
      <DashboardHeader />
      <DashboardButton currentState={toggleModal} changeState={setToggleModal} />
      {toggleModal && <CreateNoteModal currentState={toggleModal} changeState={setToggleModal} /> }
    </main>
  )
}

export default DashboardComponent