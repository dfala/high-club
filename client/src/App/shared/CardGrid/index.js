import React, { PropTypes } from 'react'
import Card from 'Card'
import CSSModules from 'react-css-modules'
import s from './CardGrid.css'

export default class CardGrid extends React.Component {
  render () {
    return (
      <div className={s.CardGrid}>
        <Card /><Card /><Card /><Card />
        <Card /><Card /><Card /><Card />
        <Card /><Card /><Card /><Card /><Card /><Card />
      </div>
    )
  }
}
