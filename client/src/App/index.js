import './style'
import React, { PropTypes } from 'react'

export default class App extends React.Component {
  propTypes: {
    children: PropTypes.node
  }

  render () {
    const { children } = this.props
    return (
      <div>
        { children }
      </div>
    )
  }
}
