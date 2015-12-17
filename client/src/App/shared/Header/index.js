import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import s from './Header.css'

export default class Header extends React.Component {
  render () {
    return (
      <div className={s.wrapper}>
        <div className={s.header}>
          <div className={s.left}></div>
          <div className={s.center}>HIGH CLUB</div>
          <div className={s.right}><Link to={'/login'}>Login</Link></div>
        </div>
      </div>
    )
  }
}
