import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'App'
// import Stack from 'App/views/Stack'
import Home from 'App/views/Home'
import Auth from 'App/views/Auth'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={Auth} />
  </Route>
)

export default routes
