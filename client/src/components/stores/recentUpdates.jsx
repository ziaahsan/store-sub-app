import React from 'react';

// Service
import StoreService from '../../services/storeService';

// Render HTML entities
const renderHTML = (rawHTML) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

// Custom loader component for updates
class RecentUpdatesLoader extends React.Component {
    constructor(props) {
        super(props);
        // test stores
        this.holder = [];
    }

    // Creates test updates
    createUpdatesHolder() {
        for (let i = 0; i < 6; i++) {
            let data = {
                notifications: 0,
                logoColor: '#000000',
                nickName: 'Store',
                slogan: 'No description provided.'
            }
            this.holder.push(data);
        }
    }

    // When component is ready
    componentDidMount() {
        // Create test stores
        this.createUpdatesHolder();
    }

    // When component is destroyed
    componentWillUnmount() {
        this.holder = null;
    }

    // Render componenet
    render() {
        return(
            <div className="uk-margin">
                <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-6@m" uk-grid="true">
                    {
                        Object.keys(this.holder).map((index, key) => {
                            let store = this.holder[key];
                            return (
                                <span key={index} className="store-recent-card">
                                    <div className="uk-card uk-card-default">
                                        <div className="uk-padding-small">
                                            <div className="uk-float-right uk-position-absolute" style={{top: "-10px", right: "-4px"}}>
                                                <span className="blokk-font uk-badge uk-box-shadow-medium">{store.notifications}</span>
                                            </div>
                                            <h5 className="blokk-font uk-margin-remove uk-text-truncate" style={{color:store.logoColor}}>
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

        // Adding event source
		this.eventSource = new EventSource("http://192.168.2.31:5000/sse");
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
				<RecentUpdatesLoader />
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
                                                <span className="uk-badge uk-box-shadow-medium">{store.notifications}</span>
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

// Export modeule
export default RecentUpdates;