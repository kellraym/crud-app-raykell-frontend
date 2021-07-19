import '../Styles/DisplayCompleted.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

export default function DisplayCompleted() {
  const [completedList, setCompletedList] = useState([])


  function getCompleteList() {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/complete`)
      .then(res => res.json())
      .then(json => setCompletedList(json))
  }

  function markNotComplete(id) {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/complete/not/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  function deleteItem(id) {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/delete/${id}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  useEffect(() => {
    getCompleteList()
  }, [])

  return (
    <div className="completed-list">
      <h2>⭐ Hall of Fame (your completed items)⭐</h2>
      <ol>
        {completedList.map(item => {
          return (
            <div>
              <li className="list-item" onClick={() => {
                document.querySelector(`.item${item.id}`).classList.toggle('hidden');
              }}>
                {`Name: ${item.name} Due By: ${item.due_date} `}
              </li>
              <span className={`item${item.id} hidden`}>
                {item.description}
                <br />
              </span>
              <span>
                <button onClick={() => markNotComplete(item.id)}>Uncomplete</button>
              </span>
              <span>
                <button onCLick={() => deleteItem(item.id)}>DELETE FOREVER!</button>
              </span>
            </div>
          )
        })}
      </ol>
    </div>
  )
}
