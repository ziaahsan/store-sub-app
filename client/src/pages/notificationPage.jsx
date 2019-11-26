import React from 'react';
import IframeResizer from 'iframe-resizer-react'
import { format } from 'timeago.js';

// Components
import UIkit from 'uikit';
import LoadingPage from '../components/miscs/loadingPage';


// Services
import StoreService from '../services/storeService';

// Render HTML entities
const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

// Notification page
class NotificationPage extends React.Component {
    constructor(props) {
        super(props);
        // Type
        this.type='notificationPage'
        // initial state of component
		this.state = {
			isLoading: true,
			notificationToken: this.props.match.params.notificationToken,
			notification: null
		}
    }

    // Fetch notification from api using :notificationToken
	async getStoreNotification() {
        let {notificationToken} = this.state;
		let response = await StoreService.getStoreNotification(notificationToken);

        // Update the state
		this.setState({
			isLoading: false,
			notification: response.data.length > 0 ? response.data[0] : null
		});
    }
    
    // OnCreate
	componentDidMount() {
		// Fetch the notification
		this.getStoreNotification();
	}

	// OnDraw
	render() {
        // Get state Vars
        let {isLoading, notification} = this.state;
        
        // Check loading, or null store
		if (isLoading) {
			// Showing loading
			return (
				<LoadingPage />
			);
		} else if (notification == null) {
			// Nothing found message
			return (
				<div className="uk-text-center">
					No updates found.
				</div>
			);
        }
        
        let posted = format(new Date(notification.deliveredDate).toLocaleString());

		// Show store
		return (
			<div className="uk-container uk-container-large">
				<div className="uk-width-1-1">
					<div>
						<h1 className="uk-margin-remove">
                            <b>Viewing Notification</b>
						</h1>
						<p className="uk-margin-remove-top">A detail notification view.</p>
					</div>
                    <div className="store-notification uk-margin uk-card uk-card-default uk-card-body">
                        <div>
                            <h5 className="uk-margin-remove">
                                <b>{renderHTML(notification.subject)}</b>
                            </h5>
                            <p className="uk-margin-remove uk-text-small">{posted}</p>
                        </div>
                    </div>
                    <div className="store-notification uk-margin uk-card uk-card-default uk-card-body">
						<IframeResizer
							id="store-newslettter"
							log
							autoResize="true"
							srcDoc={notification.html}
							style={{ width: '1px', minWidth: '100%', minHeight: "100%"}} />
                    </div>
				</div>
			</div>
		);
	}
}

// Export
export default NotificationPage