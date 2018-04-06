import React from 'react'
import HomeContainer from './containers/HomeContainer'
import DashboardContainer from './containers/DashboardContainer'
import NavBar from './components/NavBar'
import { connect } from 'react-redux'
import { getUser } from './actions/UserAuth'
import { Route, withRouter, Switch } from 'react-router-dom'

class App extends React.Component {
	componentDidMount() {
		const token = localStorage.getItem('token')
		if (token) {
			console.log(token)
			this.props.getUser(token)
		}
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<NavBar {...this.props}/>
				<Route exact path='/' component={HomeContainer}/>
				<Route path='/dashboard' component={DashboardContainer}/>
			</div>
		)
	}
}
// {!this.props.loggedIn ? <HomeContainer /> : <DashboardContainer />}

const mapStateToProps = state => {
	return {
		loggedIn: state.login.auth.loggedIn,
		currentUser: state.login.auth.currentUser
	}
}

export default withRouter(connect(mapStateToProps, { getUser })(App))
