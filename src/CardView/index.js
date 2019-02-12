import React from "react";

const CardView = (props) => {

	// let loggedIn = false;

	// if (props.authData.loggedIn && props.authData.loggedInAs) {
	// 	loggedIn = true;
	// }

	let className = "cardViewInner";

	if (props.viewLow) {
		className = "cardViewInner viewLow"
	}

	return (
		<div>
			<div className="cardViewOuter">
				<div className={className}>
					<button onClick={props.defaultView.bind(this, props.view.id)}>X</button>
					<img alt={props.view.name} src={props.view.url} />
					<button onClick={props.defaultView.bind(this, props.view.id)}>Close</button> 
				</div>
			</div>
		</div>
	)
}

export default CardView;