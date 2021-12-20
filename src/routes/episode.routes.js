const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Episode = require("../models/episode.model")();

const episodeCrudController = new crudController(Episode);

// get all users
router.get("/episodes", episodeCrudController.getAll);

// create user
router.post("/episodes", episodeCrudController.create);

// remove a user
router.delete("/episodes/:id", episodeCrudController.delete);

module.exports = router;
