export default (
	state = {
		articles: []
	}, action) => {
    switch (action.type){
      case 'FETCH_ARTICLES':
      return {
        ...state,
        articles: action.payload
      }
      default:
        return state
    }
  }
