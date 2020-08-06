import React, { Component } from 'react'
import MainNav from './components/parts/MainNav'
import Login from './pages/Login'
import Home from './pages/Home'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
           
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
          </Switch>

         
        </div>
      </BrowserRouter>
    )
  }
}

export default App