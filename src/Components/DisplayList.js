import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

export default function DisplayList() {
  const [list, setList] = useState([])
  const [updateList, setUpdateList] = useState(false)



  function getList() {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/`)
      .then(res => res.json())
      .then(json => setList(json))
  }

  function markComplete(id) {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/complete/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    setUpdateList(!updateList)
    getList()
  }

  useEffect(() => {
    getList()
  }, [updateList])

  return (
    <ol>
      {list.map(item => {
        if (item.due_date.slice(0, 10) === '1999-12-31') {
          item.due_date = 'anytime'
        }
        return (
          <div>
            <li className="list-item" onClick={() => {
              document.querySelector(`.item${item.id}`).classList.toggle('hidden');
            }}>
              {`Name: ${item.name} Due By: ${item.due_date.slice(0, 10)}`}
            </li>
            <span className={`item${item.id} hidden`}>
              {item.description}
              <br />
            </span>
            <span>
              <button onClick={() => markComplete(item.id)}>Complete</button>
            </span>
            <span>
              <Link to={{
                pathname: `edit/${item.id}`,
                values: {
                  id: item.id,
                  name: item.name,
                  dueDate: (item.due_date !== 'anytime' ? item.due_date : '1999-12-31'),
                  description: item.description
                }
              }}>
                <button>Edit</button>
              </Link>
            </span>
          </div>
        )
      })}
    </ol>
  )
}