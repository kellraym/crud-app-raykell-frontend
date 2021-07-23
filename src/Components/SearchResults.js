import '../Styles/SearchResults.css'
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function SearchResults(props) {
  const [search, setSearch] = useState(props.location.values.search)
  // page fails to render after refresh because search is set to undefined
  const [key, setKey] = useState(props.location.key)
  const [resultList, setResultList] = useState([])
  const [updateList, setUpdateList] = useState(false)
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
            const formattedName = item.name.split(' ').join()
            if (item.due_date.slice(0, 10) === '1999-12-31') {
              item.due_date = 'anytime'
            }
            return (
              <div className="to-dos">
                <li className="list-item" onClick={() => {
                  document.querySelector(`.item${item.id}`).classList.toggle('hidden');
                }}>
                  <span>
                    {item.name}
                    <br /><br />
                    <span className={`item${item.id} description hidden`}>
                      {item.description}
                    </span>
                  </span>
                  <span className="due-date">
                    {`Due: ${item.due_date.slice(0, 10)}`}
                  </span>
                  <br />
                </li>
                <span>
                  <button className={`complete-${formattedName}`} onClick={() => {
                    if (!item.complete) {
                      markComplete(item.id)
                    } else {
                      alert(`'${item.name}' already completed`)
                    }
                  }}>
                    Complete
                  </button>
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
                    <button className={`edit-${formattedName}`} onClick={() => history.push('/')}>Edit</button>
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