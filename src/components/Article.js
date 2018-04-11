import React from 'react'
import { Item, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deleteArticle } from '../actions/UserActions'
import { Link } from "react-router-dom";

class Article extends React.Component {

	handleDelete = () => {
		this.props.deleteArticle(this.props.article.id)
	}

	render() {

		return (
			<Item>
				<Item.Image size="small" src={this.props.article.images[0].url} />
				<Item.Content>
					<Item.Header as="a">{this.props.article.title}</Item.Header>
					<Item.Description>
						<p align='left'>{this.props.article.body.substring(0, 150) + '...'}</p>
					</Item.Description>
					<Item.Extra>

						<Button as={Link} to={'/dashboard/articles/' + this.props.article.id} size="mini" floated="right">
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
