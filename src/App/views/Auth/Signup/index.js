import React, { PropTypes } from 'react'
import { createAccount } from 'api/auth'
import CSSModules from 'react-css-modules'
import s from './Signup.css'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      confirmPassword: null
    }
  }

  submitForm (e) {
    e.preventDefault()
    createAccount(this.state)
    .then(response => console.warn(response))
    .catch(err => console.error(err))
  }

  render () {
    const { email, password, confirmPassword } = this.state
    return (
      <div className={s.container}>
        <form>
          <input placeholder='Email'
                 onChange={e => this.setState({email: e.target.value})} />
          <input placeholder='Password'
                 onChange={e => this.setState({password: e.target.value})} />
          <input placeholder='Confirm password'
                 onChange={e => this.setState({confirmPassword: e.target.value})} />
          <button onClick={e => this.submitForm(e)}>Create an account</button>
        </form>
      </div>
    )
  }
}
