import React from 'react'
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react'

class FooterSem extends React.Component {
	render() {
		return (
			<Segment inverted vertical style={{ padding: '5em 0em' }}>
				<Container>
					<Grid divided inverted stackable>
						<Grid.Row>
							<Grid.Column width={3}>
								<Header inverted as="h4" content="About" />
								<List link inverted>
									<List.Item>
										<List.Icon name="github" size='large' />
										<List.Content>
											<a href="https://github.com/Raskovan/print-to-web-frontend">GitHub</a>
										</List.Content>
									</List.Item>
									<List.Item>
										<List.Icon name="comments" size='large' />
										<List.Content>
											<a href="https://medium.com/@alexey.katalkin/">Medium</a>
										</List.Content>
									</List.Item>
								</List>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header inverted as="h4" content="Other Projects" />
								<List link inverted>

									<List.Item>
										<List.Icon name="child" size='large' />
										<List.Content>
											<a href="https://moodbuster.herokuapp.com/">MoodBuster</a>
										</List.Content>
									</List.Item>

									<List.Item>
										<List.Icon name="food" size='large' />
										<List.Content>
											<a href="https://raskovan.github.io/cookbook-frontend/">CookBook</a>
										</List.Content>
									</List.Item>
								</List>
							</Grid.Column>
							<Grid.Column width={7}>
								<Header as="h4" inverted>

								</Header>
								<p>
								</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</Segment>
		)
	}
}

export default FooterSem
