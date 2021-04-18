import { Nav, Navbar } from "react-bootstrap";
import React from "react";
import { connect } from "react-redux";
import RouterConfig from "../../config/router/config.router"
import {logout} from "../../redux/actions/actions.users"
class Header extends React.Component {
	render() {
        const { userStore} = this.props;
        const{ fname } = userStore;
        return(
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand className="text-dark" href={RouterConfig.dashboard.main}>WebApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="text-dark" href={RouterConfig.dashboard.main}>Home</Nav.Link>
                        <Nav.Link className="text-dark" href={RouterConfig.dashboard.cart}>Cart</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="text-dark" href="" onClick={()=>{
                            this.props.logout();
                            window.location.href = RouterConfig.auth;
                        }}>
                            Logout
                        </Nav.Link>
                        <Nav.Link className="text-dark" href={RouterConfig.dashboard.profile}>
                            Hi {fname.toUpperCase()}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
		    </Navbar>
        );
	}
}
const mapStateToProps = (state) => {
	return {
		userStore: state.user,
	};
};
const mapDispatchToProps = {logout};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
