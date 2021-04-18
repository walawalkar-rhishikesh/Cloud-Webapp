import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout, storeUserData } from "../redux/actions/actions.users";
import { update, updatePassword } from "../apiservice/index";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.userStore.email,
            password: "",
            confirmpassword: "",
            lname: props.userStore.lname,
            fname: props.userStore.fname,
            isLogin: true
        };
    }
    switchTabs = (isLogin) => {
        this.setState({
            isLogin
        })
    }
    logoutFn = () => {
        this.props.logout();
        this.props.history.push("/auth")
    }
    onUpdate = async (body) => {
		try {
            const apiResponse = await update(body);
			const {
				data = { status: 400, data: {}, message: "System error" },
			} = apiResponse;
			if (data.status === 200) {
                const {
                    email = "",
                    id = ""
                } = this.props.userStore;

                let updateResult = {
                    email,
                    lname : this.state.lname,
                    fname : this.state.fname,
                    id
                }
				this.props.storeUserData(updateResult);
				alert("User Updated successfully.")
			} else {
				alert(data.message);
			}
		} catch (error) {
            console.log(error)
            alert("Something went wrong, please try again");
		} finally {
			
		}
    };
    updateFn = (e) => {
        e.preventDefault();
        const {
            id = ""
        } = this.props.userStore;

        let requestParams = {
            lname : this.state.lname,
            fname : this.state.fname,
            id
        }
        if (!requestParams.fname || requestParams.fname === null || requestParams.fname === undefined) {
			alert("Please enter first name");
			return;
        }
        if (!requestParams.lname || requestParams.lname === null || requestParams.lname === undefined) {
			alert("Please enter last name");
			return;
        }
		this.onUpdate(requestParams);
    }

    onUpdatePassword = async (body) => {
		try {
            const apiResponse = await updatePassword(body);
			const {
				data = { status: 400, data: {}, message: "System error" },
			} = apiResponse;
			if (data.status === 200) {
                // const {
                //     email = "",
                //     lname,
                //     fname = "",
                //     id = ""
                // } = this.props.userStore;

                // let updateResult = {
                //     email,
                //     lname : this.state.lname,
                //     fname : this.state.fname,
                //     id
                // }
				// this.props.storeUserData(updateResult);
				alert("Password Updated successfully.")
			} else {
				alert(data.message);
			}
		} catch (error) {
            alert("Something went wrong, please try again");
		} finally {
			
		}
    };
    passwordUpdateFn = (e) => {
        e.preventDefault();
        const {
            id = ""
        } = this.props.userStore;

        let requestParams = {
            password : this.state.password,
            id
        }
        if (!requestParams.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
			alert("You have entered an invalid password. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
			return;
        }
		this.onUpdatePassword(requestParams);
    }
    render() {
        // const {
        //     email = "",
        //     password = "",
        //     confirmpassword = "",
        //     lname = "",
        //     fname = "",
        //     isLogin = true
        // } = this.state;

        const {
            email = "",
            lname = "",
            fname = "",
        } = this.state;
        return (
            <div
                className="appName"
                style={{
                    // background: `linear-gradient(rgba(0,123,139,0.7), rgba(255,255,255,0.7))`,
                    background: `white`,
                    backgroundRepeat: `no-repeat`,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                }}>
                <Container className="justify-content-center">
                    <Row
                        // xl={3}
                        // md={2}
                        // lg={2}
                        className="justify-content-center m-3">
                        <Col
                            style={{
                                background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))`,
                                paddingBottom: "50px",
                                color: 'white',
                                borderRadius: '20px'
                            }}>

                            <Form>
                                <br />
                                <br />
                                <h2 className="text-center">
                                    User Profile
                                    <Button
                                        // type="submit"
                                        onClick={(e) => this.logoutFn(true)}
                                        size="sm"
                                        style={{
                                            // width: "100px",
                                            float: "right"
                                        }}
                                        variant="light"> Logout
                                        </Button>
								</h2>
                                <br />
                                <br />
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        disabled
                                        // onChange={(e) =>
                                        //     this.setState({
                                        //         email: e.target.value,
                                        //     })
                                        // }
                                    />
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="string"
                                        placeholder="Enter first name"
                                        value={fname}
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
                                        value={lname}
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
                                        onClick={(e) => this.updateFn(e)}
                                        style={{
                                            width: "250px",
                                        }}
                                        variant="primary"> Update Profile
                                            </Button>
                                </Row>
                                <br />
                                <h4 className="text-left">
                                    New Password
								</h4>
                                <br />
                                <Form.Group>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="New Password"
                                        onChange={(e) =>
                                            this.setState({
                                                password: e.target.value,
                                            })
                                        }
                                        value={this.state.password}
                                    />
                                </Form.Group>
                                <Row className="justify-content-center">
                                    <Button
                                        // type="submit"
                                        onClick={(e) => this.passwordUpdateFn(e)}
                                        style={{
                                            width: "250px",
                                        }}
                                        variant="primary"> Update Password
                                    </Button>
                                </Row>
                                <br />
                            </Form>
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
    logout,
    storeUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
