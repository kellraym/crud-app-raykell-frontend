import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

export default function DisplayList() {
  const [list, setList] = useState([])

  function getList() {
    fetch(`http://localhost:3001/`)
      .then(res => res.json())
      .then(json => setList(json))
  }

  function markComplete(id) {
    fetch(`http://localhost:3001/complete/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <ol>
      {list.map(item => {
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
              <button onClick={() => markComplete(item.id)}>Complete</button>
            </span>
            <span>
              <Link to={`edit/${item.id}`}>
                <button>Edit</button>
              </Link>
            </span>
          </div>
        )
      })}
    </ol>
  )
}