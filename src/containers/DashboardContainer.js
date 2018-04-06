import React from 'react'
import NavBar from '../components/NavBar'
import UploadForm from '../components/UploadForm'
import { Segment, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout } from '../actions/UserAuth'

class HomeContainer extends React.Component {
	render() {
		console.log(this.props.currentUser)
		return (
			<Segment basic>
				<NavBar />

				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							Upload Images
              <UploadForm />
						</Grid.Column>
						<Grid.Column width={8}>
							Your Articles
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { logout })(HomeContainer)

// {this.props.currentUser ?
//   <div>
// <Header as='h1'>Welcome, {this.props.currentUser.username}</Header><Button onClick={this.props.logout}>Log Out</Button></div>
//  : null}
