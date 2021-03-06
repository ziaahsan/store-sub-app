import React from 'react';

// UIkit
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// Loaders component
import LoadingCardStore from '../components/loaders/loadingCardStore';
import LoadingCardFeatured from '../components/loaders/loadingCardFeatured';
import LoadingCardRecentUpdates from '../components/loaders/loadingCardRecentUpdates';

// Stores component
import RecentUpdates from '../components/cards/recentUpdates';
import Stores from '../components/cards/stores';
import Featured from '../components/cards/featured';

// Stores Page
class StoresPage extends React.Component {
    constructor(props) {
        super(props);

        // initalize the uikit icons
        UIkit.use(Icons);
    }

    // OnDraw
    render() {
        return(
            <>
                <div className="uk-height-large uk-flex uk-flex-center uk-flex-middle">
                    <div className="uk-flex uk-flex-middle">
                        <div className="uk-margin-auto uk-text-center">
                            <h1 className="uk-margin-remove">
                                <b>Watch for Updates</b>
                            </h1>
                            <p className="uk-margin-remove">Look for a product and get live updates wherever you are.</p>
                        </div>
                    </div>
                </div>
                <div className="uk-container uk-container-large">
                    <div className="uk-width-1-1">
                        <hr/>
                        {/* Recent Updates Component */}
                        <div>
                            <div>
                                <h2 className="uk-margin-remove">
                                    <b>Recent Updates</b>
                                </h2>
                                <p className="uk-margin-remove">
                                    Find out what's happened over the last 7 days.
                                </p>
                            </div>
                            <RecentUpdates type='Stores' tags="store">
                                <LoadingCardRecentUpdates />
                            </RecentUpdates>
                        </div>

                        {/* Stores Component */}
                        <div>
                            <div>
                                <h2 className="uk-margin-remove">
                                    <b>Popular Stores</b>
                                </h2>
                            </div>
                            <Stores type='Stores' tags="store">
                                <LoadingCardStore />
                            </Stores>
                        </div>

                        {/* Featured Component */}
                        <div>
                            <div>
                                <h2 className="uk-margin-remove">
                                    <b>Featured</b>
                                </h2>
                            </div>
                            <Featured type='Featured' tags="featured">
                                <LoadingCardFeatured />
                            </Featured>
                        </div>

                        {/* Techy Component */}
                        <div>
                            <div>
                                <h2 className="uk-margin-remove">
                                    <b>Websites</b>
                                </h2>
                            </div>
                            <Stores type='Website' tags="website">
                                <LoadingCardStore />
                            </Stores>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

// Export
export default StoresPage;