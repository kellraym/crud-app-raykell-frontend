import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AddItem from './Components/AddItem';
import EditItem from './Components/EditItem';
import DisplayCompleted from './Components/DisplayCompleted';
import SearchResults from './Components/SearchResults';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [updatePage, setUpdatePage] = useState(false)
  document.title = 'To Do List 2.0'

  return (
      <Router>
        <Switch>
          <div>
            <Navbar />
            <section>
              <Route exact path="/" component={Home} />
              <Route path="/additem" component={AddItem} />
              <Route path="/complete" component={DisplayCompleted} />
              <Route path="/edit" component={EditItem} />
              <Route path="/search" component={SearchResults} />
            </section>
          </div>
        </Switch>
      </Router>
  );
}

export default App;
