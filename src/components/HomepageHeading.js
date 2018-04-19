import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSignup } from '../actions/UserAuth'

import {
	Button,
	Container,
	Header,
	Icon,
	Modal,
	Form,
	Grid
} from 'semantic-ui-react'

class HomepageHeading extends Component {
	state = {
		open: false,
		username: '',
		password: ''
	}

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	onFormSignup = event => {
		event.preventDefault()
		this.props
			.fetchSignup(this.state.username, this.state.password)
			.then(() => {
				this.props.history.push('/dashboard')
			})
	}

	show = size => () => this.setState({ size, open: true })
	close = () => this.setState({ open: false })
	render() {
		const { open, size } = this.state
		return (
			<Grid verticalAlign="middle" style={{height: '75vh'}}>
				<Grid.Row>
					<Grid.Column textAlign="center">
						<Header
							as="h1"
							content="Print-To-Web"
							inverted
							style={{
								fontFamily: 'Abril Fatface',
								fontSize: '7.5em',
								fontWeight: 'normal',
								marginBottom: '0.1em',
								marginTop: '0em',
								textShadow: '2px 2px 6px #000000',
								letterSpacing: '3px'
							}}
						/>
						<Header
							as="h2"
							content="Convert magazine layouts into web pages"
							inverted
							style={{
								fontWeight: '300',
								fontFamily: 'Roboto',
								fontSize: '2em',
								marginTop: '0em',
								marginBottom: '1.5em',
								textShadow: '2px 2px 6px #000000',
								letterSpacing: '1px'
							}}
						/>
						<Button color="red" size="huge" onClick={this.show('tiny')}>
							Get Started
							<Icon name="right arrow" />
						</Button>
						<Modal size={size} open={open} onClose={this.close}>
							<Modal.Header>Create Account</Modal.Header>
							<Modal.Content>
								<Form>
									<Form.Group widths="equal">
										<Form.Input
											name="username"
											placeholder="Username"
											onChange={this.handleInput}
											autoFocus
										/>
										<Form.Input
											name="password"
											placeholder="Password"
											onChange={this.handleInput}
										/>
									</Form.Group>
								</Form>
							</Modal.Content>
							<Modal.Actions>
								<Button
									positive
									icon="checkmark"
									labelPosition="right"
									content="Sign Up"
									onClick={this.onFormSignup}
								/>
							</Modal.Actions>
						</Modal>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default connect(null, { fetchSignup })(HomepageHeading)
