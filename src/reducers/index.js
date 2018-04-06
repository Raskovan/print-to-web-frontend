import { combineReducers } from 'redux'
import authUser from './authUser'
 
export default combineReducers({
  login: authUser
})
