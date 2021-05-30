//noprotect
import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
// import History from "./pages/History";
// import Error404 from "./pages/Error404";
// import Login from "./pages/Login";
// import History from "./pages/History";
// import Profil from "./pages/Profil";
// import Product from "./pages/Product";
// import Signup from "./pages/Signup";
// import Signin from "./pages/Signin";
// import ProfileConfiguration from "./pages/ProfileConfiguration";
// import Statistics from "./pages/Statistics";
const Login = React.lazy(() => import("./pages/Login"));
const History = React.lazy(() => import("./pages/History"));
const Profil = React.lazy(() => import("./pages/Profil"));
const Error404 = React.lazy(() => import("./pages/Error404"));
const Product = React.lazy(() => import("./pages/Product"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Signin = React.lazy(() => import("./pages/Signin"));
const ProfileConfiguration = React.lazy(() => import("./pages/ProfileConfiguration"));
const Statistics = React.lazy(() => import("./pages/Statistics"));
const Debug = React.lazy(() => import("./pages/Debug"));

class App extends Component {
    render() {
        return (
            <Router>
                <Suspense
                    fallback={
                        <div className="loading">
                            <div className="loadingio-spinner-ripple-4o0kkyduuq4">
                                <div className="ldio-44krslet1tn">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Switch>
                        {/* Front Pages */}
                        <Route path="/history" component={History} exact key={1} />
                        <Route path="/profil" component={Profil} exact key={2} />
                        <Route path="/login" component={Login} exact />
                        <Route path="/" component={Login} exact key={1} />
                        <Route path="/products/:barcode/:bcProductId" component={Product} exact />
                        <Route path="/products/:barcode" component={Product} exact />
                        <Route path="/signup" component={Signup} exact />
                        <Route path="/signin" component={Signin} exact />
                        <Route path="/configuration" component={ProfileConfiguration} exact />
                        <Route path="/stats" component={Statistics} exact />
                        <Route path="/debug" component={Debug} exact />
                        {/* Errors Pages */}
                        <Route path="/error404" component={Error404} />
                        <Redirect to="/error404" />
                        {/* <Route path="/MAINTENANCE" component={ Maintenance } /> */}
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}

export default App;
