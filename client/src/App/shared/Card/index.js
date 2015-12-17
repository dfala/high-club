import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import s from './Card.css'

export default class Card extends React.Component {
  render () {
    return (
      <div className={s.Card}>
        <img src='https://img1.etsystatic.com/100/0/9268997/il_340x270.833134431_rifo.jpg' />
        <div className={s.description}><a>Leather Belt</a></div>
      </div>
    )
  }
}
