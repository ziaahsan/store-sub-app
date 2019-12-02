import React from 'react';
import {Link} from 'react-router-dom';

// UIkit
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';


// Top Navigation
export default class TopNavBar extends React.Component { 
    constructor(props) {
        super(props);

        // initalize the uikit icons
        UIkit.use(Icons);
    }

    render() {
        return(
            <div className="uk-width-1-1">
                <div className="uk-container uk-container-large uk-padding-remove">
                    <div>
                        <nav className="uk-navbar-container uk-height-auto" uk-navbar="mode: click">
                            <div className="nav-overlay uk-navbar-left uk-width-expand">
                                <ul className="uk-navbar-nav">
                                    <li>
                                        <Link to="/" className="uk-padding-remove">
                                            <span className="uk-text-capitalize">
                                                Subto.Store
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-overlay uk-navbar-right">
                                <ul className="uk-navbar-nav lp-navbar-nav">
                                    <li className="uk-text-small uk-visible@s">
                                        <span>
                                            No signup required.
                                        </span>
                                        <span>
                                            <Link
                                                to="/login"
                                                className="uk-button uk-button-small uk-button-orange uk-text-capitalize uk-margin-small-left">
                                                Login
                                            </Link>
                                        </span>
                                    </li>
                                    <li className="uk-text-small uk-visible@s">
                                        <span>
                                            <Link
                                                to="/"
                                                className="uk-button uk-button-small uk-button-default uk-text-capitalize uk-margin-small-left">
                                                Dark Mode
                                            </Link>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}