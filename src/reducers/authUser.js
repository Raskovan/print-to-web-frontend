export default (
	state = {
		auth: {
			loggedIn: false,
      currrenUser: null
		}
	}, action) => {
	switch (action.type) {
		case 'LOGIN_USER':

			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				auth: {
					loggedIn: true,
          currentUser: action.payload.user,
					token: action.payload.token
				}
			}

      case 'LOGOUT_USER':
      localStorage.removeItem('token')
      return {
        ...state,
				auth: {
					loggedIn: false,
          currentUser: null,
					token: undefined
				}
      }

      case 'SIGNUP_USER':
      localStorage.setItem('token', action.payload.token)

      return {
        ...state,
        auth: {
          loggedIn: true,
          currentUser: action.payload.user,
          token: action.payload.token
        }
      }

      case 'GET_USER':
      return {
        ...state,
        auth: {
          loggedIn: true,
          currentUser: action.payload,
          token: action.payload.token
        }
      }

			case 'UPDATE_USER':
			console.log(state);
			return {
				...state,
				auth: {
					...state.auth,
					currentUser: action.payload
					}
				}

		default:
			return state

	}
}
