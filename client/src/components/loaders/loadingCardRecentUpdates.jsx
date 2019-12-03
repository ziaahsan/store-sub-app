import React from 'react';

// Custom loader component for updates
class LoadingCardRecentUpdates extends React.Component {
    constructor(props) {
        super(props);

        // Type
        this.type = 'CardRecentUpdates';

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
        this.holder = [];
    }

    // Renders all the update cards
    renderUpdatesesCard() {
        return(
            Object.keys(this.holder).map((index, key) => {
                let store = this.holder[key];
                return (
                    <span key={`${this.type}.${index}`} className="store-recent-card">
                        <div className="uk-card uk-card-default">
                            <div className="uk-padding-small">
                                <div className="uk-float-right uk-position-absolute" style={{top: "-10px", right: "-4px"}}>
                                    <span className="blokk-font uk-badge uk-box-shadow-medium">{store.notifications}</span>
                                </div>
                                <h5 className="blokk-font uk-margin-remove uk-text-truncate">
                                    <b>{store.name}</b> <span className="uk-visible@s">- {store.description}</span>
                                </h5>
                            </div>
                        </div>
                    </span>
                );
            })
        );
    }

    // Render componenet
    render() {
        return(
            <div className="uk-margin">
                <div className="uk-height-auto uk-grid-small uk-child-width-1-2 uk-child-width-1-6@m" uk-grid="true">
                    {this.renderUpdatesesCard()}
                </div>
            </div>
        );
    }
}

// Export
export default LoadingCardRecentUpdates;