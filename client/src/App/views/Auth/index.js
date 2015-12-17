import React, { PropTypes } from 'react'
import Header from 'Header'
import Login from './Login'
import Signup from './Signup'
// import CSSModules from 'react-css-modules'
// import s from './CardGrid.css'

export default class Auth extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <Login />
        <Signup />
      </div>
    )
  }
}
