import React from 'react'
// import NavBar from '../components/NavBar'
import UploadForm from '../components/UploadForm'
import UserMagForm from '../components/UserMagForm'
import Article from '../components/Article'
import {
	Container, Button, Icon,
	Image,
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

	handleLoad () {
		console.log('Loading');
	}

	render() {
		let url =	this.props.currentUser ? this.props.currentUser.mag_url : null

		let iframe = document.querySelector('iframe')
		if (iframe) {
			iframe.src = iframe.src
		}

		return (
			<div>
				<Segment style={{ padding: '0em' }} vertical>
					<Grid container stackable>
						<Grid.Row textAlign="left">
							<Grid.Column
								width={7}
								style={{
									paddingBottom: '5em',
									paddingTop: '3em',
									marginTop: '0',
									marginBottom: '0',
									backgroundColor: '#f9fbff'
								}}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Your Dashboard
									<Divider />
								</Header>
								<UserMagForm />
								<Divider
									as="h4"
									className="header"
									horizontal
									style={{
										margin: '3em 0em',
										textTransform: 'uppercase',
										color: '#4183c4'
									}}>
									<p>UPLOAD YOUR FILES HERE</p>
								</Divider>
								<UploadForm />
								<Divider
									as="h4"
									className="header"
									horizontal
									style={{
										margin: '3em 0em',
										textTransform: 'uppercase',
										color: '#4183c4'
									}}>
									<p>YOUR MAGAZINE'S HOMEPAGE PREVIEW</p>
								</Divider>
								<div
									className="thumbnail-container"
									title="Thumbnail Image of your homepage">
									<div className="thumbnail">
										<iframe
											src={process.env.REACT_APP_URL + 'magazines/' + url}
											frameBorder="0"
											title="HomePage"
										/>
									</div>
								</div>
							</Grid.Column>

							<Grid.Column width={1} />

							<Grid.Column
								width={8}
								style={{ paddingBottom: '5em', paddingTop: '3em' }}>
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
													return (
														<Article
															key={article.id}
															article={article}
															mag_url={this.props.currentUser.mag_url}
															handleLoading={this.handleLoad}
														/>
													)
												})
										: null}

								</Item.Group>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>

				<Segment style={{ padding: '5em 0 8em 0' }} vertical>
					<Container text>
						<Divider
							as="h4"
							className="header"
							horizontal
							style={{
								marginBottom: '3em',
								textTransform: 'uppercase',
								color: '#4183c4'
							}}>
							<p>How To</p>
						</Divider>
					</Container>
					<Grid container stackable verticalAlign="middle">
						<Grid.Row>
							<Grid.Column width={8}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Step 1.
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									Add tags to all elements in the inDesign layout file.
									<br />Tags we support: <mark>title</mark>,{' '}
									<mark>subtitle</mark>, <mark>author</mark>, <mark>body</mark>,{' '}
									<mark>quote</mark>, <mark>img</mark>.
								</p>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Step 2.
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									Export the file in an XML format.
								</p>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Step 3.
								</Header>
								<p style={{ fontSize: '1.33em' }}>
									Upload the XML file and a corresponding image to Print-To-Web.
								</p>
							</Grid.Column>
							<Grid.Column floated="right" width={8}>
								<Image
									bordered
									size="large"
									src={require('../img/tagging.gif')}
									style={{ width: '650px' }}
								/>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row style={{marginTop: '3em'}}>
							<Grid.Column textAlign="center">
								<Button icon as='a' href={require('../img/tagging.gif')} download size="huge">
									<Icon name='download'/>
									Download a Layout Sample
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
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
