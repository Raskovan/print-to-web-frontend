import React from 'react'
import { connect } from 'react-redux'
import { Form, Segment, Button, List, Input } from 'semantic-ui-react'
import { updateUserInfo } from '../actions/UserActions'

class UserMagForm extends React.Component {
	state = {
		mag_title: '',
		mag_url: '',
		mag_description: '',
		editClicked: true
	}

	editClickedForm = () => {
		this.setState({
			editClicked: !this.state.editClicked,
			mag_title: this.props.currentUser.mag_title,
			mag_url: this.props.currentUser.mag_url,
			mag_description: this.props.currentUser.mag_description
		})
	}

	cancelClickedForm = () => {
		this.setState({
			editClicked: !this.state.editClicked
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		// console.log(this.state.editClicked)
		const magObject = {
			mag_title: this.state.mag_title,
			mag_url: this.state.mag_title.toLowerCase().replace(/ /gi, "-"),
			mag_description: this.state.mag_description
		}
		this.props.updateUserInfo(this.props.currentUser.id, magObject).then(
			this.setState({
				mag_title: '',
				mag_url: '',
				mag_description: '',
				editClicked: true
			})
		)
	}

	handleInput = event => {
		// console.log(event.target.name);
		this.setState({
			[event.target.name]: event.target.value
			// mag_title: event.target.value,
			// mag_url: event.target.value.toLowerCase().replace(/ /gi, "-"),
			// mag_description: event.target.value
			// mag_description: event.target.value
		})
	}

	render() {
		return this.props.currentUser ? (
			(!this.props.currentUser.mag_title && this.state.editClicked) ||
			!this.state.editClicked ? (
				<div>
					<Form onSubmit={this.handleSubmit} style={{ textAlign: 'left' }}>
						<Form.Input
							fluid
							label="Magazine title"
							placeholder="My Magazine"
							name="mag_title"
							value={this.state.mag_title}
							onChange={this.handleInput}
						/>
						<Form.Input
							fluid
							label="Magazine URL"
							placeholder="localhost:3000/magazines"
							name="mag_url"
							value={this.state.mag_url}
							onChange={this.handleInput}
							style={{ display: 'none', marginBottom: '0.5px' }}
						/>
						<Form.Field>
							<Input
								label="localhost:3000/magazines/"
								placeholder="my-magazine"
								name="mag_url"
								value={this.state.mag_url}
								onChange={this.handleInput}
							/>
						</Form.Field>
						<Form.TextArea
							label="Magazine Description"
							placeholder="Tell us more about your magazine..."
							name="mag_description"
							value={this.state.mag_description}
							onChange={this.handleInput}
						/>
						<Form.Group>
							<Form.Button>Save</Form.Button>
							<Form.Button onClick={this.cancelClickedForm}>Cancel</Form.Button>
						</Form.Group>
					</Form>
				</div>
			) : (
				<div>
					<List style={{ fontSize: '1.2rem', textAlign: 'left' }}>
						<List.Item style={{ lineHeight: '2rem' }}>
							<List.Header>Magazine title</List.Header>
							{this.props.currentUser.mag_title}
						</List.Item>
						<List.Item style={{ lineHeight: '2rem' }}>
							<List.Header>Magazine URL</List.Header>
							<a href={'/magazines/' + this.props.currentUser.mag_url}>
								localhost:3000/magazines/{this.props.currentUser.mag_url}
							</a>
						</List.Item>
						<List.Item style={{ lineHeight: '2rem' }}>
							<List.Header>Magazine Description</List.Header>
							{this.props.currentUser.mag_description}
						</List.Item>
					</List>
					<Button onClick={this.editClickedForm}>Edit</Button>
				</div>
			)
		) : null
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { updateUserInfo })(UserMagForm)
