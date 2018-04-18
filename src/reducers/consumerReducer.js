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
			return {
				...state,
			userPayload: action.payload,
      show: true
			}

      case 'ALL_USERS':
        return {
          ...state,
        users: action.payload.users,
        show: false
        }

		default:
			return state
	}
}
