import { setAuthToken } from 'api'

const saveAuthToken = () => (next) => (action) => {
  if (action.type === 'auth/authenticate' && action.payload.loggedIn) {
    // after a successful login, update the token in the API
    setAuthToken(action.payload.idToken)
  }
  // continue processing this action
  return next(action)
}

export default saveAuthToken
