import React from 'react'
// import NavBar from '../components/NavBar'
import LoginForm from '../components/LoginForm'
import {
	Image,
	Container
} from 'semantic-ui-react'

class HomeContainer extends React.Component {
	render() {
		return (
			<Container>
				<Image src={require('../img/shutterstock_745137418.jpg')} className='opening '/>
				<LoginForm {...this.props} />
			</Container>
		)
	}
}

export default HomeContainer
