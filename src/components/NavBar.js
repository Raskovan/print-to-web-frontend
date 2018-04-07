import React from 'react'
import {
	Menu,
	Header,
	Icon,
	Dropdown,
	Button,
	Modal,
	Form
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout, fetchSignup } from '../actions/UserAuth'

class NavBar extends React.Component {
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
		let user
		this.props.currentUser ? (user = this.props.currentUser.username) : null

		const trigger = (
			<span>
				Welcome, {user}
				<Icon size="big" name="user circle outline" />
			</span>
		)

		const options = [
			{
				key: 'sign-out',
				text: 'Sign Out',
				icon: 'sign out',
				onClick: () => {
					this.props.logout()
					this.props.history.push('/')
				}
			}
		]
		return (
			<Menu color="red" inverted secondary>
				<Menu.Item>
					<Header size="huge" inverted>
						{' '}
						Print To Web{' '}
					</Header>
				</Menu.Item>
				{this.props.currentUser ? (
					<Menu.Item position="right">
						<Dropdown
							trigger={trigger}
							options={options}
							pointing="top right"
							icon={null}
						/>
					</Menu.Item>
				) : (
					<Menu.Item position="right">
						<Button inverted onClick={this.show('tiny')}>
							Sign Up
						</Button>
						<Modal size={size} open={open} onClose={this.close}>
							<Modal.Header>Create Account</Modal.Header>
							<Modal.Content>
								<Form>
									<Form.Group widths='equal'>
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
					</Menu.Item>
				)}
			</Menu>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { logout, fetchSignup })(NavBar)
