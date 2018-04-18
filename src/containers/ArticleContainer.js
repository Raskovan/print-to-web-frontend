import React from 'react';
import PropTypes from 'prop-types'
import { Image, Grid, Form, Button, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateArticle, fetchArticles } from '../actions/UserActions'
import ReactFilestack from 'filestack-react'
import { client } from 'filestack-react'
import RichTextEditor from 'react-rte'

const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'}
    ]
  };

class ArticleContainer extends React.Component {
	constructor(props){
		super(props)
		this.uploadImage = this.uploadImage.bind(this)
	}

	static propTypes = {
		onChange: PropTypes.func
	}

	state = {
		article: [],
		title: '',
		// body: '',
		author: '',
		subtitle: '',
		quote: '',
		images: [],
		body: RichTextEditor.createEmptyValue()
	}

	onChange = body => {
		this.setState({ body })
		// if (this.props.onChange) {
		// 	// Send the changes up to the parent component as an HTML string.
		// 	// This is here to demonstrate using `.toString()` but in a real app it
		// 	// would be better to avoid generating a string on each change.
		// 	this.props.onChange(body.toString('html'))
		// }
	}

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push('/')
		} else if (this.props.article) {
			this.setState({
				article: this.props.article,
				title: this.props.article.title,
				// body: this.props.article.body,
				author: this.props.article.author,
				subtitle: this.props.article.subtitle,
				quote: this.props.article.quote,
				images: this.props.article.images,
				body: RichTextEditor.createValueFromString(this.props.article.body, 'html'),
			})
		}
	}

	uploadImage = response => {
		// debugger
		if (this.props.article.images[0] !== undefined) {
		let filestack = client.init(process.env.REACT_APP_FILESTACK_API, {
			policy: process.env.REACT_APP_FILESTACK_POLICY,
			signature: process.env.REACT_APP_FILESTACK_SIGNATURE
		})
			filestack.remove(this.props.article.images[0].handle)
			let img_id = this.props.article.images[0].id
			fetch(process.env.REACT_APP_HOST + `/images/${img_id}`, {
				method: 'DELETE'
			})
		}

		fetch(process.env.REACT_APP_HOST + '/images', {
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
			body: this.state.body.toString('html'),
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
						<Grid.Column width={1} />
						<Grid.Column width={14}>
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
						{this.props.article.images[0] ? (
								<Image src={this.props.article.images[0].url} style={{minWidth: '100%'}}/>
							) : <Image src='http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png' style={{minWidth: '100%'}}/> }
						</Grid.Column>
						<Grid.Column width={1} />
					</Grid.Row>

					<Grid.Row columns={3}>
						<Grid.Column width={2} />
						<Grid.Column width={12}>
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
								<Form.Field>
								<label>Text</label>
								<RichTextEditor
									value={this.state.body}
									onChange={this.onChange}
									toolbarConfig={toolbarConfig}
								/>
							</Form.Field>

								<Form.Field>
									<label>Quote</label>
									<input
										placeholder="Quote"
										value={this.state.quote}
										name="quote"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Button type="submit" primary>Update</Button>
								<Button onClick={this.handleCancel}>Cancel</Button>
							</Form>
						</Grid.Column>
						<Grid.Column width={2} />
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

// <Form.Field
// 	style={{ height: '-webkit-fill-available' }}
// 	label="Text"
// 	control="textarea"
// 	value={this.state.body}
// 	onChange={this.handleChange}
// 	name="body"
// />

export default connect(mapStateToProps, { updateArticle, fetchArticles })(
	ArticleContainer
)
