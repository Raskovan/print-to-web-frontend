export const fetchArticles = () => {
	return dispatch => {
    const token = localStorage.getItem('token')
		return fetch('http://localhost:4000/articles',{
      headers: {
        "Authorization": 'Bearer ' + token
      }
    })
			.then(response => response.json())
			.then(response => dispatch({ type: 'FETCH_ARTICLES', payload: response }))
	}
}
