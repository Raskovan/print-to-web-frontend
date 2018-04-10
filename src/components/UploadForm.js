import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { fetchArticles } from '../actions/UserActions'

class UploadForm extends React.Component {
	state = {
		articleFile: {}
	}

	handleUpload = event => {
		let formData
		formData = new FormData()
		formData.append('file', event.target.files[0])
		formData.append('user_id', this.props.currentUser.id)
		fetch('http://localhost:4000/articles', {
			method: 'POST',
			body: formData
		})
			.then(res => res.json())
			.then(response => this.props.fetchArticles())
	}

	handleAddFile = event => {
		this.setState({
			articleFile: event.target.files[0]
		})
	}

	render() {
		return (
			<Segment basic>
				<label htmlFor="file" className="ui icon primary button fluid">
					<i className="file icon" />
					Upload Your Layout in XML Format
				</label>
				<input
					type="file"
					id="file"
					style={{ display: 'none' }}
					onChange={this.handleUpload}
				/>
			</Segment>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { fetchArticles })(UploadForm)
