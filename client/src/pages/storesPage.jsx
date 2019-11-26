import React from 'react';
import {Link} from 'react-router-dom';

// Components
import UIkit from 'uikit';
import LoadingSpinner from '../components/miscs/loadingSpinner';

// Service
import StoreService from '../services/storeService';

// Render HTML entities
const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

// Store Component
class Stores extends React.Component {
    constructor(props) {
        super(props);

        // Type
        this.type = this.props.type;

        // Tags
        this.tags = this.props.tags;

        // Item offset
        this.itemOffset = 0;

        // Update the state
		this.state = {
            isLoading: true,
            isLoadMore: false,
            canShowMore: true,
			stores: null
        };

        // Get more event
        this.loadMoreClick = this.loadMoreClick.bind(this);
    }

    // Fetch the stores from api databse
    async getStoresByTags() {
        // Get response
        let response = await StoreService.getStoresByTags(this.tags, this.itemOffset);

        // Update the state
		this.setState({
            isLoading: false,
            stores: response.data.length > 0 ? response.data : null
        });
    }
    
    // Fetch the stores from api databse
    async getMoreStoresByTags() {
        // Increase the offset
        this.itemOffset = this.itemOffset + 6;

        // Get response
        let response = await StoreService.getStoresByTags(this.tags, this.itemOffset);
        if (response.data.length > 0) {
            // push new stores to current store as tmpStores
            let stores = this.state.stores;
            Object.keys(response.data).map((index, key) => {
                let newStore = response.data[index];
                stores.push(newStore);
            });
            
            // Update the state
            this.setState({
                isLoadMore: false,
                stores: stores
            });
        } else {
            // Update the state
            this.setState({
                isLoadMore: false,
                canShowMore: false
            });
        }
    }

    // Fetch load more data
    loadMoreClick() {
        // Update state for load more
        this.setState({
            isLoadMore: true,
        });

        // Initate the call to get data
        this.getMoreStoresByTags();
    }

    // When component is ready
    componentDidMount() {
        // Fetch the all stores
        this.getStoresByTags();
    }

    // Render componenet
    render() {
        // Get state Vars
		let {isLoading, isLoadMore, canShowMore, stores} = this.state;

		// Check loading, or null store
		if (isLoading) {
			return (
				<LoadingSpinner />
			);
		} else if (stores == null) {
			return (
				<div>
                    <p>No stores to show.</p>
                </div>
			);
        }

        return(
            <div className="uk-margin">
                <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="true">
                    {
                        Object.keys(stores).map((index, key) => {
                            let store = stores[key];
                            return (
                                <div key={index} className="store-card">
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
                                                View Store
                                            </Link>
                                            <button className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right">
                                                Watch {renderHTML(store.nickName)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="uk-margin uk-text-center">
                    {(!isLoadMore) ?
                        (canShowMore) ? 
                            <button onClick={this.loadMoreClick} className="uk-button uk-button-small uk-button-blue uk-text-capitalize uk-margin-small-right">
                                Load more {this.type}
                            </button>
                            :
                            <button className="uk-button uk-button-small uk-button-blue uk-text-capitalize uk-margin-small-right">
                                All {this.type} Loaded
                            </button>
                        :
                        <button className="uk-button uk-button-small uk-button-blue uk-text-capitalize uk-margin-small-right">
                            Loading <div uk-spinner="ratio: 0.35"></div>
                        </button>
                    }
                </div>
            </div>
        );
    }
}

// Featured Components
class Featured extends React.Component {
    constructor(props) {
        super(props);

        // Type
        this.type=this.props.type;

        // Tags
        this.tags=this.props.tags;

        // Update the state
		this.state = {
			isLoading: true,
			stores: null
        };
    }

    // Fetch the stores from api databse
    async getStoresByTags() {
        let response = await StoreService.getStoresByTags(this.tags);

        // Update the state
		this.setState({
            isLoading: false,
            stores: response.data.length > 0 ? response.data : null
		});
    }
    
    // When component is ready, 
    componentDidMount() {
        // Fetch the all stores
        this.getStoresByTags();
    }

    // Render component
    render() {
        // Get state Vars
		let {isLoading, stores} = this.state;

		// Check loading, or null store
		if (isLoading) {
			return (
				<LoadingSpinner />
			);
		} else if (stores == null) {
			return (
				<div>
                    <p>No stores to show.</p>
                </div>
			);
        }

        return(
            <div className="uk-margin">
                <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m" uk-grid="true">
                    {
                        Object.keys(stores).map((index, key) => {
                            let store = stores[key];
                            return (
                                <div key={index} className="store-featured-card">
                                    <div className="uk-card uk-card-default">
                                        <div className="uk-card-media-top">
                                            <img src={store.image} alt=""/>
                                        </div>
                                        <div className="uk-padding">
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
                                                    View
                                                </Link>
                                                <button className="uk-button uk-button-small uk-button-orange uk-text-capitalize uk-margin-small-right">
                                                    Watch {renderHTML(store.nickName)}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

// RecentUpdates Components
class RecentUpdates extends React.Component {
    constructor(props) {
        super(props);

        // Type
        this.type=this.props.type;

        // Tags
        this.tags=this.props.tags;

        // Update the state
		this.state = {
			isLoading: true,
			stores: null
        };
    }

    // Fetch the stores from api databse
    async getStoresByTags() {
        let response = await StoreService.getStoresByTags(this.tags);

        // Update the state
		this.setState({
            isLoading: false,
            stores: response.data.length > 0 ? response.data : null
		});
    }
    
    // When component is ready, 
    componentDidMount() {
        // Fetch the all stores
        this.getStoresByTags();
    }

    // Render component
    render() {
        // Get state Vars
		let {isLoading, stores} = this.state;

		// Check loading, or null store
		if (isLoading) {
			return (
				<LoadingSpinner />
			);
		} else if (stores == null) {
			return (
				<div>
                    <p>No stores updates to show.</p>
                </div>
			);
        }
        
        return(
            <div className="uk-margin">
                <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-6@m" uk-grid="true">
                    {
                        Object.keys(stores).map((index, key) => {
                            let store = stores[key];
                            return (
                                <span key={index} className="store-recent-card">
                                    <div className="uk-card uk-card-default">
                                        <div className="uk-padding-small">
                                            <div className="uk-float-right uk-position-absolute" style={{top: "-10px", right: "-4px"}}>
                                                <span className="uk-badge uk-box-shadow-medium">2</span>
                                            </div>
                                            <h5 className="uk-margin-remove uk-text-truncate" style={{color:store.logoColor}}>
                                                <b>{renderHTML(store.nickName)}</b> - {renderHTML(store.slogan)}
                                            </h5>
                                        </div>
                                    </div>
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

// Stores Page
class StoresPage extends React.Component {
    render() {
        return(
            <div className="uk-container uk-container-large">
                <div className="uk-width-1-1">
                    <div>
                        <h1 className="uk-margin-remove">
                            <b>Watch for Updates</b>
                        </h1>
                        <p className="uk-margin-remove-top">Look for a product and get live updates wherever you are.</p>
                    </div>
                    <hr/>
                    {/* Stores Component */}
                    <div>
                        <div>
                            <h2 className="uk-margin-remove">
                                <b>Recent Updates</b>
                            </h2>
                            <p className="uk-margin-remove">
                                Find out what's happened over the last 7 days
                            </p>
                        </div>
                        <RecentUpdates type='Stores' tags="store" />
                    </div>
                    {/* Stores Component */}
                    <div>
                        <div>
                            <h2 className="uk-margin-remove">
                                <b>Stores</b>
                            </h2>
                        </div>
                        <Stores type='Stores' tags="store" />
                    </div>
                    {/* Featured Component */}
                    <div>
                        <div>
                            <h2 className="uk-margin-remove">
                                <b>Featured</b>
                            </h2>
                        </div>
                        <Featured type='Featured' tags="featured" />
                    </div>
                     {/* Techy Component */}
                    <div>
                        <div>
                            <h2 className="uk-margin-remove">
                                <b>Techy</b>
                            </h2>
                        </div>
                        <Stores type='Techy' tags="store,techy" />
                    </div>
                </div>
            </div>
        );
    }
}

// Export
export default StoresPage;