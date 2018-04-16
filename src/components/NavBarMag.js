import React from 'react'
import { Menu, Popup, Container, Breadcrumb } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NavBarMag extends React.Component {
	render() {
		const style = {
			borderRadius: 0,
			opacity: 0.7,
			padding: '2em'
		}

		return (
			<Menu fixed="top" inverted size="massive">
				<Container>
					<Menu.Item>
						{'id' in this.props.user && this.props.show ? (
							<Breadcrumb>
								<Breadcrumb.Section color="red" as={Link} to="/">
									Print to web
								</Breadcrumb.Section>
								<Breadcrumb.Divider icon="right chevron" color="grey" />
								<Breadcrumb.Section as={Link} to="/magazines">
									Magazines
								</Breadcrumb.Section>
								<Breadcrumb.Divider icon="right chevron" color="grey" />
								<Breadcrumb.Section
									active
									as={Link}
									to={'/magazines/' + this.props.user.mag_url}>
									{this.props.user.mag_title}
								</Breadcrumb.Section>
							</Breadcrumb>
						) : (
							<Breadcrumb>
								<Breadcrumb.Section as={Link} to="/">
									Print to web
								</Breadcrumb.Section>
								<Breadcrumb.Divider icon="right chevron" color="grey" />
								<Breadcrumb.Section active as={Link} to="/magazines">
									Magazines
								</Breadcrumb.Section>
							</Breadcrumb>
						)}
					</Menu.Item>

					{this.props.show ? (
						<Menu.Item position="right">
							<Popup
								trigger={<p style={{ fontSize: '1rem' }}>About</p>}
								content={this.props.user.mag_description}
								on="click"
								hideOnScroll
								style={style}
								inverted
							/>
						</Menu.Item>
					) : null}
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
