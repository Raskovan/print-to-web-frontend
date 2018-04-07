import { combineReducers } from 'redux'
import authUser from './authUser'
import articleReducer from './articleReducer'
 
export default combineReducers({
  login: authUser,
  magazine: articleReducer
})
