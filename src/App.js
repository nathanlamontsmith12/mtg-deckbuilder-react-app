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
	render() {
		return (
			<main>
				<Header />
				<Switch>
					<Route exact path="/" component = { Search } />
					<Route exact path="/auth" component = { Authorization } />
					<Route component = { My404 } />
				</Switch> 
				<Footer />
			</main>
		);
	}
}

export default App;
