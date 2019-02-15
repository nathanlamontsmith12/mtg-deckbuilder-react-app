import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Link } from "react-router-dom";


// Components: 
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";
import Authorization from "./Authorization";
import Dashboard from "./Dashboard";
import Cards from "./Cards";
import Decks from "./Decks";
import About from "./About";


// Change this later for more elegant 404 error handling 
const My404 = () => {
  return(
	<div>
	  <h1>Not all who wander are lost...</h1>
	  <h3> But you are. </h3> 
	  <p> If you are trying to access your dashboard and begin making decks, be sure to <strong><Link to="/auth">sign in first</Link></strong> </p>
	  <div className="spacerSearch"></div>
	</div>
  )
}


class App extends Component {
	constructor(){
		super();
		this.state = {
			loggedIn: false,
			loggedInAs: "",
			userId: null
		}
	}
	setLogIn = (username, userId) => {

		if (!username || !userId) {
			this.setLogOut();
			return
		}

		this.setState({
			loggedIn: true,
			loggedInAs: username,
			userId: userId
		})
	}
	setLogOut = () => {
		this.setState({
			loggedIn: false,
			loggedInAs: "",
			userId: null
		})
	}
	render() {

		const authData = this.state

		let access = false; 

		if (this.state.loggedIn && this.state.loggedInAs && this.state.userId) {
			access = true;
		}

		return (
			<main>
				<Header authData={authData} setLogOut={this.setLogOut} />
				<div className="mainCon">
					<section>
						<Switch>
							{ access ? <Route exact path="/" render={ (props) => <Dashboard {...props} setLogOut={this.setLogOut} authData={authData} /> } /> : <Route exact path="/" render={ (props) => <Search {...props} authData={authData} viewBtns={true} viewLow={true} />} /> }
							<Route 
								exact path="/auth" 
								render={ (props) => <Authorization {...props} authData={authData} setLogIn={this.setLogIn} setLogOut={this.setLogOut} />} 
							/>
							<Route 
								exact path="/decks" 
								render={ (props) => <Decks {...props} authData={authData} setLogOut={this.setLogOut} /> }
							/>
							<Route 
								exact path="/cards"
								render={ (props) => <Cards {...props} authData={authData} setLogOut={this.setLogOut} /> } 
							/>
							<Route 
								exact path="/about"
								render={ (props) => <About {...props} authData={authData} /> }
							/>
							<Route 
								component = { My404 } 
							/>
						</Switch>
					</section> 
					<Footer />
				</div>
			</main>
		);
	}
}
							// { access ? <Route exact path="/" render={ (props) => <Dashboard {...props} authData={authData} /> } /> : <Route exact path="/" render={ (props) => <Search {...props} authData={authData} viewBtns={true} />} /> }
							// IF not logged in, mount Search as home page; else, mount dashboard 
// THEN: add { access ? <Route ...... <Decks>}} and similar logic for cards

export default App;
