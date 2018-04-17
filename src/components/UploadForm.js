import React from 'react'
import { connect } from 'react-redux'
import { Segment, Button } from 'semantic-ui-react'
import { fetchArticles } from '../actions/UserActions'
import ReactFilestack from 'filestack-react'

class UploadForm extends React.Component {
	state = {
		article: '',
		article_uploaded: false
	}

	handleUpload = event => {
		let formData
		formData = new FormData()
		formData.append('file', event.target.files[0])
		formData.append('user_id', this.props.currentUser.id)
		fetch(process.env.REACT_APP_HOST+'articles', {
			method: 'POST',
			body: formData
		})
// 		.then(response => {
//     console.log(response);
// }).catch(e => {
//     console.log(e);
// });


			.then(res => res.json())
			.then(article =>
				this.setState({
					article: article,
					article_uploaded: true
				})
			)
	}

	uploadImage = response => {
		fetch(process.env.REACT_APP_HOST+'images', {
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
		console.log(this.state)
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
				{this.state.article_uploaded && this.state.article ? (
					<Segment basic style={{ padding: '0' }}>
						<p style={{ fontSize: '1.2em', textAlign: 'center', color: 'red' }}>
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
