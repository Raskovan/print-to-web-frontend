import React from 'react'
// import NavBar from '../components/NavBar'
import ArticleCard from '../components/ArticleCard'
import { connect } from 'react-redux'
import { Container, Card } from 'semantic-ui-react'
import { findUser } from '../actions/ConsumerActions'


class MagazineHomePage extends React.Component {
  componentDidMount(){
    this.props.findUser(this.props.magname)
  }

	render() {
    let magazineName = this.props.magname
		return (
			<Container style={{marginTop: '70px', marginBottom: '70px'}}>
				<Card.Group itemsPerRow={2} stackable>
					{this.props.articlesToShow
						? this.props.articlesToShow.map(article => {
								return <ArticleCard key={article.id} article={article} magName={magazineName} />
						  })
						: null}
				</Card.Group>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		articlesToShow: state.userPayload.userPayload.articles
	}
}

export default connect(mapStateToProps, { findUser })(MagazineHomePage)
