import '../Styles/Navbar.css';
import React, { useState, useContext } from 'react';
import AppContext from '../Context/AppContext'
import { Link, useHistory } from 'react-router-dom';

export default function Navbar() {
  const [search, setSearch] = useState('')
  const { updatePage, setUpdatePage } = useContext(AppContext)
  const history = useHistory()

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/additem">Add an item</Link></li>
        <li><Link to="/complete">Completed</Link></li>
        <li className="search">
          <input type="text" placeholder="search by name" onChange={(e) => { setSearch(e.target.value) }} value={search} />
          <Link to={{
            pathname: `/search/?name=${search}`,
            values: {
              search: search,
            }
          }}>
            <button onClick={() => setSearch('')}>search</button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}