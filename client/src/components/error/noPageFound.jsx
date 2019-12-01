import React from 'react';

// No store was found
export default class NoPageFound extends React.Component {
	render() {
		return (
			<div className="uk-position-small uk-position-center">
				<div className="uk-text-center">
					<h2 className="uk-margin-remove">404, page not found.</h2>
					<p className="uk-margin-remove">Woopsy, seems like what your looking for doesnt exist.</p>
				</div>
			</div>
		);
	}
}