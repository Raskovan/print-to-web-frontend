import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { fetchArticles } from '../actions/UserActions'
import ReactFilestack from 'filestack-react'
// import * as filestack from 'filestack-js'
import { client } from 'filestack-react';

const filestack = client.init('AIjLfIWPiT8qZQH8KeLEfz');

class UploadForm extends React.Component {
	// state = {
	// 	articleFile: ''
	// }

	// onSuccess = result => {
	// 	console.log(result);
	// }

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
			.then(console.log)
			// .then(this.uploadImage)
			.then(response => this.props.fetchArticles())
	}

// 	handleAddFile = event => {
// 		this.setState({
// 			articleFile: event.target.files[0]
// 		}, () => this.handleUpload(this.state.articleFile))
// 		// console.log(event.target.files)
// 		// console.log(this.state.articleFile)
// 		// this.handleUpload(this.state.articleFile)
// }

	// uploadImage = (e) => {
	// 	console.log(e);
	// 	const filePath = '/Users/katala/Desktop/1_1HmzTk0WHjgtD_9B23GBcw.png'
	// 	const fileObj = new File(filePath)
	// 	console.log(fileObj);
	// 	// let uploaded = filestack.upload(file)
	// }

	render() {
		return (
			<Segment basic style={{padding: '0'}}>
				<label htmlFor="file" className="ui icon primary button fluid">
					<i className="file icon" />
					Upload Your Layout in XML Format
				</label>
				<input
					value=''

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
