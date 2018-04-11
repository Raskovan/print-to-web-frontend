import React from 'react'
import {
	Menu,
	Icon,
	Popup,
	Container,
	Image,
	Dropdown, Item
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class NavBarMag extends React.Component {
	render() {
		const style = {
			borderRadius: 0,
			opacity: 0.7,
			padding: '2em'
		}

		//
		// <Menu size="massive" fluid pointing secondary>
		// 	{'id' in this.props.user && this.props.show ? (
		// 		<Menu.Item header={true} name={this.props.user.mag_title} />
		// 	) : (
		// 		<Menu.Item header={true} name="Print To Web Directory" />
		// 	)}
			// {this.props.show ?
			// <Menu.Item position="right">
			// <Popup
			// trigger={
			// 	<Icon
			// 	name="question circle outline"
			// 	color="grey"
			// 	style={{ align: 'right' }}
			// 	/>
			// }
			// content={this.props.user.mag_description}
			// on="click"
			// hideOnScroll
			// style={style}
			// inverted
			// />
			// </Menu.Item> : null}
		//
		// </Menu>
		//
		// <Menu.Item as="a" header>
		// 	<Image
		// 		size="mini"
		// 		src="/logo.png"
		// 		style={{ marginRight: '1.5em' }}
		// 		/>
		// 	Project Name
		// </Menu.Item>

		return (
			<Menu fixed="top" inverted>
				<Container>
					{'id' in this.props.user && this.props.show ? (
						<Menu.Item as={Link} to={'/magazines/' + this.props.user.mag_url} header={true} name={"Print To Web + " + '/' + this.props.user.mag_title} />
					) : (
						<Menu.Item header={true} name="Print To Web Directory" />
					)}

						{this.props.show ?
						<Menu.Item position="right">
						<Popup
						trigger={ <p>About</p> }
						content={this.props.user.mag_description}
						on="click"
						hideOnScroll
						style={style}
						inverted
						/>
						</Menu.Item> : null}
					<Menu.Item as="a" href='/magazines'>Directory</Menu.Item>
				</Container>
			</Menu>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.userPayload.userPayload,
		show: state.show.show
	}
}

export default connect(mapStateToProps, null)(NavBarMag)
