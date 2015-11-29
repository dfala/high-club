import React, { PropTypes } from 'react'
import Header from 'Header'
// import CSSModules from 'react-css-modules'
// import s from './Header.css'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <h1>This is home</h1>
      </div>
    )
  }
}
