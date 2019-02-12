import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";


// Components: 
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";
import Authorization from "./Authorization"


// Change this later for more elegant 404 error handling 
const My404 = () => {
  return(
	<div>
	  You are lost!!
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

		return (
			<main>
				<Header authData={authData} setLogOut={this.setLogOut} />
				<Switch>
					<Route 
						exact path="/" 
						render={ (props) => <Search {...props} authData={authData} />} 
					/>
					<Route 
						exact path="/auth" 
						render={ (props) => <Authorization {...props} authData={authData} setLogIn={this.setLogIn} setLogOut={this.setLogOut} />} 
					/>
					<Route component = { My404 } />
				</Switch> 
				<Footer />
			</main>
		);
	}
}

export default App;
