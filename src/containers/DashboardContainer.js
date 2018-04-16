import React from 'react'
// import NavBar from '../components/NavBar'
import UploadForm from '../components/UploadForm'
import UserMagForm from '../components/UserMagForm'
import Article from '../components/Article'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
	Container,
	Divider,
	Grid,
	Header,
	Segment,
	Item
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { logout } from '../actions/UserAuth'
import { fetchArticles } from '../actions/UserActions'


// fake data generator
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`,
//   }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: 'none',
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgrey' : 'none',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  // padding: grid,
	height: '1000px'
  // width: 250,
});

class DashboardContainer extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push('/')
		} else {
			this.props.fetchArticles()
		}

	}

	onDragEnd(result) {
	// dropped outside the list
	if (!result.destination) {
		return;
	}

	const items = reorder(
		this.state.items,
		result.source.index,
		result.destination.index
	);

	this.setState({
		items,
	});
}

componentWillReceiveProps(nextProps){
	console.log('nextProps', nextProps);
	if (nextProps.articles) {
		this.setState({
			items: nextProps.articles

		})
	}

}


	render() {

		console.log(this.state.items);
		let sortedArticles
		let url
		this.props.currentUser ? (url = this.props.currentUser.mag_url) : null

		return (
			<div>
				<Segment style={{ padding: '0em' }} vertical>
					<Grid container celled="internally" columns="equal" stackable>
						<Grid.Row textAlign="left">
							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '3em' }}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Your Dashboard
									<Divider />
								</Header>
								<UserMagForm />
								<Divider
									as="h4"
									className="header"
									horizontal
									style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
									<a href="#">UPLOAD YOUR FILES HERE</a>
								</Divider>
								<UploadForm />
								<Divider
									as="h4"
									className="header"
									horizontal
									style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
									<a href="#">YOUR MAGAZINE'S PAGE</a>
								</Divider>

								<Grid.Row columns={2}>
									<Grid.Column>
										<div
											className="thumbnail-container"
											title="Thumbnail Image of your homepage">
											<div className="thumbnail">
												<iframe
													src={'http://localhost:3000/magazines/' + url}
													frameBorder="0"
													title="HomePage"
												/>
											</div>
										</div>
									</Grid.Column>
									<Grid.Column>
										<div
											className="thumbnail-container"
											title="Thumbnail Image of your homepage">
											<div className="thumbnail">
												<iframe
													src={'http://localhost:3000/magazines/' + url}
													frameBorder="0"
													title="ArticlePage"
												/>
											</div>
										</div>
									</Grid.Column>
								</Grid.Row>
							</Grid.Column>

							<Grid.Column style={{ paddingBottom: '5em', paddingTop: '3em' }}>
								<Header as="h3" style={{ fontSize: '2em' }}>
									Your Articles
									<Divider />
								</Header>

									<DragDropContext onDragEnd={this.onDragEnd}>
										<Droppable droppableId="droppable" >
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													className='ui items'
													>

													{this.state.items.map((item, index) => (

														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}

															>
															{(provided) => (
																<div
																	className='item'
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	>
																	<Article key={item.id} article={item}/>
																</div>
															)}
														</Draggable>
													))}

													{provided.placeholder}
												</div>
											)}
										</Droppable>

									</DragDropContext>


							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>

				<Segment style={{ padding: '8em 0em' }} vertical>
					<Container text>
						<Divider
							as="h4"
							className="header"
							horizontal
							style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
							<a href="#">EXPLANATIONS</a>
						</Divider>
					</Container>
				</Segment>
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		currentUser: state.login.auth.currentUser,
		articles: state.magazine.articles
	}
}

export default connect(mapStateToProps, { logout, fetchArticles })(
	DashboardContainer
)
