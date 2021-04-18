module.exports = app => {
    const userController = require("../controller/controller.users");

    var router = require("express").Router();

    router.post("/signup", userController.create);
    router.post("/getuserdetails", userController.findOne);
    router.post("/login", userController.login);
    router.post("/update", userController.update);
    router.post("/updatepassword", userController.updatepassword);
    router.post("/logout", userController.logout);
    router.post("/forgotPassword", userController.forgotPassword);

    // // Retrieve all users
    // router.get("/", users.findAll);

    // // Retrieve all published users
    // router.get("/published", users.findAllPublished);

    // // Retrieve a single Tutorial with id
    // router.get("/:id", users.findOne);

    // // Update a Tutorial with id
    // router.put("/:id", users.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", users.delete);

    // // Create a new Tutorial
    // router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};