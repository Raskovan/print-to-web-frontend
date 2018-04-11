import React from 'react'
// import { Segment } from 'semantic-ui-react'
// import { Link } from "react-router-dom";
import {
	Image,
	Segment,
	Grid,
	Form,
	Header,
	Container, Divider
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
			<Container>
				{'id' in this.state.article ? (
					<Grid>
						<Grid.Row columns={1}>
							<Grid.Column width={16}>
								<Image src={this.state.article.images[0].url} />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row columns={3}>
							<Grid.Column width={2} />
							<Grid.Column width={12}>
								<Header style={{ fontSize: '4rem' }}>
									{this.state.article.title}
								</Header>
								<Header style={{ fontSize: '1.8rem' }}>
									{this.state.article.quote}
								</Header>
								<Header.Subheader>{this.state.article.author}</Header.Subheader>
								<Divider/>
								<Container text>
									<p style={{ fontSize: '1.3rem' }}>
										{this.state.article.body}
									</p>
								</Container>
							</Grid.Column>
							<Grid.Column width={2} />
						</Grid.Row>
					</Grid>
				) : null}
			</Container>
		)
	}
}

export default ArticlePage
