import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AddStructure } from './pages/add-structure'
import { Header } from '~/common/layout/header'
import { Home } from '~/pages/home'
import { About } from '~/pages/about'
import { JsonEditorContextProvider } from '~/common/context'
import 'ui-neumorphism/dist/index.css'
// See also: https://akaspanion.github.io/ui-neumorphism/

const App: React.FC = () => {
  return (
    <JsonEditorContextProvider>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/add-structure">
              <AddStructure />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </JsonEditorContextProvider>
  )
}

export default App
