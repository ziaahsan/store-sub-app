import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';

// Page Components
import RecentUpdates from '../components/stores/recentUpdates';

// Loaders Component
import LoadingPage from '../components/loaders/loadingPage';
import LoadingComponent from '../components/loaders/loadingComponent';

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

	// Draw component on screen
	render() {
		// Get state Vars
		let {isLoading, notifications} = this.state;

		// Check loading, or null store
		if (isLoading) {
			// Showing loading
			return (
				<LoadingComponent />
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
			Object.keys(notifications).map((index, key) => {
				let notification = notifications[key];
				let posted = format(new Date(notification.deliveredDate).toLocaleString());
				return (
					<div className="store-notification uk-margin" key={index}>
						<div className="uk-flex uk-flex-middle uk-grid-small" uk-grid="true">
							<div className="uk-width-expand">
								<h4 className="uk-margin-remove">
									{renderHTML(notification.subject)}
								</h4>
								<p className="uk-margin-remove uk-text-truncate">{renderHTML(notification.message)}</p>
								<p className="uk-margin-remove uk-text-small">{posted}</p>
							</div>
							<div className="uk-width-small uk-text-right">
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
}

// Store page
class StorePage extends React.Component {
	constructor(props) {
		super(props);
		this.type = 'store';
		this.state = {
			isLoading: true,
			storeToken: this.props.match.params.storeToken,
			store: null
		}
	}

	// Fetch store from api using :storeToken
	async getStore() {
		let {storeToken} = this.state;
		let response = await StoreService.getStore(storeToken);

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

	// OnDraw
	render() {
		// Get state Vars
		let {isLoading, store, storeToken} = this.state;

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
				<div className="uk-width-1-1">
					<div>
						<h1 className="uk-margin-remove">
							<b>Viewing Store</b>
						</h1>
						<p className="uk-margin-remove-top">Recieve <span style={{color: "#f3003f"}}>real-time</span> notifications
							from this store when you subscribe.</p>
					</div>
					<hr/>
					<div>
						{/* Store Component */}
						<div>
							<div>
								<h3 className="uk-card-title uk-margin-remove" style={{color:store.logoColor}}>
									<b>{renderHTML(store.nickName)}</b>
								</h3>
								<p className="uk-margin-remove">
									<i>{renderHTML(store.slogan)}</i>
								</p>
							</div>
						</div>
						{/* Notification Component */}
						<div className="store-notifications uk-margin uk-card uk-card-default uk-card-body">
							<div>
								<div className="uk-float-right">
									<button className="uk-button uk-button-small uk-button-secondary uk-text-capitalize uk-margin-small-right">
										Watch {renderHTML(store.nickName)}
									</button>
									<button className="uk-button uk-button-small uk-button-primary uk-text-capitalize">
										More
									</button>
								</div>
								<h5 className="uk-margin-remove">
									<b>Updates</b>
								</h5>
								<p className="uk-margin-remove">Live updates from store.</p>
							</div>
							<hr/>
							<div className="uk-margin">
								<StoreNotifications storeToken={`${storeToken}`} />
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
					<RecentUpdates type='Stores' tags="store" />
				</div>
			</div>
		);
	}
}

// Export
export default StorePage