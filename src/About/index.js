import React, { Component } from "react";
import { Link } from "react-router-dom";

const About = (props) => {
	console.log(props);
	return (
		<div id="about-text">
			<h1> ABOUT CARDPOOL </h1>
			<p>CardPool is a deckbuilder app for the Magic: The Gathering collectible card game. </p>
			<p>Using CardPool, you can search a comprehensive online database of Magic cards, 
			<br/> from the latest edition to the first release. </p>
			<p>If you create an account, you can save cards that you find to your own personal card pool. </p>
			<p>Users with an account may also create and edit decks. </p> 

			{ !props.authData.loggedIn ? <p> Get started <Link to="/auth"> <strong>here</strong> </Link> </p> : null} 
		</div>
	)
}

export default About;