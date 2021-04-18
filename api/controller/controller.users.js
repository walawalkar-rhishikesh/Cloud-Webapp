const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const aws = require('aws-sdk');

const config = require("../config/db.config.js");

// aws.config.update({
//     secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
//     accessKeyId: config.AWS_ACCESS_KEY_ID,
//     region: config.aws_region
// });

// Create and Save a new Users
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.send({
            status: 400,
            message: "Email can not be empty!"
        });
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        res.send({
            status: 400,
            message: "Email is invalid!"
        });
        return;
    }
    if (!req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        res.send({
            status: 400,
            message: "You have entered an invalid password. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        });
        return;
    }
    if (!req.body.fname) {
        res.send({
            status: 400,
            message: "First name can not be null!"
        });
        return;
    }
    if (!req.body.lname) {
        res.send({
            status: 400,
            message: "Last name can not be null!"
        });
        return;
    }

    req.body.email = req.body.email.trim().toLowerCase();
    req.body.fname = req.body.fname.trim();
    req.body.fname = req.body.fname[0].toUpperCase() + req.body.fname.slice(1);
    req.body.lname = req.body.lname.trim();
    req.body.lname = req.body.lname[0].toUpperCase() + req.body.lname.slice(1);

    Users.findOne({ where: { email: `${req.body.email}` } })
        .then(data => {
            if (data && data.email) {
                res.send({
                    status: 400,
                    message: "Email is already registered",
                });

            } else {


                bcrypt.genSalt(saltRounds, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {

                        const users = {
                            email: req.body.email,
                            password: hash,
                            fname: req.body.fname,
                            lname: req.body.lname
                        };

                        // Save Users in the database
                        Users.create(users)
                            .then(data => {
                                let result = {
                                    email: data.email,
                                    fname: data.fname,
                                    lname: data.lname,
                                    id: data.id,
                                    createdAt: data.createdAt,
                                    updatedAt: data.updatedAt
                                };
                                res.send({
                                    status: 200,
                                    message: "User created successfully",
                                    data: result
                                });
                            })
                            .catch(err => {
                                res.send({
                                    status: 400,
                                    message:
                                        err.message || "Some error occurred while creating the Users."
                                });
                            });
                    });
                });
                // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                //     // Create a users

                // });

            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};

// // Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//     Users.findAll({ where: condition })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving Users."
//             });
//         });
// };

// // Find a single Users with an id
exports.findOne = (req, res) => {
    const id = req.body.id;
    Users.findByPk(id)
        .then(data => {

            if (!data || data == null) {
                res.send({
                    status: 400,
                    message: "No records found",
                });
            } else {
                data = data.dataValues;
                let result = {
                    email: data.email,
                    fname: data.fname,
                    lname: data.lname,
                    id: data.id,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                };
                res.status(200).send({
                    status: 200,
                    message: "Success",
                    data: result
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message:
                    err.message || "Some error occurred while retriving the User."
            });
        });
};

exports.login = (req, res) => {
    if (!req.body.email) {
        res.send({
            status: 400,
            message: "Email can not be empty!"
        });
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        res.send({
            status: 400,
            message: "Email is invalid!"
        });
        return;
    }
    if (!req.body.password) {
        res.send({
            status: 400,
            message: "Password can not be null!"
        });
        return;
    }

    req.body.email = req.body.email.trim().toLowerCase();

    Users.findOne({ where: { email: `${req.body.email}` } })
        .then(data => {
            if (!data) {
                res.send({
                    status: 500,
                    message: "User not found",
                });
            } else {

                bcrypt.compare(req.body.password, data.password, function (err, result) {
                    if (result) {
                        let result = {
                            email: data.email,
                            fname: data.fname,
                            lname: data.lname,
                            id: data.id,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt
                        };
                        res.status(200).send({
                            status: 200,
                            message: "User loggedin successfully",
                            data: result
                        });
                    } else {
                        res.send({
                            status: 500,
                            message: "Incorrect credentials."
                        });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                status: 500,
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};




// // Update a Users by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    const updatedAt = new Date();

    if (!req.body.fname) {
        res.send({
            status: 400,
            message: "First name can not be null!"
        });
        return;
    }
    if (!req.body.lname) {
        res.send({
            status: 400,
            message: "Last name can not be null!"
        });
        return;
    }
    req.body.fname = req.body.fname.trim();
    req.body.fname = req.body.fname[0].toUpperCase() + req.body.fname.slice(1);
    req.body.lname = req.body.lname.trim();
    req.body.lname = req.body.lname[0].toUpperCase() + req.body.lname.slice(1);
    const requestBody = {
        fname: req.body.fname,
        lname: req.body.lname,
        updatedAt
    }

    Users.update(requestBody, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    status: 200,
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    status: 400,
                    message: `Cannot update User with id=${id}. Maybe User was not found or request is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

exports.updatepassword = (req, res) => {
    const id = req.body.id;
    const updatedAt = new Date();

    if (!req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        res.send({
            status: 400,
            message: "You have entered an invalid password. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        });
        return;
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            const requestBody = {
                password: hash,
                updatedAt
            }
            Users.update(requestBody, {
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            status: 200,
                            message: "User was updated successfully."
                        });
                    } else {
                        res.send({
                            status: 400,
                            message: `Cannot update User with id=${id}. Maybe User was not found or request is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating User with id=" + id
                    });
                });

        });
    });
    // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

    // });


};

exports.logout = (req, res) => {
    const id = req.body.id;
    res.send({
        status: 200,
        message: `Success`
    });
};

exports.forgotPassword = (req, res) => {

    if (!req.body.email) {
        res.send({
            status: 400,
            message: "Email can not be empty!"
        });
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        res.send({
            status: 400,
            message: "Email is invalid!"
        });
        return;
    }
    Users.findOne({ where: { email: `${req.body.email}` } })
        .then(data => {
            if (data && data.email) {
                var params = {
                    Message: `${req.body.email}:::${data.id}`,
                    TopicArn: 'arn:aws:sns:us-east-1:567826654401:sns_reset_password',
                };
                var publishTextPromise = new aws.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
                publishTextPromise.then(
                    function (data) {
                        res.send({
                            status: 200,
                            message: "Success",
                            data: JSON.stringify(data)
                        })
                    }).catch(
                        function (err) {
                            res.send({
                                status: 400,
                                message: err
                            })
                            return;
                        })
            } else {
                res.send({
                    status: 400,
                    message: "Email is not registered",
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        });
}

// // Delete a Users with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Users.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Users was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Users with id=" + id
//             });
//         });
// };

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//     Users.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//             res.send({ message: `${nums} Users were deleted successfully!` });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while removing all Users."
//             });
//         });
// };

// // find all published Users
// exports.findAllPublished = (req, res) => {
//     Users.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving Users."
//             });
//         });
// };