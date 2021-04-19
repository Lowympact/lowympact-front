import React, { Component, Suspense, lazy } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';

import './App.css';
import Homepage from './pages/Homepage';
import Error404 from './pages/Error404';


class App extends Component {
	render() {
		return (
			<Router>
				 <Switch>
					{/* Front Pages */}
					<Route path="/" component={ Homepage } exact />
					
					{/* Errors Pages */}
					<Route path="/error404" component={ Error404 } />
					<Redirect to="/error404" />
					{/* <Route path="/MAINTENANCE" component={ Maintenance } /> */}
				 </Switch>
				{/* </Suspense> */}
			</Router>
		);
	}
};

export default App;
