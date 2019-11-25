import React from 'react';
import {Link} from 'react-router-dom';

// Top Navigation
export default class TopNavBar extends React.Component { 
    render() {
        return(
            <div className="uk-width-1-1">
                <div className="uk-container uk-container-large uk-padding-remove">
                    <div>
                        <nav className="uk-navbar-container uk-height-auto" uk-navbar="mode: click">
                            <div className="nav-overlay uk-navbar-left uk-width-expand">
                                <ul className="uk-navbar-nav">
                                    <li>
                                        <Link to="/">
                                            <span className="uk-text-capitalize">
                                                Subto.Store
                                            </span>
                                        </Link>
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