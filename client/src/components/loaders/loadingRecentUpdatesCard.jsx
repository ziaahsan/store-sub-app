import React from 'react';
import { Link } from 'react-router-dom';

// Custom loader component for updates
class LoadingRecentUpdatesCard extends React.Component {
    constructor(props) {
        super(props);
        // test stores
        this.holder = [];
        this.createUpdatesHolder();
    }

    // Creates test updates
    createUpdatesHolder() {
        for (let i = 0; i < 6; i++) {
            let data = {
                notifications: 0,
                name: 'Store',
                description: 'No description provided.'
            }
            this.holder.push(data);
        }
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
                                            <h5 className="blokk-font uk-margin-remove uk-text-truncate">
                                                <b>{store.name}</b> - {store.description}
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

// Export
export default LoadingRecentUpdatesCard;