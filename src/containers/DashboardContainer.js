import React from 'react'
// import NavBar from '../components/NavBar'
import UploadForm from '../components/UploadForm'
import UserMagForm from '../components/UserMagForm'
import Article from '../components/Article'
import {
	Container,
	Divider,
	Grid,
	Header,
	Segment,
	Item
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout } from '../actions/UserAuth'
import { fetchArticles } from '../actions/UserActions'

class DashboardContainer extends React.Component {
	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push('/')
		} else {
			this.props.fetchArticles()
		}
	}

	render() {

		let sortedArticles
		let url
		this.props.currentUser ? (url = this.props.currentUser.mag_url) : null
		let iframe = document.querySelector('iframe')
		if (iframe) {
			iframe.src = iframe.src
		}

		return (
			<div>
				<Segment style={{ padding: '0em' }} vertical>
					<Grid container stackable>
						<Grid.Row textAlign="left">

							<Grid.Column width={7} style={{ paddingBottom: '5em', paddingTop: '3em', marginTop: '0', marginBottom: '0', backgroundColor: '#f9fbff' }}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Your Dashboard
									<Divider />
								</Header>
								<UserMagForm />
								<Divider
									as="h4"
									className="header"
									horizontal
									style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
									<a href="#">UPLOAD YOUR FILES HERE</a>
								</Divider>
								<UploadForm />
								<Divider
									as="h4"
									className="header"
									horizontal
									style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
									<a href="#">YOUR MAGAZINE'S HOMEPAGE PREVIEW</a>
								</Divider>
										<div
											className="thumbnail-container"
											title="Thumbnail Image of your homepage">
											<div className="thumbnail">
												<iframe
													src={process.env.REACT_APP_URL+'magazines/' + url}
													frameBorder="0"
													title="HomePage"
												/>
											</div>
										</div>
							</Grid.Column>

							<Grid.Column width={1}></Grid.Column>

							<Grid.Column width={8} style={{ paddingBottom: '5em', paddingTop: '3em' }}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Your Articles
									<Divider />
								</Header>
								<Item.Group divided>
									{this.props.articles
										? this.props.articles
												.sort((a, b) => {
													return a.position - b.position
												})
												.map(article => {
													return <Article key={article.id} article={article} />
												})
										: null}
								</Item.Group>
							</Grid.Column>

						</Grid.Row>
					</Grid>
				</Segment>

				<Segment style={{ padding: '8em 0em' }} vertical>
					<Container text>
						<Divider
							as="h4"
							className="header"
							horizontal
							style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
							<a href="#">EXPLANATIONS</a>
						</Divider>
					</Container>
				</Segment>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser,
		articles: state.magazine.articles
	}
}

export default connect(mapStateToProps, { logout, fetchArticles })(
	DashboardContainer
)
