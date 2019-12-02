import React from 'react';

// UIkit
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// 
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

// Page Components
import RecentUpdates from '../components/cards/recentUpdates';

// Loaders Component
import LoadingPage from '../components/loaders/loadingPage';
import LoadingSpinner from '../components/loaders/loadingSpinner';
import LoadingCardRecentUpdates from '../components/loaders/loadingCardRecentUpdates';

// Error component
import NoStoreFound from '../components/error/noStoreFound';

// Services
import StoreService from '../services/storeService';

// Render HTML entities
const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

// Store notifications component
class StoreNotifications extends React.Component {
	constructor(props) {
		super(props);
		// type
		this.type = 'storeNotification';
		// initial state of component
		this.state = {
			isLoading: true,
			storeToken: this.props.storeToken,
			notifications: null
		}
	}

	// Fetch notifications from api using :storeToken
	async getNotifications() {
		let {storeToken} = this.state;
		let response = await StoreService.getStoreNotifications(storeToken);

		// Update the state
		this.setState({
			isLoading: false,
			notifications: response.data.length > 0 ? response.data : null
		});
	}

	// OnCreate
	componentDidMount() {
		// Fetch the current store
		this.getNotifications();
	}

	// Check before updating component
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.isLoading !== nextState.isLoading)
            return true;
        return false;
    }

	// Render's notification
	renderNotification(notifications) {
		return(
			Object.keys(notifications).map((index, key) => {
				let notification = notifications[key];
				let posted = format(new Date(notification.deliveredDate).toLocaleString());
				return (
					<div className="store-notification uk-margin" key={`${this.type}.${index}`}>
						<div className="uk-flex uk-flex-middle uk-grid-small" uk-grid="true">
							<div className="uk-width-expand">
								<h6 className="uk-margin-remove uk-hidden@s">
									{renderHTML(notification.subject)}
								</h6>
								<h4 className="uk-margin-remove uk-visible@s">
									{renderHTML(notification.subject)}
								</h4>
								<h5 className="uk-width-1-2 uk-margin-remove uk-text-truncate secondary-text-color uk-visible@s">{renderHTML(notification.message)}</h5>
								<p className="uk-margin-remove uk-text-small">{posted}</p>
							</div>
							<div className="uk-width-small uk-text-right uk-visible@s">
								<Link
									to={`/notification/${notification.token}`}
									className="uk-button uk-button-small uk-button-default uk-text-capitalize"
								>
									View Update
								</Link>
							</div>
						</div>
					</div>
				);
			})
		);
	}

	// Draw component on screen
	render() {
		console.log("> Rendering Store Page Notifications");
		// Get state Vars
		let {isLoading, notifications} = this.state;

		// Check loading, or null store
		if (isLoading) {
			// Showing loading
			return (
				<LoadingSpinner />
			);
		} else if (notifications == null) {
			// Nothing found message
			return (
				<div className="uk-text-center">
					<p className="uk-margin-remove">No updates found.</p>
				</div>
			);
		}

		// Showing notifications
		return (
			<div>
				{/* Updates */}
				{this.renderNotification(notifications)}

				{/* Load More */}
				{(notifications.length > 5) ?
					<div className="uk-margin uk-margin-remove-bottom  uk-text-center">
						<Link
							to='/'
							className="uk-button uk-button-small uk-button-blue uk-text-capitalize">
							Load old Updates
						</Link>
					</div>
					:
					''
				}
			</div>
		);
	}
}

// Store page
class StorePage extends React.Component {
	constructor(props) {
		super(props);
		
		// initalize the uikit icons
		UIkit.use(Icons);
		
		// Type
		this.type = 'store';
		// State
		this.state = {
			isLoading: true,
			slug: this.props.match.params.slug,
			store: null
		}
	}

	// Fetch store from api using :slug
	async getStore() {
		let {slug} = this.state;
		let response = await StoreService.getStoreBySlug(slug);

		// Update the state
		this.setState({
			isLoading: false,
			store: response.data.length > 0 ? response.data[0] : null
		});
	}

	// OnCreate
	componentDidMount() {
		// Fetch the current store
		this.getStore();
	}

	// Check before updating component
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.isLoading !== nextState.isLoading)
            return true;
        return false;
    }

	// OnDraw
	render() {
		console.log("Rendeering Store Page");
		// Get state Vars
		let { isLoading, store } = this.state;

		// Check loading, or null store
		if (isLoading) {
			return (
				<LoadingPage />
			);
		} else if (store == null) {
			return (
				<NoStoreFound />
			);
		}
		
		// Show store
		return (
			<div className="uk-container uk-container-large">
				{/* <div className="uk-position-top-center uk-box-shadow-small" style={{top: '22px'}}>
					<div className="uk-text-left uk-notification-message" style={{padding: '8px'}}>
						<p className="uk-margin-remove uk-text-small uk-text-center uk-text-truncate">
						<span uk-icon="icon: close;ratio: 0.85"></span> Close <span className="uk-text-capitalize">{renderHTML(store.name)}</span>
						</p>
					</div>
				</div> */}
				<div className="uk-width-1-1">
					<div>
						<h1 className="uk-margin-remove">
							<b>Viewing <span className="uk-text-capitalize">{store.category}</span></b>
						</h1>
						<p className="uk-margin-remove-top">Recieve <span style={{color: "#f3003f"}}>real-time</span> notifications
							from this store when you watch.</p>
					</div>
					<hr/>
					<div>
						{/* Store Component */}
						<div>
							<div>
								<h3 className="uk-card-title uk-margin-remove">
									<b>{renderHTML(store.name)}</b>
								</h3>
								<p className="uk-margin-remove">
									<i>{renderHTML(store.description)}</i>
								</p>
							</div>
						</div>
						{/* Notification Component */}
						<div className="store-notifications uk-margin uk-card uk-card-default uk-card-body">
							<div>
								<div className="uk-float-right uk-visible@s">
									<button className="uk-button uk-button-small uk-button-secondary uk-text-capitalize uk-margin-small-right">
										Watch {renderHTML(store.name)}
									</button>
									<button className="uk-button uk-button-small uk-button-primary uk-text-capitalize">
										<span uk-icon="icon: more;ratio: 0.85"></span>
									</button>
								</div>
								<h3 className="uk-margin-remove">
									Updates
								</h3>
								<p className="uk-margin-remove uk-visible@s">Watch and recieve live updates from this {store.category}.</p>
							</div>
							<div className="uk-margin">
								<StoreNotifications storeToken={`${store.token}`} />
							</div>
						</div>
					</div>
				</div>

				{/* Recent updates from similar store */}
				<div>
					<div>
						<h2 className="uk-margin-remove">
							<b>Similar Store Updates</b>
						</h2>
					</div>
					<RecentUpdates type='Stores' tags="store">
						<LoadingCardRecentUpdates />
					</RecentUpdates>
				</div>
			</div>
		);
	}
}

// Export
export default StorePage