import '../Styles/AddItem.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

export default function AddItem() {
  const [name, setName] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('https://crud-app-raykell-backend.herokuapp.com/additem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name || 'i need a name',
        dueDate: dueDate || `1999-12-31`,
        description: description
      })
    })
    alert(`'${name}' added to the list!`)
    history.push('/')
  }

  return (
    <form>
      <h2>WOW add an item!</h2>
      <ul>
        <li>
          <label for="name">Item name: </label>
          <input id="name" placeholder="enter a name" onChange={(e) => setName(e.target.value)} value={name}></input></li>
        <li>
          <label for="due-date">Due date: </label>
          <input type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} id="due-date" placeholder="due date"></input>
        </li>
        <li>
          <label id="desc-label" for="description">Description</label>
          <textarea id="description" rows="5" cols="40" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="write a description(optional)"></textarea>
        </li>
        <li>
          <button onClick={handleSubmit}>SUBMIT!</button>
        </li>
      </ul>
    </form>
  )
}