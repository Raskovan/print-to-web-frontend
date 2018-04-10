export const fetchArticles = () => {
	return dispatch => {
		const token = localStorage.getItem('token')
		return fetch('http://localhost:4000/articles', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => response.json())
			.then(response => dispatch({ type: 'FETCH_ARTICLES', payload: response }))
	}
}

export const updateUserInfo = (id, mag_info) => {
	return dispatch => {
		return fetch(`http://localhost:4000/users/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'applicatin/json'
			},
			body: JSON.stringify(mag_info)
		})
			.then(response => response.json())
			.then(response => dispatch({ type: 'UPDATE_USER', payload: response }))
	}
}

export const deleteArticle = id => {
	return dispatch => {
		return fetch(`http://localhost:4000/articles/${id}`, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then(response => dispatch({ type: 'DELETE_ARTICLE', payload: response }))
	}
}

export const updateArticle = (article, id) => {
	return dispatch => {
		return fetch(`http://localhost:4000/articles/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'applicatin/json'
			},
			body: JSON.stringify(article)
		})
			.then(response => response.json())
			.then(response => dispatch({ type: 'UPDATE_ARTICLE', payload: response }))
	}
}
