import '../Styles/SearchResults.css'
import AppContext from '../Context/AppContext';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function SearchResults(props) {
  const [search, setSearch] = useState(props.location.values.search)
  const [key, setKey] = useState(props.location.key)
  const [resultList, setResultList] = useState([])
  const [updateList, setUpdateList] = useState(false)
  const { updatePage } = useContext(AppContext)
  const history = useHistory()

  function performSearch() {
    fetch(`https://crud-app-raykell-backend.herokuapp.com/search/?name=${search}`)
      .then(res => res.json())
      .then(json => setResultList(json))
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
    performSearch()
  }

  useEffect(() => {
    setKey(props.location.key)
  }, [props.location.key])

  useEffect(() => {
    setSearch(props.location.values.search)
    performSearch()
  }, [key])

  useEffect(() => {
    performSearch()
  }, [search])
  // all three of these are needed. useEffect can watch params, pretty neat


  return (
    <div>
      <h2>searching for {`'${search}'`} <br /> I hope we find it ¯\_(ツ)_/¯</h2>
      <ul>
        {resultList.length >= 1 ?
          resultList.map(item => {
            if (item.due_date.slice(0, 10) === '1999-12-31') {
              item.due_date = 'anytime'
            }
            return (
              <div>
                <li className="list-item" onClick={() => {
                  document.querySelector(`.item${item.id}`).classList.toggle('hidden');
                }}>
                  {`Name: ${item.name} Due By: ${item.due_date.slice(0, 10)} Completed: ${item.completed}`}
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
          })
          : `Nothing found, sorry`}
      </ul>
      {/* <button onCLick={() => setKey(props.location.key)}>press me</button> */}
    </div>
  )
}