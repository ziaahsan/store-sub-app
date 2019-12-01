import React from 'react';

// Service
import StoreService from '../../services/storeService';

// Render HTML entities
const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

// RecentUpdates Components
class RecentUpdates extends React.Component {
    constructor(props) {
        super(props);

        // Type
        this.type=this.props.type;

        // Tags
        this.tags=this.props.tags;

        // page data
        this.page = {
            number: 1,
            orderby: 'recentUpdates',
            limit: 6
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

    // Check before updating component
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.isLoading !== nextState.isLoading)
            return true;
        return false;
    }
    
    // Renders all the updates
    renderRecentUpdates(stores) {
        return(
            Object.keys(stores).map((index, key) => {
                let store = stores[key];
                return (
                    <span key={`${this.type}.${index}`} className="store-recent-card">
                        <div className="uk-card uk-card-default">
                            <div className="uk-padding-small">
                                <div className="uk-float-right uk-position-absolute" style={{top: "-10px", right: "-4px"}}>
                                    <span className="uk-badge uk-box-shadow-medium">{store.notifications}</span>
                                </div>
                                <h5 className="uk-margin-remove uk-text-truncate">
                                    <b>{renderHTML(store.name)}</b> - {renderHTML(store.description)}
                                </h5>
                            </div>
                        </div>
                    </span>
                );
            })
        )
    }
    // Render component
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
                    <p>No stores updates to show.</p>
                </div>
			);
        }
        
        return(
            <div className="uk-margin">
                <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-6@m" uk-grid="true">
                    {this.renderRecentUpdates(stores)}
                </div>
            </div>
        );
    }
}

// Export modeule
export default RecentUpdates;