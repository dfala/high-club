import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'App'
// import Stack from 'App/views/Stack'
import Home from 'App/views/Home'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
  </Route>
)

export default routes
