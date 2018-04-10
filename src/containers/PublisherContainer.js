import React from 'react'
import HomeContainer from './HomeContainer'
import DashboardContainer from './DashboardContainer'
import ArticleContainer from './ArticleContainer'
// import MagazineHomePage from './MagazineHomePage'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
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
				<Segment basic>
					<NavBar {...this.props} />
					<Route exact path="/" component={HomeContainer} />
					<Route exact path="/dashboard" component={DashboardContainer} />
					{this.props.articles !== undefined ?
					<Route path='/dashboard/articles/:id'
						render = { renderProps => {
							let articleId = renderProps.match.params.id
							let foundArticle = this.props.articles.find(
					      article => {
					        return article.id === parseInt(articleId, 10)
					      }
					    )
							return (
								< ArticleContainer {...this.props} article={foundArticle} />
							)
						}}></Route> : null}
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
		currentUser: state.login.auth.currentUser,
		articles: state.magazine.articles
	}
}

export default withRouter(connect(mapStateToProps, { getUser })(PublisherContainer))
