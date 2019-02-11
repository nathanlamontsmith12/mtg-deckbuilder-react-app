import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";

import Search from "./Search";

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
		<Switch>
			<Route exact path="/" component = { Search } />
			<Route component = { My404 } />
		</Switch> 
	  </main>
	);
  }
}

export default App;
