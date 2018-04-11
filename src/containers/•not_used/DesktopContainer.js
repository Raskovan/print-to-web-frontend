import PropTypes from 'prop-types'
import React, { Component } from 'react'
import HomepageHeading from '../components/HomepageHeading'
import NavBarSeman from '../components/NavBarSeman'
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility,
	Modal,
	Form
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout, fetchSignup } from '../actions/UserAuth'

class DesktopContainer extends Component {
	state = {
		open: false,
		openLog: false,
		username: '',
		password: ''
	}

	hideFixedMenu = () => this.setState({ fixed: false })
	showFixedMenu = () => this.setState({ fixed: true })

	render() {
		console.log(this.props.currentUser)
		const { children } = this.props
		const { fixed } = this.state

		return(
    !this.props.currentUser ?
			<Responsive>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}>
					<Segment
						inverted
						textAlign="center"
						style={{
							minHeight: 650,
							padding: '1em 0em',
							background:
								'url("https://cdn.filestackcontent.com/R45qr1rTtOJZD1BdPHh0")',
							backgroundSize: 'cover'
						}}
						vertical>
						<NavBarSeman {...this.props} />
						<HomepageHeading />
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		 :
			<Responsive>
				<Visibility
					once={false}
					onBottomPassed={this.showFixedMenu}
					onBottomPassedReverse={this.hideFixedMenu}>
					<Segment vertical>
						<NavBarSeman />
					</Segment>
				</Visibility>

				{children}
			</Responsive>
		)
	}
}

DesktopContainer.propTypes = {
	children: PropTypes.node
}

const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser
	}
}

export default connect(mapStateToProps, { logout, fetchSignup })(
	DesktopContainer
)
