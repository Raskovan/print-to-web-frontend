import React from 'react'
// import NavBar from '../components/NavBar'
import ArticleCard from '../components/ArticleCard'
import { connect } from 'react-redux'
import { Container, Card, Divider, Header } from 'semantic-ui-react'
import { findUser } from '../actions/ConsumerActions'


class MagazineHomePage extends React.Component {
  componentDidMount(){
    this.props.findUser(this.props.magname)
  }

	render() {
    // console.log(this.props.user.mag_title);
    let magazineName = this.props.magname
		return (
			<Container style={{marginTop: '3.5rem', marginBottom: '70px'}}>
        <Header size='huge' textAlign='center' style={{fontFamily: 'Abril Fatface', letterSpacing:'3px', fontSize: '5rem', fontWeight: '300', margin: 'calc(2rem - .14285714em) 0 0'}}>{this.props.user.mag_title}</Header>
        <Divider style={{borderTop: '10px solid black', margin: '0 0 2rem 0'}}/>
				<Card.Group itemsPerRow={2} stackable>



					{this.props.articlesToShow
						? this.props.articlesToShow.sort((a, b) => {return a.position - b.position}).slice(0, 2).map(article => {
								return <ArticleCard key={article.id} article={article} magName={magazineName} />
						  })
						: null}
				</Card.Group>
        <Card.Group itemsPerRow={3} stackable>
					{this.props.articlesToShow
						? this.props.articlesToShow.sort((a, b) => {return a.position - b.position}).slice(2).map(article => {
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
		articlesToShow: state.userPayload.userPayload.articles,
    user: state.userPayload.userPayload,
	}
}

export default connect(mapStateToProps, { findUser })(MagazineHomePage)
