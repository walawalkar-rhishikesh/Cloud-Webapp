module.exports = app => {
    const bookimagesController = require("../controller/controller.bookimages");

    var router = require("express").Router();

    // router.post("/create", bookController.create);
    // router.post("/update", bookController.update);
    // router.post("/delete", bookController.delete);
    // router.post("/findall", bookController.findAll);
    // router.post("/findFor", bookController.findFor);
    // router.post("/findNotFor", bookController.findNotFor);
    router.post("/uploadS3Image", bookimagesController.uploadS3Image);
    router.post("/removeFromS3", bookimagesController.removeFromS3);
    router.post("/create", bookimagesController.create);
    router.post("/createBulk", bookimagesController.createBulk);
    router.post("/deleteBookImage", bookimagesController.deleteBookImage);
    router.post("/removeImagesOnBookDelete", bookimagesController.removeImagesOnBookDelete);
    router.post("/removeImageDataOnBookDelete", bookimagesController.removeImageDataOnBookDelete);

    app.use('/api/bookimages', router);
};