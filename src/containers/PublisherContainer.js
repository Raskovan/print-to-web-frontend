import React from 'react'
// import HomeContainer from './HomeContainer'
import DashboardContainer from './DashboardContainer'
import ArticleContainer from './ArticleContainer'
import HomepageLayout from './HomepageLayout'
// import DesktopContainer from './DesktopContainer'
// import MagazineHomePage from './MagazineHomePage'
// import NavBar from '../components/NavBar'
import NavBarSeman from '../components/NavBarSeman'
import FooterSem from '../components/FooterSem'
import { connect } from 'react-redux'
import { getUser } from '../actions/UserAuth'
import { Route, withRouter } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

class PublisherContainer extends React.Component {
	componentDidMount() {
		const token = localStorage.getItem('token')
		if (token && !this.props.currentUser) {
			this.props.getUser(token, this.props.history)
		}
	}

	render() {
		return (
			<div>
				<NavBarSeman {...this.props} />
				<Route exact path="/" component={HomepageLayout} />
				<Route exact path="/dashboard" component={DashboardContainer} />
				{this.props.articles !== undefined ? (
					<Route
						path="/dashboard/articles/:id"
						render={renderProps => {
							let articleId = renderProps.match.params.id
							let foundArticle = this.props.articles.find(article => {
								return article.id === parseInt(articleId, 10)
							})
							return <ArticleContainer {...this.props} article={foundArticle} />
						}}
					/>
				) : null}
				<FooterSem />
			</div>
		)
	}
}
// {!this.props.loggedIn ? <HomeContainer /> : <DashboardContainer />}

const mapStateToProps = state => {
	return {
		loggedIn: state.login.auth.loggedIn,
		currentUser: state.login.auth.currentUser,
		articles: state.magazine.articles
	}
}

export default withRouter(
	connect(mapStateToProps, { getUser })(PublisherContainer)
)
