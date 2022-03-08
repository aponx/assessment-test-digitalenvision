const sql = require("./db.js");

const User = function(user) {
  this.first_name   = user.first_name;
  this.last_name    = user.last_name;
  this.birthdate    = user.birthdate;
  this.location     = user.location;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.findAll = (keyword, result) => {
  let query = "SELECT * FROM users";

  if (keyword) {
    query += ` WHERE first_name LIKE '%${keyword}%' OR last_name LIKE '%${keyword}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET first_name = ?, last_name = ?, birthdate = ?, location = ? WHERE id = ?",
    [user.first_name, user.last_name, user.birthdate, user.location, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = User;