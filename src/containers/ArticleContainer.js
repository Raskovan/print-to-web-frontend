import React from 'react'
import { Image, Grid, Form, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateArticle, fetchArticles } from '../actions/UserActions'
import ReactFilestack from 'filestack-react'
import { client } from 'filestack-react'

class ArticleContainer extends React.Component {
	state = {
		article: [],
		title: '',
		body: '',
		author: '',
		subtitle: '',
		quote: '',
		images: [],
	}

	onChange = (editorState) => this.setState({editorState})

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push('/')
		} else if (this.props.article) {
			this.setState({
					article: this.props.article,
					title: this.props.article.title,
					body: this.props.article.body,
					author: this.props.article.author,
					subtitle: this.props.article.subtitle,
					quote: this.props.article.quote,
					images: this.props.article.images,
			  })
		}
	}

	uploadImage = response => {
		let filestack = client.init(process.env.REACT_APP_FILESTACK_API, {
			policy: process.env.REACT_APP_FILESTACK_POLICY,
			signature: process.env.REACT_APP_FILESTACK_SIGNATURE
		})
		filestack.remove(this.props.article.images[0].handle)
		// console.log(this.props.article.images)
		let img_id = this.props.article.images[0].id
		fetch(process.env.REACT_APP_HOST+`/images/${img_id}`, {
			method: 'DELETE'
		})

		fetch(process.env.REACT_APP_HOST+'/images', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json'
			},
			body: JSON.stringify({
				article_id: this.state.article.id,
				url: response.filesUploaded[0].url,
				handle: response.filesUploaded[0].handle
			})
		})
			.then(r => r.json())
			.then(image => this.setState({ images: image }))
			.then(response => this.props.fetchArticles())
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
			quote: this.state.quote,
			images: []
		}
		this.props.updateArticle(articleObj, this.props.article.id).then(() => {
			this.props.history.push('/dashboard')
		})
	}

	handleCancel = () => {
		this.props.history.push('/dashboard')
	}

	render() {
		return this.props.article ? (
			<Container style={{ marginBottom: '30px', marginTop: '30px' }}>
				<Grid>
					<Grid.Row columns={1}>
						<Grid.Column width={3} />
						<Grid.Column width={10}>
							<ReactFilestack
								options={{
									accept: 'image/*',
									fromSources: 'local_file_system'
								}}
								apikey={process.env.REACT_APP_FILESTACK_API}
								security={{
									policy: process.env.REACT_APP_FILESTACK_POLICY,
									signature: process.env.REACT_APP_FILESTACK_SIGNATURE
								}}
								buttonText="Upload Your Image"
								buttonClass="classname"
								onSuccess={this.uploadImage}
								render={({ onPick }) => (
									<Button
										primary
										onClick={onPick}
										style={{ position: 'absolute', zIndex: '1' }}>
										Replace Image
									</Button>
								)}
							/>
							{this.props.article.images ? (
								<Image src={this.props.article.images[0].url} />
							) : null}
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
									style={{ height: '-webkit-fill-available' }}
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

export default connect(mapStateToProps, { updateArticle, fetchArticles })(
	ArticleContainer
)
