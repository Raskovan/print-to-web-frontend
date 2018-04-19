import React from 'react'
import { Item, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteArticle } from '../actions/UserActions'
import { Link } from 'react-router-dom'
import { client } from 'filestack-react'

class Article extends React.Component {
	constructor(props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this)
	}

	handleDelete = () => {
		this.props.deleteArticle(this.props.article.id)
		let filestack = client.init(process.env.REACT_APP_FILESTACK_API, {
			policy: process.env.REACT_APP_FILESTACK_POLICY,
			signature: process.env.REACT_APP_FILESTACK_SIGNATURE
		})
		if (
			typeof this.props.article.images[0] !== 'undefined' &&
			this.props.article.images[0].handle !== 'placeholder'
		) {
			filestack.remove(this.props.article.images[0].handle)
		}
	}

	componentDidMount() {
		this.addText()
	}

	addText = () => {
		let divId = document.getElementById(this.props.article.id)
		divId.innerHTML = this.props.article.body.substring(0, 150) + '...'
	}

	render() {
		return (
			<Item>
				{this.props.article.images[0] ? (
					<Item.Image size="small" src={this.props.article.images[0].url} />
				) : (
					<Item.Image
						size="small"
						src="http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png"
					/>
				)}
				<Item.Content>
					<Item.Header
						as="a"
						href={
							process.env.REACT_APP_URL +
							`magazines/${this.props.mag_url}/` +
							this.props.article.title
						}>
						{this.props.article.title}
					</Item.Header>
					<Item.Description>
						<p id={this.props.article.id} align="left" />
					</Item.Description>
					<Item.Extra>
						<Button
							as={Link}
							to={'/dashboard/articles/' + this.props.article.id}
							size="mini"
							floated="right">
							Edit
							<Icon name="right chevron" />
						</Button>

						<Button size="mini" floated="right" onClick={this.handleDelete}>
							Delete
						</Button>
					</Item.Extra>
				</Item.Content>
			</Item>
		)
	}
}

export default connect(null, { deleteArticle })(Article)
