import React from 'react'
// import HomepageHeading from '../components/HomepageHeading'
import { Link } from "react-router-dom";
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Image,
	Segment, Modal, Form
} from 'semantic-ui-react'
import { fetchSignup } from '../actions/UserAuth'
import { connect } from 'react-redux'



class HomepageLayout extends React.Component {

	state = {
		open: false,
    username: '',
    password: ''
   }

   handleInput = event => {
     this.setState({
       [event.target.name]: event.target.value
     })
   }

   onFormSignup = event => {
     event.preventDefault()
     this.props
       .fetchSignup(this.state.username, this.state.password)
       .then(() => {
         this.props.history.push('/dashboard')
       })
   }

	 show = size => () => this.setState({ size, open: true })
	 close = () => this.setState({ open: false })

	 render(){
		 const { open, size } = this.state

		 return(

			 <div>
				 <Segment style={{ padding: '8em 0em' }} vertical>
					 <Grid container stackable verticalAlign="middle">
						 <Grid.Row>
							 <Grid.Column width={8}>
								 <Header as="h3" style={{ fontSize: '2em' }}>
									 Easy Web Publishing
								 </Header>
								 <p style={{ fontSize: '1.33em' }}>
									 If you are tired of copying and pasting your articles from InDesign to Wordpress or if you would like to publish your content online with no extra hassle, Print-To-Web is here to help.
								 </p>
								 <Header as="h3" style={{ fontSize: '2em' }}>
									 Create Your Own Online Magazine
								 </Header>
								 <p style={{ fontSize: '1.33em' }}>
									 With a few easy steps we will help your publication to reach out to millions of people worldwide.
								 </p>
							 </Grid.Column>
							 <Grid.Column floated="right" width={6}>
								 <Image
									 bordered
									 size="large"
									 src={require('../img/ptw_reading.jpg')}
									 />
							 </Grid.Column>
						 </Grid.Row>
						 <Grid.Row>
							 <Grid.Column textAlign="center">
								 <Button size="huge" as={Link} to='/magazines'>Check Our Directory</Button>
							 </Grid.Column>
						 </Grid.Row>
					 </Grid>
				 </Segment>
				 <Segment style={{ padding: '0em' }} vertical>
					 <Grid celled="internally" columns="equal" stackable>
						 <Grid.Row textAlign="center">
							 <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
								 <Header as="h3" style={{ fontSize: '2em' }}>
									 "Wow!!!"
								 </Header>
								 <p style={{ fontSize: '1.33em' }}>
									 That is what they all say about us
								 </p>
							 </Grid.Column>
							 <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
								 <Header as="h3" style={{ fontSize: '2em' }}>
									 "I shouldn't have gone with their competitor."
								 </Header>
								 <p style={{ fontSize: '1.33em' }}>
									 <Image avatar src={require('../img/johann.jpeg')} />
									 <b>Johann</b> Men's Health Editor-in-Chief
									 </p>
								 </Grid.Column>
							 </Grid.Row>
						 </Grid>
					 </Segment>
					 <Segment style={{ padding: '8em 0em' }} vertical>
						 <Container text>
							 <Header as="h3" style={{ fontSize: '2em' }}>
								 We Make It Easy
							 </Header>
							 <p style={{ fontSize: '1.33em' }}>
								 Add tags to your styles while laying out articles and export the file as XML from InDesign. Upload this file and all linked images to our servers. Thats how you create your online presence. Easy!
							 </p>

							 <Divider
								 as="h4"
								 className="header"
								 horizontal
								 style={{ margin: '3em 0em', textTransform: 'uppercase', color: '#4183c4' }}>
								 <p>Case Study</p>
							 </Divider>
							 <Header as="h3" style={{ fontSize: '2em' }}>
								 Troubles Finally Ended For Us
							 </Header>
							 <p style={{ fontSize: '1.33em' }}>
								 "For years our editorial team has been struggling with putting our magazines online. We had to manage our Wordpress site and tried to keep it safe from hackers. We had to pay developers for each update. It was such a headache. With Print-To-Web we don't need to worry about this anymore and can concentrate on delivering the best content to our readers." <br/>- Editor-in-Chief, Ami Magazine
							 </p>

							 <Button as="a" size="large" onClick={this.show('tiny')}>
								 Sing Me Up
							 </Button>
			 				<Modal size={size} open={open} onClose={this.close}>
			 					<Modal.Header>Create Account</Modal.Header>
			 					<Modal.Content>
			 						<Form>
			 							<Form.Group widths="equal">
			 								<Form.Input
			 									name="username"
			 									placeholder="Username"
			 									onChange={this.handleInput}
												autoFocus
			 								/>
			 								<Form.Input
			 									name="password"
			 									placeholder="Password"
			 									onChange={this.handleInput}
			 								/>
			 							</Form.Group>
			 						</Form>
			 					</Modal.Content>
			 					<Modal.Actions>
			 						<Button
			 							positive
			 							icon="checkmark"
			 							labelPosition="right"
			 							content="Sign Up"
			 							onClick={this.onFormSignup}
			 						/>
			 					</Modal.Actions>
			 				</Modal>
						 </Container>
					 </Segment>
				 </div>

		 )
	 }

}
export default connect(null, { fetchSignup })(HomepageLayout)
