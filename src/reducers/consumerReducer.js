export default (
	state = {
		userPayload: {},
    users: [],
    show: false
	},
	action
) => {
	switch (action.type) {
		case 'FIND_MAGAZINE':
		console.log(action.payload)
			return {
				...state,
			userPayload: action.payload,
      show: true
			}

      case 'ALL_USERS':
      console.log(action.payload.users)
        return {
          ...state,
        users: action.payload.users,
        show: false
        }

		default:
			return state
	}
}
