import React from 'react';

// UIkit
import 'uikit';

// Loaders component
import LoadingCardStore from '../components/loaders/loadingCardStore';

// Stores component
import Stores from '../components/cards/stores';

// Error component
import NoStoreFound from '../components/error/noStoreFound';

// Stores Page
class ExplorePage extends React.Component {
    constructor(props) {
        super(props);

        // Tag
        this.tags = props.match.params.tags;
    }

    // OnDraw
    render() {
        
		// Check loading, or null store
		if (!this.tags) {
			return (
                <NoStoreFound />
			);
		}

        return(
            <div className="uk-container uk-container-large">
                <div>
                    <h1 className="uk-margin-remove">
                        <b>Exploring Products</b>
                    </h1>
                    <p className="uk-margin-remove-top">Look for a product and get live updates wherever you are.</p>
                </div>
                <hr/>
                {/* Stores Component */}
                <div>
                    <div>
                        <h2 className="uk-margin-remove">
                            <b>Showing</b>&nbsp;
                            <span className="uk-text-small uk-text-capitalize">{this.tags}</span>
                        </h2>
                        <p className="uk-margin-remove">
                            Viewing all the products for provided tags.
                        </p>
                    </div>
                    <Stores type="explore" tags={this.tags}>
                        <LoadingCardStore />
                    </Stores>
                </div>
            </div>
        );
    }
}

// Export
export default ExplorePage;