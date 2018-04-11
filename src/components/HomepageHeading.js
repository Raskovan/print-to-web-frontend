import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSignup } from '../actions/UserAuth'

import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility,
	Modal,
	Form
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
		const { open, size, openLog, sizeLog } = this.state
		return (
			<Container text>
				<Header
					as="h1"
					content="Print-To-Web"
					inverted
					style={{
						fontSize: '4em',
						fontWeight: 'normal',
						marginBottom: 0,
						marginTop: '3em'
					}}
				/>
				<Header
					as="h2"
					content="Convert magazine layouts into web pages."
					inverted
					style={{
						fontSize: '1.7em',
						fontWeight: 'normal',
						marginTop: '0em'
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
			</Container>
		)
	}
}

export default connect(null, { fetchSignup })(HomepageHeading)
