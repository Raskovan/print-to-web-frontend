import React from 'react'
import { Image, Card } from 'semantic-ui-react'
import { Link } from "react-router-dom";


const ArticleCard = props => {
	let url_addon='?policy=eyJleHBpcnkiOjQxMDA3Mzg0MDB9& signature=b34730361115a27c67593c1f67e2b135e1f928776616067c14cf46bdb3d7ee4a'
	return (
		<Card as={Link} to={'/magazines/' + props.magName + '/' + props.article.title}>
			<Image src={props.article.images[0].url} />
			<Card.Content>
				<Card.Header>{props.article.title}</Card.Header>
				<Card.Meta>{props.article.author}</Card.Meta>
				<Card.Description>
					{props.article.body.substring(0, 150) + '...'}
				</Card.Description>
			</Card.Content>
		</Card>
	)
}

export default ArticleCard
