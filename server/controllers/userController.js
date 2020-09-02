const express = require("express");
const router = express.Router();

// # destructures the User model, giving us CRUD access to the corresponding Users table
const { User } = require("../models");

// # gets JSON of for all users
router.get("/", (req, res) => {
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.json(500).send(err));
});

module.exports = router;