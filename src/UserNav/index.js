import React from "react";
import { Link } from "react-router-dom";

const UserNav = (props) => {
	return (
		<div className="userNav">
			<Link to="/"><div className="divBtn">
				My Search
			</div></Link>
			<Link to="/cards"><div className="divBtn">
				My Cards
			</div></Link>
			<Link to="/decks"><div className="divBtn">
				My Decks
			</div></Link>				
		</div>
	)
}

export default UserNav;