import React from 'react'
import HomeContainer from './containers/HomeContainer'
import DashboardContainer from './containers/DashboardContainer'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { connect } from 'react-redux'
import { getUser } from './actions/UserAuth'
import { Route, withRouter } from 'react-router-dom'
import { Segment, Menu } from 'semantic-ui-react'

class App extends React.Component {
	componentDidMount() {
		const token = localStorage.getItem('token')
		if (token && !this.props.currentUser) {
			this.props.getUser(token, this.props.history)
		}
	}

	render() {
		return (
			<div>
				<Segment basic>
					<NavBar {...this.props} />
					<Route exact path="/" component={HomeContainer} />
					<Route path="/dashboard" component={DashboardContainer} />
					<Footer />
				</Segment>
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
