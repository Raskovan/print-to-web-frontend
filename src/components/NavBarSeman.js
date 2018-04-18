import React, { Component } from 'react'
import HomepageHeading from '../components/HomepageHeading'
import {
	Button,
	Container,
	Icon,
	Menu,
	Responsive,
	Segment,
	Visibility,
	Modal,
	Form,
	Dropdown
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout, fetchSignup, fetchLogin } from '../actions/UserAuth'

class NavBarSeman extends Component {
	state = {
		open: false,
		openLog: false,
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

	hideFixedMenu = () => this.setState({ fixed: false })
	showFixedMenu = () => this.setState({ fixed: true })

	show = size => () => this.setState({ size, open: true })
	close = () => this.setState({ open: false })
	showLog = sizeLog => () => this.setState({ sizeLog, openLog: true })
	closeLog = () => this.setState({ openLog: false })

	render() {
		let user
		this.props.currentUser ? (user = this.props.currentUser.username) : null
		// console.log('navbarsem', user)
		let minHeight
		user ? (minHeight = 50) : (minHeight = 650)

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
		const { open, size, openLog, sizeLog } = this.state
		const { fixed } = this.state
		// const segmentHeight
		// user ? segmentHeight = 50 : segmentHeight = 650

		return (
			<Responsive>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}>
					<Segment
						inverted
						textAlign="center"
						style={{
							minHeight: minHeight,
							padding: '1em 0em',
							background:
								'url("https://cdn.filestackcontent.com/R45qr1rTtOJZD1BdPHh0")',
							backgroundSize: 'cover'
						}}
						vertical>
						<Menu fixed={fixed ? 'top' : null} secondary={!fixed} size="large">
							<Container>
								<Menu.Item
									as="a"
									href="/"
									active
									style={{ fontFamily: 'Abril Fatface' }}>
									Print To Web
								</Menu.Item>
								<Menu.Item as="a" href="/magazines">
									Directory
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
										<Button as="a" onClick={this.showLog('tiny')}>
											Log in
										</Button>

										<Modal
											size={sizeLog}
											open={openLog}
											onClose={this.closeLog}>
											<Modal.Header>Log in</Modal.Header>
											<Modal.Content>
												<Form onSubmit={this.onFormSubmit}>
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
													<Button
														fluid
														type="submit"
														positive
														icon="checkmark"
														content="Log In"
														onClick={this.onFormSubmit}
													/>
												</Form>
											</Modal.Content>
										</Modal>

										<Button
											as="a"
											primary={fixed}
											style={{ marginLeft: '0.5em' }}
											onClick={this.show('tiny')}>
											Sign Up
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
													<Button
														positive
														icon="checkmark"
														fluid
														content="Sign Up"
														onClick={this.onFormSignup}
													/>
												</Form>
											</Modal.Content>
										</Modal>
									</Menu.Item>
								)}
							</Container>
						</Menu>
						{!this.props.currentUser ? (
							<HomepageHeading {...this.props} />
						) : null}
					</Segment>
				</Visibility>
			</Responsive>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { logout, fetchLogin, fetchSignup })(
	NavBarSeman
)
