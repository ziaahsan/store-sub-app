import React from 'react';
import { Link } from 'react-router-dom';

// Image component
import FeaturePlaceHolderImg from './images/featurePlaceHolderImg.png';

// Custom loader component for stores
class LoadingCardFeatured extends React.Component {
    constructor(props) {
        super(props);

        // Type
        this.type = 'CardFeatured';

        // test stores
        this.holder = [];
        this.createStoresHolder();
    }

    // Creates test updates
    createStoresHolder() {
        for (let i = 0; i < 4; i++) {
            let data = {
                notifications: 0,
                name: 'Store',
                description: 'No description provided.',
                image: FeaturePlaceHolderImg
            }
            this.holder.push(data);
        }
    }

    // When component is destroyed
    componentWillUnmount() {
        this.holder = [];
    }

    // Renders all the store cards
    renderFeatureCard() {
        return(
            Object.keys(this.holder).map((index, key) => {
                let store = this.holder[key];
                return (
                    <div key={`${this.type}.${index}`} className="store-featured-card">
                        <div className="uk-card uk-card-default">
                            <div className="uk-card-media-top">
                                <img src={store.image} alt=""/>
                            </div>
                            <div className="uk-padding">
                                <h3 className="blokk-font uk-card-title uk-margin-remove">
                                    <b>{store.name}</b>
                                </h3>
                                <p className="blokk-font uk-margin-remove uk-text-truncate">
                                    <i>{store.description}</i>
                                </p>
                                <span className="uk-margin-small uk-text-small">
                                    <Link to="/" className="blokk-font uk-link uk-link-text">{store.notifications} Notificaions</Link>
                                </span>
                                <span> &middot; </span>
                                <span className="uk-margin-small uk-text-small">
                                    <Link to="/" className="blokk-font uk-link uk-link-text">
                                        Visit Store
                                    </Link>
                                </span>
                                <div className="uk-margin">
                                    <Link 
                                        className="blokk-font uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-right"
                                        to={`/store/${store.slug}`}>
                                        View Store
                                    </Link>
                                    <button style={{maxWidth: '92px'}} className="blokk-font uk-button uk-button-small uk-button-orange uk-text-capitalize uk-text-truncate">
                                        Watch {store.name}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
        );
    }

    // Render componenet
    render() {
        console.log("Rendeering Loading Featured Card");

        return(
            <div className="uk-margin">
                <div className="uk-height-auto uk-grid-small uk-child-width-1-2@s uk-child-width-1-4@m" uk-grid="true">
                    {this.renderFeatureCard()}
                </div>
            </div>
        );
    }
}

// Export
export default LoadingCardFeatured;