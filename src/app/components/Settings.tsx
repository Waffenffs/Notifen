import React from 'react'
import SettingsHeader from './SettingsHeader'
import SettingsAccountArticle from './SettingsAccountArticle'

function Settings() {
  return (
    <main className='w-full h-screen'>
      <SettingsHeader />
      <SettingsAccountArticle />
    </main>
  )
}

export default Settings