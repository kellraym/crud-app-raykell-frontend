import '../Styles/Navbar.css';
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/additem">Add an item</Link></li>
        <li><Link to="/complete">Completed</Link></li>
      </ul>
    </nav>
  )
}