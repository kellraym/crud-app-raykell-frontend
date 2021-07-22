import '../Styles/AddItem.css'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function EditItem(props) {
  const { id, name, dueDate, description } = props.location.values
  const [newName, setNewName] = useState(name)
  const [newDueDate, setNewDueDate] = useState(dueDate.slice(0, 10))
  const [newDescription, setNewDescription] = useState(description)
  const history = useHistory()

  function handleSubmit(e) {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        name: newName || ' i need a name',
        dueDate: newDueDate || `1999-12-31`,
        description: newDescription
      })
    })
    alert(`Item changed!`)
    history.push('/')
  }

  return (
    <form>
      <h2>WOW edit an item!</h2>
      <ul>
        <li>
          <label for="name">Item name: </label>
          <input id="name" placeholder="name" onChange={(e) => setNewName(e.target.value)} value={newName}></input></li>
        <li>
          <label for="due-date">Due date: </label>
          <input type="date" onChange={(e) => setNewDueDate(e.target.value)} value={`${newDueDate}`} id="due-date" placeholder="due date"></input>
        </li>
        <li>
          <label id="desc-label" for="description">Description</label>
          <textarea id="description" rows="5" cols="40" onChange={(e) => setNewDescription(e.target.value)} value={newDescription} placeholder="description(optional)"></textarea>
        </li>
        <li>
          <button onClick={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}>SUBMIT!</button>
        </li>
      </ul>
    </form>
  )
}