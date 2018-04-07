import React from 'react'
import { Item, Button, Icon } from 'semantic-ui-react'

class Article extends React.Component {
	render() {

		return (
			<Item>
				<Item.Image size="small" src={this.props.article.images[0].url} />
				<Item.Content>
					<Item.Header as="a">{this.props.article.title}</Item.Header>
					<Item.Description>
						<p>{this.props.article.body.substring(0, 150) + '...'}</p>
					</Item.Description>
					<Item.Extra>
						<Button size="mini" floated="right">
							Edit
							<Icon name="right chevron" />
						</Button>
            <Button size="mini" floated="right">
							Delete
						</Button>
					</Item.Extra>
				</Item.Content>
			</Item>
		)
	}
}

export default Article
