import React from 'react'
import { connect } from 'react-redux'
import { Segment, Button } from 'semantic-ui-react'
import { fetchArticles } from '../actions/UserActions'
// import * as filestack from 'filestack-js'
// import { client } from 'filestack-react';
import ReactFilestack from 'filestack-react'
// const filestack = client.init('AIjLfIWPiT8qZQH8KeLEfz');

class UploadForm extends React.Component {
	state = {
		article: '',
		article_uploaded: false
	}

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
			// .then(console.log)
			// .then(this.uploadImage)
			// .then(response => this.props.fetchArticles())
			.then(article =>
				this.setState({
					article: article,
					article_uploaded: true
				})
			)
	}

	// 	handleAddFile = event => {
	// 		this.setState({
	// 			articleFile: event.target.files[0]
	// 		}, () => this.handleUpload(this.state.articleFile))
	// 		// console.log(event.target.files)
	// 		// console.log(this.state.articleFile)
	// 		// this.handleUpload(this.state.articleFile)
	// }

	uploadImage = response => {
		// console.log(response)
		fetch('http://localhost:4000/images', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accepts: 'application/json'
			},
			body: JSON.stringify({
				article_id: this.state.article.id,
				url: response.filesUploaded[0].url,
				handle: response.filesUploaded[0].handle
			})
		})
			.then(r => r.json())
			.then(response => this.props.fetchArticles())
			.then(r => this.setState({ article_uploaded: false }))
	}
	// const filePath = '/Users/katala/Desktop/1_1HmzTk0WHjgtD_9B23GBcw.png'
	// const fileObj = new File(filePath)
	// console.log(fileObj);
	// let uploaded = filestack.upload(file)

	render() {
		console.log(this.state.article)
		return (
			<div>
				<p style={{ fontSize: '1.2em', textAlign: 'center' }}>
					<b>Step 1.</b> First, upload your XML file here
				</p>
				<Segment basic style={{ padding: '0' }}>
					<label
						htmlFor="file"
						className={
							!this.state.article_uploaded
								? 'ui icon primary button fluid'
								: 'ui icon button fluid disabled'
						}>
						<i className="file icon" />
						Upload Your Layout in XML Format
					</label>
					<input
						accept=".xml"
						value=""
						type="file"
						id="file"
						style={{ display: 'none' }}
						onChange={this.handleUpload}
					/>
				</Segment>
				{this.state.article_uploaded ? (
					<Segment basic style={{ padding: '0' }}>
						<p style={{ fontSize: '1.2em', textAlign: 'center' }}>
							<b>Step 2.</b> Now, upload your image file:{' '}
							{
								this.state.article.img_name.split('/')[
									this.state.article.img_name.split('/').length - 1
								]
							}
						</p>
						<ReactFilestack
							options={{ accept: 'image/*', fromSources: 'local_file_system' }}
							apikey={process.env.REACT_APP_FILESTACK_API}
							security={{
								policy: process.env.REACT_APP_FILESTACK_POLICY,
								signature: process.env.REACT_APP_FILESTACK_SIGNATURE
							}}
							buttonText="Upload Your Image"
							buttonClass="classname"
							onSuccess={this.uploadImage}
							render={({ onPick }) => (
								<Button primary fluid onClick={onPick}>
									Upload Your Image
								</Button>
							)}
						/>
					</Segment>
				) : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { fetchArticles })(UploadForm)
