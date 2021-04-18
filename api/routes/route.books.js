module.exports = app => {
    const bookController = require("../controller/controller.books");

    var router = require("express").Router();

    router.post("/create", bookController.create);
    router.post("/update", bookController.update);
    router.post("/delete", bookController.delete);
    router.post("/findall", bookController.findAll);
    router.post("/findFor", bookController.findFor);
    router.post("/findNotFor", bookController.findNotFor);

    app.use('/api/books', router);
};