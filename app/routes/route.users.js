module.exports = app => {
    const user = require("../controllers/controller.users.js");
    var router = require("express").Router();
    router.post("/", user.create);
    router.delete("/:id", user.delete);
    router.put("/:id", user.update);
    router.get("/:id", user.findOne);
    router.get("/", user.findAll);
    app.use('/user', router);
  };