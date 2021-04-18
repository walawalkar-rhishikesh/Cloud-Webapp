const db = require("../models");
const Carts = db.carts;
const Books = db.books;
const Op = db.Sequelize.Op;

exports.add = (req, res) => {
    let {
        uid = "",
        pid = "",
        quantity = 0
    } = req.body;

    if (!uid) {
        res.send({
            status: 400,
            message: "Invalid user Id"
        });
        return;
    }
    if (!pid) {
        res.send({
            status: 400,
            message: "Invalid book id"
        });
        return;
    }
    if (!quantity) {
        res.send({
            status: 400,
            message: "Invalid quantity"
        });
        return;
    }
    if (!(quantity >= 1 && quantity <= 999)) {
        res.send({
            status: 400,
            message: "Invalid quantity. Quantity must be between 1 to 999"
        });
        return;
    }

    uid = uid.trim();
    pid = pid.trim();
   

    const carts = {
        uid,
        pid,
        quantity
    };

    Carts.findOne({ where: { uid , pid } })
        .then(data => {
            if(data){
                res.send({
                    status: 400,
                    message: "Book already exists in the cart",
                    data: data
                });
                return;
            }else{
                Books.findOne({ where: { id: pid } })
                    .then(data => {
                        if(data){
                            if(quantity <= data.quantity){
                                Carts.create(carts)
                                    .then(data => {
                                        res.send({
                                            status: 200,
                                            message: "Book added successfully in the cart",
                                            data: data
                                        });
                                        return;
                                    })
                                    .catch(err => {
                                        res.send({
                                            status: 400,
                                            message:
                                                err.message || "Some error occurred while adding the book in the cart."
                                        });
                                        return;
                                    });
                            }else{
                                res.send({
                                    status: 400,
                                    message: "Quantity provided exceeds the sellers quanity which is "+ data.quantity
                                });
                            }
                        }else{
                            res.send({
                                status: 400,
                                message: "Product doesn't exists in the system"
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            status: 500,
                            message:
                                err.message || "Some error occurred while adding the book in the cart."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message:
                    err.message || "Some error occurred while adding the book in the cart."
            });
        });
};

exports.update = (req, res) => {
    let {
        id = "",
        uid = "",
        pid = "",
        quantity = 0
    } = req.body;
    const updatedAt = new Date();

    if (!id) {
        res.send({
            status: 400,
            message: "Invalid Id"
        });
        return;
    }
    if (!uid) {
        res.send({
            status: 400,
            message: "Invalid user Id"
        });
        return;
    }
    if (!pid) {
        res.send({
            status: 400,
            message: "Invalid book id"
        });
        return;
    }
    if (!quantity) {
        res.send({
            status: 400,
            message: "Invalid quantity"
        });
        return;
    }
    if (!(quantity >= 1 && quantity <= 999)) {
        res.send({
            status: 400,
            message: "Invalid quantity. Quantity must be between 1 to 999"
        });
        return;
    }

    uid = uid.trim();
    pid = pid.trim();
   

    const carts = {
        uid,
        pid,
        quantity
    };
    
    Carts.update(carts, {
        where: { id: id }
    }).then(num => {
            if (num == 1) {
                res.send({
                    status: 200,
                    message: "Cart item updated successfully"
                });
                return;
            } else {
                res.send({
                    status: 400,
                    message: `Cannot update cart item with id=${id}. Maybe cart item was not found or request is empty!`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating cart item with id=" + id
            });
            return;
        });
};

exports.delete = (req, res) => {
    const {
        id = ""
    } = req.body;

    Carts.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    status: 200,
                    message: "Cart item was deleted successfully!"
                });
                return;
            } else {
                res.send({
                    status: 400,
                    message: `Cannot delete cart item with id=${id}. Maybe book was not found!`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Could not delete cart item with id=" + id
            });
            return;
        });
};


exports.find = (req, res) => {
    const {
        uid = ""
    } = req.body;

    if (!uid) {
        res.send({
            status: 400,
            message: "Invalid uid"
        });
        return;
    }

    // Books.hasMany(Carts, {foreignKey: "pid"})

    // Books.findAll({
    //     raw: true,
    //     include: [{
    //       model: Carts,
    //       where: {uid}
    //      }]
    // })
    Carts.belongsTo(Books, { targetKey: 'id', foreignKey: 'pid'})
    Carts.findAll({
        where: { 
            uid
        },
        include: [{
            model: db.books,
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
