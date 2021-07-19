import './App.css';
import DisplayList from './Components/DisplayList';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import AddItem from './Components/AddItem'
import DisplayCompleted from './Components/DisplayCompleted';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// const port = process.env.port || 3000;

// App.listen(port)

function App() {
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
          </section>
        </div>
      </Switch>
    </Router>

  );
}

export default App;
