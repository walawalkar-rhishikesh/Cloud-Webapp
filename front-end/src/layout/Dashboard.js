import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { storeUserData } from "../redux/actions/actions.users";
import Header from "../components/header/Header"

import RouterConfig from "../config/router/config.router";
import ComponentsConfig from "../config/router/components.router";


class Dashboard extends Component {
	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === RouterConfig.dashboard.main) {
				return (
					<Route
						path={prop.path}
						render={(props) => (
							<prop.component
								{...props}
							/>
						)}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};
	render() {
		return (
            <div className="bg-light" style={{minHeight: "100vh",}}>
                <Header {...this.props}></Header>
                <Switch>
					{this.getRoutes(ComponentsConfig)}
					<Redirect
						to={RouterConfig.dashboard.home}
					/>
				</Switch>
            </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userStore: state.user,
	};
};

const mapDispatchToProps = {
	storeUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
