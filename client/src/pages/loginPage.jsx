import React from 'react';

class LoginPage extends React.Component {

    render() {
        return (
            <div className="uk-position-center">
                <div className="uk-card uk-card-default uk-box-shadow-small">
                    <div className="uk-width-xlarge uk-card-body">
                        <div>
                            <div className="uk-align-center uk-margin">
                                <div className="uk-padding">
                                    <h2 className="uk-margin-remove-bottom">My Login</h2>
                                    <h5 className="uk-margin">Sign in to watch for updates, and get real-time product details.</h5>
                                    <form className="uk-form-stacked" novalidate="novalidate" spellcheck="false" autocomplete="off" method="post" accept-charset="utf-8">
                                        <div className="uk-margin">
                                            <label className="uk-form-label" for="form-stacked-text">Phone #</label>
                                            <div className="uk-form-controls uk-inline uk-width-expand">
                                                <input className="uk-input" id="form-stacked-text" type="tel" placeholder="" autocomplete="off" />
                                            </div>
                                        </div>
                                        <button className="uk-button uk-button-blue" type="submit">Login</button>
                                        <p className="uk-width-medium uk-text-small uk-margin">By logging into MyLinkPreview you agree to our <a href="https://mylinkpreview.com/home/privacy">privacy policy</a>.</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// Export
export default LoginPage;
