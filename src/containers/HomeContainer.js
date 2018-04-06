import React from 'react'
// import NavBar from '../components/NavBar'
import LoginForm from '../components/LoginForm'
import { Segment } from 'semantic-ui-react'

class HomeContainer extends React.Component {

	render() {
		return (
			<Segment basic>
				<LoginForm {...this.props} />
			</Segment>
		)
	}
}

export default HomeContainer
