import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.css'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import { BrowserRouter as Router } from 'react-router-dom'

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render((
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>),
	document.getElementById('root')
)
