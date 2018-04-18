import { RestfulAdapter } from '../adapters'

export const findUser = (url, route) => {
	return dispatch => {
		return RestfulAdapter.fetchAllUsers(url, 'findUser').then(response => {
			if (response.message) {
				alert(response.message)
			} else {
				dispatch({ type: 'FIND_MAGAZINE', payload: response })
			}
		})
	}
}

export const getAllUsers = (route) => {
	return dispatch => {
		return RestfulAdapter.getUsers('users').then(response => {
			if (response.message) {
				alert(response.message)
			} else {
				dispatch({ type: 'ALL_USERS', payload: response })
			}
		})
	}
}
