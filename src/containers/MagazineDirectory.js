import React from 'react'
import UserCard from '../components/UserCard'
import { connect } from 'react-redux'
import { Container, Card } from 'semantic-ui-react'
import { getAllUsers } from '../actions/ConsumerActions'

class MagazineDirectory extends React.Component {
	componentDidMount() {
		this.props.getAllUsers()
	}

	render() {
		return (
      <Container style={{marginTop: '70px'}}>
				<Card.Group itemsPerRow={3}>
					{this.props.users
						? this.props.users.map(user => {
								return <UserCard key={user.id} user={user} />
						  })
						: null}
				</Card.Group>
    </Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		users: state.userPayload.users
	}
}

export default connect(mapStateToProps, { getAllUsers })(MagazineDirectory)
