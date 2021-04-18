import React, { Component } from "react";
import { Container, Table, Row, Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { getUserCart,deleteCartItem } from "../apiservice/index";


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userCartListing: [],
            totalItems: 0,
            totalPrice: 0,
            isDeleteModal: false,
            currentCartDetails : {}
        }
    }
    componentDidMount() {
        this.getUserCartDetails();
    }
    getUserCartDetails = async () => {
        const { userStore } = this.props;
        const { id = '' } = userStore;

        const params = {
            uid: id
        }
        try {
            const apiResponse = await getUserCart(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                this.setState({
                    userCartListing: data.data
                })
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }
    setDeleteBookModal = (flag) => {
        this.setState({
            isDeleteModal : flag
        })

        if(!flag)
            this.setState({
                currentCartDetails: {}
            })
    }
    deleteCartItem = async () => {
        const {
            currentCartDetails
        } = this.state;
		const { id = '' } = currentCartDetails;

        const params = {
            id
        }
        try {
            const apiResponse = await deleteCartItem(params);
			const {
				data = { status: 400, data: {}, message: "System error" },
			} = apiResponse;
			if (data.status === 200) {
                alert(data.message)
				this.setState({
                    currentCartDetails : {},
                    
                })
                this.setDeleteBookModal(false);
                this.getUserCartDetails();
			} else {
				alert(data.message);
			}
		} catch (error) {
            alert("Something went wrong, please try again");
		} finally {
			
		}
    }
    render() {
        const {
            userCartListing = [],
            isDeleteModal = false
        } = this.state;
        let totalCartValue = 0;
        return (
            <Container className="my-3 py-3 bg-white flex" >
                <Modal
                    size="lg"
                    show={isDeleteModal}
                    onHide={() => this.setDeleteBookModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Are you sure?
                        </Modal.Title>
                    </Modal.Header>
                    {/* <Modal.Body>
                        
                    </Modal.Body> */}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.setDeleteBookModal(false)}}>No</Button>
                        <Button variant="primary" onClick={ ()=> this.deleteCartItem()}>Yes</Button>
                    </Modal.Footer>
                </Modal>
                <Row className="mx-3 justify-content-between">
                    <h3>Cart</h3>
                </Row>

                <Table responsive="sm">
                    <tbody>

                        {
                            userCartListing.map((data, key) => {
                                const {
                                    book = {
                                        author: "",
                                        createdAt: "",
                                        createdby: "",
                                        id: "",
                                        isDeleted: false,
                                        isbn: 0,
                                        pdate: "",
                                        price: 0,
                                        quantity: 0,
                                        title: "",
                                        updatedAt: ""
                                    },
                                    quantity = 0
                                } = data;

                                if(!book.isDeleted){
                                    totalCartValue += (book.price * quantity)
                                }


                                return (

                                    <tr id="zoom" key={key} className="rounded justify-content-between my-3 m2 shadow-sm p-4 mb-4 bg-white">
                                        <td>{key + 1}</td>
                                        <td className="text-left">
                                            <b> Title: </b> {book.title ? book.title : "No Title"} <br></br>
                                            <b> Published: </b> {book.pdate ? book.pdate.split("T")[0] : "No date available"} <br></br>
                                            <b> ISBN: </b> {book.isbn ? book.isbn : "-"} <br></br>
                                        </td>
                                        {
                                            book.isDeleted ? 
                                            <td></td>
                                            :
                                            <td>
                                                ${book.price}
                                            </td>
                                        }
                                        {
                                            book.isDeleted ? 
                                            <td className="text-danger"> Book is no longer available</td>
                                            :
                                            <td>
                                                {quantity} qt
                                            </td>
                                        }
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => {
                                                this.setState({
                                                    currentCartDetails: data
                                                })
                                                this.setDeleteBookModal(true);
                                            }}>Delete</Button> <br></br>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {
                            userCartListing.length === 0 &&
                            <tr className="rounded justify-content-between my-3 m2 shadow-sm p-4 mb-4 bg-white">
                                <td>No records</td>
                            </tr>
                        }
                    </tbody>

                </Table>
                <b>Total: {totalCartValue}</b>
                
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userStore: state.user,
    };
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
