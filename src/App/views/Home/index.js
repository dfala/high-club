import React, { PropTypes } from 'react'
import Header from 'Header'
import SubHeader from 'SubHeader'
import CardGrid from 'CardGrid'
// import CSSModules from 'react-css-modules'
// import s from './Header.css'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <SubHeader />
        <br />
        <CardGrid />
      </div>
    )
  }
}
