import '../Styles/DisplayCompleted.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

export default function DisplayCompleted() {
  const [completedList, setCompletedList] = useState([])


  function getCompleteList() {
    fetch(`http://localhost:3001/complete`)
      .then(res => res.json())
      .then(json => setCompletedList(json))
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
                <button>Uncomplete</button>
              </span>
              <span>
                <Link to={`edit/${item.id}`}>
                  <button>DELETE FOREVER!</button>
                </Link>
              </span>
            </div>
          )
        })}
      </ol>
    </div>
  )
}
