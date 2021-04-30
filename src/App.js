import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

import "./App.css";
import History from "./pages/History";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Profil from "./pages/Profil";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProfileConfiguration from "./pages/ProfileConfiguration";

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					{/* Front Pages */}
					<Route path="/" component={History} exact />
					<Route path="/history" component={History} exact />
					<Route path="/login" component={Login} exact />
					<Route path="/profil" component={Profil} exact />
					<Route
						path="/products/:barcode/:bcProductId"
						component={Product}
						exact
					/>
					<Route
						path="/products/:barcode"
						component={Product}
						exact
					/>
					<Route path="/signup" component={Signup} exact />
					<Route path="/signin" component={Signin} exact />
					<Route path="/configuration" component={ProfileConfiguration} exact />
					{/* Errors Pages */}
					<Route path="/error404" component={Error404} />
					<Redirect to="/error404" />
					{/* <Route path="/MAINTENANCE" component={ Maintenance } /> */}
				</Switch>
				{/* </Suspense> */}
			</Router>
		);
	}
}

export default App;
