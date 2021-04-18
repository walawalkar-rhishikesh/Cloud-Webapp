import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { signin, signup } from "../apiservice/index";
import { storeUserData } from "../redux/actions/actions.users";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmpassword: "",
            lname: "",
            fname: "",
            isLogin: true
        };
    }
    switchTabs = (isLogin) => {
        this.setState({
            isLogin
        })
    }

    onSignIn = async (body) => {
		try {
            const apiResponse = await signin(body);
			const {
				data = { status: 400, data: {}, message: "System error" },
			} = apiResponse;
			if (data.status === 200) {
				this.props.storeUserData(data.data);
				this.props.history.push("/app")
			} else {
				alert(data.message);
			}
		} catch (error) {
            alert("Something went wrong, please try again");
		} finally {
			
		}
    };
    onSignUp = async (body) => {
		try {
            const apiResponse = await signup(body);
			const {
				data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
			if (data.status === 200) {
				this.props.storeUserData(data.data);
				this.props.history.push("/app")
			} else {
				alert(data.message);
			}
		} catch (error) {
            alert("Something went wrong, please try again");
		} finally {
			
		}
	};
    signinFn = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
		const params = {
			email,
			password,
		};
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			alert("Email is not of valid format");
			return;
		}
		if (
			!password.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
			)
		) {
			alert("You have entered an invalid password. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
			return;
		}
		this.onSignIn(params);
    }
    signupFn = (e) => {
        e.preventDefault();
        const { email, password, lname, fname } = this.state;
		const params = {
			email,
            password,
            lname,
            fname
		};
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			alert("Email is not of valid format");
			return;
		}
		if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
			alert("You have entered an invalid password. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
			return;
        }
        if (!fname || fname === null || fname === undefined) {
			alert("Please enter first name");
			return;
        }
        if (!lname || lname === null || lname === undefined) {
			alert("Please enter last name");
			return;
        }
		this.onSignUp(params);
    }
    render() {
        const {
            isLogin = true
        } = this.state;
        return (
            <div
                className="appName bg-primary"
                style={{
                    backgroundRepeat: `no-repeat`,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                }}>
                <Container className="justify-content-center">
                    <Row
                        xl={3}
                        md={2}
                        lg={2}
                        className="justify-content-center">
                        <Col
                            style={{
                                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))`,
                                paddingBottom: "50px",
                                color: 'white',
                                borderRadius: '20px'
                            }}>
                            {
                                isLogin ?
                                    <Form>
                                        <br />
                                        <br />
                                        <h2 className="text-center">
                                            Webapp!!!
								        </h2>
                                        <br />
                                        <br />
                                        <h4 className="text-light">
                                            Login
								        </h4>
                                        <Form.Group>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={this.state.email}
                                                onChange={(e) =>
                                                    this.setState({
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) =>
                                                    this.setState({
                                                        password: e.target.value,
                                                    })
                                                }
                                                value={this.state.password}
                                            />
                                        </Form.Group>
                                        {/* <br /> */}
                                        <Row className="justify-content-center">
                                            <h6 className="text-light" onClick={()=>{
                                                this.props.history.push("/passwordreset")
                                            }} style={{cursor: "pointer"}}>
                                                    Forgot Password?
                                            </h6>
                                        </Row>
                                        <br />
                                        <Row className="justify-content-center">
                                            <Button
                                                // type="submit"
                                                onClick={(e) => this.signinFn(e)}
                                                style={{
                                                    width: "250px",
                                                }}
                                                variant="primary"> Login
                                            </Button>
                                        </Row>
                                        <br />
                                        <Row className="justify-content-center">
                                            <Button
                                                // type="submit"
                                                onClick={(e) => this.switchTabs(false)}
                                                style={{
                                                    width: "250px",
                                                }}
                                                variant="primary"> Signup
                                            </Button>
                                        </Row>
                                    </Form>

                                    :

                                    <Form>
                                        <br />
                                        <br />
                                        <h2 className="text-center">
                                            Webapp!!!
								        </h2>
                                        <br />
                                        <br />
                                        <h4 className="text-light">
                                            Signup
								        </h4>
                                        <Form.Group>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={this.state.email}
                                                onChange={(e) =>
                                                    this.setState({
                                                        email: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) =>
                                                    this.setState({
                                                        password: e.target.value,
                                                    })
                                                }
                                                value={this.state.password}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="string"
                                                placeholder="Enter first name"
                                                value={this.state.fname}
                                                onChange={(e) =>
                                                    this.setState({
                                                        fname: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="string"
                                                placeholder="Enter last name"
                                                value={this.state.lname}
                                                onChange={(e) =>
                                                    this.setState({
                                                        lname: e.target.value,
                                                    })
                                                }
                                            />
                                        </Form.Group>
                                        <br />
                                        <Row className="justify-content-center">
                                            <Button
                                                // type="submit"
                                                onClick={(e) => this.signupFn(e)}
                                                style={{
                                                    width: "250px",
                                                }}
                                                variant="primary"> Signup
                                            </Button>
                                        </Row>
                                        <br />
                                        <Row className="justify-content-center">
                                            <Button
                                                // type="submit"
                                                onClick={(e) => this.switchTabs(true)}
                                                style={{
                                                    width: "250px",
                                                }}
                                                variant="primary"> Login
                                            </Button>
                                        </Row>
                                    </Form>
                            }
                        </Col>
                    </Row>
                </Container>
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
    storeUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
