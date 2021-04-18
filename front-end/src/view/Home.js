import React, { Component } from "react";
import { Container, Tab, Col, Card, Table, Row, Nav, Modal, Button, Form, Carousel, Image } from "react-bootstrap";
import { connect } from "react-redux";

import { getBuyerBooks, getSellersBooks, addNewBook, deleteBook,deleteBookFromS3, deleteBookDetailsFromDB, updateBook, addBookToCart, uploadFilesToS3, addImageDetailsToDB, removeImageFromS3, removeImageFromDatabase } from "../apiservice/index";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyBooksList: [],
            sellBooksList: [],
            isAddBooksModal: false,
            isDeleteModal: false,
            isUpdateBookModal: false,
            isAddToCartModal: false,
            isbn: 0,
            title: "",
            author: "",
            pdate: "",
            quantity: 0,
            price: 0,
            bid: 0,
            activeTab: "SellBooks",
            currentBooksDetails: {},
            cartQuantity: 0,
            bookImages: [],
            bookImagesUpdate: []
        }
    }
    componentDidMount() {
        this.getAllBooks();
    }


    getAllBooks = () => {
        const { userStore } = this.props;
        const { id = '' } = userStore;
        const params = {
            createdby: id
        };
        this.getBuyBooks(params);
        this.getSellBooks(params);
    }

    getBuyBooks = async (params) => {
        try {
            const apiResponse = await getBuyerBooks(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                this.setState({
                    buyBooksList: data.data
                })
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }

    getSellBooks = async (params) => {
        try {
            const apiResponse = await getSellersBooks(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                this.setState({
                    sellBooksList: data.data
                })
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }

    setAddToCartModal = (flag) => {
        this.setState({
            isAddToCartModal: flag
        })

        if (!flag)
            this.setState({
                currentBooksDetails: {},
                cartQuantity: 0,
            })
    }

    setAddBooksModal = (flag) => {
        this.setState({
            isAddBooksModal: flag
        })

        this.setState({
            isbn: 0,
            title: "",
            author: "",
            pdate: "",
            quantity: 0,
            price: 0,
            bookImagesUpdate: [],
            bookImages: []
        })
    }

    setUpdateBooksModal = (flag) => {
        this.setState({
            isUpdateBookModal: flag
        })

        if (!flag)
            this.setState({
                isbn: 0,
                title: "",
                author: "",
                pdate: "",
                quantity: 0,
                price: 0,
                bid: 0,
                bookImagesUpdate: [],
                bookImages: []
            })
    }
    setDeleteBookModal = (flag) => {
        this.setState({
            isDeleteModal: flag
        })

        if (!flag)
            this.setState({
                currentBooksDetails: {}
            })
    }

    addToCart = async () => {
        const {
            currentBooksDetails,
            cartQuantity
        } = this.state;

        const { userStore } = this.props;
        const { id = '' } = userStore;

        const params = {
            uid: id,
            pid: currentBooksDetails.id,
            quantity: cartQuantity
        }
        try {
            const apiResponse = await addBookToCart(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                alert(data.message)
                this.setState({
                    currentBooksDetails: {},
                    // activeTab : "SellBooks",
                    cartQuantity: 0,
                })
                this.setAddToCartModal(false);
                this.getAllBooks();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }

    deleteBook = async () => {
        const {
            currentBooksDetails
        } = this.state;
        const { id = '', bookimages = [] } = currentBooksDetails;

        const key = bookimages.map( (img,key) =>{
            return {Key : img.key}
        })

        if(bookimages.length > 0){
            const params = {
                key
            }
            try {
                const apiResponse = await deleteBookFromS3(params);
                const {
                    data = { status: 400, data: {}, message: "System error" },
                } = apiResponse;
                if (data.status === 200) {
                    // alert(data.message)
                    // this.setState({
                    //     currentBooksDetails: {},
                    //     activeTab: "SellBooks"
                    // })
                    // this.setDeleteBookModal(false);
                    // this.getAllBooks();
                } else {
                    // alert(data.message);
                }
            } catch (error) {
                // alert("Something went wrong, please try again");
            } finally {
    
            }
            const paramsIn = {
                pid : id
            }
            try {
                const apiResponse = await deleteBookDetailsFromDB(paramsIn);
                const {
                    data = { status: 400, data: {}, message: "System error" },
                } = apiResponse;
                if (data.status === 200) {
                    // alert(data.message)
                    // this.setState({
                    //     currentBooksDetails: {},
                    //     activeTab: "SellBooks"
                    // })
                    // this.setDeleteBookModal(false);
                    // this.getAllBooks();
                } else {
                    // alert(data.message);
                }
            } catch (error) {
                // alert("Something went wrong, please try again");
            } finally {
    
            }
        }
        
        const paramsInIN = {
            id
        }
        try {
            const apiResponse = await deleteBook(paramsInIN);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                alert(data.message)
                this.setState({
                    currentBooksDetails: {},
                    activeTab: "SellBooks"
                })
                this.setDeleteBookModal(false);
                this.getAllBooks();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }

    updateNewBook = async () => {
        const {
            isbn = 0,
            title = "",
            author = "",
            pdate = "",
            quantity = 0,
            price = 0,
            bid = "",
        } = this.state;
        const { userStore } = this.props;
        const { id = '' } = userStore;

        const params = {
            isbn,
            title,
            author,
            pdate,
            quantity,
            price,
            createdby: id,
            id: bid
        }
        try {
            const apiResponse = await updateBook(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                alert(data.message)
                this.setState({
                    isbn: 0,
                    title: "",
                    author: "",
                    pdate: "",
                    quantity: 0,
                    price: 0,
                    bid: "",
                    activeTab: "SellBooks",
                    bookImagesUpdate: [],
                    bookImages: []
                })
                this.setUpdateBooksModal(false);
                this.getAllBooks();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }

    addNewBook = async () => {
        const {
            isbn = 0,
            title = "",
            author = "",
            pdate = "",
            quantity = 0,
            price = 0,
        } = this.state;
        const { userStore } = this.props;
        const { id = '' } = userStore;

        const params = {
            isbn,
            title,
            author,
            pdate,
            quantity,
            price,
            createdby: id
        }
        try {
            const apiResponse = await addNewBook(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                // alert(data.message)
                // this.setState({
                //     isbn: 0,
                //     title: "",
                //     author: "",
                //     pdate: "",
                //     quantity: 0,
                //     price: 0,
                //     activeTab: "SellBooks"
                // })
                // this.setAddBooksModal(false);
                // this.getAllBooks();
                const {
                    bookImages = [],
                } = this.state;
                if (bookImages.length > 0)
                    this.uploadS3BookImage(data.data.id);
                else {
                    alert(data.message)
                    this.setState({
                        isbn: 0,
                        title: "",
                        author: "",
                        pdate: "",
                        quantity: 0,
                        price: 0,
                        activeTab: "SellBooks",
                        bookImagesUpdate: [],
                        bookImages: []

                    })
                    this.setAddBooksModal(false);
                    this.getAllBooks();
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }

    uploadS3BookImage = async (pid) => {
        const params = new FormData()
        const {
            bookImages = [],
        } = this.state;
        
        const files = [...bookImages]

        if(files.length === 0){
            alert(" Please select some files");
            return;
        }

        files.map((data, key) => {
            params.append('image', data)
            return null;
        })

        try {
            const apiResponse = await uploadFilesToS3(params);
            const {
                data = { status: 400, data: [], message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                const newData = data.data.map(v => ({ ...v, pid }))
                this.addImageToDatabase(newData)
            } else {
                alert("Something went wrong while uploading image, please try again");
            }
        } catch (error) {
            alert("Something went wrong while uploading image, please try again");
        } finally {

        }
    }
    addImageToDatabase = async (data) => {
        const params = {
            imageSet: data
        }
        try {
            const apiResponse = await addImageDetailsToDB(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                alert(data.message)
                this.setState({
                    isbn: 0,
                    title: "",
                    author: "",
                    pdate: "",
                    quantity: 0,
                    price: 0,
                    activeTab: "SellBooks",
                    bookImagesUpdate: [],
                    bookImages: []
                })
                this.setAddBooksModal(false);
                this.setUpdateBooksModal(false);
                this.getAllBooks();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }

    deleteFromS3 = async (key, id) => {
        const params = {
            key
        }
        try {
            const apiResponse = await removeImageFromS3(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                // alert(data.message)
                // this.setState({
                //     isbn: 0,
                //     title: "",
                //     author: "",
                //     pdate: "",
                //     quantity: 0,
                //     price: 0,
                //     activeTab: "SellBooks",
                //     bookImagesUpdate: [],
                //     bookImages: []
                // })
                // this.setAddBooksModal(false);
                // this.setUpdateBooksModal(false);
                // this.getAllBooks();
                this.deleteFromDatabase(id);
            } else {
                alert("Something went wrong, please try again");
            }
        } catch (error) {
            alert("Something went wrong, please try again");
        } finally {

        }
    }

    deleteFromDatabase = async (id) => {
        const params = {
            id
        }
        try {
            const apiResponse = await removeImageFromDatabase(params);
            const {
                data = { status: 400, data: {}, message: "System error" },
            } = apiResponse;
            if (data.status === 200) {
                alert(data.message)
                this.setState({
                    isbn: 0,
                    title: "",
                    author: "",
                    pdate: "",
                    quantity: 0,
                    price: 0,
                    activeTab: "SellBooks",
                    bookImagesUpdate: [],
                    bookImages: []
                })
                this.setAddBooksModal(false);
                this.setUpdateBooksModal(false);
                this.getAllBooks();
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
            buyBooksList = [],
            sellBooksList = [],
            isAddBooksModal = false,
            isDeleteModal = false,
            isUpdateBookModal = false,
            isAddToCartModal = false,
            activeTab = "SellBooks",
            currentBooksDetails = {}
        } = this.state;
        return (
            <Container className="my-3 py-3 bg-white flex" >
                <Row className="mx-3 justify-content-between">
                    <h3>Books Listing</h3>
                    <Button variant="primary" onClick={() => {
                        this.setAddBooksModal(true);
                    }}>Add New Book</Button>
                </Row>

                <Modal
                    size="lg"
                    show={isAddToCartModal}
                    onHide={() => this.setAddToCartModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Set the quantity
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGroupISBN">
                                <Form.Label>Book Title: <b>{currentBooksDetails.title} </b></Form.Label>
                                <Form.Control type="number" placeholder="Enter Quantity"
                                    onChange={(e) =>
                                        this.setState({
                                            cartQuantity: e.target.value,
                                        })
                                    }
                                    value={this.state.cartQuantity} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.setAddToCartModal(false) }}>No</Button>
                        <Button variant="primary" onClick={() => this.addToCart()}>Yes</Button>
                    </Modal.Footer>
                </Modal>

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
                        <Button variant="secondary" onClick={() => { this.setDeleteBookModal(false) }}>No</Button>
                        <Button variant="primary" onClick={() => this.deleteBook()}>Yes</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    size="lg"
                    show={isAddBooksModal}
                    onHide={() => this.setAddBooksModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Add Books
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGroupISBN">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control type="number" placeholder="Enter ISBN"
                                    onChange={(e) =>
                                        this.setState({
                                            isbn: e.target.value,
                                        })
                                    }
                                    value={this.state.isbn} />
                            </Form.Group>
                            <Form.Group controlId="formGroupTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="string" placeholder="Enter Title"
                                    onChange={(e) =>
                                        this.setState({
                                            title: e.target.value,
                                        })
                                    }
                                    value={this.state.title} />
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="string" placeholder="Enter Author"
                                    onChange={(e) =>
                                        this.setState({
                                            author: e.target.value,
                                        })
                                    }
                                    value={this.state.author} />
                            </Form.Group>
                            <Form.Group controlId="formGroupPDate">
                                <Form.Label>Published Date</Form.Label>
                                <Form.Control type="date" placeholder="Choose Date"
                                    onChange={(e) =>
                                        this.setState({
                                            pdate: e.target.value,
                                        })
                                    }
                                    value={this.state.pdate} />
                            </Form.Group>
                            <Form.Group controlId="formGroupQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="Enter Quantity"
                                    onChange={(e) =>
                                        this.setState({
                                            quantity: e.target.value,
                                        })
                                    }
                                    value={this.state.quantity} />
                            </Form.Group>
                            <Form.Group controlId="formGroupPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter Price"
                                    onChange={(e) =>
                                        this.setState({
                                            price: e.target.value,
                                        })
                                    }
                                    value={this.state.price} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Images</Form.Label>
                                <br></br>
                                <input type="file" accept="image/*" multiple onChange={(event) => {
                                    this.setState({
                                        bookImages: event.target.files
                                    })
                                }} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.setAddBooksModal(false) }}>Close</Button>
                        <Button variant="primary" onClick={() => this.addNewBook()}>Add</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    size="lg"
                    show={isUpdateBookModal}
                    onHide={() => this.setUpdateBooksModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Update Book
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGroupISBN">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control type="number" placeholder="Enter ISBN"
                                    onChange={(e) =>
                                        this.setState({
                                            isbn: e.target.value,
                                        })
                                    }
                                    value={this.state.isbn} />
                            </Form.Group>
                            <Form.Group controlId="formGroupTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="string" placeholder="Enter Title"
                                    onChange={(e) =>
                                        this.setState({
                                            title: e.target.value,
                                        })
                                    }
                                    value={this.state.title} />
                            </Form.Group>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="string" placeholder="Enter Author"
                                    onChange={(e) =>
                                        this.setState({
                                            author: e.target.value,
                                        })
                                    }
                                    value={this.state.author} />
                            </Form.Group>
                            <Form.Group controlId="formGroupPDate">
                                <Form.Label>Published Date</Form.Label>
                                <Form.Control type="date" placeholder="Choose Date"
                                    onChange={(e) =>
                                        this.setState({
                                            pdate: e.target.value,
                                        })
                                    }
                                    value={this.state.pdate} />
                            </Form.Group>
                            <Form.Group controlId="formGroupQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="Enter Quantity"
                                    onChange={(e) =>
                                        this.setState({
                                            quantity: e.target.value,
                                        })
                                    }
                                    value={this.state.quantity} />
                            </Form.Group>
                            <Form.Group controlId="formGroupPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter Price"
                                    onChange={(e) =>
                                        this.setState({
                                            price: e.target.value,
                                        })
                                    }
                                    value={this.state.price} />
                            </Form.Group>
                        </Form>
                        {
                            this.state.bookImagesUpdate.length > 0 ?  <Form.Label>Images</Form.Label> : <Form.Label>No Images Available</Form.Label>
                        }
                        {
                            this.state.bookImagesUpdate.map((value, key) => {
                                return (<Row key={key}>
                                    <Col >
                                        <Image style={{ minWidth: 150, maxWidth: 400, maxHeight: 400 }} src={value.location} rounded />
                                    </Col>
                                    <Col >
                                        <Button variant="danger" onClick={() => { this.deleteFromS3(value.key, value.id) }}>Delete</Button>
                                    </Col>
                                </Row>)
                            })
                        }

                        <Form.Label>Upload New Image</Form.Label>
                        <br></br>
                        <input type="file" accept="image/*" multiple onChange={(event) => {
                            this.setState({
                                bookImages: event.target.files
                            })
                        }} />
                        <Button variant="primary" onClick={()=>{
                            this.uploadS3BookImage(this.state.bid)
                        }}>Add New</Button>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.setUpdateBooksModal(false) }}>Close</Button>
                        <Button variant="primary" onClick={() => this.updateNewBook()}>Update</Button>
                    </Modal.Footer>
                </Modal>

                <Tab.Container id="left-tabs-example" defaultActiveKey="SellBooks" activeKey={activeTab} onSelect={(k) => this.setState({ activeTab: k })}>

                    <br></br>
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">

                                <Nav.Item>
                                    <Nav.Link eventKey="SellBooks">Sell Books</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="BuyBooks">Buy Books</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="BuyBooks">
                                    <Col>
                                        <Card className="text-center py-3 col-lg-12 col-md-12 col-sm-12 col-xl-12">
                                            <Card.Header>
                                                <h5>Buy Books</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Table responsive="sm">
                                                        {
                                                            buyBooksList.map((data, key) => {
                                                                let { bookimages = [] } = data;
                                                                return (
                                                                    <tbody key={key}>
                                                                        <tr id="zoom"  className="rounded justify-content-between my-3 m2 shadow-sm p-4 mb-4 bg-white">
                                                                            <td style={{ minWidth: 200, maxWidth: 400, minHeight: 100, maxHeight: 300 }}>
                                                                                <Carousel>
                                                                                    {
                                                                                        bookimages.length > 0 ?
                                                                                            bookimages.map((inDate, inKey) => {

                                                                                                let {
                                                                                                    location
                                                                                                } = inDate;

                                                                                                return (<Carousel.Item key={inKey}>
                                                                                                    <img
                                                                                                        className="d-block w-100"
                                                                                                        src={location ? location : "/thumbnail-default.jpg"}
                                                                                                        alt={location ? location : "/thumbnail-default.jpg"}
                                                                                                    />
                                                                                                </Carousel.Item>)
                                                                                            })
                                                                                            :
                                                                                            <Carousel.Item>
                                                                                                <img
                                                                                                    className="d-block w-100"
                                                                                                    src="/thumbnail-default.jpg"
                                                                                                    alt="/thumbnail-default.jpg"
                                                                                                />
                                                                                            </Carousel.Item>
                                                                                    }
                                                                                </Carousel>
                                                                            </td>
                                                                            <td className="text-left">
                                                                                <b> Title: </b> {data.title ? data.title : "No Title"} <br></br>
                                                                                <b> Published: </b> {data.pdate ? data.pdate.split("T")[0] : "No date available"} <br></br>
                                                                                <b> ISBN: </b> {data.isbn ? data.isbn : "-"} 

                                                                                ${data.price}
                                                                                <br></br>
                                                                                <Button variant="secondary" size="sm" onClick={() => {
                                                                                    this.setState({
                                                                                        currentBooksDetails: data
                                                                                    })
                                                                                    this.setAddToCartModal(true);
                                                                                }}>Add to Cart</Button> <br></br>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            })
                                                        }
                                                        {
                                                            buyBooksList.length === 0 &&
                                                            <tbody>
                                                                <tr className="rounded justify-content-between my-3 m2 shadow-sm p-4 mb-4 bg-white">
                                                                    <td>No records</td>
                                                                </tr>
                                                            </tbody>
                                                        }
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Tab.Pane>
                                <Tab.Pane eventKey="SellBooks">
                                    <Col>
                                        <Card className="text-center py-3 col-lg-12 col-md-12 col-sm-12 col-xl-12">

                                            <Card.Header>
                                                <h5>Sell Books</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Table responsive="sm">

                                                    {
                                                        sellBooksList.map((data, key) => {
                                                            let { bookimages = [] } = data;

                                                            return (
                                                                <tbody key={key}>
                                                                    <tr id="zoom" className="rounded justify-content-between my-3 m2 shadow-sm p-4 mb-4 bg-white">
                                                                        <td style={{ minWidth: 200, maxWidth: 400, minHeight: 100, maxHeight: 300 }}>
                                                                            <Carousel>
                                                                                {
                                                                                    bookimages.length > 0 ?
                                                                                        bookimages.map((inDate, inKey) => {

                                                                                            let {
                                                                                                location
                                                                                            } = inDate;

                                                                                            return (<Carousel.Item key={inKey}>
                                                                                                <img
                                                                                                    className="d-block w-100"
                                                                                                    src={location ? location : "/thumbnail-default.jpg"}
                                                                                                    alt={location ? location : "/thumbnail-default.jpg"}
                                                                                                />
                                                                                            </Carousel.Item>)
                                                                                        })
                                                                                        :
                                                                                        <Carousel.Item>
                                                                                            <img
                                                                                                className="d-block w-100"
                                                                                                src="/thumbnail-default.jpg"
                                                                                                alt="/thumbnail-default.jpg"
                                                                                            />
                                                                                        </Carousel.Item>
                                                                                }
                                                                            </Carousel>
                                                                        </td>
                                                                        <td className="text-left">
                                                                            <b> Title: </b> {data.title ? data.title : "No Title"} <br></br>
                                                                            <b> Published: </b> {data.pdate ? data.pdate.split("T")[0] : "No date available"} <br></br>
                                                                            <b> ISBN: </b> {data.isbn ? data.isbn : "-"} <br></br>

                                                                            <br></br>
                                                                            ${data.price}

                                                                            <br></br>
                                                                            <Button variant="secondary" size="sm" onClick={() => {
                                                                                this.setState({
                                                                                    isbn: data.isbn,
                                                                                    title: data.title,
                                                                                    author: data.author,
                                                                                    pdate: data.pdate ? data.pdate.split("T")[0] : "",
                                                                                    quantity: data.quantity,
                                                                                    price: data.price,
                                                                                    bid: data.id,
                                                                                    bookImagesUpdate: data.bookimages
                                                                                })
                                                                                this.setUpdateBooksModal(true);
                                                                            }}>Update</Button> <br></br> <br></br>
                                                                            <Button variant="danger" size="sm" onClick={() => {
                                                                                this.setState({
                                                                                    currentBooksDetails: data
                                                                                })
                                                                                this.setDeleteBookModal(true)
                                                                            }}>Delete</Button>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        sellBooksList.length === 0 &&
                                                        <tbody>
                                                            <tr className="rounded justify-content-between my-3 m2 shadow-sm p-4 mb-4 bg-white">
                                                                <td>No records</td>
                                                            </tr>
                                                        </tbody>
                                                    }
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

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

export default connect(mapStateToProps, mapDispatchToProps)(Home);