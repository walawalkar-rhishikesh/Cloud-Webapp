import { combineReducers } from 'redux'
import userReducers from './reducers/reducers.users'

export default combineReducers({
  user : userReducers
})