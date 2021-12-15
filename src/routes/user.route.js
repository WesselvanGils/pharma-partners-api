const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const User = require("../models/test.model")();

const userCrudController = new crudController(User);

// get all users
router.get("/users", userCrudController.getAll);

// create user
router.post("/users", userCrudController.create);

// get a user
router.get("/users/:id", userCrudController.getOne);

// get a edit
router.put("/users/:id", userCrudController.update);

// remove a user
router.delete("/users/:id", userCrudController.delete);

module.exports = router;
