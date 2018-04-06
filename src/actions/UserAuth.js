import { RestfulAdapter } from '../adapters'

export const fetchLogin = (username, password) => {
	return dispatch => {
		RestfulAdapter.login(username, password, 'login').then(response => {
			if (response.message) {
				alert(response.message)
			} else {
				dispatch({ type: 'LOGIN_USER', payload: response })
			}
		})
	}
}

export const fetchSignup = (username, password) => {
	return dispatch => {
		RestfulAdapter.login(username, password, 'users').then(response => {
			if (response.message) {
				alert(response.message)
			} else {
				dispatch({ type: 'SIGNUP_USER', payload: response })
			}
		})
	}
}

export const getUser = token => {
	return dispatch => {
		RestfulAdapter.getUser(token, 'get_user').then(response => {
			if (response.message) {
				alert(response.message)
			} else {
				dispatch({ type: 'GET_USER', payload: response })
			}
		})
	}
}

export const logout = () => {
  return {
    type: 'LOGOUT_USER'
  }
}
