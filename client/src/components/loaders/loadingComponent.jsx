import React from 'react';

// Spinner for when component is loading on this page
class LoadingSpinner extends React.Component {
	render() {
		return (
			<div className="uk-margin">
				<div className="uk-text-center">
					<div uk-spinner="true"></div>
				</div>
			</div>
		)
	}
}

export default LoadingSpinner;