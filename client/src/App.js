import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Componenets
import TopNavBar from './components/navbars/topNavBar';

// Pages
import StoresPage from './pages/storesPage';
import StorePage from './pages/storePage';
import NotificationPage from './pages/notificationPage';

class App extends React.Component {
	render() {
		return (
			<Router>
				<TopNavBar />
				<Switch>
					<Route exact path="/stores"component={StoresPage} />
					<Route exact path="/store/:storeToken" component={StorePage} />
					<Route exact path="/notification/:notificationToken" component={NotificationPage} />
				</Switch>
			</Router>
		)
	}
}

// Export
export default App;