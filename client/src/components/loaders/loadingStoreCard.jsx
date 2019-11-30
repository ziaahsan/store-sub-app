import React from 'react';
import { Link } from 'react-router-dom';

// Custom loader component for stores
class LoadingStoreCard extends React.Component {
    constructor(props) {
        super(props);
        // test stores
        this.holder = [];
        this.createStoresHolder();
    }

    // Creates test updates
    createStoresHolder() {
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
            <div className="uk-margin uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="true">
            {
                Object.keys(this.holder).map((index, key) => {
                    let store = this.holder[key];
                    return (
                        <div key={index} className="store-card">
                            <div className="uk-card uk-card-body uk-card-default">
                                <div>
                                    <h3 className="blokk-font uk-card-title uk-margin-remove" style={{color:store.logoColor}}>
                                        <b>{store.name}</b>
                                    </h3>
                                    <p className="blokk-font uk-margin-remove">
                                        <i>{store.description}</i>
                                    </p>
                                    <span className="blokk-font uk-margin-small uk-text-small">
                                        <Link to="/" className="uk-link uk-link-text">{store.notifications} Notificaions</Link>
                                    </span>
                                    <span> &middot; </span>
                                    <span className="uk-margin-small uk-text-small">
                                        <Link to="/" className="blokk-font uk-link uk-link-text">
                                            Visit Store
                                        </Link>
                                    </span>
                                </div>
                                <div className="uk-margin uk-text-left">
                                    <Link 
                                        className="blokk-font uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right"
                                        to={`/store/${store.token}`}>
                                        View Store
                                    </Link>
                                    <button className="blokk-font uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right">
                                        Watch {store.name}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
        );
    }
}

// Export
export default LoadingStoreCard;