import React from 'react'
// import NavBar from '../components/NavBar'
import UploadForm from '../components/UploadForm'
import UserMagForm from '../components/UserMagForm'
import Article from '../components/Article'
import { Segment, Grid, Item, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout } from '../actions/UserAuth'
import { fetchArticles } from '../actions/UserActions'

class DashboardContainer extends React.Component {

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push('/')
		} else {
		this.props.fetchArticles()}
	}

	render() {
		return (
			<Segment basic>
				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							<Header as='h1'>Your Dashboard</Header>
							<UserMagForm />
							<UploadForm />
						</Grid.Column>
						<Grid.Column width={8}>
							<Header as='h1'>Your Articles</Header>
							<Item.Group divided>
							{this.props.articles ?
							this.props.articles.map(article => {
								return <Article key={article.id} article={article}/>
							}) : null}
							</Item.Group>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser,
		articles: state.magazine.articles
	}
}

export default connect(mapStateToProps, { logout, fetchArticles })(DashboardContainer)

// {this.props.currentUser ?
//   <div>
// <Header as='h1'>Welcome, {this.props.currentUser.username}</Header><Button onClick={this.props.logout}>Log Out</Button></div>
//  : null}
