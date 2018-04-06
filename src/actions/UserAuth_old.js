const headers = () => {
	return {
		'Content-Type': 'application/json',
		Accepts: 'application/json',
		Authorization: localStorage.getItem('token')
	}
}

export const fetchLogin = (username, password) => {
  return dispatch => {
		return fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: headers(),
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
			.then(response => response.json())
			.then(response => {
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
		return fetch('http://localhost:4000/users', {
			method: 'POST',
			headers: headers(),
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
			.then(response => response.json())
			.then(response => {
				if (response.message) {
					alert(response.message)
				} else {
					dispatch({ type: 'SIGNUP_USER', payload: response })
				}
			})
	}
}

export const logout = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export const getUser = (token) => {
	return dispatch => {
		return fetch('http://localhost:4000/get_user', {
			headers: {
        "Authorization": 'Bearer ' + token
      }
		})
			.then(response => response.json())
			.then(response => {
				if (response.message) {
					alert(response.message)
				} else {
          console.log(response.username)
					dispatch({ type: 'GET_USER', payload: response })
				}
			})
	}
}
