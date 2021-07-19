import '../Styles/AddItem.css';
import React, { useState } from 'react';

export default function AddItem() {
  const [name, setName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/additem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        dueDate: dueDate,
        description: description
      })
    })
    alert(`You have pressed the submit button`)
    console.log(`default was prevented`, e.target)
    setName('')
    setDueDate('')
    setDescription('')
  }

  return (
    <form>
      <h2>WOW add an item!</h2>
      <ul>
        <li>
          <label for="name">Item name: </label>
          <input id="name" placeholder="name" onChange={(e) => setName(e.target.value)} value={name}></input></li>
        <li>
          <label for="due-date">Due date: </label>
          <input type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} id="due-date" placeholder="due date"></input>
        </li>
        <li>
          <label id="desc-label" for="description">Description</label>
          <textarea id="description" rows="5" cols="40" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="description(optional)"></textarea>
        </li>
        <li>
          <button onClick={(e) => handleSubmit(e)}>SUBMIT!</button>
        </li>
      </ul>
    </form>
  )
}