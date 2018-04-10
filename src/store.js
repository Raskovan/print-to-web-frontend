import { createStore, applyMiddleware, compose } from 'redux'
import { promiseMiddleware, localStorageMiddleware } from './middleware'
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'


export function configureStore(){
  const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);
  return createStore(
    rootReducer, compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f);
}

export const store = configureStore()
