import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { forgotPassword } from "../apiservice/index";
import { storeUserData } from "../redux/actions/actions.users";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    }

    forgotPasswordFn = async (e) => {
        e.preventDefault();
        const { email } = this.state;
        const params = {
            email,
        };
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert("Email is not of valid format");
            return;
        }
        try {
            const apiResponse = await forgotPassword(params);
			const {
				data = { status: 400, data: {}, message: "System error" },
			} = apiResponse;
			if (data.status === 200) {
				alert(data.message);
			} else {
				alert(data.message);
			}
		} catch (error) {
            alert("Something went wrong, please try again");
		} finally {
			
		}
        
    }

    render() {
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
                            <Form>
                                <br />
                                <br />
                                <h2 className="text-center">
                                    Webapp!!!
								</h2>
                                <br />
                                <h4 className="text-light">
                                    Reset Password
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
                                <br></br>
                                <Row className="justify-content-center">
                                    <Button
                                        // type="submit"
                                        onClick={(e) => this.forgotPasswordFn(e)}
                                        style={{
                                            width: "250px",
                                        }}
                                        variant="primary"> Reset
                                            </Button>
                                </Row>
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
    storeUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
