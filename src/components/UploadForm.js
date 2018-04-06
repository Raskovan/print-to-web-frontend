import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

class UploadForm extends React.Component {

  handleUpload = event => {
		console.log(event)
	}

	render() {
		return (
			<Form onSubmit={this.handleUpload}>
				<Form.Group>
					<Form.Input type="file" />
					<Form.Button content="Upload" />
				</Form.Group>
			</Form>
		)
	}
}

export default connect(null, null)(UploadForm)
