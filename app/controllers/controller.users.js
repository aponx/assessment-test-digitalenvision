const User = require("../models/model.users.js");
const Cron = require("../libraries/cron.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status : false,
      message: "Request body can not be empty!"
    });
  }

  const user_data = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthdate: req.body.birthdate,
    location: req.body.location
  });

  User.create( user_data, (err, data) => {
    if (err) {
      res.status(500).send({
        status : false,
        message: err.message || "Some error occurred while creating the user."
      });
    } else {
        Cron.job(data, (result) => {
          console.log(result);
        });
        res.send({
          status : true,
          message : "Success",
          data : data
        });
    }
  });
};

exports.findAll = (req, res) => {
  const keyword = req.query.keyword;

  User.findAll(keyword, (err, data) => {
    if (err)
      res.status(500).send({
        status : false,
        message : err.message || "Some error occurred while retrieving user."
      });
    else res.send({
      status : true,
      message : "Success",
      data : data
    });
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send({
      status : true,
      message : "Success",
      data : data
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status : false,
      message: "Request Body can not be empty!"
    });
  }

  User.updateById(req.params.id, new User(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status : false,
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            status : false,
            message: "Error updating User with id " + req.params.id
          });
        }
      } else {
        Cron.update(data, (result) => {
          console.log(result);
        });

        res.send({
          status : true,
          message : "Success",
          data : data
        });
      }
    }
  );
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else {
      Cron.delete(req.params.id, (result) => {
        console.log(result);
      });
      res.send({
        status : true,
        message: `User was deleted successfully!`
      });
    }
  });
};