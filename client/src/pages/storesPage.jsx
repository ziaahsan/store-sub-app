import React from 'react';
import 'uikit';

// Stores component
import RecentUpdates from '../components/stores/recentUpdates';
import Stores from '../components/stores/stores';
import Featured from '../components/stores/featured';

// Stores Page
class StoresPage extends React.Component {    
    // OnDraw
    render() {
        return(
            <div className="uk-container uk-container-large">
                <div className="uk-width-1-1">
                    <div>
                        <h1 className="uk-margin-remove">
                            <b>Watch for Updates</b>
                        </h1>
                        <p className="uk-margin-remove-top">Look for a product and get live updates wherever you are.</p>
                    </div>
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
                        <RecentUpdates type='Stores' tags="store" />
                    </div>

                    {/* Stores Component */}
                    <div>
                        <div>
                            <h2 className="uk-margin-remove">
                                <b>Popular Stores</b>
                            </h2>
                        </div>
                        <Stores type='Stores' tags="store" />
                    </div>

                    {/* Featured Component */}
                    <div>
                        <div>
                            <h2 className="uk-margin-remove">
                                <b>Featured</b>
                            </h2>
                        </div>
                        <Featured type='Featured' tags="featured" />
                    </div>

                     {/* Techy Component */}
                    <div>
                        <div>
                            <h2 className="uk-margin-remove">
                                <b>Techy</b>
                            </h2>
                        </div>
                        <Stores type='Techy' tags="techy" />
                    </div>
                </div>
            </div>
        );
    }
}

// Export
export default StoresPage;