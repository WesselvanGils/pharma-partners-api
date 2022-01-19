const express = require("express");
const router = express.Router();
const crudController = require("../controllers/Crud");
const Journal = require("../models/journal.model")();
const journalCrudController = new crudController(Journal);

// get all journals
router.get("/journals", journalCrudController.getAll);

// create an journal
router.post("/journals", journalCrudController.create);

// archive journals 
router.put("/journals/:id/:patient", journalCrudController.archiveJournals)

module.exports = router;
