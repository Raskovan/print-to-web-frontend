import React from 'react'
import HomeContainer from './containers/HomeContainer'
import DashboardContainer from './containers/DashboardContainer'
import { connect } from 'react-redux'
import { getUser } from './actions/UserAuth'
// import { Route, withRouter, Switch } from 'react-router-dom'

class App extends React.Component {
	componentDidMount() {
		const token = localStorage.getItem('token')
		if (token) {
			console.log(token)
			this.props.getUser(token)
		}
	}

	render() {
		return (
			<div>
				{!this.props.loggedIn ? <HomeContainer /> : <DashboardContainer />}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.login.auth.loggedIn,
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { getUser })(App)
