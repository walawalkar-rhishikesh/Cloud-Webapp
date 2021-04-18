const db = require("../models");
const config = require("../config/db.config.js");
const BookImages = db.bookimages;
const Op = db.Sequelize.Op;

const upload = require('../services/image_upload');

const singleUpload = upload.array('image', 10);


exports.uploadS3Image = (req, res) => {
    singleUpload(req, res, function (err, data) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        return res.send({
            status: 200,
            data: req.files
        });
    });
}

exports.removeFromS3 = (req, res) => {
    let {
        key = ""
    } = req.body;
    const aws = require('aws-sdk');
    // aws.config.update({
    //     secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    //     accessKeyId: config.AWS_ACCESS_KEY_ID,
    //     region: config.aws_region
    // });
    const s3 = new aws.S3();
    var params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: key
    };
    s3.deleteObject(params, function (err) {
        if (err) res.send({
            status: 400,
            message: err
        })
        else res.send({
            status: 200,
            message: "Success"
        })
        return;
    });
}

exports.removeImagesOnBookDelete= (req, res) => {
    let {
        key = []
    } = req.body;
    const aws = require('aws-sdk');
    // aws.config.update({
    //     secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    //     accessKeyId: config.AWS_ACCESS_KEY_ID,
    //     region: config.aws_region
    // });
    const s3 = new aws.S3();
    var params = {
        Bucket: config.AWS_BUCKET_NAME,
        Delete: {
            Objects: key
        }
    };
    s3.deleteObjects(params, function (err) {
        if (err) res.send({
            status: 400,
            message: err
        })
        else res.send({
            status: 200,
            message: "Success"
        })
        return;
    });
}

exports.removeImageDataOnBookDelete = (req, res) => {
    let {
        pid
    } = req.body;

    if (!pid) {
        res.send({
            status: 400,
            message: "Please enter valid book image id"
        });
        return;
    }
    BookImages.destroy({
        where: { pid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    status: 200,
                    message: "Book images was deleted successfully!"
                });
                return;
            } else {
                res.send({
                    status: 400,
                    message: `Cannot delete Book images with id=${pid}. Maybe book images was not found!`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Could not delete Book images with id=" + pid
            });
            return;
        });
}

exports.deleteBookImage = (req, res) => {
    let {
        id
    } = req.body;

    if (!id) {
        res.send({
            status: 400,
            message: "Please enter valid book image id"
        });
        return;
    }
    BookImages.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    status: 200,
                    message: "Book image was deleted successfully!"
                });
                return;
            } else {
                res.send({
                    status: 400,
                    message: `Cannot delete Book image with id=${id}. Maybe book image was not found!`
                });
                return;
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: "Could not delete Book image with id=" + id
            });
            return;
        });
}

exports.create = (req, res) => {
    let {
        pid = "",
        location = "",
        originalname = "",
        key = ""
    } = req.body;

    if (!pid) {
        res.send({
            status: 400,
            message: "Please enter valid book image pid"
        });
        return;
    }
    if (!location) {
        res.send({
            status: 400,
            message: "Please enter valid book image location"
        });
        return;
    }

    if (!originalname) {
        res.send({
            status: 400,
            message: "Please enter valid book image originalname"
        });
        return;
    }
    if (!key) {
        res.send({
            status: 400,
            message: "Please enter valid book image key"
        });
        return;
    }

    BookImages.create({
        pid,
        location,
        originalname,
        key
    })
        .then(data => {
            res.send({
                status: 200,
                message: "BookImages added successfully",
                data: data
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                message:
                    err.message || "Some error occurred while adding the images."
            });
        });


}

exports.createBulk = (req, res) => {
    let {
        imageSet = []
    } = req.body;

    var resArr = [];
    
    // var myObject = eval('(' + imageSet + ')');
    // for (i in myObject)
    // {
    //     let obj = {
    //         location : myObject[i]["location"],
    //         key : myObject[i]["key"],
    //         pid : myObject[i]["pid"],
    //         originalname: myObject[i]["originalname"],
    //     }
    //     resArr.push(obj);
    // }

    BookImages.bulkCreate(imageSet, {returning: true})
        .then(data => {
            res.send({
                status: 200,
                message: "BookImages added successfully",
                data: data
            });
        })
        .catch(err => {
            res.send({
                status: 400,
                message:
                    err.message || "Some error occurred while adding the images."
            });
        });
}