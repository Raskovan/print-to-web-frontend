import React from 'react'
import { Menu, Icon, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'

class NavBarMag extends React.Component {
	render() {
		const style = {
			borderRadius: 0,
			opacity: 0.7,
			padding: '2em'
		}
		console.log('NAVbArMag',this.props)
		return (
			<Menu size="massive" fluid pointing secondary>
				{'id' in this.props.user && this.props.show ? (
					<Menu.Item header={true} name={this.props.user.mag_title} />
				) : (
					<Menu.Item header={true} name="Print To Web Directory" />
				)}
        {this.props.show ?
        <Menu.Item position="right">
        <Popup
        trigger={
          <Icon
          name="question circle outline"
          color="grey"
          style={{ align: 'right' }}
          />
        }
        content={this.props.user.mag_description}
        on="click"
        hideOnScroll
        style={style}
        inverted
        />
        </Menu.Item> : null}

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
