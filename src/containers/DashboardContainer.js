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
		// if (this.props.articles !==[]) {
		// 	debugger
		// }

	// 	let iframe = document.getElementById('preview')
	// 	if (iframe) {
	// 		iframe.src = iframe.src
	// 	}

// 		<Segment basic style={{padding: '0', height: '100%'}}>
// 		<iframe
// 			className="ui basic segment iframe_case"
// 			width="100%"
// 			height="100%"
// 			id="preview"
// 			style={{ background: 'grey' }}
// 			src={'http://localhost:3000/magazines/' + url}
// 		/>
// </Segment>


		let sortedArticles
		let url
		this.props.currentUser ? url = this.props.currentUser.mag_url : null
		// console.log(process.env.REACT_APP_HOST)

		return (
			<div>
				<Segment style={{ padding: '0em' }} vertical>

					<Grid container celled="internally" columns="equal" stackable>
						<Grid.Row textAlign="left">
							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '3em' }}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Your Dashboard
									<Divider/>
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
										<a href="#">YOUR MAGAZINE'S PAGE</a>
									</Divider>

									<Grid.Row columns={2}>
							      <Grid.Column>
											<div className="thumbnail-container" title="Thumbnail Image of your homepage">
												<div className="thumbnail">
												 <iframe src={"http://localhost:3000/magazines/" + url} frameBorder="0" title="HomePage"></iframe>
												</div>
											</div>
							      </Grid.Column>
							      <Grid.Column>
											<div className="thumbnail-container" title="Thumbnail Image of your homepage">
												<div className="thumbnail">
												 <iframe src={"http://localhost:3000/magazines/" + url} frameBorder="0" title="ArticlePage"></iframe>
												</div>
											</div>
							      </Grid.Column>
							    </Grid.Row>





							</Grid.Column>

							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '3em' }}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Your Articles
									<Divider/>
								</Header>
								<Item.Group divided>
									{this.props.articles
										? this.props.articles.sort((a, b) => {return a.position - b.position}).map(article => {
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

// <Segment style={{ padding: '8em 0em' }} vertical>
// <Grid>
// 	<Grid.Row>
// 		<Grid.Column width={8}>
// 			<Header as="h1">Your Dashboard</Header>
// 			<UserMagForm />
// 			<UploadForm />
// 			<div style={{ height: '100%' }}>
// 				<Header as="h1">Your Homepage Preview</Header>
				// <iframe
				// 	className="ui basic segment iframe_case"
				// 	width="100%"
				// 	height="100%"
				// 	id="preview"
				// 	style={{ background: 'grey' }}
				// 	src="http://localhost:3000/magazines/kidsmag"
				// />
// 			</div>
// 		</Grid.Column>
// 		<Grid.Column width={8}>
// 			<Header as="h1">Your Articles</Header>
// 			<Item.Group divided>
// 				{this.props.articles
// 					? this.props.articles.map(article => {
// 							return <Article key={article.id} article={article} />
// 						})
// 					: null}
// 			</Item.Group>
// 		</Grid.Column>
// 	</Grid.Row>
// </Grid>
// </Segment>


const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser,
		articles: state.magazine.articles
	}
}

export default connect(mapStateToProps, { logout, fetchArticles })(
	DashboardContainer
)
