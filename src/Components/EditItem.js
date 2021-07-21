import React, { useState } from 'react'

export default function EditItem(props) {
  const {name, dueDate, description} = props.location.values
  const [newName, setNewName] = useState(name)
  const [newDueDate, setNewDueDate] = useState(dueDate.slice(0, 10))
  const [newDescription, setNewDescription] = useState(description)

  function handleSubmit() {
    // e.preventDefault()
  }

  return (
    // <>hi</>
    <form>
      <h2>WOW edit an item! {`${newDueDate}`}</h2>
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
          <button onClick={(e) => handleSubmit(e)}>SUBMIT!</button>
        </li>
      </ul>
    </form>
  )
}