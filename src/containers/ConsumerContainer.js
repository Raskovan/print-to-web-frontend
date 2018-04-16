import React from 'react'
import MagazineDirectory from './MagazineDirectory'
import MagazineArticlePage from './MagazineArticlePage'
import MagazineHomePage from './MagazineHomePage'
import NavBarMag from '../components/NavBarMag'
import ConsumerFooter from '../components/ConsumerFooter'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

class ConsumerContainer extends React.Component {

	render() {
		console.log(this.props.articlesToShow)
		return (
			<div>
				<NavBarMag />
				<Container>
					<Route exact path="/magazines/" component={MagazineDirectory} />

					<Route
						exact
						path="/magazines/:mag_name"
						render={renderProps => {
							let magname = renderProps.match.params.mag_name
							return <MagazineHomePage magname={magname} />
						}}
					/>
					<Route
						exact
						path="/magazines/:mag_name/:article_name"
						render={renderProps => {
							let magname = renderProps.match.params.mag_name
							let articleName = renderProps.match.params.article_name
							return (
								<MagazineArticlePage
									magname={magname}
									articleName={articleName}
								/>
							)
						}}
					/>
				</Container>
				<ConsumerFooter />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		articlesToShow: state.userPayload.userPayload
	}
}

export default withRouter(connect(mapStateToProps, null)(ConsumerContainer))
