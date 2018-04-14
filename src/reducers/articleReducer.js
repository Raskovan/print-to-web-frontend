export default (
	state = {
		articles: []
	},
	action
) => {
	switch (action.type) {
		case 'FETCH_ARTICLES':
			return {
				...state,
				articles: action.payload
			}
		case 'DELETE_ARTICLE':
			return {
				...state,
				articles: state.articles.filter(article => {
					return article.id !== action.payload.id
				})
			}

			case 'UPDATE_ARTICLE':

				return {
					...state,
					articles: [...state.articles.filter(article => {
						return article.id !== action.payload.id
					}), action.payload]
				}

				// case 'DELETE_IMAGE':
				// return {
				// 	...state,
				//
				// }

		default:
			return state
	}
}
