import React from 'react'
// import { Segment } from 'semantic-ui-react'
// import { Link } from "react-router-dom";
import {
	Image,
	Segment,
	Grid,
	Form,
	Header
} from 'semantic-ui-react'

class ArticlePage extends React.Component {
	state = {
		article: {}
	}

	componentDidMount() {
		fetch(
			`http://localhost:4000/articles/${this.props.magname}/${
				this.props.articleName
			}`
		)
			.then(response => response.json())
			.then(response =>
				this.setState({
					article: response
				})
			)
	}
	render() {
		console.log(this.state.article)
		return (
      <Segment basic>
      {'id' in this.state.article ?
				<Grid>
					<Grid.Row columns={1}>
						<Grid.Column width={4} />
						<Grid.Column width={8}>
							<Image src={this.state.article.images[0].url} />
						</Grid.Column>
						<Grid.Column width={4} />
					</Grid.Row>

					<Grid.Row columns={3}>
						<Grid.Column width={4} />
						<Grid.Column width={8}>
            <Header.Subheader>{this.state.article.author}</Header.Subheader>
            <Header style={{fontSize: '3rem'}}>{this.state.article.title}</Header>
            <p style={{fontSize: '1.3rem'}}>{this.state.article.body}</p>
						</Grid.Column>
						<Grid.Column width={4} />
					</Grid.Row>
				</Grid> : null}
			</Segment>
		)
	}
}

export default ArticlePage
