import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {

	return (
		<header>
			<div className="headerCon">
				<div className="titleCon">
					<h1> CardPool </h1>
				</div>
				<div className="subtitleCon">
					<h3> Magic: The Gathering </h3>
					<h3> Deckbuilder App </h3>
				</div>
			</div>
			<nav>
				{ props.authData.loggedIn ? <p><small>Logged in as {props.authData.loggedInAs}</small></p> : null }
				{ props.authData.loggedIn ? <Link onClick={props.setLogOut} to="/auth"> Logout </Link> : <Link to="/auth">Login / Sign up</Link> }
				<Link to="/">Home</Link>
			</nav>
		</header>
	)
}

export default Header;