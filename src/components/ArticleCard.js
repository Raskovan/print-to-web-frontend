import React from 'react'
import { Image, Card } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class ArticleCard extends React.Component {


	// let url_addon='?policy=eyJleHBpcnkiOjQxMDA3Mzg0MDB9& signature=b34730361115a27c67593c1f67e2b135e1f928776616067c14cf46bdb3d7ee4a'

	componentDidMount() {
		this.addText()
	}

	addText = () => {
		let divId = document.getElementById(this.props.article.id)
		divId.innerHTML = this.props.article.body.substring(0, 150) + '...'
	}
	render(){
	return (
		<Card as={Link} to={'/magazines/' + this.props.magName + '/' + this.props.article.title} style={{borderRadius: '0'}}>
			{this.props.article.images[0] ?
			<Image src={this.props.article.images[0].url} style={{borderRadius: '0'}} /> : <Image src='http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png' style={{borderRadius: '0'}} />}
			<Card.Content>
				<Card.Header>{this.props.article.title}</Card.Header>
				<Card.Meta>{this.props.article.author}</Card.Meta>
				<Card.Description id={this.props.article.id}>
				</Card.Description>
			</Card.Content>
		</Card>
	)
}
}

export default ArticleCard
