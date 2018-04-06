import React from 'react'
import { Form } from 'semantic-ui-react'
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
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<Form.Group inline>
						<Form.Input
							name="username"
							placeholder="Username"
							onChange={this.handleInput}
						/>
						<Form.Input
							name="password"
							placeholder="Password"
							onChange={this.handleInput}
						/>
						<Form.Button content="Log In" />
					</Form.Group>
				</Form>

				<Form onSubmit={this.onFormSignup}>
					<Form.Group inline>
						<Form.Input
							name="username"
							placeholder="Username"
							onChange={this.handleInput}
						/>
						<Form.Input
							name="password"
							placeholder="Password"
							onChange={this.handleInput}
						/>
						<Form.Button content="Sign Up" />
					</Form.Group>
				</Form>
			</div>
		)
	}
}

export default connect(null, { fetchLogin, fetchSignup })(LoginForm)
