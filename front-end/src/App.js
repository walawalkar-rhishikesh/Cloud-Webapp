import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import RouterConfig from "./config/router/config.router"

import Auth from "./layout/Auth";
import Dashboard from "./layout/Dashboard";
import ResetPassord from "./layout/ResetPassord";


class App extends Component {
	getLoginStatus = () => {
		const { userStore } = this.props;
		const { email = '' } = userStore;
		if (!email) {
			return <Redirect to={RouterConfig.auth} />
		}
		else {
			return <Redirect to={RouterConfig.dashboard.main} />;
		}
	};
	isLoggedIn = () => {
		const { userStore } = this.props;
		const { email = '' } = userStore;
		if (!email) {
			return false
		}
		return true;
	};
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route
						push
						path="/auth"
						render={(props) => {
							if (this.isLoggedIn()) {
								return <Redirect to="/app" />
							} else {
								return <Auth {...props} />
							}
						}
						}
					/>
					<Route
						push
						path="/app"
						render={(props) => {
							if (this.isLoggedIn()) {
								return <Dashboard {...props} />
							} else {
								return <Redirect to="/auth" />
							}
						}
						}
					/>
					<Route
						push
						path="/passwordreset"
						render={(props) => {
							if (!this.isLoggedIn()) {
								return <ResetPassord {...props} />
							} else {
								return <Redirect to="/app" />
							}
						}
						}
					/>
					{this.getLoginStatus()}
				</Switch>
			</BrowserRouter>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		userStore: state.user,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
