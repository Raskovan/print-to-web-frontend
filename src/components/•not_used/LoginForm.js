import React from 'react'
import {
	Form,
	Grid,
	Header,
	Segment,
	Message
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchLogin, fetchSignup } from '../actions/UserAuth'

class LoginForm extends React.Component {
	state = {
		username: '',
		password: ''
	}

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	onFormSubmit = event => {
		event.preventDefault()
		this.props.fetchLogin(this.state.username, this.state.password).then(() => {
			this.props.history.push('/dashboard')
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

	render() {
		return (
			<div className="login-form">
				<style>{`
		body > div > div > div.login-form {
			height: 100%;
		}
	`}</style>
				<Grid
					textAlign="center"
					style={{ height: '100%' }}
					verticalAlign="middle">
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as="h2" color="black" textAlign="center">
							{' '}
							Log-in to your account
						</Header>
						<Form onSubmit={this.onFormSubmit}>
							<Segment>
								<Form.Input
									fluid
									name="username"
									placeholder="Username"
									onChange={this.handleInput}
								/>
								<Form.Input
									fluid
									name="password"
									placeholder="Password"
									onChange={this.handleInput}
								/>
								<Form.Button fluid content="Log In" />
							</Segment>
						</Form>
						<Message>
							New to us? <a href="/magazines">Check out our directory</a>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}

export default connect(null, { fetchLogin, fetchSignup })(LoginForm)
