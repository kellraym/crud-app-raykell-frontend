import '../Styles/Navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [search, setSearch] = useState('')
  // const [searchResult, setSearchResult] = useState([])

  // function performSearch() {
  //   fetch(`https://crud-app-raykell-backend.herokuapp.com/search/?name=${search}`)
  //     .then(res => res.json())
  //     .then(json => setSearchResult(json))
  // }


  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/additem">Add an item</Link></li>
        <li><Link to="/complete">Completed</Link></li>
        <li className="search">
          <input type="text" placeholder="search by name" onChange={(e) => setSearch(e.target.value)} value={search} />
          <Link to={{
            pathname: `/search/?name=${search}`,
            values: {
              search: search,
            }
          }}>
            <button>search</button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}