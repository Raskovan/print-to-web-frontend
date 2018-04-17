import React from 'react'
// import NavBar from '../components/NavBar'
import ArticleCard from '../components/ArticleCard'
import { connect } from 'react-redux'
import { Container, Card, Divider, Header } from 'semantic-ui-react'
import { findUser } from '../actions/ConsumerActions'

const getArticles = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    images: [
      {
        url: 'http://thechurchontheway.org/wp-content/uploads/2016/05/placeholder1.png'
      }
    ],
    title: `Title ${k}`,
    author: `by author ${k}`,
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  }));


class MagazineHomePage extends React.Component {
  state = {
    fakeArticles: getArticles(5)
  }

  componentDidMount(){
    this.props.findUser(this.props.magname)
  }

	render() {
    let magazineName
    if (this.props.magname) {
      magazineName = this.props.magname
    }
		return (
			<Container style={{marginTop: '3.5rem', marginBottom: '70px'}}>

        <Header size='huge' textAlign='center' style={{fontFamily: 'Abril Fatface', letterSpacing:'3px', fontSize: '5rem', fontWeight: '300', margin: 'calc(2rem - .14285714em) 0 0'}}>{this.props.user.mag_title ?  this.props.user.mag_title : 'My Magazine'}</Header>


        <Divider style={{borderTop: '10px solid black', margin: '0 0 2rem 0'}}/>
				<Card.Group itemsPerRow={2} stackable>
					{this.props.articlesToShow && this.props.articlesToShow[0]
						? this.props.articlesToShow.sort((a, b) => {return a.position - b.position}).slice(0, 2).map(article => {
								return <ArticleCard key={article.id} article={article} magName={magazineName} />
						  })
						:
            this.state.fakeArticles.slice(0, 2).map(article => {
                return <ArticleCard key={article.id} article={article} magName={magazineName} />
              })
          }

				</Card.Group>
        <Card.Group itemsPerRow={3} stackable>
					{this.props.articlesToShow && this.props.articlesToShow[0]
						? this.props.articlesToShow.sort((a, b) => {return a.position - b.position}).slice(2).map(article => {
								return <ArticleCard key={article.id} article={article} magName={magazineName} />
						  })
						:
            this.state.fakeArticles.slice(2).map(article => {
								return <ArticleCard key={article.id} article={article} magName={magazineName} />
						  })
          }
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
