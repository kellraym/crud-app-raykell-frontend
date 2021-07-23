import '../Styles/DisplayCompleted.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

export default function DisplayCompleted() {
  const [completedList, setCompletedList] = useState([])
  const [updateList, setUpdateList] = useState(false)


  function getCompleteList() {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/complete`)
      .then(res => res.json())
      .then(json => setCompletedList(json))
    // setUpdateList(!updateList);
  }

  function markNotComplete(id) {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/complete/not/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    setUpdateList(!updateList)
    getCompleteList()
  }

  function deleteItem(id) {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    setUpdateList(!updateList)
    getCompleteList()
  }

  useEffect(() => {
    getCompleteList()
  }, [updateList])


  return (
    <div>
      <h2>⭐ Hall of Fame (your completed items)⭐</h2>
      <div className="completed-list">
        <ol>
          {completedList.length >= 1 ? completedList.map(item => {

            const formattedName = item.name.split(' ').join()
            return (
              <div className="to-dos">
                <li className="list-item" onClick={() => {
                  document.querySelector(`.item${item.id}`).classList.toggle('hidden');
                }}>
                  <span>
                    {item.name}
                  <br /><br />
                  <span className={`item${item.id} hidden`}>
                    {item.description}
                  </span>
                  </span>
                  <span className="due-date">
                    {`Completed: ${item.updated_at.slice(0, 10)} `}
                  </span>
                </li>
                <span>
                  <button className={`uncomplete-${formattedName}`} onClick={() => markNotComplete(item.id)}>Uncomplete</button>
                </span>
                <span>
                  <button className={`delete-${formattedName}`}onClick={() => deleteItem(item.id)}>DELETE</button>
                </span>
              </div>
            )
          })
            : `You have no completed items, boooo`}
        </ol>
      </div>
    </div>

  )
}
