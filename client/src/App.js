import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Componenets
import TopNavBar from './components/navbars/topNavBar';

// Pages
import ExplorePage from './pages/explorePage';
import LoginPage from './pages/loginPage';
import StoresPage from './pages/storesPage';
import StorePage from './pages/storePage';
import NotificationPage from './pages/notificationPage';

class App extends React.Component {
	render() {
		return (
			<Router>
				<TopNavBar />
				<Switch>
					<Route exact path="/"component={StoresPage} />
					<Route exact path="/explore/tags/:tags"component={ExplorePage} />
					<Route exact path="/login"component={LoginPage} />
					<Route exact path="/stores"component={StoresPage} />
					<Route exact path="/store/:slug" component={StorePage} />
					<Route exact path="/notification/:notificationToken" component={NotificationPage} />
				</Switch>
			</Router>
		)
	}
}

// Export
export default App;