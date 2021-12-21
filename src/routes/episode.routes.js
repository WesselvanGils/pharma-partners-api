const express = require("express");
const router = express.Router();
const crudController = require("../controllers/Crud");
const Episode = require("../models/episode.model")();
const episodeCrudController = new crudController(Episode);

// get all episodes
router.get("/episodes", episodeCrudController.getAll);

// create an episode
router.post("/episodes", episodeCrudController.create);

// remove an episode
router.delete("/episodes/:id", episodeCrudController.delete);

module.exports = router;
