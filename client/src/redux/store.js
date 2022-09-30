import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from './slices/auth.slice'
import languageReducer from './slices/language.slice'
import appReducer from './slices/app.slice'

/*
  This is the store. A store holds the whole state tree of your application.
  The only way to change the state inside it is to dispatch an action on it.
*/

/*
  Below are all of the reducers that our app uses.
  Reducers are functions that use the action object and
  performs a state update, returning the new state.
*/
const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  app: appReducer,
  // add more reducers
})

/*
   Redux middleware provides a third-party extension point between
   dispatching an action, and the moment it reaches the reducer. In other words,
   it runs some code before the reducer.
*/
const defaultMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
})

const store = configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line no-undef
  middleware: __DEV__
    ? defaultMiddleware.concat(logger)
    : defaultMiddleware,
})

export default store
