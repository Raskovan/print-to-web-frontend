import React from 'react'
import { Item, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteArticle } from '../actions/UserActions'
import { Link } from 'react-router-dom'
import { client } from 'filestack-react'

class Article extends React.Component {
	handleDelete = () => {
		this.props.deleteArticle(this.props.article.id)
		let filestack = client.init(process.env.REACT_APP_FILESTACK_API, {
			policy: process.env.REACT_APP_FILESTACK_POLICY,
			signature: process.env.REACT_APP_FILESTACK_SIGNATURE
		})
		if (this.props.article.images[0]) {

			filestack.remove(this.props.article.images[0].handle)
		}
	}

	render() {
		return (
			<div>
				{this.props.article.images[0] ?
				<Item.Image size="small" src={this.props.article.images[0].url} /> : null }
				<Item.Content>
					<Item.Header as="a">{this.props.article.title}</Item.Header>
					<Item.Description>
						<p align="left">
							{this.props.article.body.substring(0, 150) + '...'}
						</p>
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
			</div>
		)
	}
}

export default connect(null, { deleteArticle })(Article)
