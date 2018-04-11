import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from "react-router-dom";


const UserCard = props => {
	return (
		props.user.mag_title && props.user.mag_description ?
		<Card>
			<Card.Content>
				<Card.Header as={Link} to={'/magazines/' + props.user.mag_url}>{props.user.mag_title}</Card.Header>
				<Card.Meta>{props.user.mag_description}</Card.Meta>
			</Card.Content>
		</Card> : null
	)
}

export default UserCard
