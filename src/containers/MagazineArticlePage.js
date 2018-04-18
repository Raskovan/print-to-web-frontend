import React from 'react'
// import { Segment } from 'semantic-ui-react'
// import { Link } from "react-router-dom";
import { Image, Grid, Header, Container, Divider } from 'semantic-ui-react'

class ArticlePage extends React.Component {
	state = {
		article: {}
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_HOST+`/articles/${this.props.magname}/${
				this.props.articleName}`
		)
			.then(response => response.json())
			.then(response =>
				this.setState({
					article: response
				}, this.addText)
			)

	}

addText = () => {
	let divId = document.getElementById('9997')
	divId.innerHTML = this.state.article.body
}

	render() {
		return (
			<Container>
				{'id' in this.state.article ? (
					<Grid>
						<Grid.Row columns={1}>
							<Grid.Column width={16}>
								<Image style={{minWidth: '100%'}} src={this.state.article.images[0] ? this.state.article.images[0].url : 'http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png'} />
							</Grid.Column>
						</Grid.Row>

						<Grid.Row columns={3}>
							<Grid.Column width={2} />
							<Grid.Column width={12}>
								<Header style={{ fontSize: '4rem', marginBottom: '0' }}>
									{this.state.article.title}
								</Header>
								<Header style={{ fontSize: '1.8rem', fontWeight: '300', marginTop: '0' }}>
									{this.state.article.subtitle}
								</Header>
								<Header.Subheader>{this.state.article.author}</Header.Subheader>
								<Divider />
								<Container text style={{ marginBottom: '50px'}}>

									<div id='9997' style={{
										fontSize: '1.8rem',
										fontFamily: 'EB Garamond'
									}}>

								</div>
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
