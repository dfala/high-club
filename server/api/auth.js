import axios from 'axios'

export const createAccount = accountInfo =>
  axios.post('localhost.com:3000/api/user', accountInfo)
