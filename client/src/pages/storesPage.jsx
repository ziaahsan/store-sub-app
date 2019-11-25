import React from 'react';
import {Link} from 'react-router-dom';

// Components
import UIkit from 'uikit';
import LoadingPage from '../components/misc/loadingPage';
import NoStoreFound from '../components/misc/noStoreFound';

// Service
import StoreService from '../services/storeService';

// Render HTML entities
const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

class FeatureStore extends React.Component {
    render() {
        let { store } = this.props;

        // Current store tags
        // let storeTags = store.tags.split(',');
        return (
            <div className="store-card">
                <div className="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src={store.image} alt=""/>
                    </div>
                    <div className="uk-padding-small">
                        <h3 className="uk-card-title uk-margin-remove" style={{color:store.logoColor}}>
                            <b>{renderHTML(store.nickName)}</b>
                        </h3>
                        <p className="uk-margin-remove">
                            <i>{renderHTML(store.slogan)}</i>
                        </p>
                        <span className="uk-margin-small uk-text-small">
                            <Link to="/" className="uk-link uk-link-text">5 Notificaions</Link>
                        </span>
                        <span> &middot; </span>
                        <span className="uk-margin-small uk-text-small">
                            <Link to="/" className="uk-link uk-link-text">Visit Store</Link>
                        </span>
                        <div className="uk-margin">
                            <Link 
                                className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right"
                                to={`/store/${store.token}`}>
                                View {renderHTML(store.nickName)}
                            </Link>
                            <button className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Store extends React.Component {
    render() {
        let { store } = this.props;

        // Current store tags
        // let storeTags = store.tags.split(',');
        return (
            <div className="store-card">
                <div className="uk-card uk-card-body uk-card-default">
                    <div>
                        <h3 className="uk-card-title uk-margin-remove" style={{color:store.logoColor}}>
                            <b>{renderHTML(store.nickName)}</b>
                        </h3>
                        <p className="uk-margin-remove">
                            <i>{renderHTML(store.slogan)}</i>
                        </p>
                        <span className="uk-margin-small uk-text-small">
                            <Link to="/" className="uk-link uk-link-text">5 Notificaions</Link>
                        </span>
                        <span> &middot; </span>
                        <span className="uk-margin-small uk-text-small">
                            <Link to="/" className="uk-link uk-link-text">Visit Store</Link>
                        </span>
                    </div>
                    <div className="uk-margin uk-text-left">
                        <Link 
                            className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right"
                            to={`/store/${store.token}`}>
							View {renderHTML(store.nickName)}
						</Link>
                        <button className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right">
							Subscribe
						</button>
					</div>
                </div>
            </div>
        );
    }
}

class StoresPage extends React.Component {
    constructor(props) {
        super(props);
        // Type
        this.type='storesPage'
        // Update the state
		this.state = {
			isLoading: true,
			stores: null
        };
        // Adding event source
		this.eventSource = new EventSource("http://192.168.2.31:5000/sse");
    }

    // Fetch the stores from api databse
    async getStoresByTag() {
        let feature = await StoreService.getStoresByTag("feature");
        let store = await StoreService.getStoresByTag("store");

        // Update the state
		this.setState({
            isLoading: false,
            stores: {
                featured: feature.data.length > 0 ? feature.data : null,
                all: store.data.length > 0 ? store.data : null
            }
		});
    }

    // Send a notification to the client
	notify(text, status) {
		// Make message
		let str = `
        <div class="uk-text-left">
			<p class="uk-margin-remove uk-text-small">${text}</p>
		</div>`;

		// Send notification using UIkit
		UIkit.notification({
			message: str,
			status: status,
			pos: 'bottom-right',
			group: this.type,
			timeout: 5000
		});
	}

	// SSE Handler
	sseHandler() {
		this.eventSource.onmessage = (message) => {
			// Message var
			let data = JSON.parse(message.data);
			let type = data.type;

			// Check message type
			if (type !== 'storeNotification') return;

			// Message event
			switch (data.event) {
				case "create":
                    let queryData = data.queryData;
					this.notify(`📣 ${queryData.subject}`, 'Primary');
					break;
				default:
					break;
			}
		}
    }
    
    // When component is ready, 
    componentDidMount() {
        // Initiate the sse
		this.sseHandler();
        // Fetch the all stores
        this.getStoresByTag();
    }

    // OnDestroy
	componentWillUnmount() {
		// Close the connection
		this.eventSource.close();
	}

    render() {
        // Get state Vars
		let {isLoading, stores} = this.state;

		// Check loading, or null store
		if (isLoading) {
			return (
				<LoadingPage />
			);
		} else if (stores == null) {
			return (
				<NoStoreFound />
			);
        }
        return(
            <div className="uk-container uk-container-large">
                <div className="uk-width-1-1">
                    <div>
                        <h1 className="uk-margin-remove">
                            <b>Live Subscription</b>
                        </h1>
                        <p className="uk-margin-remove-top">Subscribe to any product and get live updates wherever you are.</p>
                    </div>
                    <hr/>
                    {/* Stores Component */}
                    <div>
                        <h3 className="uk-card-title uk-margin-remove">
                            <b>Stores</b>
                        </h3>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="true">
                            {
                                Object.keys(stores.all).map((index, key) => {
                                    let store = stores.all[key];
                                    if (store.tags.includes('featured')) return;
                                    return (
                                        <Store key={index} store={store}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {/* Featured Component */}
                    <div>
                        <h3 className="uk-card-title uk-margin-remove">
                            <b>Featured</b>
                        </h3>
                    </div>
                    <div className="uk-margin">
                        <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="true">
                            {
                                Object.keys(stores.featured).map((index, key) => {
                                    let store = stores.featured[key];
                                    return (
                                        <FeatureStore key={index} store={store}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Export
export default StoresPage;