import React from 'react';

// Loading component
export default class LoadingPage extends React.Component {
    render() {
        return (
            <div>
				<div className="uk-position-center uk-text-center">
					<div uk-spinner="true"></div>
				</div>
			</div>
        );
    }
}