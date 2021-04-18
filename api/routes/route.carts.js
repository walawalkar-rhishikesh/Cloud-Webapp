module.exports = app => {
    const cartController = require("../controller/controller.carts");

    var router = require("express").Router();

    router.post("/add", cartController.add);
    router.post("/update", cartController.update);
    router.post("/delete", cartController.delete);
    router.post("/find", cartController.find);

    app.use('/api/carts', router);
};