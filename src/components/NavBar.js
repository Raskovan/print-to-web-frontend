import React from 'react'
import { Menu, Header, Icon, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout } from '../actions/UserAuth'

class NavBar extends React.Component {
	render() {
		let user
		this.props.currentUser ? (user = this.props.currentUser.username) : null

		const trigger = (
			<span>
				Welcome, {user}
				<Icon size="big" name="user circle outline" />
			</span>
		)

		const options = [
			{
				key: 'sign-out',
				text: 'Sign Out',
				icon: 'sign out',
				onClick: () => {
					this.props.logout()
					console.log(this.props)
					this.props.history.push("/")
				}
			}
		]
		return (
			<Menu color="red" inverted secondary>
				<Menu.Item>
					<Header size="huge" inverted>
						{' '}
						Print To Web{' '}
					</Header>
				</Menu.Item>
				{this.props.currentUser ? (
					<Menu.Item position="right">
						<Dropdown
							trigger={trigger}
							options={options}
							pointing="top right"
							icon={null}
						/>
					</Menu.Item>
				) : null}
			</Menu>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { logout })(NavBar)
