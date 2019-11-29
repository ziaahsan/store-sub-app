import React from 'react';
import { Link } from 'react-router-dom';

// Components
import LoadingComponent from '../loaders/loadingComponent';

// Service
import StoreService from '../../services/storeService';

// Render HTML entities
const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

// Featured Components
class Featured extends React.Component {
    constructor(props) {
        super(props);

        // Type
        this.type=this.props.type;

        // Tags
        this.tags=this.props.tags;

        // page data
        this.page = {
            number: 1,
            orderby: 'alphabetically',
            limit: 4
        }

        // Update the state
		this.state = {
			isLoading: true,
			stores: null
        };
    }

    // Fetch the stores from api databse
    async getStoresByTags() {
        const response = await StoreService.getStoresByTags(this.tags, this.page.number, this.page.orderby, this.page.limit);

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
                                                <Link to="/" className="uk-link uk-link-text">{store.notifications} Notificaions</Link>
                                            </span>
                                            <span> &middot; </span>
                                            <span className="uk-margin-small uk-text-small">
                                                <a className="uk-link uk-link-text" herf={store.website} target="_blank">Visit Store</a>
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
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

// Export
export default Featured;