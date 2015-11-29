import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import s from './SubHeader.css'

export default class SubHeader extends React.Component {
  render () {
    return (
      <div className={s.subheader}>
        <div className={s.container}>
          <a>Men</a>
          <a>Women</a>
          <a>Home</a>
          <a>Accessories</a>
        </div>
      </div>
    )
  }
}
