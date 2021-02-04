import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { AddStructure } from './pages/add-structure'
import { Index } from './pages/index'
import 'ui-neumorphism/dist/index.css'

const App: React.FC = () => {
  return (
    <div className="container">
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/add-structure">Add structure</Link>
        </div>
        <Switch>
          <Route path="/add-structure">
            <AddStructure />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
