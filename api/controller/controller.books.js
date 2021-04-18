const db = require("../models");
const Books = db.books;
const BookImages = db.bookimages;
const Op = db.Sequelize.Op;

Date.prototype.isValid = function () {
    return this.getDate() === this.getDate();
};

exports.create = (req, res) => {
    let {
        isbn = 0,
        title = "",
        author = "",
        pdate,
        quantity = 0,
        price = 0,
        createdby,
    } = req.body;

    if (!isbn) {
        res.send({
            status: 400,
            message: "Invalid ISBN"
        });
        return;
    }
    if (!title) {
        res.send({
            status: 400,
            message: "Invalid Title"
        });
        return;
    }
    if (!author) {
        res.send({
            status: 400,
            message: "Invalid Author"
        });
        return;
    }
    if (!pdate) {
        res.send({
            status: 400,
            message: "Invalid publish date"
        });
        return;
    }
    pdate = new Date(pdate);
    if (!pdate.isValid()) {
        res.send({
            status: 400,
            message: "Invalid publish date format"
        });
        return;
    }
    // if (!quantity) {
    //     res.send({
    //         status: 400,
    //         message: "Invalid quantity"
    //     });
    //     return;
    // }
    if (!(quantity >= 0 && quantity <= 999)) {
        res.send({
            status: 400,
            message: "Invalid quantity. Quantity must be between 0 to 999"
        });
        return;
    }
    if (!price) {
        res.send({
            status: 400,
            message: "Invalid price"
        });
        return;
    }
    if (!(price >= 0.01 && price <= 9999.99)) {
        res.send({
            status: 400,
            message: "Invalid price. Price must be between 0.01 to 9999.99"
        });
        return;
    }
    if (!createdby) {
        res.send({
            status: 400,
            message: "Invalid creator Id."
        });
        return;
    }

    title = title.trim();
    title = title[0].toUpperCase() + title.slice(1);
    author = author.trim();
    author = author[0].toUpperCase() + author.slice(1);

    const books = {
        isbn,
        title,
        author,
        pdate,
        quantity,
        price,
        createdby,
        isDeleted: false
    };

    Books.findOne({ where: { isbn , createdby } })
        .then(data => {
            if(data){
                if(data.isDeleted){
                    Books.update(books, {
                        where: { id: data.id }
                    }).then(num => {
                            if (num == 1) {
                                res.send({
                                    status: 200,
                                    message: "Book added successfully.",
                                    data: books
                                });
                                return;
                            } else {
                                res.send({
                                    status: 400,
                                    message: `Error while adding the book.`
                                });
                                return;
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Error while adding the book."
                            });
                            return;
                        });

                }else{
                    res.send({
                        status: 400,
                        message: `ISBN is already been used for the book '${data.title}'`,
                    });
                }
            }else{
                Books.create(books)
                    .then(data => {
                        res.send({
                            status: 200,
                            message: "Book created successfully",
                            data: data
                        });
                        return;
                    })
                    .catch(err => {
                        res.send({
                            status: 400,
                            message:
                                err.message || "Some error occurred while adding a new book."
                        });
                        return;
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message:
                    err.message || "Some error occurred while adding a new book."
            });
        });
};

exports.update = (req, res) => {
    let {
        id = "",
        title = "",
        author = "",
        pdate,
        quantity = 0,
        price = 0,
        createdby,
    } = req.body;
    const updatedAt = new Date();

    if (!id) {
        res.send({
            status: 400,
            message: "Invalid Id"
        });
        return;
    }

    if (!title) {
        res.send({
            status: 400,
            message: "Invalid Title"
        });
        return;
    }
    if (!author) {
        res.send({
            status: 400,
            message: "Invalid Author"
        });
        return;
    }
    if (!pdate) {
        res.send({
            status: 400,
            message: "Invalid publish date"
        });
        return;
    }
    pdate = new Date(pdate);
    if (!pdate.isValid()) {
        res.send({
            status: 400,
            message: "Invalid publish date format"
        });
        return;
    }
    // if (!quantity) {
    //     res.send({
    //         status: 400,
    //         message: "Invalid quantity"
    //     });
    //     return;
    // }
    if (!(quantity >= 0 && quantity <= 999)) {
        res.send({
            status: 400,
            message: "Invalid quantity. Quantity must be between 0 to 999"
        });
        return;
    }
    if (!price) {
        res.send({
            status: 400,
            message: "Invalid price"
        });
        return;
    }
    if (!(price >= 0.01 && price <= 9999.99)) {
        res.send({
            status: 400,
            message: "Invalid price. Price must be between 0.01 to 9999.99"
        });
        return;
    }
    if (!createdby) {
        res.send({
            status: 400,
            message: "Invalid creator Id."
        });
        return;
    }

    title = title.trim();
    title = title[0].toUpperCase() + title.slice(1);
    author = author.trim();
    author = author[0].toUpperCase() + author.slice(1);

    const books = {
        title,
        author,
        pdate,
        quantity,
        price,
        createdby,
        updatedAt
    };
    
    Books.update(books, {
        where: { id: id }
    }).then(num => {
            if (num == 1) {
                res.send({
                    status: 200,
                    message: "Book was updated successfully."
                });
                return;
            } else {
                res.send({
                    status: 400,
                    message: `Cannot update book with id=${id}. Maybe book was not found or request is empty!`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating book with id=" + id
            });
            return;
        });
};

exports.delete = (req, res) => {
    const {
        id = ""
    } = req.body;

    if (!id) {
        res.send({
            status: 400,
            message: "Invalid Id"
        });
        return;
    }

    Books.update({ isDeleted: true}, {
        where: { id: id }
    }).then(num => {
            if (num == 1) {
                res.send({
                    status: 200,
                    message: "Book was deleted successfully."
                });
                return;
            } else {
                res.send({
                    status: 400,
                    message: `Cannot delete book with id=${id}. Maybe book was not found or request is empty!`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting book with id=" + id
            });
            return;
        });
};

exports.findAll = (req, res) => {
    Books.findAll({
        where: { 
            quantity: {
                [Op.not]: 0
            }, 
            isDeleted : true
        },
        order: [ db.Sequelize.literal('title ASC'), db.Sequelize.literal('price ASC') ],
    })
    .then(data => {
        res.send({
            status: 200,
            message: "Success",
            data: data
        });
        return;
    })
    .catch(err => {
        res.send({
            status: 400,
            message:
                err.message || "Some error occurred while fetching the Books."
        });
        return;
    });
};

exports.findNotFor = (req, res) => {
    const {
        createdby = ""
    } = req.body;
    if (!createdby) {
        res.send({
            status: 400,
            message: "Invalid createdby"
        });
        return;
    }
    Books.hasMany(BookImages, { targetKey: 'id', foreignKey: 'pid'})
    Books.findAll({
        where: { 
            createdby : { [Op.not]: createdby },
            quantity: {
                [Op.not]: 0
            }, 
            isDeleted : false
        },
        order: [ db.Sequelize.literal('isbn ASC'), db.Sequelize.literal('price ASC') ],
        include: [{
            model: db.bookimages,
            // where: { id: db.Sequelize.col('carts.pid') }
        }]
    })
    .then(data => {
        res.send({
            status: 200,
            message: "Success",
            data: data
        });
        return;
    })
    .catch(err => {
        res.send({
            status: 400,
            message:
                err.message || "Some error occurred while fetching the Books."
        });
        return;
    });
};

exports.findFor = (req, res) => {
    const {
        createdby = ""
    } = req.body;

    if (!createdby) {
        res.send({
            status: 400,
            message: "Invalid createdby"
        });
        return;
    }

    Books.hasMany(BookImages, { targetKey: 'id', foreignKey: 'pid'})
    Books.findAll({
        where: { 
            createdby,
            // quantity: {
            //     [Op.not]: 0
            // }, 
            isDeleted : false
        },
        order: [ db.Sequelize.literal('title ASC'), db.Sequelize.literal('price ASC') ],
        include: [{
            model: db.bookimages,
            // where: { id: db.Sequelize.col('carts.pid') }
        }]
    })
    .then(data => {
        res.send({
            status: 200,
            message: "Success",
            data: data
        });
        return;
    })
    .catch(err => {
        res.send({
            status: 400,
            message:
                err.message || "Some error occurred while fetching the Books."
        });
        return;
    });
};
