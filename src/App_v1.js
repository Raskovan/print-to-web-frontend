import React from 'react'
import PublisherContainer from './containers/PublisherContainer'
// import DashboardContainer from './containers/DashboardContainer'
// import ArticleContainer from './containers/ArticleContainer'
import ConsumerContainer from './containers/ConsumerContainer'
// import NavBar from './components/NavBar'
// import Footer from './components/Footer'
// import { connect } from 'react-redux'
// import { getUser } from './actions/UserAuth'
import { Route, withRouter } from 'react-router-dom'
// import { Segment } from 'semantic-ui-react'
import HomeSeman from './containers/HomeSeman'


class App extends React.Component {
	// componentDidMount() {
	// 	const token = localStorage.getItem('token')
	// 	if (token && !this.props.currentUser) {
	// 		this.props.getUser(token, this.props.history)
	// 	}
	// }

	render() {
		return (
			<div>

				<HomeSeman/>
			</div>
		)
	}
}
// {!this.props.loggedIn ? <HomeContainer /> : <DashboardContainer />}

// const mapStateToProps = state => {
// 	return {
// 		loggedIn: state.login.auth.loggedIn,
// 		currentUser: state.login.auth.currentUser,
// 		articles: state.magazine.articles
// 	}
// }

export default App
