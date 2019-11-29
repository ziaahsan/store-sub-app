import React from 'react';
import { Link } from 'react-router-dom';

// Components
import LoadingComponent from '../loaders/loadingComponent';

// Service
import StoreService from '../../services/storeService';

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

        // page data
        this.page = {
            number: 1,
            orderby: this.type === "explore" ? 'alphabetically' : 'popular',
            limit: this.type === "explore" ? 50 : 6
        }

        // Update the state
		this.state = {
            isLoading: true,
			stores: null
        };
    }

    // Fetch the stores from api databse
    async getStoresByTags() {
        // Get response
        const response = await StoreService.getStoresByTags(this.tags, this.page.number, this.page.orderby, this.page.limit);
        
        // Update the state
		this.setState({
            isLoading: false,
            stores: response.data.length > 0 ? response.data : null
        });
    }

    // When component is ready
    componentDidMount() {
        // Fetch the all stores
        this.getStoresByTags();
    }
    
    // Renders all the stores
    renderStores() {
        let { stores } = this.state;
        return (
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
                                        <Link to="/" className="uk-link uk-link-text">{store.notifications} Notificaions</Link>
                                    </span>
                                    <span> &middot; </span>
                                    <span className="uk-margin-small uk-text-small">
                                        <a className="uk-link uk-link-text" herf={store.website} target="_blank">Visit Store</a>
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
                    );
                })
            }
            </div>
        )
    }

    // Render componenet
    render() {
        // Get state Vars
		let {isLoading, stores} = this.state;

		// Check loading, or null store
		if (isLoading) {
			return (
				<LoadingComponent />
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
                {/* Stores */}
                {this.renderStores()}
                
                {/* Button */}
                {(this.type !== "explore")
                    ? 
                    <div className="uk-margin uk-text-center">
                        <Link
                            to={`/explore/${this.tags.toLowerCase()}`}
                            className="uk-button uk-button-small uk-button-blue uk-text-capitalize uk-margin-small-right">
                            Explore {this.type}
                        </Link>
                    </div>
                    :
                    ''
                }
            </div>
        );
    }
}

// Export
export default Stores;