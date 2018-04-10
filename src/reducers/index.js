import { combineReducers } from 'redux'
import authUser from './authUser'
import articleReducer from './articleReducer'
import consumerReducer from './consumerReducer'
 
export default combineReducers({
  login: authUser,
  magazine: articleReducer,
  userPayload: consumerReducer,
  show: consumerReducer,
  users: consumerReducer
})
