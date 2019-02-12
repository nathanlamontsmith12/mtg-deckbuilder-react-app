import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {

	let access = false;

	if (props.authData.loggedIn && props.authData.loggedInAs && props.authData.userId) {
		access = true;
	}

	return (
		<header>
			<div>
				<h1> Magic: The Gathering </h1>
				<h3> Deckbuilder App </h3>
			</div>
			<nav>
				{ props.authData.loggedIn ? <p><small>Logged in as {props.authData.loggedInAs}</small></p> : null }
				{ props.authData.loggedIn ? <Link onClick={props.setLogOut} to="/auth"> Logout </Link> : <Link to="/auth">Login / Sign up</Link> }
				<Link to="/">Search</Link>
				{ access ? <Link to="/dashboard">Dashboard</Link> : null }
			</nav>
		</header>
	)
}

export default Header;