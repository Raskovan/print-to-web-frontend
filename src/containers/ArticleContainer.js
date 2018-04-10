import React from 'react'
import {
	Image,
	Segment,
	Grid,
	Form,
	Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateArticle } from '../actions/UserActions'

class ArticleContainer extends React.Component {
	state = {
		article: [],
		title: '',
		body: '',
		author: ''
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
					author: this.props.article.author
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
			body: this.state.body
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
			<Segment basic>
				<Grid>
					<Grid.Row columns={1}>
						<Grid.Column width={4} />
						<Grid.Column width={8}>
							<Image src={this.props.article.images[0].url} />
						</Grid.Column>
						<Grid.Column width={4} />
					</Grid.Row>

					<Grid.Row columns={3}>
						<Grid.Column width={4} />
						<Grid.Column width={8}>
							<Form onSubmit={this.articleChange}>
								<Form.Field>
									<input
										placeholder="Title"
										value={this.state.title}
										name="title"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field>
									<input
										placeholder="Author"
										value={this.state.author}
										name="author"
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field
									control="textarea"
									value={this.state.body}
									onChange={this.handleChange}
									name="body"
								/>

								<Button type="submit">Update</Button>
                <Button onClick={this.handleCancel}>Cancel</Button>
							</Form>
						</Grid.Column>
						<Grid.Column width={4} />
					</Grid.Row>
				</Grid>
			</Segment>
		) : null
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser,
	}
}

export default connect(mapStateToProps, { updateArticle })(ArticleContainer)
