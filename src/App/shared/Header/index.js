import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import s from './Header.css'

export default class PurchaseCredit extends React.Component {
  render () {
    return (
      <div className={s.wrapper}>
        <div className={s.header}>
          <div className={s.left}></div>
          <div className={s.center}>High Club</div>
          <div className={s.right}></div>
        </div>
      </div>
    )
  }
}
