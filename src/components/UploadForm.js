import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

class UploadForm extends React.Component {
  state = {
    articleFile: {}
  }

  handleUpload = () => {
    let formData
    formData = new FormData()
    formData.append('file', this.state.articleFile)
    formData.append('user_id', this.props.currentUser.id)
    fetch('http://localhost:4000/articles', {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(response => console.log(response))

	}

  handleAddFile = (event) => {
    this.setState({
      articleFile: event.target.files[0]
    } )
  }

	render() {
		return (
			<Form onSubmit={this.handleUpload}>
				<Form.Group>
					<Form.Input type="file" onChange={this.handleAddFile}/>
					<Form.Button content="Upload" />
				</Form.Group>
			</Form>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, null)(UploadForm)
