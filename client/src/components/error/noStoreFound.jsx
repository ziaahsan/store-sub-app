import React from 'react';

// No store was found
export default class NoStoreFound extends React.Component {
	render() {
		return (
			<div className="uk-position-small uk-position-center">
				<div className="uk-text-center">
					<h2 className="uk-margin-remove">Woops, no store found.</h2>
					<p className="uk-margin-remove">Please go back, and retry.</p>
				</div>
			</div>
		);
	}
}