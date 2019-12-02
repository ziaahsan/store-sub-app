import React from 'react';

// UIkit
import 'uikit';

class LoginPage extends React.Component {

    render() {
        console.log("Rendeering Login Page");
        return (
            <div className="uk-position-center">
                <div className="uk-text-center uk-width-large">
                    <h1 className="uk-margin-small">
                        <b>Log In</b>
                    </h1>
                    <p className="uk-margin-remove-top uk-width-medium uk-margin-auto">No need to register, simply provide your phone number and confirm.</p>
                    <hr/>
                    <button
                        className="uk-width-medium uk-button uk-button-small uk-button-purple uk-text-capitalize uk-margin-small-left">
                        Phone
                    </button>
                    <p className="uk-text-small">This makes your account super protected and makes it easier for us to send you live updates for products you watch.</p>
                </div>
            </div>
        )
    }
}

// Export
export default LoginPage;
