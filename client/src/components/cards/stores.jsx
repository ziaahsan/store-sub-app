import React from 'react';
import { Link } from 'react-router-dom';

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
    async getStoreByTags() {
        // Get result
        const result = await StoreService.getStoreByTags(this.tags, this.page.number, this.page.orderby, this.page.limit);
        
        // Update the state
		this.setState({
            isLoading: false,
            stores: result.data.response.length > 0 ? result.data.response : null
        });
    }

    // When component is ready
    componentDidMount() {
        // Fetch the all stores
        this.getStoreByTags();
    }

    // Check before updating component
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.isLoading !== nextState.isLoading)
            return true;
        return false;
    }
    
    // Shows letter
    renderLetter(letter) {
        return (
            <div className="uk-width-1-1">
                {/* <span><b>{letter}</b></span> */}
            </div>
        );
    }

    // Renders stores for explore page
    renderExploreStores() {
        let { stores } = this.state;
        let prevLetter = '';
        return (
            Object.keys(stores).map((index, key) => {
                let store = stores[key];
                
                let currLetter = store.name[0];
                let breakRow = false;
                if (currLetter !== prevLetter) {
                    prevLetter = currLetter;
                    breakRow = true;
                }

                return (
                    <React.Fragment key={`${this.type}.${index}`}>
                        {(breakRow) ? this.renderLetter(currLetter) : ''}
                        <div className="store-card">
                            <div className="uk-card uk-card-body uk-card-default">
                                <div>
                                    {/* <div class="uk-card-badge uk-label uk-text-capitalize">{store.category}</div> */}
                                    <h3 className="uk-card-title uk-margin-remove">
                                        <b>{renderHTML(store.name)}</b>
                                    </h3>
                                    <p className="uk-margin-remove uk-text-truncate">
                                        <i>{renderHTML(store.description)}</i>
                                    </p>
                                    <span className="uk-margin-small uk-text-small">
                                        <Link to="/" className="uk-link uk-link-text">{store.notifications} Notificaions</Link>
                                    </span>
                                    <span> &middot; </span>
                                    <span className="uk-margin-small uk-text-small">
                                        <Link to="/" className="uk-link uk-link-text">
                                            Visit Store
                                        </Link>
                                    </span>
                                </div>
                                <div className="uk-margin uk-text-left">
                                    <Link 
                                        className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right"
                                        to={`/store/${store.slug}`}>
                                        View Store
                                    </Link>
                                    <button style={{maxWidth: '145px'}} className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-text-truncate">
                                        Watch {renderHTML(store.name)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                );
            })
        );
    }

    // Renders all the stores
    renderStores() {
        let { stores } = this.state;

        return (
            Object.keys(stores).map((index, key) => {
                let store = stores[key];
                return (
                    <div key={`${this.type}.${index}`} className="store-card">
                        <div className="uk-card uk-card-body uk-card-default">
                            <div>
                                {/* <div class="uk-card-badge uk-label uk-text-capitalize">{store.category}</div> */}
                                <h3 className="uk-card-title uk-margin-remove">
                                    <b>{renderHTML(store.name)}</b>
                                </h3>
                                <p className="uk-margin-remove uk-text-truncate">
                                    <i>{renderHTML(store.description)}</i>
                                </p>
                                <span className="uk-margin-small uk-text-small">
                                    <Link to="/" className="uk-link uk-link-text">{store.notifications} Notificaions</Link>
                                </span>
                                <span> &middot; </span>
                                <span className="uk-margin-small uk-text-small">
                                    <Link to="/" className="uk-link uk-link-text">
                                        Visit Store
                                    </Link>
                                </span>
                            </div>
                            <div className="uk-margin uk-text-left">
                                <Link 
                                    className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right"
                                    to={`/store/${store.slug}`}>
                                    View Store
                                </Link>
                                <button style={{maxWidth: '215px'}} className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-text-truncate">
                                    Watch {renderHTML(store.name)}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }

    // Render componenet
    render() {
        // Get state Vars
		let {isLoading, stores} = this.state;

		// Check loading, or null store
		if (isLoading) {
			return (
                this.props.children
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
                <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="true">
                    {this.type === "explore" ? this.renderExploreStores() : this.renderStores()}
                </div>
                
                {/* Button */}
                {(this.type !== "explore")
                    ? 
                    <div className="uk-margin uk-text-center">
                        <Link
                            to={`/explore/tags/${this.tags.toLowerCase()}`}
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