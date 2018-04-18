import React from 'react'
// import { Segment } from 'semantic-ui-react'
// import { Link } from "react-router-dom";
import { Image, Grid, Header, Container, Divider } from 'semantic-ui-react'

class ArticlePage extends React.Component {
	state = {
		article: {}
	}

	componentDidMount() {
		fetch(
			process.env.REACT_APP_HOST +
				`/articles/${this.props.magname}/${this.props.articleName}`
		)
			.then(response => response.json())
			.then(response =>
				this.setState(
					{
						article: response
					},
					this.addText
				)
			)
	}

	addText = () => {
		let firstHalf
		let halfText
		let secondHalfText
		let divId = document.getElementById('9997')
		firstHalf = Math.round(this.state.article.body.split(' ').length / 2, 2)
		halfText = this.state.article.body
			.split(' ')
			.splice(0, firstHalf)
			.join(' ')
		secondHalfText = this.state.article.body
			.split(' ')
			.splice(firstHalf)
			.join(' ')
		divId.innerHTML = halfText
		let divIdSecond = document.getElementById('9998')
		divIdSecond.innerHTML = secondHalfText
	}

	render() {
		return (
			<Container>
				{'id' in this.state.article ? (
					<Grid>
						<Grid.Row columns={1}>
							<Grid.Column width={16}>
								<Image
									style={{ minWidth: '100%' }}
									src={
										this.state.article.images[0]
											? this.state.article.images[0].url
											: 'http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png'
									}
								/>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row columns={3}>
							<Grid.Column width={2} />
							<Grid.Column width={12}>
								<Header style={{ fontSize: '4rem', marginBottom: '0' }}>
									{this.state.article.title}
								</Header>
								<Header
									style={{
										fontSize: '1.8rem',
										fontWeight: '300',
										marginTop: '0'
									}}>
									{this.state.article.subtitle}
								</Header>
								<Header.Subheader>{this.state.article.author}</Header.Subheader>
								<Divider />
								<Container text style={{ marginBottom: '50px' }}>
									<div
										id="9997"
										style={{
											fontSize: '1.8rem',
											fontFamily: 'EB Garamond'
										}}
									/>
								{this.state.article.quote ?
								<div><Divider style={{ marginTop: '2rem', border: '4px solid rgba(34,36,38,.15)' }} />
									<Header style={{ fontSize: '2rem', color: 'grey', marginTop: '0.5em' }}>{this.state.article.quote}</Header>
									<Divider style={{ marginBottom: '2rem', border: '4px solid rgba(34,36,38,.15)' }} /></div> : null}
									<div
										id="9998"
										style={{
											fontSize: '1.8rem',
											fontFamily: 'EB Garamond'
										}}
									/>
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
