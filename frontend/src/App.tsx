import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AddStructure } from './pages/add-structure'
import { Header } from '~/common/layout/header'
import { Home } from '~/pages/home'
import { About } from '~/pages/about'
import {
  JsonEditorContextProvider,
  NotifsContextProvider,
} from '~/common/context'
import 'ui-neumorphism/dist/index.css'
// See also: https://akaspanion.github.io/ui-neumorphism/
import 'react-notifications-component/dist/theme.css'
// preferred way to import (from `v4`). Uses `animate__` prefix.
import 'animate.css/animate.min.css'

const App: React.FC = () => {
  return (
    <NotifsContextProvider>
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
    </NotifsContextProvider>
  )
}

export default App
