import './style'
import React, { PropTypes } from 'react'

// const App = ({children}) => (
//   <div>
//     { children }
//   </div>
// )
//
// App.propTypes = {
//   children: PropTypes.node
// }
//
// export default App

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
