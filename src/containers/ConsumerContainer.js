import React from 'react'
// import HomeContainer from './HomeContainer'
// import DashboardContainer from './DashboardContainer'
import MagazineDirectory from './MagazineDirectory'
import MagazineArticlePage from './MagazineArticlePage'
// import ArticleContainer from './ArticleContainer'
import MagazineHomePage from './MagazineHomePage'
import NavBarMag from '../components/NavBarMag'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

class ConsumerContainer extends React.Component {
	// componentDidMount() {
	// console.log(this.props.history);
	// 	}
	// }

	render() {
    console.log(this.props.articlesToShow);
		return (
			<div>
				<NavBarMag />
				<Segment basic>
					<Route exact path="/magazines/" component={MagazineDirectory} />

					<Route
						exact path="/magazines/:mag_name"
						render={renderProps => {
							let magname = renderProps.match.params.mag_name
							return <MagazineHomePage magname={magname}/>
						}}
					/>
          <Route
            exact path="/magazines/:mag_name/:article_name"
            render={renderProps => {
              let magname = renderProps.match.params.mag_name
              let articleName = renderProps.match.params.article_name
              return <MagazineArticlePage magname={magname} articleName={articleName}/>
            }}
          />
					<Footer />
				</Segment>
			</div>
		)
	}
}
// {!this.props.loggedIn ? <HomeContainer /> : <DashboardContainer />}

const mapStateToProps = state => {
	return {
		articlesToShow: state.userPayload.userPayload
	}
}

export default withRouter(
	connect(mapStateToProps, null )(ConsumerContainer)
)
