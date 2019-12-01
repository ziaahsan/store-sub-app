import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Loaders Component
import FallBackLoading from './components/loaders/loadingPage';

// Componenets
const TopNavBar = React.lazy(() => import('./components/navbars/topNavBar'));

// Error component
const NoPageFound = React.lazy(() => import('./components/error/noPageFound'));

// Pages
const ExplorePage = React.lazy(() => import('./pages/explorePage'));
const LoginPage = React.lazy(() => import('./pages/loginPage'));
const StoresPage = React.lazy(() => import('./pages/storesPage'));
const StorePage = React.lazy(() => import('./pages/storePage'));
const NotificationPage = React.lazy(() => import('./pages/notificationPage'));

class App extends React.Component {
	render() {
		return (
			<Router>
				 <React.Suspense fallback={<FallBackLoading />}>
					<TopNavBar />
					<Switch>
						<Route exact path="/"component={StoresPage} />
						<Route exact path="/explore/tags/:tags"component={ExplorePage} />
						<Route exact path="/login"component={LoginPage} />
						<Route exact path="/stores"component={StoresPage} />
						<Route exact path="/store/:slug" component={StorePage} />
						<Route exact path="/notification/:notificationToken" component={NotificationPage} />
						<Route component={NoPageFound} />
					</Switch>
				</React.Suspense>
			</Router>
		)
	}
}

// Export
export default App;