import React from 'react'
import { connect } from 'react-redux'
import { Form, Segment, Button, List } from 'semantic-ui-react'
import { updateUserInfo } from '../actions/UserActions'

class UserMagForm extends React.Component {
	state = {
		mag_title: '',
		mag_url: '',
		mag_description: '',
		editClicked: false
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
			mag_url: this.state.mag_url,
			mag_description: this.state.mag_description
		}
		this.props.updateUserInfo(this.props.currentUser.id, magObject).then(
			this.setState({
				mag_title: '',
				mag_url: '',
				mag_description: '',
				editClicked: !this.state.editClicked
			})
		)
	}

	handleInput = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		console.log(this.state.editClicked)
		return !this.props.currentUser ||
			!this.props.currentUser.mag_title ||
			this.state.editClicked ? (
			<Segment basic>
				<Form onSubmit={this.handleSubmit}>
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
						placeholder="localhost:3000/my-magazine"
						name="mag_url"
						value={this.state.mag_url}
						onChange={this.handleInput}
					/>
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
			</Segment>
		) : (
			<Segment basic>
				<List>
					<List.Item>
						<List.Header>Magazine title</List.Header>
						{this.props.currentUser.mag_title}
					</List.Item>
					<List.Item>
						<List.Header>Magazine URL</List.Header>
						<a href={'/magazines/' + this.props.currentUser.mag_url}>localhost:3000/magazines/{this.props.currentUser.mag_url}</a>
					</List.Item>
					<List.Item>
						<List.Header>Magazine Description</List.Header>
						{this.props.currentUser.mag_description}
					</List.Item>
				</List>
				<Button onClick={this.editClickedForm}>Edit</Button>
			</Segment>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { updateUserInfo })(UserMagForm)
