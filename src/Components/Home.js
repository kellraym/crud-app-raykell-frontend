import React from 'react';
import DisplayList from './DisplayList';
import addItem from './AddItem'

export default function Home() {
  return (
    <div>
      <header>
        <h1>To Do List 2.0</h1>
      </header>
      <DisplayList />
    </div>

  )
}