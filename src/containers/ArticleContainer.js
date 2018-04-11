import React from 'react'
import { Image, Segment, Grid, Form, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateArticle } from '../actions/UserActions'

class ArticleContainer extends React.Component {
	state = {
		article: [],
		title: '',
		body: '',
		author: '',
		subtitle: ''
	}

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push('/')
		}

		this.props.article
			? this.setState({
					article: this.props.article,
					title: this.props.article.title,
					body: this.props.article.body,
					author: this.props.article.author,
					subtitle: this.props.article.subtitle,
					quote: this.props.article.quote
			  })
			: null
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	articleChange = () => {
		let articleObj = {
			title: this.state.title,
			author: this.state.author,
			body: this.state.body,
			subtitle: this.state.subtitle,
			quote: this.state.quote
		}
		this.props.updateArticle(articleObj, this.props.article.id).then(() => {
			this.props.history.push('/dashboard')
		})
	}

	handleCancel = () => {
		this.props.history.push('/dashboard')
	}

	render() {
		console.log(this.state.article)

		return this.props.article ? (
			<Container style={{marginBottom: '30px', marginTop: '30px'}}>
				<Grid>
					<Grid.Row columns={1}>
						<Grid.Column width={3} />
						<Grid.Column width={10}>
							<Image src={this.props.article.images[0].url} />
						</Grid.Column>
						<Grid.Column width={3} />
					</Grid.Row>

					<Grid.Row columns={3}>
						<Grid.Column width={4} />
						<Grid.Column width={8}>
							<Form onSubmit={this.articleChange}>
								<Form.Field>
									<label>Author</label>
									<input
										placeholder="Author"
										value={this.state.author}
										name="author"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field>
									<label>Title</label>
									<input
										placeholder="Title"
										value={this.state.title}
										name="title"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field>
									<label>Subtitle</label>
									<input
										placeholder="Subtitle"
										value={this.state.subtitle}
										name="subtitle"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field
									style={{height: '-webkit-fill-available'}}
									label="Text"
									control="textarea"
									value={this.state.body}
									onChange={this.handleChange}
									name="body"
								/>
								<Form.Field>
									<label>Quote</label>
									<input
										placeholder="Quote"
										value={this.state.quote}
										name="quote"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Button type="submit">Update</Button>
								<Button onClick={this.handleCancel}>Cancel</Button>
							</Form>
						</Grid.Column>
						<Grid.Column width={4} />
					</Grid.Row>
				</Grid>
			</Container>
		) : null
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { updateArticle })(ArticleContainer)
